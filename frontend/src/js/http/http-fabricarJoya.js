
export async function obtenerJoyas() {
    try {
        let token=sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'aplication/json'
            },
            
        }
        const response = await fetch('http://127.0.0.1:8000/api/joyas/disponibles/lista',options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}




export async function fabricarJoya(joya,id_usuario) {
    try {
    let json={}
    json['id_usuario']=id_usuario
    let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/joyas/fabricar/'+joya
        const options = {
            method: "PUT",
            headers: {
               "Authorization" : "Bearer "+token,
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(json)
        }
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error('No se pudo fabricar la joya');
        }

        const data = await response.json();

        return data
    } catch (error) {
        return error
    }
}
