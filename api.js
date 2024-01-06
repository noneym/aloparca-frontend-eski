import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const env = publicRuntimeConfig;

export const host = env.DOMAIN_URL;
export const imgHost = env.DOMAIN_URL;
export const gaID = ''; // google analytics

const webApi = env.API_URL;

class Api {
  static async response(endpoint, options, isHtml) {
    let headers = {};
    // eslint-disable-next-line no-underscore-dangle
    const store = typeof window != 'undefined' && window.__NEXT_REDUX_STORE__;

    if (store) {
      const { token } =  store.getState();
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
