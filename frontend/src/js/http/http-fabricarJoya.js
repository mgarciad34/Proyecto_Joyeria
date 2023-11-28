
export async function obtenerJoyas() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/joyas/disponibles/lista');
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
    let json={}
    json['id_usuario']=id_usuario

    try {
        let url = 'http://127.0.0.1:8000/api/joyas/fabricar/'+joya
        const options = {
            method: "PUT",
            headers: {
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
