const rooms=loadData("rooms");
const blds=[...new Set(rooms.map(r=>r.building))];
document.getElementById("app").innerHTML=`<div class="tools"><input id="q" placeholder="Поиск по аудитории/типу" value="${esc(qparam())}">
<select id="b"><option value="">Все корпуса</option>${blds.map(b=>`<option>${b}</option>`).join("")}</select>
<select id="s"><option value="">Все статусы</option><option>normal</option><option>warning</option><option>critical</option></select></div>
<div class="card tablewrap"><table><thead><tr><th>ID</th><th>Корпус</th><th>Этаж</th><th>Тип</th><th>°C</th><th>CO₂</th><th>kWh</th><th>Людей</th><th>Статус</th></tr></thead><tbody id="tb"></tbody></table></div>`;
function render(){
 const q=qv.value.toLowerCase();
 tb.innerHTML=rooms.filter(r=>(r.id+r.type).toLowerCase().includes(q)&&(!b.value||r.building===b.value)&&(!s.value||roomStatus(r)===s.value))
 .map(r=>`<tr><td>${r.id}</td><td>${r.building}</td><td>${r.floor}</td><td>${r.type}</td><td>${r.temperature}</td><td>${r.co2}</td><td>${r.energy}</td><td>${r.occupancy}</td><td>${badge(roomStatus(r))}</td></tr>`).join("")||"<tr><td colspan=9>Ничего не найдено</td></tr>";
}
const qv=document.getElementById("q");[qv,b,s].forEach(e=>e.oninput=render);render();
