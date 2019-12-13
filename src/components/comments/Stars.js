import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StarLabel, StarInp, StarsWrapper } from './styles';

const Stars = ({ rating }) => {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [pause, setPause] = useState(false);
  // if one of the point was selected save that position
  useEffect(() => {
    if (!one && +rating === 1) {
      setOne(true);
    }
    if (!two && +rating === 2) {
      setTwo(true);
    }
    if (!three && +rating === 3) {
      setThree(true);
    }
    if (!four && +rating === 4) {
      setFour(true);
    }
    if (!five && +rating === 5) {
      setFive(true);
    }
  }, [one, two, three, four, five, rating]);

  // if it was clicked on less rating position , drop prev position
  useEffect(() => {
    setTwo(false);
    setThree(false);
    setFour(false);
    setFive(false);
  }, [rating]);

  const handleOnEnter = (func) => {
    func(true);
    setPause(false);
  };
  // if pause was setted on this star don't reset chosen star
  const handleOnLeave = (func) => {
    if (!pause) {
      func(false);
    }
  };

  return (

    <StarsWrapper>
      <StarLabel
        htmlFor="one"
        className="one"
        one={one}
        two={two}
        three={three}
        four={four}
        five={five}
        onClick={() => setPause(true)}
        onMouseEnter={() => handleOnEnter(setOne)}
        onMouseLeave={() => handleOnLeave(setOne)}
      >
        ★
      </StarLabel>
      <StarLabel
        htmlFor="two"
        className="two"
        two={two}
        three={three}
        four={four}
        five={five}
        onClick={() => setPause(true)}
        onMouseEnter={() => handleOnEnter(setTwo)}
        onMouseLeave={() => handleOnLeave(setTwo)}
      >
        ★
      </StarLabel>
      <StarLabel
        htmlFor="three"
        className="three"
        three={three}
        four={four}
        five={five}
        onClick={() => setPause(true)}
        onMouseEnter={() => handleOnEnter(setThree)}
        onMouseLeave={() => handleOnLeave(setThree)}
      >
        ★
      </StarLabel>

      <StarLabel
        htmlFor="four"
        className="four"
        four={four}
        five={five}
        onClick={() => setPause(true)}
        onMouseEnter={() => handleOnEnter(setFour)}
        onMouseLeave={() => handleOnLeave(setFour)}
      >
        ★
      </StarLabel>
      <StarLabel
        htmlFor="five"
        className="five"
        five={five}
        onClick={() => setPause(true)}
        onMouseEnter={() => handleOnEnter(setFive)}
        onMouseLeave={() => handleOnLeave(setFive)}
      >
        ★
      </StarLabel>

      <div>
        <StarInp type="radio" name="star" value="1" id="one" />
        <StarInp type="radio" name="star" value="2" id="two" />
        <StarInp type="radio" name="star" value="3" id="three" />
        <StarInp type="radio" name="star" value="4" id="four" />
        <StarInp type="radio" name="star" value="5" id="five" />
      </div>
    </StarsWrapper>

  );
};
Stars.defaultProps = {
  rating: null,
};

Stars.propTypes = {
  rating: PropTypes.string,
};

export default Stars;
