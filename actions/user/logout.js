import { setAddress } from '../address';

export const userLogout = () => async (dispatch) => {
  dispatch({
    type: 'USER_LOGIN',
    payload: null,
  });
  dispatch({
    type: 'CHECK_LOGIN',
    payload: false,
  });
  dispatch({
    type: 'USER_DATA',
    payload: null,
  });
  dispatch({
    type: 'REMOVE_CART',
    payload: null,
  });
  dispatch(setAddress({ id: '', type: 'teslimat' }));
  dispatch(setAddress({ id: '', type: 'fatura' }));
  dispatch({
    type: 'ADD_GARAGE',
    payload: {
      userid: null,
      not: null,
      resim: null,
      marka: null,
      model: null,
      kasa: null,
      yil: null,
      motor: null,
      beygir: null,
    },
  });
  const bakimseti = ['hava', 'madeni', 'polen', 'yag', 'yakit'];
  bakimseti.forEach((item) => {
    dispatch({
      type: 'SET_BAKIMSETI',
      payload: {
        type: item,
        data: {},
      },
    });
  });
};

export default { userLogout };
