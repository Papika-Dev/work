import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListControls, NumText } from '../productListStyles';
import setNumPage from '../../../../store/actions/setNumPage';

const PageNum = () => {
  const [page, setPage] = useState([]);
  const { maxCount, maxOnPage, pageNum } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    // calculate the number of posible pages
    const calcNumPage = () => {
      const maxNum = Math.ceil((maxCount / maxOnPage));
      const newArr = [];
      let min = Math.max((pageNum - 4), 1);
      let max = Math.min(5, maxNum);

      if (pageNum >= 5) {
        if ((pageNum + 1) <= maxNum) {
          min = pageNum - 3;
        }
        max = Math.min((pageNum + 1), maxNum);
      }
      for (min; min <= max;) {
        newArr.push(min);
        min += 1;
      }
      setPage(newArr);
    };

    calcNumPage();
  }, [maxCount, maxOnPage, pageNum]);

  return (
    <ListControls style={{ paddingLeft: '40px' }}>
      {page && page.map((item) => (
        <NumText
          key={item}
          isActive={item === pageNum}
          onClick={() => dispatch(setNumPage(item))}
        >
          {item}
        </NumText>
      ))}
    </ListControls>
  );
};


export default PageNum;
