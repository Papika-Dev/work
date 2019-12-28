import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from 'react-icons-kit/fa/close';
import {
  PopUpWrapper,
  FormBox,
  FormBoxTop,
  LinksLabel,
  CloseBtn,
  CloseIcon,
} from './styles/styles';
import Registration from './Registration';
import togglePopUp from '../../store/actions/togglePopUp';
import LogIn from './LogIn';
import modeLog from '../../store/actions/modeLog';
import modeReg from '../../store/actions/modeReg';

const PopUp = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const handleOnCLose = () => {
    dispatch(togglePopUp());
    dispatch(modeLog());
  };

  return (
    <PopUpWrapper>
      <FormBox>
        <FormBoxTop>
          <LinksLabel reg={mode} style={{ paddingRight: '4px' }}>
            <input
              type="radio"
              name="links"
              style={{ display: 'none' }}
              onChange={() => dispatch(modeLog())}
              value="log"
              checked={mode}
            />
            Войти
          </LinksLabel>
          /
          <LinksLabel style={{ paddingLeft: '4px' }} reg={!mode}>
            <input
              type="radio"
              name="links"
              style={{ display: 'none' }}
              value="reg"
              checked={!mode}
              onChange={() => dispatch(modeReg())}
            />
            Регистрация
          </LinksLabel>
          <CloseBtn
            type="button"
            onClick={handleOnCLose}
          >
            <CloseIcon icon={close} size={20} />
          </CloseBtn>
        </FormBoxTop>
        {mode ? <LogIn /> : <Registration />}
      </FormBox>
    </PopUpWrapper>
  );
};

export default PopUp;
