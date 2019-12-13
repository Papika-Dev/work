import React from 'react';
import PropTypes from 'prop-types';
import {
  GridBox,
  Block,
  TextBlock,
  BlockTitle,
  OnlyReadStar,
} from './styles';


const CommentBLock = ({
  author,
  rating,
  date,
  text,
}) => {
  const formatDate = new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <GridBox>
      <Block>
        <div>
          <BlockTitle>
            {author}
          </BlockTitle>
        </div>
        <div>
          <OnlyReadStar className="r_one" rating={rating}>
            ★
          </OnlyReadStar>
          <OnlyReadStar className="r_two" rating={rating}>
            ★
          </OnlyReadStar>
          <OnlyReadStar className="r_three" rating={rating}>
            ★
          </OnlyReadStar>
          <OnlyReadStar className="r_four" rating={rating}>
            ★
          </OnlyReadStar>
          <OnlyReadStar className="r_five" rating={rating}>
            ★
          </OnlyReadStar>
        </div>
        <div>
          <BlockTitle date>
            {formatDate}
          </BlockTitle>
        </div>
        <TextBlock>
          <BlockTitle>
            {text}
          </BlockTitle>
        </TextBlock>
      </Block>
    </GridBox>
  );
};

CommentBLock.defaultProps = {
  rating: null,
};

CommentBLock.propTypes = {
  author: PropTypes.string.isRequired,
  rating: PropTypes.number,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CommentBLock;
