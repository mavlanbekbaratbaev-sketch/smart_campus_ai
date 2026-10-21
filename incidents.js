let list=loadData("incidents");const rooms=loadData("rooms");
const canDelete=user().role!=="Operator";
const STAT=["open","progress","done"];
document.getElementById("app").innerHTML=`<form class="card tools" id="f"><input id="title" placeholder="Название" required>
<select id="room">${rooms.map(r=>`<option>${r.id}</option>`).join("")}</select>
<select id="prio"><option>high</option><option>medium</option><option>low</option></select>
<input id="who" placeholder="Ответственный" required><input id="com" placeholder="Комментарий"><button>Добавить</button></form>
<div class="tools"><select id="fs"><option value="">Все статусы</option>${STAT.map(s=>`<option>${s}</option>`).join("")}</select></div>
<div class="card tablewrap"><table><thead><tr><th>#</th><th>Название</th><th>Помещение</th><th>Приоритет</th><th>Статус</th><th>Ответственный</th><th>Комментарий</th><th></th></tr></thead><tbody id="tb"></tbody></table></div>`;
function render(){
 tb.innerHTML=list.filter(i=>!fs.value||i.status===fs.value).map(i=>`<tr><td>${i.id}</td><td>${esc(i.title)}</td><td>${i.room}</td><td>${badge(i.priority)}</td>
 <td><select data-st="${i.id}">${STAT.map(s=>`<option ${s===i.status?"selected":""}>${s}</option>`).join("")}</select></td>
 <td>${esc(i.assignee)}</td><td>${esc(i.comment)}</td><td><button class="ghost" data-ed="${i.id}">✎</button> ${canDelete?`<button class="danger" data-del="${i.id}">✕</button>`:""}</td></tr>`).join("");
}
const save=()=>{saveData("incidents",list);render()};
f.onsubmit=e=>{e.preventDefault();list.push({id:Math.max(0,...list.map(i=>i.id))+1,title:title.value,room:room.value,priority:prio.value,status:"open",assignee:who.value,comment:com.value});f.reset();save()};
tb.onchange=e=>{if(e.target.dataset.st){list.find(i=>i.id==e.target.dataset.st).status=e.target.value;save()}};
tb.onclick=e=>{const d=e.target.dataset;
 if(d.del){list=list.filter(i=>i.id!=d.del);save()}
 if(d.ed){const i=list.find(x=>x.id==d.ed);const t=prompt("Название:",i.title);if(t===null)return;i.title=t||i.title;const c=prompt("Комментарий:",i.comment);if(c!==null)i.comment=c;save()}};
fs.onchange=render;render();
