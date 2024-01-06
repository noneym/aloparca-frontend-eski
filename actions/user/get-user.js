import Api from '../../api';
import { userLogout } from './logout';
import { setAddress } from '../address';

export const getUser = () => async (dispatch) => {
  const response = await Api.post('Users/uyegiris');
  const {
    code, userId, validate, ...userData
  } = response;

  if (response.status !== false) {
    if (userData && userData.user_adres_list) {
      const teslimat = userData.user_adres_list.filter(
        (adres) => adres.adres_type === 'teslimat',
      );
      const fatura = userData.user_adres_list.filter(
        (adres) => adres.adres_type === 'fatura',
      );
      if (teslimat.length) {
        const teslimatId = teslimat.length === 0 ? '' : teslimat[teslimat.length - 1].Id;
        const faturaId = fatura.length === 0 ? '' : fatura[fatura.length - 1].Id;
        dispatch(
          setAddress({ id: teslimatId, type: 'teslimat' }),
        );
        dispatch(
          setAddress({ id: faturaId, type: 'fatura' }),
        );
      }
    }
    await dispatch({
      type: 'USER_DATA',
      payload: userData,
    });
    try {
      const ADMITAD = window.ADMITAD || {};
      ADMITAD.Invoice = ADMITAD.Invoice || {};
      ADMITAD.Invoice.accountId = userData.user[0].uyemailadresi;
    } catch (err) {
      // console.log('Get User error:', err);
    }
  } else {
    dispatch(userLogout());
    dispatch({
      type: 'FLASH_MESSAGE',
      payload: 'Teknik bir sıkıntı yaşandı. Lütfen tekrar deneyiniz.',
    });
  }
};

export default { getUser };
