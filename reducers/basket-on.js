export default (state = false, action) => {
  switch (action.type) {
    case 'BASKET_ON':
      return action.payload;
    default:
      return state;
  }
};
