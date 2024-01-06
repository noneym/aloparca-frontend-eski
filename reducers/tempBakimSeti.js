const tempBakimSeti = (state = {}, action) => {
  switch (action.type) {
    case 'TEMP_BAKIM_SETI':
      return action.payload;
    default:
      return state;
  }
};
export default tempBakimSeti;
