import {getAllTours,asset} from '../src/lib/site';
import {shuttleRoutes} from '../src/lib/shuttles';
import {privateTransportRoutes,getPrivateTransportPrice} from '../src/lib/privateTransportRates';
import {hotelZones} from '../src/lib/hotels';
import {rentACarRates,getRentalRateBreakdown} from '../src/lib/rentacarRates';
import {limitedPromotions,isPromotionActive,getPromotionCopy} from '../src/lib/promotions';
import {getTodayDateInputValue,getOneBusinessDayAdvanceDateInputValue} from '../src/lib/bookingDates';
const carFiles=['toyota-agya-auto.avif','suzuki-swift-dzire-auto.avif','VOLKSWAGEN-NIVUS.avif','toyota-corolla-auto.avif','Toyota-Yaris-Cross.avif','TOYOTA-COROLLA-CROSS.avif','SUZUKI-VITARA.avif','TOYOTA-RAV4.avif','TOYOTA-RUSH-4X2.avif','Ford-Broncos.avif','TOYOTA-BZ4X-4X4.avif','TOYOTA-HILUX.avif','TOYOTA-fortuner.avif','FORD-EVEREST.avif','TOYOTA-HIACE.avif','TOYOTA-HIACE.avif','HYUNDAI-STARIA.avif','FORD-EXPEDITION.avif'];
const bg=asset('img/hero/1.webp');
export const categories=['tours','shuttles','private','hotels','cars'];
export function catalog(lang){
 const tours=getAllTours().map(r=>({id:'tour-'+r.slug,kind:'tours',title:r.title,description:r.excerpt,image:r.image,images:r.gallery,group:r.originLabel,price:r.price,source:r}));
 const shuttles=shuttleRoutes.map(r=>({id:'shuttle-'+r.id,kind:'shuttles',title:r.service,description:r.summary,image:bg,group:r.region,price:r.price,source:r}));
 const transfers=privateTransportRoutes.map(r=>({id:'private-'+r.id,kind:'private',title:r.lugar,description:'',image:bg,group:r.base==='JACO'?'From Jaco':'From San Jose',price:r.pax_1_5,source:r}));
 const hotels=hotelZones.flatMap(z=>z.hotels.map((r,i)=>({id:'hotel-'+z.id+'-'+i,kind:'hotels',title:r.hotel,description:r.description,image:r.image,group:z.name,source:r})));
 const cars=rentACarRates.diario.map((r,i)=>({id:'car-'+i,kind:'cars',title:r.modelo,description:r.transmision||'',image:asset('img/Rent-a-car/'+carFiles[i]),group:r.categoria,price:r.seguro_basico,source:r}));
 const promos=limitedPromotions.filter(p=>isPromotionActive(p)).map(p=>{const c=getPromotionCopy(p,lang);return {id:'promotion-'+p.id,kind:'promotion',title:c.title,description:c.intro,image:asset(p.image),group:'Promotion',source:p,copy:c}});
 return [...tours,...shuttles,...transfers,...hotels,...cars,...promos];
}
export const minDate=kind=>['private','shuttles'].includes(kind)?getTodayDateInputValue():getOneBusinessDayAdvanceDateInputValue();
export function nextDay(value){const d=new Date(value+'T12:00:00');d.setDate(d.getDate()+1);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
export function defaultDetails(item){const date=minDate(item.kind);return {date,end:nextDay(date),adults:1,children:0,pickup:'',dropoff:'',time:'09:00',room:item.source.habitaciones?.[0]?.tipo||'',coverage:'seguro_basico',note:''}}
export function nights(a,b){return (Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000}
export function linePrice(item,d){
 const n=Number(d.adults)+Number(d.children);
 switch(item.kind){
 case 'tours':case 'shuttles':return Number.isFinite(item.price)?item.price*n:null;
 case 'private':return getPrivateTransportPrice(item.source,n)??null;
 case 'hotels':{const r=item.source.habitaciones.find(x=>x.tipo===d.room);const rate=r?.alta??r?.verde;return Number.isFinite(rate)?rate*nights(d.date,d.end):null}
 case 'cars':{const days=nights(d.date,d.end);const rates=getRentalRateBreakdown(item.source.categoria,item.source.transmision,d.coverage,days);return rates.total>0?rates.total:null}
 default:return null;
 }}
export function validDetails(item,d){return /^\d{4}-\d{2}-\d{2}$/.test(d.date)&&d.date>=minDate(item.kind)&&Number.isInteger(+d.adults)&&+d.adults>=1&&+d.adults<=99&&Number.isInteger(+d.children)&&+d.children>=0&&+d.children<=99&&(!['hotels','cars'].includes(item.kind)||(/^\d{4}-\d{2}-\d{2}$/.test(d.end)&&nights(d.date,d.end)>0))&&(!['private','shuttles','tours','cars'].includes(item.kind)||d.pickup.trim().length>0)&&(!['private','shuttles','cars'].includes(item.kind)||d.dropoff.trim().length>0)}
export function totals(lines,national=false){const subtotal=lines.reduce((s,l)=>s+(Number.isFinite(l.price)?l.price:0),0);const discount=national?subtotal*.1:0;const fees=(subtotal-discount)*.155;return {subtotal,discount,fees,total:subtotal-discount+fees,pending:lines.some(l=>!Number.isFinite(l.price))}}
