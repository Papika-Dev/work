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
import modeLog from '../../store/actions/modeLog';

const Registration = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const handleRegOnSubmit = async (e) => {
    e.preventDefault();
    if (password === checkPass) {
      const user = {
        name,
        mail,
        phone,
        password,
      };

      const resp = await fetch('/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charser=utf-8',
        },
        body: JSON.stringify(user),
      });
      if (resp.status === 403) {
        setMessage('Пользователь с данной почтой уже зарегестрирован');
      }
      if (resp.status === 500) {
        setMessage('Сбой, повторите попытку');
      }
      if (resp.ok) {
        dispatch(modeLog());
      }
    } else {
      setMessage('Пароль не соответствует');
      setCheckPass('');
    }
  };

  return (
    <>
      <FormTitle>
        Зарегистрировать аккаунт на сайте:
      </FormTitle>
      {message && <FormTitle style={{ color: 'red' }}>{message}</FormTitle>}
      <Form onSubmit={handleRegOnSubmit} onChange={() => setMessage('')}>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Имя"
              required
            />
          </Label>
        </Div>
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
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              placeholder="Телефон"
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
        <Div>
          <Label>
            <Input
              type="password"
              onChange={(e) => setCheckPass(e.target.value)}
              value={checkPass}
              required
              placeholder="Подтверждение пароля"
            />
          </Label>
        </Div>
        <FormBtn>
          Зарегистрироваться
        </FormBtn>
      </Form>
    </>
  );
};

export default Registration;
