export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_GARAGE':
      return action.payload;
    default:
      return state;
  }
};
