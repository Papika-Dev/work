import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ListControls,
  ControlsMainText,
  ListControlsTitle,
} from '../productListStyles';

const Count = () => {
  const {
    length,
    maxCount,
    maxOnPage,
    pageNum,
  } = useSelector((state) => state.products);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(1);
  useEffect(() => {
    // calc start count number
    const start = Math.max((maxOnPage * (pageNum - 1) + 1), 1);
    setStartNum(start);
  }, [maxOnPage, pageNum]);

  useEffect(() => {
    // calc end count number
    if (length < maxOnPage) {
      setEndNum(maxCount);
    } else {
      setEndNum(length * pageNum);
    }
  }, [maxOnPage, pageNum, length, maxCount]);
  return (
    <ListControls>
      <ControlsMainText>
        <span>
          {startNum}
          -
          {endNum}
        </span>
      </ControlsMainText>
      <ListControlsTitle>
        из
        {` ${maxCount} `}
        товаров
      </ListControlsTitle>
    </ListControls>
  );
};


export default Count;
