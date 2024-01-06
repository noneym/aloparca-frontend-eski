import Api from '../../api';
import { getUser, getCartProduct, addCartMultiple, getCoupon } from '../../actions';
import { site } from '../../reactor/func';
import { Router } from '../../routes';


export const userLogin = data => async (dispatch) => {
  const fd = new FormData();
  fd.append('uyemailadresi', data.email);
  fd.append('uyegirissifresi', data.password);
  const loginData = await Api.post('Users/uyegiris', fd);

    if (parseInt(loginData.code, 10) === 200) {
      dispatch({
      type: 'USER_LOGIN',
      payload: loginData.token,
    });

    await dispatch({ 
      type: 'CHECK_LOGIN',
      payload: true,
    });

    await dispatch(getUser());
    const products = dispatch(getCartProduct(null, false));
    dispatch(addCartMultiple(products), false);
    dispatch(getCoupon());
    Router.pushRoute('home');
  } else {
    dispatch( site === "b2b" ? 
      {type: 'FLASH_MESSAGE', payload: 'E-posta adresi ve/veya şifre hatalı veya B2B üyesi değilsiniz' } : 
      {type: 'FLASH_MESSAGE', payload: 'E-posta adresi ve/veya şifre hatalı' }
    );
  }
};

export default { userLogin };
