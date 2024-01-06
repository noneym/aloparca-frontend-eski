export default (state = {}, action) => {
  switch (action.type) {
    case 'TEMP_CAR':
      return action.payload;
    default:
      return state;
  }
};
