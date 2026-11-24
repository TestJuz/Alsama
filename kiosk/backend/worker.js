const response=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
const digest=async x=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(x))),b=>b.toString(16).padStart(2,'0')).join('');
const clean=(v,n)=>typeof v==='string'?v.trim().slice(0,n):'';
const STAFF='info@alsamatourscr.com';
const FROM='Alsama Tours <reservations@mail.alsamatourscr.com>';
const copies={
 en:{subject:'Reservation request received',intro:'Alsama Tours has received your reservation request.',ref:'Reference',services:'Requested services',total:'Estimated total (USD)',note:'This is not a confirmed or paid booking. Our team will verify availability and contact you. If you did not make this request, please ignore this email.',categories:{tours:'Tour',shuttles:'Shared shuttle',private:'Private transfer',hotels:'Hotel',cars:'Car rental',promotion:'Special offer'}},
 es:{subject:'Solicitud de reserva recibida',intro:'Alsama Tours ha recibido tu solicitud de reserva.',ref:'Referencia',services:'Servicios solicitados',total:'Total estimado (USD)',note:'Esta no es una reserva confirmada ni pagada. Nuestro equipo verificará disponibilidad y te contactará. Si no realizaste esta solicitud, ignora este correo.',categories:{tours:'Tour',shuttles:'Shuttle compartido',private:'Traslado privado',hotels:'Hotel',cars:'Alquiler de vehículo',promotion:'Oferta especial'}},
 fr:{subject:'Demande de réservation reçue',intro:'Alsama Tours a reçu votre demande de réservation.',ref:'Référence',services:'Services demandés',total:'Total estimé (USD)',note:'Cette réservation n’est ni confirmée ni payée. Notre équipe vérifiera la disponibilité et vous contactera. Si vous n’avez pas effectué cette demande, ignorez ce message.',categories:{tours:'Excursion',shuttles:'Navette partagée',private:'Transfert privé',hotels:'Hôtel',cars:'Location de voiture',promotion:'Offre spéciale'}}
};
async function sendNotice(env,row,audience){
 const recipient=audience==='staff'?STAFF:row.email.toLowerCase();
 // Atomic admission caps limit abuse of the public intake: at most 80 notifications/day, 2 customer receipts per address/day.
 const admission=await env.DB.prepare("INSERT INTO reservation_email_outbox(reference,audience,recipient) SELECT ?,?,? WHERE (SELECT COUNT(*) FROM reservation_email_outbox WHERE created_at>=datetime('now','-1 day'))<80 AND (?='staff' OR (SELECT COUNT(*) FROM reservation_email_outbox WHERE audience='customer' AND recipient=? AND created_at>=datetime('now','-1 day'))<2) ON CONFLICT(reference,audience) DO NOTHING").bind(row.reference,audience,recipient,audience,recipient).run();
 const job=await env.DB.prepare("SELECT * FROM reservation_email_outbox WHERE reference=? AND audience=?").bind(row.reference,audience).first();
 if(!job)return 'limited';
 if(job.status==='accepted')return 'accepted';
 if(job.status==='failed'||job.attempts>=3)return 'failed';
 const claim=await env.DB.prepare("UPDATE reservation_email_outbox SET status='sending',attempts=attempts+1,lease_until=datetime('now','+2 minutes') WHERE reference=? AND audience=? AND status IN ('pending','retry','sending') AND (lease_until IS NULL OR lease_until<datetime('now')) AND created_at>=datetime('now','-23 hours') AND attempts<3").bind(row.reference,audience).run();
 if(!claim.meta.changes)return 'pending';
 const items=JSON.parse(row.items_json),estimate=JSON.parse(row.estimate_json),c=copies[row.language]||copies.en;
 const safeTotal=/^\$[0-9,]+\.\d{2}$/.test(estimate.total)?estimate.total:'—';
 const body=audience==='staff'?{
  subject:'Nueva solicitud de reserva | '+row.reference,
  text:['Referencia: '+row.reference,'Cliente: '+row.full_name,'Correo: '+row.email,'Teléfono: '+row.phone,'WhatsApp: '+(row.whatsapp?'Sí':'No'),'Asistencia de recepción: '+(row.reception_assisted?'Sí':'No'),'Recepcionista: '+(row.receptionist_name||'No aplica'),'Descuento nacional solicitado: '+(row.national_discount_requested?'Sí':'No'),'Idioma: '+row.language,'Servicios:',JSON.stringify(items,null,2),'Estimación no verificada:',JSON.stringify(estimate,null,2),'Pendiente de confirmar disponibilidad y precio.'].join('\n'),
  reply_to:row.email
 }:{
  subject:c.subject+' | '+row.reference,
  text:[c.intro,'',c.ref+': '+row.reference,c.services+':',...items.map(i=>'- '+c.categories[i.category]+' | '+i.date),c.total+': '+safeTotal,'',c.note,'','Alsama Tours | info@alsamatourscr.com'].join('\n'),
  reply_to:STAFF
 };
 let status='retry',error='network',providerId=null;
 try{
  const resp=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'alsama/'+row.reference+'/'+audience},body:JSON.stringify({from:env.RESEND_FROM||FROM,to:[recipient],...body}),signal:AbortSignal.timeout(10000)});
  if(resp.ok){const result=await resp.json();if(typeof result.id==='string'){status='accepted';providerId=result.id;error=null}else error='invalid_response'}
  else{error='http_'+resp.status;if(resp.status>=400&&resp.status<500&&![409,429].includes(resp.status))status='failed'}
 }catch{}
 await env.DB.prepare("UPDATE reservation_email_outbox SET status=?,provider_id=?,last_error=?,lease_until=NULL WHERE reference=? AND audience=?").bind(status,providerId,error,row.reference,audience).run();
 return status;
}
async function notify(env,ref){
 if(!env.RESEND_API_KEY){await env.DB.prepare("UPDATE reservations SET notification_status='not_configured' WHERE reference=? AND notification_status IN ('pending','not_configured')").bind(ref).run();return}
 const row=await env.DB.prepare('SELECT * FROM reservations WHERE reference=?').bind(ref).first();if(!row)return;
 const staff=await sendNotice(env,row,'staff');
 // Customer message uses only fixed text, validated dates, category names and numeric totals; no arbitrary customer-controlled text or links.
 const customer=await sendNotice(env,row,'customer');
 await env.DB.prepare('UPDATE reservations SET notification_status=? WHERE reference=?').bind(staff==='accepted'&&customer==='accepted'?'accepted':staff==='accepted'||customer==='accepted'?'partial':staff==='limited'||customer==='limited'?'limited':'pending',ref).run();
}
export default {async fetch(req,env,ctx){
 const path=new URL(req.url).pathname;
 if(req.method==='OPTIONS')return response({});
 if(path==='/health'&&req.method==='GET'){try{await env.DB.prepare('SELECT 1').first();return response({ok:true,service:'alsama-reservations'})}catch{return response({ok:false},503)}}
 if(path!=='/reservations'||req.method!=='POST')return response({success:false,code:'NOT_FOUND'},404);
 try{
 if(!req.headers.get('content-type')?.includes('application/json'))return response({success:false,code:'INVALID'},415);
 if(Number(req.headers.get('content-length')||0)>64000)return response({success:false,code:'INVALID'},413);
 const reader=req.body?.getReader();if(!reader)return response({success:false,code:'INVALID'},400);
 const decoder=new TextDecoder();let body='',size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>64000){await reader.cancel();return response({success:false,code:'INVALID'},413)}body+=decoder.decode(value,{stream:true})}body+=decoder.decode();
 let p;try{p=JSON.parse(body)}catch{return response({success:false,code:'INVALID'},400)}
 const ref=clean(p.request_reference,40),name=clean(p.full_name,120),email=clean(p.email,160),phone=clean(p.phone,40),staff=clean(p.receptionist_name,120),lang=p.language;
 if(!/^KIOSK-[A-F0-9-]{12}$/.test(ref)||!name||! /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(email)||!phone||p.consent!=='Yes'||!['en','es','fr'].includes(lang)||!['yes','no'].includes(p.whatsapp_on_this_number)||!['yes','no'].includes(p.reception_assisted)||!['yes','no'].includes(p.costa_rican_national)||(p.reception_assisted==='yes'&&!staff))return response({success:false,code:'INVALID'},400);
 let items;try{items=p.selected_items.split('\n').map(s=>JSON.parse(s))}catch{return response({success:false,code:'INVALID'},400)}
 if(!items.length||items.length>30||items.some(x=>!x||!clean(x.service,200)||!['tours','shuttles','private','hotels','cars','promotion'].includes(x.category)||!/^\d{4}-\d{2}-\d{2}$/.test(x.date)))return response({success:false,code:'INVALID'},400);
 const estimate={subtotal:clean(p.subtotal,40),discount:clean(p.national_discount_amount,40),fees:clean(p.taxes_and_platform_15_5_percent,40),total:clean(p.estimated_total,40),pending:p.pending_prices==='Yes',verified:false};
 const normalized=[ref,lang,name,email,phone,p.whatsapp_on_this_number==='yes'?1:0,p.reception_assisted==='yes'?1:0,p.reception_assisted==='yes'?staff:null,p.costa_rican_national==='yes'?1:0,JSON.stringify(items),JSON.stringify(estimate)];
 const hash=await digest(JSON.stringify(normalized));
 const existing=await env.DB.prepare('SELECT payload_hash FROM reservations WHERE reference=?').bind(ref).first();
 if(existing){if(existing.payload_hash!==hash)return response({success:false,code:'CONFLICT'},409);ctx.waitUntil(notify(env,ref).catch(()=>{}));return response({success:true,reference:ref,status:'pending',duplicate:true})}
 const source=await digest((req.headers.get('CF-Connecting-IP')||'unknown')+'|'+new Date().toISOString().slice(0,10));
 const result=await env.DB.prepare("INSERT INTO reservations(reference,language,full_name,email,phone,whatsapp,reception_assisted,receptionist_name,national_discount_requested,items_json,estimate_json,payload_hash,source_hash) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM reservations WHERE source_hash=? AND created_at>=datetime('now','-1 hour'))<60 ON CONFLICT(reference) DO NOTHING").bind(...normalized,hash,source,source).run();
 if(result.meta.changes===1){ctx.waitUntil(notify(env,ref).catch(()=>{}));return response({success:true,reference:ref,status:'pending'},201)}
 const saved=await env.DB.prepare('SELECT payload_hash FROM reservations WHERE reference=?').bind(ref).first();
 if(saved){if(saved.payload_hash!==hash)return response({success:false,code:'CONFLICT'},409);ctx.waitUntil(notify(env,ref).catch(()=>{}));return response({success:true,reference:ref,status:'pending',duplicate:true})}
 return response({success:false,code:'RATE_LIMIT'},429);
 }catch{return response({success:false,code:'SERVER'},500)}
}};