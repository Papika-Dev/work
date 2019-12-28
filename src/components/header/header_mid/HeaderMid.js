import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { basket } from 'react-icons-kit/ikons/basket';
import { bookmark } from 'react-icons-kit/fa/bookmark';
import {
  HeaderMidLogo,
  HeaderMidRight,
  FavorIconBox,
  Cart,
  HeaderMidWrapper,
  FullCart,
} from '../headerStyles';
import togglePopUp from '../../../store/actions/togglePopUp';
import SearchField from './SearchField';


const HeaderMid = () => {
  const cart = useSelector((state) => state.cart);
  const curUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const favorIcon = (
    curUser.isLogIn ? (
      <FavorIconBox>
        <Link to="/profile/favorites" style={{ color: '#000' }}>
          <Icon icon={bookmark} size={22} />
        </Link>
      </FavorIconBox>
    ) : (
      <FavorIconBox onClick={() => dispatch(togglePopUp())}>
        <Icon icon={bookmark} size={22} />
      </FavorIconBox>
    )

  );
  return (
    <HeaderMidWrapper>
      <HeaderMidLogo>
        <span>Take your book from</span>
        <span>MyBookcase</span>
      </HeaderMidLogo>
      <SearchField />
      <HeaderMidRight>
        {favorIcon}
        <Cart to="/cart">
          {cart.length > 0 ? (
            <FullCart>
              {cart.reduce((res, cur) => res + cur.count, 0)}
            </FullCart>
          ) : (
            <Icon icon={basket} size={22} />
          )}
        </Cart>
      </HeaderMidRight>
    </HeaderMidWrapper>
  );
};

export default HeaderMid;
