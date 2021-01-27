export async function restRequest(url, data, method) {
    const response = await fetch(url,
        {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    return response.json();
}