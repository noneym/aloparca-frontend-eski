export default (
  state = {
    hava: {},
    madeni: {},
    polen: {},
    yag: {},
    yakit: {},
  },
  action,
) => {
  switch (action.type) {
    case 'SET_BAKIMSETI':
      return { ...state, [action.payload.type]: action.payload.data };
    default:
      return state;
  }
};
