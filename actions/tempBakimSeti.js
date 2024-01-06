export const tempBakimSeti = (car) => {
  if (car) {
    return {
      type: 'TEMP_BAKIM_SETI',
      payload: car,
    };
  }
};
