const NAV=[["dashboard","📊","Dashboard"],["rooms","🏫","Rooms"],["devices","📡","Devices"],["incidents","🛠","Incidents"],["analytics","🧠","Analytics"],["settings","⚙️","Settings"]];
const PAGE=document.body.dataset.page;
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function user(){return loadData("user",null)}
// Уровень параметра по порогам из задания
function levelOf(k,v,room){
 if(k==="temperature")return v>=32?"critical":(v>=28||v<18)?"warning":"normal";
 if(k==="co2")return v>=1500?"critical":v>=1000?"warning":"normal";
 if(k==="energy"){const x=v/room.baseline;return x>=1.6?"critical":x>=1.3?"warning":"normal"}
}
function roomStatus(r){const l=[levelOf("temperature",r.temperature),levelOf("co2",r.co2),levelOf("energy",r.energy,r)];
 return l.includes("critical")?"critical":l.includes("warning")?"warning":"normal"}
function getAlerts(){
 const a=[];
 loadData("rooms").forEach(r=>{
  const t=levelOf("temperature",r.temperature),c=levelOf("co2",r.co2),e=levelOf("energy",r.energy,r);
  if(c!=="normal")a.push({level:c,text:`${r.id}: высокий CO₂ ${r.co2} ppm`});
  if(t!=="normal")a.push({level:t,text:`${r.id}: температура ${r.temperature} °C`});
  if(e!=="normal")a.push({level:e,text:`${r.id}: перерасход энергии ${r.energy} kWh (норма ${r.baseline})`});
 });
 loadData("devices").filter(d=>d.status==="offline").forEach(d=>a.push({level:"warning",text:`${d.id}: датчик offline`}));
 return a;
}
function theme(){document.body.classList.toggle("light",localStorage.getItem("theme")==="light")}
function toggleTheme(){localStorage.setItem("theme",localStorage.getItem("theme")==="light"?"dark":"light");theme();location.reload()}
function qparam(){return new URLSearchParams(location.search).get("q")||""}
function badge(s){return `<span class="badge ${s}">${s}</span>`}
function buildLayout(){
 const c=document.getElementById("content"),u=user(),al=getAlerts();
 const w=document.createElement("div");w.className="layout";c.before(w);
 w.innerHTML=`<aside class="sidebar"><div class="brand">🏫 ${esc(localStorage.getItem("campusName")||"Smart Campus AI")}</div>`+
  NAV.map(n=>`<a href="${n[0]}.html" class="${n[0]===PAGE?"active":""}">${n[1]} ${n[2]}</a>`).join("")+
  `</aside><div class="main"><header class="topbar"><input id="gsearch" placeholder="Поиск аудитории и Enter..." value="${esc(qparam())}">
  <span class="spacer"></span><button class="ghost bell" id="bell">🔔<b>${al.length}</b></button>
  <button class="ghost" id="themeBtn">🌓</button><span>👤 ${esc(u.name)} (${u.role})</span><button class="ghost" id="logout">Выйти</button></header></div>
  <div id="notif">${al.length?al.map(x=>`<div>${badge(x.level)} ${esc(x.text)}</div>`).join(""):"Уведомлений нет"}</div>`;
 w.querySelector(".main").appendChild(c);
 document.getElementById("bell").onclick=()=>{const n=document.getElementById("notif");n.style.display=n.style.display==="block"?"none":"block"};
 document.getElementById("themeBtn").onclick=toggleTheme;
 document.getElementById("logout").onclick=()=>{localStorage.removeItem("user");location.href="index.html"};
 document.getElementById("gsearch").onkeydown=e=>{if(e.key==="Enter")location.href="rooms.html?q="+encodeURIComponent(e.target.value)};
}
theme();initData();
if(PAGE!=="login"){if(!user())location.href="index.html";else buildLayout()}
if(window.Chart){Chart.defaults.color=getComputedStyle(document.body).getPropertyValue("--muted");Chart.defaults.borderColor=getComputedStyle(document.body).getPropertyValue("--line")}
