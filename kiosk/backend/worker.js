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

const mailLabels={
 en:{heading:'Your next adventure starts here',status:'REQUEST RECEIVED',name:'Customer name',phone:'Phone number',email:'Email',details:'Reservation details',date:'Service date',price:'Estimated price',subtotal:'Subtotal',discount:'National discount',fees:'Taxes and platform (15.5%)',quote:'To be confirmed',pending:'Services with prices to be confirmed are excluded from the estimated total.',contact:'Need help with your reservation?',contactIntro:'Our team is here to help you plan your trip.',website:'Visit our website',whatsapp:'Contact us on WhatsApp',adults:'Adults',children:'Children'},
 es:{heading:'Tu próxima aventura comienza aquí',status:'SOLICITUD RECIBIDA',name:'Nombre del cliente',phone:'Número de teléfono',email:'Correo electrónico',details:'Detalles de la reserva',date:'Fecha del servicio',price:'Precio estimado',subtotal:'Subtotal',discount:'Descuento nacional',fees:'Impuestos y plataforma (15,5 %)',quote:'Por confirmar',pending:'Los servicios con precio por confirmar no están incluidos en el total estimado.',contact:'¿Necesitas ayuda con tu reserva?',contactIntro:'Nuestro equipo está para ayudarte a planificar tu viaje.',website:'Visita nuestro sitio web',whatsapp:'Contáctanos por WhatsApp',adults:'Adultos',children:'Niños'},
 fr:{heading:'Votre prochaine aventure commence ici',status:'DEMANDE REÇUE',name:'Nom du client',phone:'Numéro de téléphone',email:'E-mail',details:'Détails de la réservation',date:'Date du service',price:'Prix estimé',subtotal:'Sous-total',discount:'Réduction nationale',fees:'Taxes et plateforme (15,5 %)',quote:'À confirmer',pending:'Les services dont le tarif reste à confirmer ne sont pas inclus dans le total estimé.',contact:'Besoin d’aide pour votre réservation ?',contactIntro:'Notre équipe est là pour vous aider à préparer votre voyage.',website:'Visitez notre site',whatsapp:'Contactez-nous sur WhatsApp',adults:'Adultes',children:'Enfants'}
};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labelText=(v,max=160)=>String(v??'').normalize('NFC').replace(/[^\p{L}\p{M}\p{N} \-–—'’&(),/]/gu,' ').replace(/\s+/g,' ').trim().slice(0,max);
const phoneText=v=>String(v??'').replace(/[^0-9+() -]/g,'').slice(0,40);
const asDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')?v:'—';
const asCount=v=>/^\d{1,3}$/.test(String(v??''))?String(v):'—';
function usd(value,lang,unknown){
 const n=typeof value==='number'?value:typeof value==='string'&&/^\$[0-9,]+\.\d{2}$/.test(value)?Number(value.replace(/[$,]/g,'')):NaN;
 return Number.isFinite(n)&&n>=0&&n<=100000000?new Intl.NumberFormat({en:'en-US',es:'es-CR',fr:'fr-FR'}[lang]||'en-US',{style:'currency',currency:'USD',currencyDisplay:'code'}).format(n):unknown;
}
function makeMail(row,items,estimate,audience){
 const staff=audience==='staff',lang=staff?'es':(copies[row.language]?row.language:'en'),c=copies[lang],l=mailLabels[lang];
 const name=staff?row.full_name:labelText(row.full_name),phone=staff?row.phone:phoneText(row.phone);
 const reference=row.reference;
 const heading=staff?'Nueva solicitud de reserva':l.heading;
 const intro=staff?'Se ha registrado una nueva solicitud desde el kiosco de autoservicio. Revisa los datos y confirma disponibilidad y tarifas con el cliente.':c.intro;
 const yesno=v=>v?'Sí':'No';
 const format=v=>usd(v,lang,l.quote);
 const detailRows=[
 [c.ref,reference],[l.name,name],[l.phone,phone],
 ...(staff?[[l.email,row.email],['WhatsApp',yesno(row.whatsapp)],['Idioma del cliente',({en:'Inglés',es:'Español',fr:'Francés'})[row.language]||row.language],['Fecha de registro (UTC)',row.created_at],['Canal','SUNMI · Autoservicio']]:[])
 ];
 const rowHtml=(k,v)=>'<tr><td style="padding:7px 0;color:#64756d;font-size:13px;vertical-align:top;width:42%">'+esc(k)+'</td><td style="padding:7px 0;color:#163d32;font-weight:600;overflow-wrap:anywhere;vertical-align:top">'+esc(v||'—')+'</td></tr>';
 const box=(title,html)=>'<h2 style="margin:26px 0 12px;font-size:19px;color:#163d32">'+esc(title)+'</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce6df;border-radius:12px;background:#f7faf7"><tr><td style="padding:14px 18px">'+html+'</td></tr></table>';
 const fields=rows=>'<table role="presentation" width="100%" cellspacing="0" cellpadding="0">'+rows.map(([k,v])=>rowHtml(k,v)).join('')+'</table>';
 const itemRows=items.map((i,index)=>{
  const title=staff?i.service:labelText(i.service,200);
  const dates=asDate(i.date)+(['hotels','cars'].includes(i.category)&&i.end?' — '+asDate(i.end):'');
  const extra=[];
  if(i.category!=='cars'){extra.push([l.adults,asCount(i.adults)],[l.children,asCount(i.children)])}
  if(staff){
   for(const [k,v] of [['Hora preferida',i.time],['Recogida / hotel',i.pickup],['Destino / devolución',i.dropoff],['Habitación',i.room],['Cobertura',i.category==='cars'?({seguro_basico:'Seguro básico',full_cover:'Cobertura completa'}[i.coverage]||i.coverage):null],['Solicitudes adicionales',i.note]]) {
    if(v&& (k!=='Hora preferida'||['private','cars'].includes(i.category)))extra.push([k,String(v).slice(0,500)]);
   }
  }
  return {title,dates,extra,price:format(i.estimated_usd),category:c.categories[i.category]||'',index};
 });
 const cards=itemRows.map(i=>'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:12px;border:1px solid #dce6df;border-radius:12px"><tr><td style="padding:16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="color:#648076;font-size:12px;font-weight:bold;letter-spacing:1px">'+esc(String(i.index+1).padStart(2,'0')+' / '+i.category)+'</td><td align="right" style="font-size:11px;color:#64756d">'+esc(l.price)+'</td></tr><tr><td style="padding:7px 8px 10px 0;font-size:18px;font-weight:bold;color:#163d32;overflow-wrap:anywhere">'+esc(i.title||i.category)+'</td><td align="right" style="padding:7px 0 10px;font-weight:bold;font-size:17px;color:#205e4a;white-space:nowrap">'+esc(i.price)+'</td></tr></table><div style="border-top:1px solid #e3ebe5;padding-top:8px">'+fields([[l.date,i.dates],...i.extra])+'</div></td></tr></table>').join('');
 const totals=[[l.subtotal,format(estimate.subtotal)],[l.discount,format(estimate.discount)],[l.fees,format(estimate.fees)]];
 const reception=[['Asistencia de recepción',yesno(row.reception_assisted)],['Recepcionista',row.receptionist_name||'No aplica'],['Descuento nacional solicitado',yesno(row.national_discount_requested)]];
 const note=staff?'Solicitud pendiente de validación. Los precios provienen del kiosco y no han sido verificados por el servidor. No se ha efectuado ningún pago.':c.note;
 const contact='<h2 style="font-size:19px;color:#163d32;margin:0 0 8px">'+esc(l.contact)+'</h2><p style="margin:0 0 14px;color:#52665b">'+esc(l.contactIntro)+'</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:4px 0"><a style="color:#205e4a" href="mailto:info@alsamatourscr.com">info@alsamatourscr.com</a></td></tr><tr><td style="padding:4px 0"><a style="color:#205e4a" href="tel:+50661672539">+506 6167 2539</a></td></tr><tr><td style="padding:4px 0"><a style="color:#205e4a" href="https://alsamatourscr.com/">alsamatourscr.com</a></td></tr><tr><td style="padding:14px 0 0"><a href="https://wa.me/50661672539" style="display:inline-block;padding:13px 20px;background:#205e4a;color:#ffffff;font-weight:bold;text-decoration:none;border-radius:8px">'+esc(l.whatsapp)+'</a></td></tr></table><p style="margin:18px 0 0;font-size:13px"><a href="https://www.instagram.com/alsama_tours_cr/" style="color:#205e4a">Instagram</a> &nbsp;·&nbsp; <a href="https://www.facebook.com/AlsamaToursCR" style="color:#205e4a">Facebook</a></p>';
 const html='<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(heading)+'</title></head><body style="margin:0;padding:0;background:#edf2ed;font-family:Arial,Helvetica,sans-serif;color:#203e34;line-height:1.5"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#edf2ed"><tr><td align="center" style="padding:24px 10px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:660px;background:#ffffff;border:1px solid #dce6df;border-radius:18px;overflow:hidden"><tr><td style="background:#163d32;padding:32px 26px;color:#ffffff"><div style="font-size:26px;font-weight:bold;letter-spacing:4px">ALSAMA</div><div style="font-size:11px;color:#eac882;letter-spacing:3px">TOURS · COSTA RICA</div><div style="height:1px;background:#537468;margin:22px 0"></div><div style="color:#eac882;font-size:11px;letter-spacing:2px;font-weight:bold">'+esc(l.status)+'</div><h1 style="font-size:29px;line-height:1.2;color:#ffffff;margin:10px 0 12px">'+esc(heading)+'</h1><p style="color:#e7f1e9;font-size:15px;margin:0">'+esc(intro)+'</p></td></tr><tr><td style="padding:8px 24px 26px">'+box(l.details,fields(detailRows))+'<h2 style="font-size:19px;margin:26px 0 12px;color:#163d32">'+esc(c.services)+' ('+items.length+')</h2>'+cards+(staff?box('Recepción y descuento nacional',fields(reception)):'')+'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#e7f0e7;border-radius:12px;margin-top:22px"><tr><td style="padding:16px 18px">'+fields(totals)+'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #bdcec0;margin-top:10px"><tr><td style="padding-top:14px;font-size:15px;font-weight:bold">'+esc(c.total)+'</td><td align="right" style="padding-top:14px;font-size:23px;font-weight:bold;color:#163d32">'+esc(format(estimate.total))+'</td></tr></table>'+(estimate.pending?'<p style="font-size:13px;margin:10px 0 0;color:#51665b">'+esc(l.pending)+'</p>':'')+'</td></tr></table><p style="padding:12px 14px;border-left:3px solid #d4ab56;background:#fcf8ee;font-size:13px;color:#685529;margin:20px 0">'+esc(note)+'</p>'+(staff?'<p style="font-size:14px;color:#52665b">Responde a este correo para contactar directamente al cliente.</p>':contact)+'</td></tr><tr><td align="center" style="background:#163d32;color:#dfebe2;padding:18px;font-size:12px">ALSAMA TOURS · COSTA RICA</td></tr></table></td></tr></table></body></html>';
 const text=[heading,intro,'',...detailRows.map(([k,v])=>k+': '+v),'',c.services+':',...itemRows.flatMap(i=>[i.title+' | '+i.category+' | '+i.price,l.date+': '+i.dates,...i.extra.map(([k,v])=>k+': '+v),'']),...(staff?reception.map(([k,v])=>k+': '+v):[]),...totals.map(([k,v])=>k+': '+v),c.total+': '+format(estimate.total),...(estimate.pending?[l.pending]:[]),'',note,'',...(staff?['Responde a este correo para contactar al cliente.']:[l.contact,'info@alsamatourscr.com','+506 6167 2539','https://alsamatourscr.com/','https://wa.me/50661672539'])].join('\n');
 return {subject:(staff?'Nueva solicitud de reserva':c.subject)+' | '+reference,html,text,reply_to:staff?row.email:STAFF};
}

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
 const items=JSON.parse(row.items_json),estimate=JSON.parse(row.estimate_json);
 const body=makeMail(row,items,estimate,audience);
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
 // Customer receipts use escaped, restricted display fields and fixed contact links.
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