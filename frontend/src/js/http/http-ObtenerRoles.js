//Manuel
export async function obtenerRoles(id) {
    try {
        let token = sessionStorage.getItem('token')
        let url = `http://127.0.0.1:8000/api/roles/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            throw new Error(`Este usuario no tiene ningun rol asignado`);
        }

        if (response.status === 202) {
            return 202;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return 302;
    }
}
