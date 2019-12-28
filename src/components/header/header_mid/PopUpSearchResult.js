import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { PopUpDiv, PopUpRow } from '../headerStyles';


const PopUpSearchResult = ({ text, isFocus, setValue }) => {
  const [match, setMatch] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const { headers } = useSelector((state) => state.products);
  // find match for ~ quick search like tips with possible results
  useEffect(() => {
    if (text && headers) {
      // eslint-disable-next-line no-useless-escape
      const reg = new RegExp(String.raw`\b${text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'gi');
      const allMatchArr = headers.filter((item) => item.match(reg));
      setMatch(allMatchArr);
    } else {
      setMatch(null);
    }
  }, [text, headers, isFocus]);
  // show or hide tips
  useEffect(() => {
    if (match && isFocus && text) {
      setShowTip(true);
    } else {
      setShowTip(false);
    }
  }, [match, isFocus, text]);

  return (
    <PopUpDiv isFocus={isFocus}>
      {showTip && match.map((item) => {
        // hide tip if it same as search text
        if (text.toLowerCase() === item.toLowerCase()) return null;
        return (
          <PopUpRow
            onClick={() => setValue(item)}
            data-search="true"
            key={uniqid()}
          >
            {item}
          </PopUpRow>
        );
      })}
    </PopUpDiv>
  );
};
PopUpSearchResult.defaultProps = {
  text: null,
};

PopUpSearchResult.propTypes = {
  text: PropTypes.string,
  isFocus: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};
export default PopUpSearchResult;
