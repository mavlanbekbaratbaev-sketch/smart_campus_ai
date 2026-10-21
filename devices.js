const devices=loadData("devices");
const types=[...new Set(devices.map(d=>d.type))];
document.getElementById("app").innerHTML=`<div class="tools"><input id="q" placeholder="Поиск по ID/помещению">
<select id="t"><option value="">Все типы</option>${types.map(x=>`<option>${x}</option>`).join("")}</select>
<select id="s"><option value="">Все статусы</option><option>online</option><option>offline</option></select></div>
<div class="card tablewrap"><table><thead><tr><th>Sensor ID</th><th>Помещение</th><th>Тип</th><th>Значение</th><th>Статус</th><th>Обновлено</th><th></th></tr></thead><tbody id="tb"></tbody></table></div>`;
function render(){
 const f=q.value.toLowerCase();
 tb.innerHTML=devices.filter(d=>(d.id+d.room).toLowerCase().includes(f)&&(!t.value||d.type===t.value)&&(!s.value||d.status===s.value))
 .map(d=>`<tr><td>${d.id}</td><td>${d.room}</td><td>${d.type}</td><td>${d.value} ${d.unit}</td><td>${badge(d.status)}</td><td>${d.updatedAt}</td><td><button class="ghost" data-id="${d.id}">Вкл/выкл</button></td></tr>`).join("");
}
tb.onclick=e=>{const id=e.target.dataset.id;if(!id)return;const d=devices.find(x=>x.id===id);d.status=d.status==="online"?"offline":"online";d.updatedAt=nowStr();saveData("devices",devices);location.reload()};
[q,t,s].forEach(e=>e.oninput=render);render();
