(()=>{"use strict";(async function(e){try{const t=await fetch("http://127.0.0.1:8000/api/joyas/usuario/"+e);if(!t.ok)throw new Error("No se pudo obtener las joyas");return await t.json()}catch(e){return!1}})(JSON.parse(sessionStorage.getItem("id-usuario"))).then((function(e){!function(e){var t=document.getElementById("tabla_joyas");console.log(e);for(let n=0;n<e[0].length;n++){console.log(e[0][n]);let a=document.createElement("tr"),o=document.createElement("td"),d=document.createElement("button");d.textContent="receta",d.setAttribute("id",e[0][n].id);let i=document.createElement("td"),r=document.createElement("button");r.textContent="Eliminar",r.setAttribute("id",e[0][n].id),r.style.backgroundColor=" red";let l=document.createElement("td"),c=document.createElement("span");c.textContent=e[0][n].id;let s=document.createElement("td"),u=document.createElement("span");u.textContent=e[0][n].nombre;let m=document.createElement("td"),p=document.createElement("span");p.textContent=e[0][n].foto,d.addEventListener("click",(function(e){sessionStorage.setItem("joya-guardada",JSON.parse(d.id)),window.location.href="./receta-joya.html"})),r.addEventListener("click",(function(t){sessionStorage.setItem("joya-guardada",JSON.parse(d.id)),confirm("¿Estas seguro que deseas eliminar esta joya? ")&&eliminarJoya(e[0][n].id).then((function(){window.location.href="./listaJoyasUsuario.html"}))})),l.appendChild(c),s.appendChild(u),m.appendChild(p),o.appendChild(d),i.appendChild(r),a.appendChild(l),a.appendChild(s),a.appendChild(m),a.appendChild(o),a.appendChild(i),t.appendChild(a)}}(e)}))})();