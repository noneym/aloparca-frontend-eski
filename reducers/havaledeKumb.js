export default (state = true, action) => {
  switch (action.type) {
    // deneme-- Havale ile ödeme ekranındayken kumbaradan ödenecek tutar bilgisini saklar
    case 'HAVALE_KUMB':
      return action.payload;
    default:
      return state;
  }
};
