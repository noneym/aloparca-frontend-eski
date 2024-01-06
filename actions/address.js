export const setAddress = data => async (dispatch) => {
  dispatch({ type: 'SET_ADDRESS', payload: data });
};
export default setAddress;
