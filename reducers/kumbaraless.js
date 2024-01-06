export default (state = null, action) => {
  switch (action.type) {
    // deneme kumbara less kumbarada tutar var ama yetersiz ise true
    case 'KUMBARA_LESS':
      return action.payload;
    default:
      return state;
  }
};

