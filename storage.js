function saveData(key,data){localStorage.setItem(key,JSON.stringify(data))}
function loadData(key,fallback=[]){const raw=localStorage.getItem(key);if(!raw)return fallback;try{return JSON.parse(raw)}catch{return fallback}}
function rnd(min,max){return +(Math.random()*(max-min)+min).toFixed(1)}
function nowStr(){const d=new Date(),p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`}
function buildDevices(rooms){
 const list=[];
 rooms.forEach(r=>{
  list.push({id:`TEMP-${r.id}-01`,room:r.id,type:"Temperature Sensor",value:r.temperature,unit:"°C"});
  list.push({id:`CO2-${r.id}-01`,room:r.id,type:"CO2 Sensor",value:r.co2,unit:"ppm"});
  if(["A-101","B-101","B-102","C-201"].includes(r.id))list.push({id:`ENRG-${r.id}-01`,room:r.id,type:"Energy Meter",value:r.energy,unit:"kWh"});
 });
 return list.map(d=>({...d,status:OFFLINE_SEED.includes(d.id)?"offline":"online",updatedAt:nowStr()}));
}
function initData(force=false){
 if(force||!localStorage.getItem("rooms")){
  // история из 12 значений вокруг "нормы" помещения (детерминированный шум)
  const rooms=ROOMS_SEED.map((r,i)=>({...r,hist:{
   t:Array.from({length:12},(_,k)=>+(r.tb+Math.sin(k*1.7+i)*0.6).toFixed(1)),
   c:Array.from({length:12},(_,k)=>Math.round(r.cb+Math.sin(k*2.3+i)*40))}}));
  saveData("rooms",rooms);saveData("devices",buildDevices(rooms));saveData("incidents",INCIDENTS_SEED);
 }
}
// Симуляция новых показаний: с шансом 12% случается скачок (аномалия)
function simulateSensors(){
 const rooms=loadData("rooms");
 rooms.forEach(r=>{
  r.hist.t.push(r.temperature);r.hist.t.shift();r.hist.c.push(r.co2);r.hist.c.shift();
  const spike=Math.random()<0.12;
  r.temperature=+(r.tb+rnd(-1,1)+(spike?rnd(5,9):0)).toFixed(1);
  r.co2=Math.round(r.cb+rnd(-60,60)+(spike?rnd(600,900):0));
  r.energy=+(r.baseline*rnd(0.9,1.15)*(Math.random()<0.1?1.8:1)).toFixed(1);
 });
 const devices=loadData("devices");
 devices.forEach(d=>{const r=rooms.find(x=>x.id===d.room);if(!r||d.status==="offline")return;
  d.value=d.type==="Temperature Sensor"?r.temperature:d.type==="CO2 Sensor"?r.co2:r.energy;d.updatedAt=nowStr();});
 saveData("rooms",rooms);saveData("devices",devices);
}
