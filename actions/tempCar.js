export const tempCar = (car) => {
  if (car) {
    return {
      type: 'TEMP_CAR',
      payload: car,
    };
  }
};
