export default (state = false, action) => {
  switch (action.type) {
    case 'CHECK_LOGIN':
      return action.payload;
    default:
      return state;
  }
};
