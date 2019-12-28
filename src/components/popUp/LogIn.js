import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Div,
  Label,
  Input,
  FormTitle,
  FormBtn,
} from './styles/styles';
import logIn from '../../store/actions/logIn';
import togglePopUp from '../../store/actions/togglePopUp';
import toLocalStorage from '../../store/actions/toLocalStorage';

const LogIn = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const handleLogInOnSubm = async (e) => {
    e.preventDefault();
    if (mail && password) {
      const userData = {
        mail,
        password,
      };

      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const result = await res.json();
        // set Token and userName into local storage
        dispatch(logIn(result.name, result.id));
        dispatch(toLocalStorage(result.token, result.refreshToken));
        // if result ok hide Pop-Up window with REG- LOG mode
        dispatch(togglePopUp());
      } else {
        setMessage('Почта или пароль указаны неверно');
      }
    }
  };
  return (
    <>
      <FormTitle>
        Войти
      </FormTitle>
      {message && <FormTitle>{message}</FormTitle>}
      <Form onSubmit={handleLogInOnSubm}>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
              placeholder="Электронная почта"
            />
          </Label>
        </Div>
        <Div>
          <Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Пароль"
            />
          </Label>
        </Div>
        <FormBtn type="submit">
          Войти
        </FormBtn>
      </Form>
    </>
  );
};

export default LogIn;
