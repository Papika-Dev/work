export default (length, maxCount) => ({
  type: 'SET_INFO',
  payload: {
    length,
    maxCount,
  },
});
