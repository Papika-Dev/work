import React from 'react';
import { CartMainText, TitleRow } from './cartStyles';

const CartTitleRow = () => (
  <TitleRow>
    <CartMainText style={{ gridColumn: '1 / 3' }}>
      Товар
    </CartMainText>
    <CartMainText>
      Артикул
    </CartMainText>
    <CartMainText style={{ textAlign: 'center' }}>
      Количество
    </CartMainText>
    <CartMainText>
      Стоимость
    </CartMainText>
    <CartMainText>
      Удалить
    </CartMainText>
  </TitleRow>
);

export default CartTitleRow;
