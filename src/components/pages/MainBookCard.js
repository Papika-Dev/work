import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookCardWrapper, ShowComBtn } from '../bookCard/bookCardStyles';
import BookInfo from '../bookCard/BookInfo';
import PriceInfo from '../bookCard/PriceInfo';
import Comments from '../comments/Comments';
import CommentBLock from '../commentBlock/CommentBlock';
import { GridBox } from '../commentBlock/styles';

const MainBookCard = () => {
  const [info, setInfo] = useState(null);
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/book/card/${id}`);
      if (resp.ok) {
        const result = await resp.json();
        setInfo(result);
      } else {
        setInfo(null);
      }
    };
    if (!showComment) {
      fetchData();
    }
  }, [id, showComment]);

  useEffect(() => {
    const fetchingComments = async () => {
      const resp = await fetch(`/book/comment/book/${id}`);
      if (resp.ok) {
        const result = await resp.json();
        setComment(result);
      }
    };
    if (!showComment) {
      fetchingComments();
    }
  }, [id, showComment]);

  const handleCloseComment = () => {
    setShowComment(false);
  };
  const handleShowComments = () => {
    if (info) {
      setShowComment(true);
    }
  };
  return (
    <>
      {showComment && (
        <Comments
          closeOnClick={handleCloseComment}
          title={info.title}
          bookId={id}
        />
      )}
      <BookCardWrapper>
        {info && (
          <>
            <BookInfo
              title={info.title}
              author={info.author}
              cover={info.cover}
              description={info.description}
              rating={info.rating}
              bookId={info.id}
            />
            <PriceInfo price={info.price} bookId={+id} />
          </>
        )}
        {comment.length > 0 ? (
          comment.map((item) => (
            <CommentBLock
              key={item.id}
              author={item.author_name}
              date={item.created_at}
              rating={item.rating}
              text={item.text}
            />
          ))
        ) : <GridBox>Отзывов нет</GridBox>}
        <ShowComBtn onClick={handleShowComments}>
          Написать отзыв
        </ShowComBtn>
      </BookCardWrapper>
    </>
  );
};

export default MainBookCard;
