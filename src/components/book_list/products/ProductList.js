import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BooksWrapper, AlarmText } from './productListStyles';
import ProductListTop from './top/ProductListTop';
import Product from './mainProdList/Product';
import { ProdGridBox } from './mainProdList/styles';
import setInfoOfProd from '../../../store/actions/setInfoOfProd';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const {
    pageNum,
    maxOnPage,
    sort,
    incDec,
    search,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProductList = async () => {
      const resp = await fetch(`/products/all?q=${search}&pagenum=${pageNum}&limit=${maxOnPage}&sort=${sort}&inc_dec=${incDec}`);
      if (resp.ok) {
        const result = await resp.json();
        setProducts(result.product);
        if (result.product) {
          // if result has matches
          dispatch(setInfoOfProd(result.product.length, result.count));
        } else {
          // if result is empty
          dispatch(setInfoOfProd(0, 0));
        }
      } else {
        setMessage(true);
      }
    };
    fetchProductList();
  }, [dispatch, maxOnPage, pageNum, sort, incDec, search]);

  const prodList = (products ? (products.map((item) => (
    <Link
      to={`/book/${item.id}`}
      key={item.id}
      style={{ textDecoration: 'none' }}
    >
      <Product
        title={item.title}
        price={item.price}
        url={item.cover}
        author={item.author}
      />
    </Link>
  ))) : (
    <AlarmText>По вашему запросу нет совпадений</AlarmText>
  ));
  return (
    <BooksWrapper>
      <ProductListTop />
      <ProdGridBox>
        {message ? (
          <AlarmText>Сбой сервера ... перезагрузите страницу</AlarmText>
        ) : (
          prodList
        )}

      </ProdGridBox>


    </BooksWrapper>
  );
};

export default ProductList;
