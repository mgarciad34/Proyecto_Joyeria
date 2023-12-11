// Manuel
export async function obtenerDatos(id) {
    try {
        let token = sessionStorage.getItem('token');
        let url = `http://127.0.0.1:8000/api/lotes/entregados/${id}/`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        if (!response.ok) {
            if (response.status === 202) {
                return 202;
            } else {
                throw new Error(`Error de red: ${response.status}`);
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message.includes('Error de red: 302')) {
            return 302;
        } else {
            console.error('Error en la solicitud:', error);
            throw error;
        }
    }
}
