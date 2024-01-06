import Api from '../api';
import { getUser } from '../actions';

export const addGarage = data => async (dispatch, getState) => {
  const { isLogin } = getState();
  const fd = new FormData();
  fd.append('marka', data.marka);
  fd.append('model', data.model);
  fd.append('kasa', data.kasa);
  fd.append('yil', data.yil);
  fd.append('motor', data.motor);
  fd.append('beygir', data.beygir);
  if (isLogin) {
    const garageData = await Api.post('Users/garaj_arac', fd);
    if (parseInt(garageData.result, 10) === 200) {
      dispatch({ type: 'ADD_GARAGE', payload: garageData.data });
      dispatch(getUser());
    } else {
      dispatch({
        type: 'ADD_GARAGE',
        payload: {
          userid: null,
          not: null,
          resim: null,
          marka: data.marka,
          model: data.model,
          kasa: data.kasa,
          yil: data.yil.toString(),
          motor: data.motor,
          beygir: data.beygir,
        },
      });
    }
  } else {
    dispatch({
      type: 'ADD_GARAGE',
      payload: {
        userid: null,
        not: null,
        resim: null,
        marka: data.marka,
        model: data.model,
        kasa: data.kasa,
        yil: data.yil.toString(),
        motor: data.motor,
        beygir: data.beygir,
      },
    });
  }
};

export const deleteGarage = data => async (dispatch) => {
  const fd = new FormData();
  fd.append('garaj_id', data);
  fd.append('sil', 1);
  const garageData = await Api.post('Users/garaj_arac', fd);
  if (parseInt(garageData.result, 10) === 200) {
    dispatch(getUser());
    dispatch({ type: 'FLASH_MESSAGE', payload: 'Araç garajınızdan kaldırıldı.' });
  } else {
    dispatch({ type: 'FLASH_MESSAGE', payload: 'Beklenmedik bir hata oluştu.' });
  }
};

export default { addGarage, deleteGarage };
