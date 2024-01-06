export default (state = null, action) => {
  switch (action.type) {
    // deneme kumbara ok = kumbarada yeterli miktarda para varsa çalışacak 
    case 'KUMBARA_OK':
      return action.payload;
    default:
      return state;
  }
};
