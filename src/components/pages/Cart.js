import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BackgroundWrapper,
  CartWrapper,
  CartTitle,
  CartSubTitle,
  CartButton,
} from '../cart/cartStyles';
import CartRow from '../cart/CartRow';
import CartResult from '../cart/CartResult';
import formatPrice from '../actions/formatPrice';
import CartTitleRow from '../cart/CartTitleRow';
import Thanks from '../cart/Thanks';


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showThanks, setShowThanks] = useState(false);
  useEffect(() => {
    // Calculate total price
    const reduceMath = (res, cur) => res + (formatPrice(cur.price) * cur.count);
    const result = cart.reduce(reduceMath, 0);
    setTotalPrice(result);
  }, [cart]);
  return (
    <>
      <BackgroundWrapper>
        <CartWrapper>
          <CartTitle>
            {` Корзина ${cart.length > 0 ? '' : 'пуста'} `}
          </CartTitle>
          {cart.length > 0 ? (
            <>
              <CartSubTitle>
                {`${cart.reduce((res, cur) => res + cur.count, 0)} ед. товара`}
              </CartSubTitle>
              <CartSubTitle
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                btn
              >
                Очистить корзину
              </CartSubTitle>
              <CartTitleRow />
              {cart.map((item) => (
                <CartRow
                  key={item.bookId}
                  id={item.bookId}
                  count={item.count}
                />
              ))}
            </>
          ) : (
            <CartButton to="/">
                Перейти к покупкам
            </CartButton>
          )}

        </CartWrapper>
      </BackgroundWrapper>
      {cart.length > 0 && <CartResult total={totalPrice} onClick={() => setShowThanks(true)} />}
      {showThanks && <Thanks />}
    </>
  );
};

export default Cart;
