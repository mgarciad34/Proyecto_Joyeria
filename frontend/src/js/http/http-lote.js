const apiUrl2='http://127.0.0.1:8000/api/consultar/tipos'
const apiUrlEnviar='http://127.0.0.1:8000/api/lote/clasificar/'

export async function guardarElementosBdd(elementos,idLote){
    let url=apiUrlEnviar+idLote
 
    const options={
        method: "POST",
        headers:{
            'Content-Type' : 'aplication/json'
      },
      body: JSON.stringify(elementos)
    }
    try {
       
        const response = await fetch(url,options);
       
        if (!response.ok) {
            throw new Error('No se pudo guardar la clasificacion');
        }

        const data = await response.json();
        
        return data
    } catch (error) {
        return error
    }
}

export async function obtenerTipos(){
    try {
                const response = await fetch(apiUrl2);
                if (!response.ok) {
                    throw new Error('No se pudo obtener las categorias');
                }
        
                const data = await response.json();
                
                return data
            } catch (error) {
                return error
            }
}