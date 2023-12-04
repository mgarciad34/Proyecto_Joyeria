const apiUrl2='http://127.0.0.1:8000/api/tipos'
const apiUrlEnviar='http://127.0.0.1:8000/api/despieces/lote/clasificar/'

export async function guardarElementosBdd(elementos,idLote){
    let url=apiUrlEnviar+idLote
    let token=sessionStorage.getItem('token')
    const options={
        method: "POST",
        headers:{
           "Authorization": "Bearer "+token,
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
        let token=sessionStorage.getItem('token')
        const options={
            method: "GET",
            headers:{
               "Authorization": "Bearer "+token,
                'Content-Type' : 'aplication/json'
          },
        }
                const response = await fetch(apiUrl2,options);
                if (!response.ok) {
                    throw new Error('No se pudo obtener las categorias');
                }
        
                const data = await response.json();
                
                return data
            } catch (error) {
                return error
            }
}