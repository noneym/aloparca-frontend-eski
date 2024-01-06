export default (state = null, action) => {
  switch (action.type) {
    case 'ADD_CART':
      return action.payload;
    case 'GET_CART':
      return action.payload;
    case 'SET_CART':
      return action.payload;
    case 'REMOVE_CART':
      return action.payload;
    default:
      return state;
  }
};
