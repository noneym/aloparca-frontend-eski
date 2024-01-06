export default (state = 'Yurtiçi Kargo', action) => {
  switch (action.type) {
    case 'ADD_CARGO':
      return action.payload;
    default:
      return state;
  }
};
