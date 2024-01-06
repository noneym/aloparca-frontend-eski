export const getInquireData = data => async (dispatch) => {
    dispatch({ type: 'GET_INQUIREDATA', payload: data });
};

export const setChangePage = data => async (dispatch) => {
    dispatch({ type: 'SET_CHANGEPAGE', payload: data });
};

export const setSelectedItems = data => async (dispatch) => {
    dispatch({ type: 'SET_SELECTEDITEMS', payload: data });
};

export const setPrices = data => async (dispatch) => {
    dispatch({ type: 'SET_PRICES', payload: data });
};

export const setProducts = data => async (dispatch) => {
    dispatch({ type: 'SET_PRODUCTS', payload: data });
};

export const setFullOnItems = data => async (dispatch) => {
    dispatch({ type: 'SET_FULLONITEMS', payload: data });
};

export default { setChangePage, setSelectedItems, setPrices, setFullOnItems };