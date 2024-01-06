export default (state = 1, action) => {
  switch (action.type) {
    case 'ADD_CHECKOUT_TYPE':
      return action.payload;
    default:
      return state;
  }
};
