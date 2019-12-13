import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BookReadOnlyStars, ROStarWrapper, SvgStar } from './bookCardStyles';

const BookRating = ({ rating }) => {
  const stars = ['one', 'two', 'three', 'four', 'five'];
  const [intRating, setIntRating] = useState(null);
  const [decRating, setDecRating] = useState(0);

  useEffect(() => {
    const int = Math.floor(rating);
    const dec = Math.round((rating - int) * 100);
    setIntRating(int);
    setDecRating(dec);
  }, [rating]);

  return (
    <div>
      <ROStarWrapper>
        {stars.map((item, ind) => {
          let offSet = false;
          if (intRating === (ind)) {
            offSet = true;
          }
          return (
            <BookReadOnlyStars key={item}>
              <SvgStar
                rating={intRating}
                id={item}
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                isdec={offSet}
              >
                <defs>
                  <linearGradient id="grad">
                    <stop stopColor="#f7be20" offset="0%" />
                    <stop stopColor="#f7be20" offset={`${decRating}%`} />
                    <stop stopColor="#d1d1d1" stopOpacity="0.6" offset={`${decRating}%`} />
                    <stop stopColor="#d1d1d1" stopOpacity="0.6" offset="100%" />
                  </linearGradient>
                </defs>
                <path
                  className="icon"
                  d="M13.5 0L16.5309 8.98278H26.3393L18.4042 14.5344L21.4351 23.5172L13.5 17.9656L5.5649 23.5172L8.59584 14.5344L0.660737 8.98278H10.4691L13.5 0Z"
                />
              </SvgStar>

            </BookReadOnlyStars>
          );
        })}
      </ROStarWrapper>
    </div>
  );
};
BookRating.defaultProps = {
  rating: null,
};
BookRating.propTypes = {
  rating: PropTypes.number,
};

export default BookRating;
