(()=>{"use strict";let e=JSON.parse(sessionStorage.getItem("lote-a-clasificar")),t=document.getElementById("cabecera"),n=document.getElementById("tabla-input"),o=document.getElementById("btnAddElement"),a=document.getElementById("btn-guardar"),i=sessionStorage.getItem("id-usuario");a.disabled=!0,null==e?(n.style.display="none",t.textContent="No se ha cargado ningun lote"):(t.textContent="Clasificar elementos Lote Nº: "+e,async function(){try{const e=await fetch("http://127.0.0.1:8000/api/consultar/tipos");if(!e.ok)throw new Error("No se pudo obtener las categorias");return await e.json()}catch(e){return e}}().then((function(e){let t=document.getElementById("tipos-habilitados");console.log(e);for(let n=0;n<e.tipos.length;n++){const o=document.createElement("option");o.value=e.tipos[n].id,o.textContent=o.value+". "+e.tipos[n].nombre,t.appendChild(o)}}))),o.addEventListener("click",(function(){let e=document.getElementById("tipos-habilitados").value,t=document.getElementById("inputDescripcion").value,n=document.getElementById("inputCantidad").value,o=[!0],i="";if(""==n&&(i+=" Debe introducir una cantidad \n",o.push(!1)),""==t&&(i+=" Debe introducir una descripcion \n",o.push(!1)),0==e&&(i+=" Debe introducir elegir un tipo \n",o.push(!1)),o.includes(!1))alert(i);else{let e=document.getElementById("elementos-registrados"),o=document.createElement("tr"),i=document.createElement("td"),l=document.createElement("span");l.textContent=t;let d=document.createElement("td"),c=document.createElement("span");c.textContent=n;let s=document.createElement("td"),r=document.getElementById("tipos-habilitados"),u=r.selectedIndex,p=r.options[u].textContent,m=document.createElement("span");m.textContent=p,i.appendChild(l),d.appendChild(c),s.appendChild(m),o.appendChild(i),o.appendChild(d),o.appendChild(s),e.appendChild(o),a.disabled=!1}})),a.addEventListener("click",(function(){let t=document.getElementById("elementos-registrados"),n={lista:[]};for(let e=0;e<t.rows.length;e++){let o=t.rows[e],a=o.cells[0].textContent,i=o.cells[1].textContent,l=o.cells[2].textContent,d={};d.descripcion=a,d.cantidad=i,d.tipo=l.split(".")[0],n.lista.push(d)}console.log("hola"),n.usuario=i,async function(e,t){let n="http://127.0.0.1:8000/api/lote/clasificar/"+t;const o={method:"POST",headers:{"Content-Type":"aplication/json"},body:JSON.stringify(e)};try{const e=await fetch(n,o);if(!e.ok)throw new Error("No se pudo guardar la clasificacion");return await e.json()}catch(e){return e}}(n,e).then((function(e){alert("guardado correctamente"),sessionStorage.removeItem("lote-a-clasificar"),window.location.href="./indexClasificador.html"}))}))})();