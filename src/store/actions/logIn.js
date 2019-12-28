export default (name, id) => ({
  type: 'LOG_IN',
  payload: {
    name,
    id,
  },
});
