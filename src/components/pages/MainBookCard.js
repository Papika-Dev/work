import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookCardWrapper, ShowComBtn } from '../bookCard/bookCardStyles';
import BookInfo from '../bookCard/BookInfo';
import PriceInfo from '../bookCard/PriceInfo';
import Comments from '../comments/Comments';

const MainBookCard = () => {
  const [info, setInfo] = useState(null);
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
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
    fetchData();
  }, [id]);
  const handleCloseComment = () => {
    setShowComment(false);
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
            />
            <PriceInfo price={info.price} />
          </>
        )}
        <ShowComBtn onClick={() => {if (info) setShowComment(true)}}>
          Написать отзыв
        </ShowComBtn>
      </BookCardWrapper>
    </>
  );
};

export default MainBookCard;
