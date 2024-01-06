export default (state = 0, action) => {
  switch (action.type) {
    // ödeme tipi 5-6 da kredi kartından kesilecek
    case 'KKART_KESILECEK':
      return action.payload;
    default:
      return state;
  }
};
