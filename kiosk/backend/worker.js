const response=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
const digest=async x=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(x))),b=>b.toString(16).padStart(2,'0')).join('');
const clean=(v,n)=>typeof v==='string'?v.trim().slice(0,n):'';
export default {async fetch(req,env){
 const path=new URL(req.url).pathname;
 if(req.method==='OPTIONS')return response({},204===200?200:200);
 if(path==='/health'&&req.method==='GET'){try{await env.DB.prepare('SELECT 1').first();return response({ok:true,service:'alsama-reservations'})}catch{return response({ok:false},503)}}
 if(path!=='/reservations'||req.method!=='POST')return response({success:false,code:'NOT_FOUND'},404);
 try{
 if(!req.headers.get('content-type')?.includes('application/json'))return response({success:false,code:'INVALID'},415);
 if(Number(req.headers.get('content-length')||0)>64000)return response({success:false,code:'INVALID'},413);
 const reader=req.body?.getReader();if(!reader)return response({success:false,code:'INVALID'},400);
 const decoder=new TextDecoder();let body='',size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>64000){await reader.cancel();return response({success:false,code:'INVALID'},413)}body+=decoder.decode(value,{stream:true})}body+=decoder.decode();
 let p;try{p=JSON.parse(body)}catch{return response({success:false,code:'INVALID'},400)}
 const ref=clean(p.request_reference,40),name=clean(p.full_name,120),email=clean(p.email,160),phone=clean(p.phone,40),staff=clean(p.receptionist_name,120),lang=p.language;
 if(!/^KIOSK-[A-F0-9-]{12}$/.test(ref)||!name||!/^\S+@\S+\.\S+$/.test(email)||!phone||p.consent!=='Yes'||!['en','es','fr'].includes(lang)||!['yes','no'].includes(p.whatsapp_on_this_number)||!['yes','no'].includes(p.reception_assisted)||!['yes','no'].includes(p.costa_rican_national)||(p.reception_assisted==='yes'&&!staff))return response({success:false,code:'INVALID'},400);
 let items;try{items=p.selected_items.split('\n').map(s=>JSON.parse(s))}catch{return response({success:false,code:'INVALID'},400)}
 if(!items.length||items.length>30||items.some(x=>!x||!clean(x.service,200)||!['tours','shuttles','private','hotels','cars','promotion'].includes(x.category)||!/^\d{4}-\d{2}-\d{2}$/.test(x.date)))return response({success:false,code:'INVALID'},400);
 const estimate={subtotal:clean(p.subtotal,40),discount:clean(p.national_discount_amount,40),fees:clean(p.taxes_and_platform_15_5_percent,40),total:clean(p.estimated_total,40),pending:p.pending_prices==='Yes',verified:false};
 const normalized=[ref,lang,name,email,phone,p.whatsapp_on_this_number==='yes'?1:0,p.reception_assisted==='yes'?1:0,p.reception_assisted==='yes'?staff:null,p.costa_rican_national==='yes'?1:0,JSON.stringify(items),JSON.stringify(estimate)];
 const hash=await digest(JSON.stringify(normalized));
 const existing=await env.DB.prepare('SELECT payload_hash FROM reservations WHERE reference=?').bind(ref).first();
 if(existing)return existing.payload_hash===hash?response({success:true,reference:ref,status:'pending',duplicate:true}):response({success:false,code:'CONFLICT'},409);
 const source=await digest((req.headers.get('CF-Connecting-IP')||'unknown')+'|'+new Date().toISOString().slice(0,10));
 const result=await env.DB.prepare("INSERT INTO reservations(reference,language,full_name,email,phone,whatsapp,reception_assisted,receptionist_name,national_discount_requested,items_json,estimate_json,payload_hash,source_hash) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM reservations WHERE source_hash=? AND created_at>=datetime('now','-1 hour'))<60 ON CONFLICT(reference) DO NOTHING").bind(...normalized,hash,source,source).run();
 if(result.meta.changes===1)return response({success:true,reference:ref,status:'pending'},201);
 const saved=await env.DB.prepare('SELECT payload_hash FROM reservations WHERE reference=?').bind(ref).first();
 if(saved)return saved.payload_hash===hash?response({success:true,reference:ref,status:'pending',duplicate:true}):response({success:false,code:'CONFLICT'},409);
 return response({success:false,code:'RATE_LIMIT'},429);
 }catch{return response({success:false,code:'SERVER'},500)}
}};