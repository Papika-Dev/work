import React from 'react';
import PropTypes from 'prop-types';
import {
  BookInfoWrapper,
  BookTitle,
  BookStyledText,
  BookMainText,
  BookBigCoverBox,
  CoverImg,
  TitleRowGrid,
} from './bookCardStyles';
import BookRating from './BookRating';
import AddToFavorBtn from '../profile/profileElements/favorites/AddToFavorBtn';

const BookInfo = ({
  title,
  author,
  cover,
  description,
  rating,
  bookId,
}) => (
  <BookInfoWrapper>
    <TitleRowGrid>
      <BookTitle>
        {title}
      </BookTitle>
      <AddToFavorBtn bookId={bookId} />
    </TitleRowGrid>
    <TitleRowGrid>
      <BookStyledText>
        {author}
      </BookStyledText>
      <BookRating rating={rating} />
    </TitleRowGrid>
    <BookBigCoverBox>
      <CoverImg src={cover} />
    </BookBigCoverBox>
    <BookMainText>
      {description}
    </BookMainText>
  </BookInfoWrapper>
);
BookInfo.defaultProps = {
  rating: null,
};
BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bookId: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

export default BookInfo;
