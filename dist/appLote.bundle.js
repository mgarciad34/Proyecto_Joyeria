(()=>{"use strict";var e={2:(e,t,n)=>{n.d(t,{I:()=>l,p:()=>i});const o="http://127.0.0.1:8000/api/consultar/tipos",a="http://127.0.0.1:8000/api/lote/clasificar/";async function i(e,t){let n=a+t;const o={method:"POST",headers:{"Content-Type":"aplication/json"},body:JSON.stringify(e)};try{const e=await fetch(n,o);if(!e.ok)throw new Error("No se pudo guardar la clasificacion");return await e.json()}catch(e){return e}}async function l(){try{const e=await fetch(o);if(!e.ok)throw new Error("No se pudo obtener las categorias");return await e.json()}catch(e){return e}}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(2);let t=JSON.parse(sessionStorage.getItem("lote-a-clasificar")),o=document.getElementById("cabecera"),a=document.getElementById("tabla-input"),i=document.getElementById("btnAddElement"),l=document.getElementById("btn-guardar");l.disabled=!0,console.log(t),console.log(t),null==t?(a.style.display="none",o.textContent="No se ha cargado ningun lote"):(o.textContent="Clasificar elementos Lote Nº: "+t,(0,e.I)().then((function(e){let t=document.getElementById("tipos-habilitados");console.log(e);for(let n=0;n<e.tipos.length;n++){const o=document.createElement("option");o.value=e.tipos[n].id,o.textContent=o.value+". "+e.tipos[n].nombre,t.appendChild(o)}}))),i.addEventListener("click",(function(){let e=document.getElementById("tipos-habilitados").value,t=document.getElementById("inputDescripcion").value,n=document.getElementById("inputCantidad").value,o=[!0],a="";if(""==n&&(a+=" Debe introducir una cantidad \n",o.push(!1)),""==t&&(a+=" Debe introducir una descripcion \n",o.push(!1)),0==e&&(a+=" Debe introducir elegir un tipo \n",o.push(!1)),o.includes(!1))alert(a);else{let e=document.getElementById("elementos-registrados"),o=document.createElement("tr"),a=document.createElement("td"),i=document.createElement("span");i.textContent=t;let d=document.createElement("td"),r=document.createElement("span");r.textContent=n;let c=document.createElement("td"),s=document.getElementById("tipos-habilitados"),p=s.selectedIndex,u=s.options[p].textContent,m=document.createElement("span");m.textContent=u,a.appendChild(i),d.appendChild(r),c.appendChild(m),o.appendChild(a),o.appendChild(d),o.appendChild(c),e.appendChild(o),l.disabled=!1}})),l.addEventListener("click",(function(){let n=document.getElementById("elementos-registrados"),o={lista:[]};for(let e=0;e<n.rows.length;e++){let t=n.rows[e],a=t.cells[0].textContent,i=t.cells[1].textContent,l=t.cells[2].textContent,d={};d.descripcion=a,d.cantidad=i,d.tipo=l.split(".")[0],o.lista.push(d)}(0,e.p)(o,t).then((function(e){alert("guardado correctamente"),sessionStorage.removeItem("lote-a-clasificar"),window.location.href="./indexClasificador.html"}))}))})()})();