export class API {
  static API_URL = '/api';
  static fetcher = async (method: string, route: string, body?: Object) => {
    return fetch(`${API.API_URL}${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };
  static atlas = {
    send: async (passkey: string, message: string, selectedModel?: string) => {
      const response = await API.fetcher(
        'POST',
        `/atlas_assistant/send/${selectedModel || ''}`,
        {passkey, message},
      );
      return {success: response.status == 200, response: await response.json()};
    },
    getModels: async (passkey: string) => {
      const response = await API.fetcher('GET', '/atlas_assistant/models');
      return {success: response.status == 200, response: await response.json()};
    },
  };
}
