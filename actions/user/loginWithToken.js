import Api from '../../api';
import { getUser, getCartProduct, addCartMultiple, getCoupon } from '../../actions';

export const userLoginWithToken = token => async (dispatch) => {
  dispatch({
    type: 'USER_LOGIN',
    payload: token,
  });
  await dispatch({
    type: 'CHECK_LOGIN',
    payload: true,
  });

  dispatch(getUser());
  const products = dispatch(getCartProduct(null, false));
  dispatch(addCartMultiple(products), false);
  dispatch(getCoupon());
};

export default { userLoginWithToken };
