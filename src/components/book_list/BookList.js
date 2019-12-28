import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListWrapper from './bookListStyles';
import ListFilter from './listFilter/ListFilter';
import ProductList from './products/ProductList';
import setAllTitles from '../../store/actions/setAllTitles';
import setMaxPrice from '../../store/actions/setMaxPrice';

const BookList = () => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.products);
  // geting all titles and authors of products for tips
  useEffect(() => {
    const allTitles = [];
    const getHeaders = async () => {
      const resp = await fetch('/product/headers');
      if (resp.ok) {
        const result = await resp.json();
        const set = new Set(result);
        set.forEach((item) => allTitles.push(item));
        dispatch(setAllTitles(allTitles));
      }
    };
    if (!headers) {
      getHeaders();
    }
  }, [dispatch, headers]);

  useEffect(() => {
    const fetchMaxPrice = async () => {
      const resp = await fetch('/product/max/price');
      if (resp.ok) {
        const result = await resp.json();
        dispatch(setMaxPrice(result.max));
      }
    };
    fetchMaxPrice();
  }, [dispatch]);

  return (
    <ListWrapper>
      <ListFilter />
      <ProductList />
    </ListWrapper>
  );
};


export default BookList;
