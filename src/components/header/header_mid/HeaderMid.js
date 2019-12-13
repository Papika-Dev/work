import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { basket } from 'react-icons-kit/ikons/basket';
import { bookmark } from 'react-icons-kit/fa/bookmark';
import {
  HeaderMidLogo,
  SearchInput,
  HeaderMidRight,
  FavorIconBox,
  Cart,
  HeaderMidWrapper,
  SearchForm,
  FullCart,
} from '../headerStyles';

const HeaderMid = () => {
  const [isFocus, setIsFocus] = useState(false);
  const cart = useSelector((state) => state.cart);

  return (
    <HeaderMidWrapper>
      <HeaderMidLogo>
        <span>Take your book from</span>
        <span>MyBookcase</span>
      </HeaderMidLogo>
      <SearchForm>
        <SearchInput
          isFocus={isFocus}
          type="text"
          placeholder="Поиск"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </SearchForm>
      <HeaderMidRight>
        <FavorIconBox>
          <Icon icon={bookmark} size={22} />
        </FavorIconBox>
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
