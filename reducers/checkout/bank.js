export default (state = null, action) => {
  switch (action.type) {
    case 'ADD_BANK':
      return action.payload;
    default:
      return state;
  }
};
