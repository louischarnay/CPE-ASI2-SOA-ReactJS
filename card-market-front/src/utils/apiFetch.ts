const BASE_API_URL = 'http://localhost:8080/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiFetch(endpoint: string, method: HttpMethod = 'GET', body?: object, headers = {}) {
    const url = `${BASE_API_URL}${endpoint}`;

    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}