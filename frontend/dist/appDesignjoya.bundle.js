(()=>{"use strict";let e=document.getElementById("btnNuevoElementoReceta"),t=document.getElementById("inputNombre"),n=document.getElementById("inputFoto"),d=document.getElementById("btn-guardar"),o=JSON.parse(sessionStorage.getItem("id-usuario"));function l(e){let t=!1;return""==document.getElementById(e).value&&(t=!0),t}function i(e){let t=!0;return e.children.length>0&&(t=!1),t}e.disabled=!0,d.disabled=!0,async function(){try{const e="http://127.0.0.1:8000/api/consultar/tipos",t=await fetch(e);if(!t.ok)throw new Error("No se pudo obtener las categorias");return await t.json()}catch(e){return e}}().then((function(e){let t=document.getElementById("tipos-habilitados");console.log(e);for(let n=0;n<e.tipos.length;n++){const d=document.createElement("option");d.value=e.tipos[n].id,d.textContent=d.value+". "+e.tipos[n].nombre,t.appendChild(d)}})),t.addEventListener("input",(function(){l(t.id)?e.disabled=!0:e.disabled=!1,l(n.id)||l(t.id)?(e.disabled=!0,d.disabled=!0):i(document.getElementById("detalle-receta"))||(d.disabled=!1)})),n.addEventListener("input",(function(){l(n.id)?e.disabled=!0:e.disabled=!1,l(n.id)||l(t.id)?(e.disabled=!0,d.disabled=!0):i(document.getElementById("detalle-receta"))||(d.disabled=!1)})),d.addEventListener("click",(function(){let e=document.getElementById("detalle-receta"),d={};d.nombre=t.value,d.foto=n.value,d.id_usuario=o,d.detalle=[];for(let t=0;t<e.rows.length;t++){let n=e.rows[t],o=n.cells[1].textContent,l=n.cells[0].textContent,i={};i.cantidad=o,i.tipo=l.split(".")[0],d.detalle.push(i)}window.confirm("¿Estás seguro de que deseas guardar esta joya?")&&(console.log(JSON.stringify(d)),async function(e){try{let t="http://127.0.0.1:8000/api/joya/nueva";const n={method:"POST",headers:{"Content-Type":"aplication/json"},body:JSON.stringify(e)},d=await fetch(t,n);if(!d.ok)throw new Error("No se pudo obtener las categorias");return await d.json()}catch(e){return e}}(d).then((function(){document.getElementById("inputNombre").value="",document.getElementById("inputFoto").value="",window.location.href="listaJoyas.html"})))})),e.addEventListener("click",(function(){let e=document.getElementById("tipos-habilitados").value,t=document.getElementById("inputCantidad").value,n=[!0],o="";if((""==t||t.includes("-")||"0"==t)&&(o+=" Debe introducir una cantidad \n",n.push(!1)),0==e&&(o+=" Debe introducir elegir un tipo \n",n.push(!1)),n.includes(!1))alert(o);else{let e=document.getElementById("detalle-receta"),n=document.createElement("tr"),o=document.createElement("td"),l=document.createElement("span");l.textContent=t;let i=document.createElement("td"),a=document.getElementById("tipos-habilitados"),s=a.selectedIndex,c=a.options[s].textContent;a.options[s].disabled=!0,document.getElementById("opcion-default").selected=!0;let u=document.createElement("span");u.textContent=c,i.appendChild(u),o.appendChild(l),n.appendChild(i),n.appendChild(o),e.appendChild(n),d.disabled=!1}}))})();