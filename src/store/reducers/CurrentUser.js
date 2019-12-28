const initState = {
  id: JSON.parse(localStorage.getItem('id')) || false,
  name: JSON.parse(localStorage.getItem('userName')) || false,
  isLogIn: (JSON.parse(localStorage.getItem('token')) && true) || false,
};

export default (state = initState, action) => {
  switch (action.type) {
  case 'LOG_IN': {
    const { name, id } = action.payload;
    const upName = `${name[0].toUpperCase()}${name.slice(1)}`;
    localStorage.setItem('userName', JSON.stringify(upName));
    localStorage.setItem('id', JSON.stringify(id));
    return { id, name: upName, isLogIn: true };
  }
  case 'SET_URL':
    return { ...state, url: action.payload };
  case 'LOG_OUT':
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    localStorage.removeItem('cart');
    return { name: false, isLogIn: false };
  default:
    return state;
  }
};
