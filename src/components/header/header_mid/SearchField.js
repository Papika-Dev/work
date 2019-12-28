import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SearchForm, SearchInput } from '../headerStyles';
import setSearchText from '../../../store/actions/setSearchText';
import PopUpSearchResult from './PopUpSearchResult';

const SearchField = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const inpRef = useRef();
  // blur effect for inpField
  document.body.addEventListener('mousedown', (e) => {
    if (!e.target.dataset.search) {
      inpRef.current.blur();
      setIsFocus(false);
    } else {
      // when click on the tip then go back to the inpField
      inpRef.current.focus();
    }
  });

  const handleSetSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchText(searchValue));
  };
  const handleSetInpValue = (val) => {
    inpRef.current.focus();
    setSearchValue(val);
  };

  return (
    <SearchForm onSubmit={handleSetSearch}>
      <SearchInput
        isFocus={isFocus}
        type="text"
        placeholder="Поиск"
        onFocus={() => setIsFocus(true)}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        ref={inpRef}
        data-search="true"
      />
      <PopUpSearchResult
        text={searchValue}
        isFocus={isFocus}
        setValue={handleSetInpValue}
      />
    </SearchForm>
  );
};

export default SearchField;
