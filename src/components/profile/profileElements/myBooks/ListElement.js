import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  BookWrapper,
  InnerMinWrapper,
  InnerMaxWrapper,
  SmallCover,
  PriceText,
} from '../../profileStyles/myBooksStyles';

const ListElement = ({
  cover,
  title,
  author,
  price,
  id,
}) => (
  <BookWrapper>
    <InnerMinWrapper>
      <Link to={`/book/${id}`}>
        <SmallCover url={cover} />
      </Link>
    </InnerMinWrapper>
    <InnerMaxWrapper>
      <span className="title">{title}</span>
      <span className="author">{author}</span>
    </InnerMaxWrapper>
    <InnerMinWrapper>
      <PriceText>
        {price}
      </PriceText>
    </InnerMinWrapper>
  </BookWrapper>
);


ListElement.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default ListElement;
