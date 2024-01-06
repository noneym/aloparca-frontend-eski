export default (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_REQUIRED':
      return action.payload;
    default:
      return state;
  }
};
