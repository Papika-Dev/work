import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListWrapper from './bookListStyles';
import ListFilter from './listFilter/ListFilter';
import ProductList from './products/ProductList';
import setAllTitles from '../../store/actions/setAllTitles';

const BookList = () => {
  const dispatch = useDispatch();

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
    getHeaders();
  }, [dispatch]);
  return (
    <ListWrapper>
      <ListFilter />
      <ProductList />
    </ListWrapper>
  );
};


export default BookList;
