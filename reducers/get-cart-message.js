export default (state = { name: '', gorsel: '' }, action) => {
  switch (action.type) {
    case 'GET_CART_MESSAGE':
      return action.payload;
    default:
      return state;
  }
};
