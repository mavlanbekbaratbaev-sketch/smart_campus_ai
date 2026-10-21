const admin=user().role==="Administrator";
document.getElementById("app").innerHTML=`<div class="card grid" style="max-width:480px"><h2>Параметры</h2>
<button id="th" class="ghost">🌓 Переключить светлую/тёмную тему</button>
<label>Название кампуса<br><input id="cn" value="${esc(localStorage.getItem("campusName")||"Smart Campus AI")}"></label>
<button id="sv">Сохранить название</button>
<button id="rs" class="danger" ${admin?"":"disabled"}>Сбросить тестовые данные ${admin?"":"(только Administrator)"}</button></div>`;
th.onclick=toggleTheme;
sv.onclick=()=>{localStorage.setItem("campusName",cn.value||"Smart Campus AI");location.reload()};
rs.onclick=()=>{if(confirm("Сбросить все данные к исходным?")){initData(true);location.reload()}};
