import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { remove } from 'react-icons-kit/fa/remove';
import { ruble } from 'react-icons-kit/fa/ruble';
import { Icon } from 'react-icons-kit';
import {
  Row,
  RowBookCover,
  CartRowTitle,
  CartMainText,
  CartNumText,
  RowCursiveText,
  CartDeleteBtn,
  RowInfo,
} from './cartStyles';
import CountBtn from '../bookCard/CountBtn';
import decrement from '../../store/actions/decrement';
import increment from '../../store/actions/increment';
import removeFromCart from '../../store/actions/removeFromCart';
import formatPrice from '../actions/formatPrice';

const CartRow = ({ id, count }) => {
  const dispatch = useDispatch();
  const [cover, setCover] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/book/card/${id}`);
      if (resp.ok) {
        const result = await resp.json();
        setCover(result.cover);
        setTitle(result.title);
        setAuthor(result.author);
        setPrice(result.price);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const numPrice = formatPrice(price);
    setCost(numPrice * count);
  }, [count, price]);
  return (
    <Row>
      <RowBookCover src={cover} />
      <RowInfo>
        <CartRowTitle to={`/book/${id}`}>
          {title}
        </CartRowTitle>
        <RowCursiveText>
          {author}
        </RowCursiveText>
      </RowInfo>
      <CartMainText>
        {id}
      </CartMainText>
      <div>
        <CountBtn
          count={count}
          decOnClick={() => dispatch(decrement(id))}
          incOnClick={() => dispatch(increment(id))}
        />
      </div>
      <CartNumText>
        {cost}
        <Icon icon={ruble} size={14} />
      </CartNumText>
      <CartDeleteBtn onClick={() => dispatch(removeFromCart(id))}>
        <Icon icon={remove} size={18} />
      </CartDeleteBtn>
    </Row>
  );
};

CartRow.propTypes = {
  id: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default CartRow;
