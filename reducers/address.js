export default (state = { teslimat: '', fatura: '' }, action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { ...state, [action.payload.type]: action.payload.id };
    default:
      return state;
  }
};
