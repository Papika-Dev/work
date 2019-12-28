export default (min, max) => ({
  type: 'SET_PRICE_FILTER',
  payload: {
    min,
    max,
  },
});
