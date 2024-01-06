export default (state = null, action) => {
  switch (action.type) {
    case 'ADD_COUPON':
      return action.payload;
    default:
      return state;
  }
};
