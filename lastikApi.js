import fetch from 'isomorphic-fetch';

export const host = 'https://aloparca.com';
export const imgHost = 'https://www.aloparca.com';
export const gaID = ''; // google analytics

const webApi = 'https://lastik.rezulteo.com.tr/api/tyres/dimensions?l=tr-TR';

class Api {
  static async response(endpoint, options, isHtml) {
    
    let headers = {};
    const store = typeof window !== 'undefined' && window.__NEXT_REDUX_STORE__;

    if (store) {
      const { token } = store.getState();
      if (token) headers = { ...headers, token };
    }

    const response = await fetch(webApi + endpoint, {
      ...options,
      headers,
    });
    const data = isHtml ? await response.text() : await response.json();
    return data;
  }

  static async get(endpoint) {
    return this.response(endpoint);
  }
  static async post(endpoint, body, isHtml) {
    return this.response(
      endpoint,
      {
        method: 'POST',
        body,
      },
      isHtml,
    );
  }
}

export default Api;
