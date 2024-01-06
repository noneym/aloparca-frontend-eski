export default (state = null, action) => {
  switch (action.type) {
    case 'FLASH_MESSAGE':
      return action.payload;
    default:
      return state;
  }
};
