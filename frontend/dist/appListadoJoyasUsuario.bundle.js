(()=>{"use strict";async function e(e){try{let t="http://127.0.0.1:8000/api/joyas/eliminar/"+e;const n={method:"DELETE",headers:{"Content-Type":"aplication/json"}},o=await fetch(t,n);if(!o.ok)throw new Error("No se pudo obtener las categorias");return await o.json()}catch(e){return e}}(async function(e){try{const t=await fetch("http://127.0.0.1:8000/api/joyas/usuario/"+e);if(!t.ok)throw new Error("No se pudo obtener las joyas");return await t.json()}catch(e){return!1}})(JSON.parse(sessionStorage.getItem("id-usuario"))).then((function(t){!function(t){var n=document.getElementById("tabla_joyas");console.log(t);for(let o=0;o<t[0].length;o++){console.log(t[0][o]);let a=document.createElement("tr"),d=document.createElement("td"),r=document.createElement("button");r.textContent="receta",r.setAttribute("id",t[0][o].id);let i=document.createElement("td"),c=document.createElement("button");c.textContent="Eliminar",c.setAttribute("id",t[0][o].id),c.style.backgroundColor=" red";let l=document.createElement("td"),s=document.createElement("button");s.textContent="Modificar",s.setAttribute("id",t[0][o].id),s.style.backgroundColor=" orange";let u=document.createElement("td"),m=document.createElement("span");m.textContent=t[0][o].id;let p=document.createElement("td"),h=document.createElement("span");h.textContent=t[0][o].nombre;let E=document.createElement("td"),C=document.createElement("span");C.textContent=t[0][o].foto,s.addEventListener("click",(function(){sessionStorage.setItem("joya-guardada",JSON.parse(s.id)),window.location.href="./modificarJoya.html"})),r.addEventListener("click",(function(e){sessionStorage.setItem("joya-guardada",JSON.parse(r.id)),window.location.href="./receta-joya.html"})),c.addEventListener("click",(function(n){confirm("¿Estas seguro que deseas eliminar esta joya? ")&&e(t[0][o].id).then()})),u.appendChild(m),p.appendChild(h),E.appendChild(C),d.appendChild(r),i.appendChild(c),l.appendChild(s),a.appendChild(u),a.appendChild(p),a.appendChild(E),a.appendChild(d),a.appendChild(i),a.appendChild(l),n.appendChild(a)}}(t)}))})();