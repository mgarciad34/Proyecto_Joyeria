(()=>{"use strict";async function e(e,t){let n={};n.id_usuario=t;try{let t="http://127.0.0.1:8000/api/joya/fabricar/"+e;const o={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)},a=await fetch(t,o);if(!a.ok)throw new Error("No se pudo fabricar la joya");return await a.json()}catch(e){return e}}let t=JSON.parse(sessionStorage.getItem("id-usuario"));(async function(){try{const e=await fetch("http://127.0.0.1:8000/api/joya/disponibles");if(!e.ok)throw new Error("No se pudo obtener las joyas");return await e.json()}catch(e){return!1}})().then((function(n){!function(n){var o=document.getElementById("tabla_joyas");console.log(n);for(let a=0;a<n[0].length;a++){let d=document.createElement("tr"),i=document.createElement("td"),r=document.createElement("button");r.textContent="Fabricar",r.setAttribute("id",n[0][a].id);let c=document.createElement("td"),l=document.createElement("span");l.textContent=n[0][a].id;let p=document.createElement("td"),s=document.createElement("span");s.textContent=n[0][a].nombre;let u=document.createElement("td"),m=document.createElement("span");m.textContent=n[0][a].foto;let h=document.createElement("td"),C=document.createElement("span");C.textContent=n[0][a].id_usuario,r.addEventListener("click",(function(n){e(r.id,t).then((function(){console.log("hola"),window.location.reload()}))})),c.appendChild(l),p.appendChild(s),u.appendChild(m),h.appendChild(C),i.appendChild(r),d.appendChild(c),d.appendChild(p),d.appendChild(u),d.appendChild(h),d.appendChild(i),o.appendChild(d)}}(n)}))})();