export default (state = [], action) => {
  switch (action.type) {
  case 'TOKEN_TO_STORAGE':
    localStorage.setItem('token', JSON.stringify(action.payload.token));
    localStorage.setItem('refreshToken', JSON.stringify(action.payload.refToken));
    return state;
  default:
    return state;
  }
};
