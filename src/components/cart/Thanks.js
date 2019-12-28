import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PopUpWrapper } from '../popUp/styles/styles';

const Thanks = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const test = () => {
      setTimeout(() => {
        history.push('/');
        dispatch({ type: 'CLEAR_CART' });
      }, 3000);
    };
    test();
  }, [history, dispatch]);
  return (
    <PopUpWrapper>
      <h1 style={{ marginTop: '150px', textAlign: 'center', color: 'white' }}>
        Спасибо за заказ
      </h1>
    </PopUpWrapper>
  );
};

export default Thanks;
