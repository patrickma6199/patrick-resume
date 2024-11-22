export class API {
    static API_URL = '/api/';
    static async sendTextToAtlas(message: string) {
        const response = await fetch(`${API.API_URL}atlas_assistant/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message}),
        });
        return response.json();
    }
}
