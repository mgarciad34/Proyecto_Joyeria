(()=>{"use strict";var e={574:(e,t,n)=>{async function a(e){try{const t=await fetch("http://127.0.0.1:8000/api/recetas/"+e);if(!t.ok)throw new Error("No se pudo obtener las joyas");return await t.json()}catch(e){return!1}}n.d(t,{S:()=>a})}},t={};function n(a){var d=t[a];if(void 0!==d)return d.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(574);let t=sessionStorage.getItem("joya-guardada"),a=document.getElementById("btnFabricar"),d=!0;(0,e.S)(t).then((function(e){!function(e){let t=document.getElementById("tabla_receta");for(let n=0;n<e.detalle.length;n++){console.log(e.detalle[n]);let o=document.createElement("tr"),l=document.createElement("td"),r=document.createElement("span");r.textContent=e.detalle[n].id_componente;let c=document.createElement("td"),i=document.createElement("span");i.textContent=e.detalle[n].tipo;let s=document.createElement("td"),p=document.createElement("span");p.textContent=e.detalle[n].cantidad_necesaria;let u=document.createElement("td"),m=document.createElement("span");m.textContent=e.detalle[n].cantidad_disponible,e.detalle[n].cantidad_disponible<e.detalle[n].cantidad_necesaria&&(m.style.color="red",d=!1,a.disabled=!0),l.appendChild(r),c.appendChild(i),s.appendChild(p),u.appendChild(m),o.appendChild(l),o.appendChild(c),o.appendChild(s),o.appendChild(u),t.appendChild(o)}}(e)})),a.addEventListener("click",(function(){d?confirm("¿Estás seguro de que deseas continuar?"):alert("Recursos insuficientes")}))})()})();