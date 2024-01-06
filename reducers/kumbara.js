export default (state = false, action) => {
  switch (action.type) {
    // deneme kumbara
    case 'KUMBARA_OK':
      return action.payload;
    default:
      return state;
  }
};
