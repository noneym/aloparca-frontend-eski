export default (
    state = {
        inquireData: [],
        changePage: false,
        selectedItems: [],
        prices: [],
        products: [],
        fullOnItems: false
    },
    action,
  ) => {
    switch (action.type) {
        case 'GET_INQUIREDATA':
            return { ...state, inquireData: action.payload };
        case 'SET_CHANGEPAGE':
            return { ...state, changePage: action.payload };
        case 'SET_SELECTEDITEMS':
            return { ...state, selectedItems: action.payload };
        case 'SET_PRICES':
            return { ...state, prices: action.payload };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_FULLONITEMS':
            return { ...state, fullOnItems: action.payload };
        default:
            return state;
    }
};
  