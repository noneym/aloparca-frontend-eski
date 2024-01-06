import { combineReducers } from 'redux';
import token from './user/login';
import isLogin from './user/login-check';
import isLoginRequired from './login-required';
import flashMessage from './flash-message';
import userData from './user/data';
import checkoutBank from './checkout/bank';
import checkoutCargo from './checkout/cargo';
import checkoutType from './checkout/type';
import cart from './cart';
import garage from './garage';
import coupon from './coupon';
import address from './address';
import bakimseti from './bakimseti';
import kumbara from './kumbara';
import kumbaraOk from './kumbaraok';
import kumbLess from './kumbaraless';
import kumbKes from './kumbKes';
import kkartKes from './kkartKes';
import havaledeKumb from './havaledeKumb';
import isBasketOn from './basket-on';
import getCartMessage from './get-cart-message';
import tempCar from './tempCar';
import tempBakimSeti from './tempBakimSeti';
import pratikBakim from './pratikbakim';

export default combineReducers({
  token,
  isLogin,
  isLoginRequired,
  flashMessage,
  userData,
  cart,
  garage,
  coupon,
  address,
  bakimseti,
  pratikBakim,
  checkoutBank,
  checkoutCargo,
  checkoutType,
  kumbara,
  kumbaraOk,
  kumbLess,
  kumbKes,
  kkartKes,
  havaledeKumb,
  isBasketOn,
  getCartMessage,
  tempCar,
  tempBakimSeti,
});
