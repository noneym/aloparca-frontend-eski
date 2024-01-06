import { each } from 'awaity/esm';
import Api from '../api';
import { Router } from '../routes';

export const getCartProduct = (data, type) => (dispatch, getState) => {
  const { cart } = getState();
  let cartData = [];
  if (cart && cart.urunler) {
    cartData = cart.urunler.map((item) => item.urun_detay && { urun_no: item.urun_detay.no, adet: item.adet });
    if (data) cartData = cartData.filter((item) => item && item.urun_no != data.id);
  }
  if (type) cartData = [...cartData, { urun_no: data.id, adet: data.quantity }];
  return cartData;
};

export const getCart = (data, products) => async (dispatch) => {
  const productData = { sepet: [...products] };
  const fd = new FormData();
  fd.append('data', JSON.stringify(productData));
  const cartData = await Api.post('Users/sepet_check_nouser', fd);
  dispatch({ type: 'GET_CART', payload: cartData.result });
};

export const getCoupon = (data) => async (dispatch, getState) => {
  const { isLogin } = getState();
  let cartData;
  if (isLogin) {
    let kuponUrl = '?kupon=';
    if (data && data.coupon) {
      kuponUrl += data.coupon;
    }
    cartData = await Api.get(`Users/sepet_check${kuponUrl}`);
  } else {
    const cartProducts = dispatch(getCartProduct(false, false));
    const productData = { sepet: [...cartProducts] };
    const fd = new FormData();
    fd.append('data', JSON.stringify(productData));
    fd.append('kupon', data.coupon);
    cartData = await Api.post('Users/sepet_check_nouser', fd);
  }
  if (cartData.result.indirim) {
    if (cartData.result.indirim.indirim) dispatch({ type: 'ADD_COUPON', payload: data.coupon });
    dispatch({
      type: 'FLASH_MESSAGE',
      payload: cartData.result.indirim.indirim_bilgi,
    });
  }
  dispatch({ type: 'GET_CART', payload: cartData.result });
};

export const checkCart = (data) => async (dispatch) => {
  const cartProducts = dispatch(getCartProduct(null, false));
  const productData = { sepet: [...cartProducts] };
  const fd = new FormData();
  fd.append('data', JSON.stringify(productData));
  fd.append('taksit', data.taksit);
  if (data.kupon) fd.append('kupon', data.kupon);
  const cartData = await Api.post('Users/sepet_check_nouser', fd);
  dispatch({ type: 'GET_CART', payload: cartData.result });
};

export const addCart = (data) => async (dispatch, getState) => {
  // dispatch({ type: 'FLASH_MESSAGE', payload: 'Ürün sepetinize eklenmiştir.' });
  const getName = data.name === undefined ? '' : data.name;
  const getGorsel = data.gorsel === undefined ? '' : data.gorsel;
  dispatch({ type: 'GET_CART_MESSAGE', payload: { name: getName, gorsel: getGorsel } });
  const { isLogin } = getState();
  if (isLogin) {
    const fd = new FormData();
    fd.append('urun_no', data.id);
    fd.append('adet', data.quantity);
    await Api.post('Users/sepet_ekle', fd);
  }
  const cartProducts = dispatch(getCartProduct(data, true));
  dispatch(getCart(data, cartProducts));
};

/// kumbara deneme

// ödeme 5-6 da Kredi kartından kesilecek
export const kkartKesFunc = (kkartKesilecek) => {
  if (kkartKesilecek) {
    return {
      type: 'KKART_KESILECEK',
    };
  }
};

// ödeme 5-6 da Kumbaradan kesilecek
export const kumbKesFunc = (kumbKes) => {
  if (kumbKes) {
    return {
      type: 'KUMB_KESILECEK',
    };
  }
};

export const isKumbOkFunc = (isKumbOk) => {
  if (isKumbOk) {
    return {
      type: 'KUMBARA_OK',
    };
  }
};

export const havaledeKumbFunc = (havaledeKumb) => {
  if (havaledeKumb) {
    return {
      type: 'HAVALE_KUMB',
    };
  }
};

export const kumbLessFunc = (kumbLess) => {
  if (kumbLess) {
    return {
      type: 'KUMBARA_LESS',
    };
  }
};

/// kumbara deneme son

export const addCartMultiple = (data, type) => async (dispatch, getState) => {
  let count = 0;
  const { isLogin } = getState();

  await each(data, async (item) => {
    if (isLogin) {
      const fd = new FormData();
      fd.append('urun_no', item.urun_no);
      fd.append('adet', item.adet);
      await Api.post('Users/sepet_ekle', fd);
    }
    const cartProducts = await dispatch(getCartProduct({ id: item.urun_no, quantity: item.adet }, true));
    await dispatch(getCart(data, cartProducts));
    count += 1;
  });
  if (type) {
    if (count > 0) {
      dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Ürünler sepetinize eklenmiştir.',
      });
      Router.pushRoute('sepet');
    } else {
      dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Beklenmedik bir hata oluştu.',
      });
    }
  }
};

export const editCart = (data) => async (dispatch, getState) => {
  const { isLogin } = getState();
  if (isLogin) {
    const fd = new FormData();
    fd.append('urun_no', data.id);
    fd.append('adet', data.quantity);
    // console.log(data);

    await Api.post('Users/sepet_ekle', fd);
  }
  const cartProducts = dispatch(getCartProduct(data, true));
  dispatch(getCart(data, cartProducts));
  dispatch({ type: 'FLASH_MESSAGE', payload: 'Ürün adeti güncellendi.' });
};

export const deleteCart = (data) => async (dispatch, getState) => {
  const { isLogin } = getState();
  if (isLogin) {
    const fd = new FormData();
    fd.append('urun_no', data.id);
    fd.append('sil', '1');
    await Api.post('Users/sepet_ekle', fd);
  }
  const cartProducts = dispatch(getCartProduct(data, false));
  dispatch(getCart(data, cartProducts));
  dispatch({
    type: 'FLASH_MESSAGE',
    payload: 'Ürün sepetinizden kaldırılmıştır.',
  });
};

export const deleteAllCart = () => async (dispatch, getState) => {
  const { isLogin, cart } = getState();
  if (isLogin) {
    cart.urunler.map(async (item) => {
      const fd = new FormData();
      fd.append('urun_no', item.urun_detay.no);
      fd.append('sil', '1');
      await Api.post('Users/sepet_ekle', fd);
    });
  }
  dispatch({
    type: 'GET_CART',
    payload: {
      subtotal: 0,
      total: 0,
      masraf: 0,
      vadefarki: 0,
      kargo: 0,
    },
  });
};

export default {
  addCart,
  getCart,
  checkCart,
  deleteCart,
  editCart,
  addCartMultiple,
  getCartProduct,
  deleteAllCart,
  isKumbOkFunc,
  kumbLessFunc,
  kumbKesFunc,
  kkartKesFunc,
  havaledeKumbFunc,
};
