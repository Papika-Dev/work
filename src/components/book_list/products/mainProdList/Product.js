import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ProductCont,
  ProdTitle,
  ProdAuthor,
  CoverBox,
  ProdCover,
} from './styles';
import PriceInfo from '../../../bookCard/PriceInfo';

const Product = ({
  url,
  title,
  price,
  author,
  id,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <ProductCont
      hover={isHover}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CoverBox hover={isHover}>
        <Link to={`/book/${id}`} style={{ textDecoration: 'none' }}>
          <ProdCover src={url} />
        </Link>
      </CoverBox>

      <ProdTitle hover={isHover}>
        {title}
      </ProdTitle>
      <ProdAuthor>
        {author}
      </ProdAuthor>
      <PriceInfo
        price={price}
        bookId={id}
        small
        isHover={isHover}
      />
    </ProductCont>
  );
};

Product.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Product;
