const rooms=loadData("rooms"),devices=loadData("devices"),incidents=loadData("incidents"),alerts=getAlerts();
const online=devices.filter(d=>d.status==="online").length;
const energy=rooms.reduce((s,r)=>s+r.energy,0).toFixed(1);
const kpi=[["Помещений",rooms.length],["Устройств online",`${online}/${devices.length}`],["Открытых инцидентов",incidents.filter(i=>i.status!=="done").length],["Нагрузка, kWh",energy],["Предупреждений",alerts.length],["Критических помещений",rooms.filter(r=>roomStatus(r)==="critical").length]];
document.getElementById("app").innerHTML=`<div class="grid kpis">${kpi.map(k=>`<div class="card kpi"><div class="l">${k[0]}</div><div class="v">${k[1]}</div></div>`).join("")}</div>
<div class="grid charts"><div class="card"><h2>Энергия по корпусам</h2><canvas id="c1"></canvas></div>
<div class="card"><h2>Температура по помещениям</h2><canvas id="c2"></canvas></div>
<div class="card"><h2>Статус устройств</h2><canvas id="c3"></canvas></div></div>`;
const blds=[...new Set(rooms.map(r=>r.building))];
new Chart(c1,{type:"bar",data:{labels:blds,datasets:[{label:"kWh",data:blds.map(b=>+rooms.filter(r=>r.building===b).reduce((s,r)=>s+r.energy,0).toFixed(1)),backgroundColor:"#38bdf8"}]}});
new Chart(c2,{type:"line",data:{labels:rooms.map(r=>r.id),datasets:[{label:"°C",data:rooms.map(r=>r.temperature),borderColor:"#f59e0b",tension:.3}]}});
new Chart(c3,{type:"doughnut",data:{labels:["online","offline"],datasets:[{data:[online,devices.length-online],backgroundColor:["#22c55e","#ef4444"]}]}});
