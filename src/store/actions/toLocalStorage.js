export default (token, refToken) => ({
  type: 'TOKEN_TO_STORAGE',
  payload: {
    token,
    refToken,
  },
});
