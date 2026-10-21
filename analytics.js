// ---- Статистика из методички ----
function mean(v){return v.reduce((a,b)=>a+b,0)/v.length}
function stdDev(v){const m=mean(v);return Math.sqrt(v.reduce((s,x)=>s+(x-m)**2,0)/v.length)}
function zScore(v,cur){const sd=stdDev(v);return sd===0?0:Math.abs((cur-mean(v))/sd)}
// ---- Rule-based рекомендации ----
function getRecommendation(r){
 if(r.co2>=1500)return "Критический CO₂: включить вентиляцию и проверить аудиторию.";
 if(r.temperature>=32)return "Перегрев: проверить кондиционер или систему вентиляции.";
 if(r.occupancy===0&&r.energy>4)return "В помещении нет людей, но энергопотребление высокое: проверить свет и технику.";
 if(r.co2>=1000)return "CO₂ повышен: проветрить помещение.";
 if(r.temperature>=28)return "Температура выше нормы: проверить климат-контроль.";
 if(r.energy>r.baseline*1.3)return "Перерасход энергии: найти оборудование, которое осталось включённым.";
 return "Параметры в норме, но значение резко отличается от обычного — понаблюдать.";
}
function detect(){
 const out=[];const RISK={critical:"Высокий",warning:"Средний",normal:"Низкий"};
 loadData("rooms").forEach(r=>{
  [["temperature","Температура","°C",r.hist.t],["co2","CO₂","ppm",r.hist.c],["energy","Энергия","kWh",null]].forEach(([k,n,u,h])=>{
   const v=r[k],lvl=levelOf(k,v,r),z=h?zScore(h,v):0,reasons=[];
   if(lvl!=="normal")reasons.push("превышен порог");
   if(z>2)reasons.push(`z-score ${z.toFixed(1)} > 2`);
   if(!reasons.length)return;
   let risk=lvl; if(lvl==="normal"&&z>3)risk="warning";
   out.push({room:r.id,param:n,value:`${v} ${u}`,reason:reasons.join(", "),risk,rec:getRecommendation(r),z});
  });
 });
 return out.sort((a,b)=>["critical","warning","normal"].indexOf(a.risk)-["critical","warning","normal"].indexOf(b.risk));
}
function show(){
 const an=detect(),rooms=loadData("rooms");
 document.getElementById("app").innerHTML=`<div class="tools"><button id="sim">🔄 Симулировать новые показания</button><span style="color:var(--muted);align-self:center">Найдено аномалий: ${an.length}</span></div>
 <div class="card tablewrap"><h2>Аномалии и рекомендации</h2><table><thead><tr><th>Помещение</th><th>Параметр</th><th>Значение</th><th>Причина</th><th>Риск</th><th>Рекомендация</th></tr></thead><tbody>
 ${an.map(a=>`<tr><td>${a.room}</td><td>${a.param}</td><td>${a.value}</td><td>${a.reason}</td><td>${badge(a.risk)}</td><td class="rec">${a.rec}</td></tr>`).join("")||"<tr><td colspan=6>Аномалий нет ✅</td></tr>"}</tbody></table></div>
 <div class="grid charts" style="margin-top:16px"><div class="card"><h2>CO₂ по помещениям (порог 1000 ppm)</h2><canvas id="a1"></canvas></div>
 <div class="card"><h2>Z-score температуры (порог 2)</h2><canvas id="a2"></canvas></div></div>`;
 new Chart(a1,{type:"bar",data:{labels:rooms.map(r=>r.id),datasets:[{label:"ppm",data:rooms.map(r=>r.co2),backgroundColor:rooms.map(r=>r.co2>=1500?"#ef4444":r.co2>=1000?"#f59e0b":"#22c55e")}]}});
 new Chart(a2,{type:"bar",data:{labels:rooms.map(r=>r.id),datasets:[{label:"z",data:rooms.map(r=>+zScore(r.hist.t,r.temperature).toFixed(2)),backgroundColor:"#38bdf8"}]}});
 sim.onclick=()=>{simulateSensors();location.reload()};
}
show();
