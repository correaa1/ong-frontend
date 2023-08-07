// api.js
const API_BASE_URL = 'http://localhost:8080/v1'; // Substitua pela URL da sua API REST

export async function fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();
    return data;
}

export async function fetchUserById(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
        throw new Error(console.log(response));
    }
    const data = await response.json();
    return data;
}