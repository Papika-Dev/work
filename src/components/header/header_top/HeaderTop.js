import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeaderTopWrapper,
  HeaderTopInner,
  HeaderLogo,
  HeaderRight,
  HeaderTopLinks,
  HeaderTopText,
} from '../headerStyles';
import togglePopUp from '../../../store/actions/togglePopUp';

const HeaderTop = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.currentUser);

  return (
    <HeaderTopWrapper>
      <HeaderTopInner>
        <HeaderLogo to="/">
          MyBookcase
        </HeaderLogo>
        <HeaderRight>
          <HeaderTopLinks to="/">
            Доставка и оплата
          </HeaderTopLinks>
          <HeaderTopText as="a" href="tel:88964327447" style={{ textDecoration: 'none' }}>
            +7(863) 432-74-47
          </HeaderTopText>
          <HeaderTopLinks to="/">
            Наши магазины
          </HeaderTopLinks>
          {activeUser.isLogIn
            ? (
              <HeaderTopText>
                <HeaderTopLinks to="/profile">
                  {activeUser.name}
                </HeaderTopLinks>
              </HeaderTopText>
            )
            : (
              <HeaderTopText onClick={() => dispatch(togglePopUp())}>
                Войти
              </HeaderTopText>
            )}

        </HeaderRight>
      </HeaderTopInner>
    </HeaderTopWrapper>
  );
};

export default HeaderTop;
