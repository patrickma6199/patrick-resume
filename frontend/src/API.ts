export class API {
  static API_URL = '/api/';
  static async sendTextToAtlas(passkey: string, message: string) {
    const response = await fetch(`${API.API_URL}atlas_assistant/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({passkey, message}),
    });
    return {success: response.status == 200, response: await response.json()};
  }
}
