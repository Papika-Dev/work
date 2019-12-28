import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from 'react-icons-kit/fa/close';
import setFilterPrice from '../../../../store/actions/setFilterPrice';
import {
  CustomFilterForm,
  FilterTitle,
  PriceFilter,
  InputBox,
  PriceInpLabel,
  PriceInput,
  CheckBoxLabel,
  InputCheckBox,
  ResetBtn,
} from '../listFilterStyles';
import { SubmitButton } from '../../../profile/profileStyles/myBooksStyles';
import { CloseIcon } from '../../../popUp/styles/styles';
import setSaleFilter from '../../../../store/actions/setSaleFilter';

const CustomFilter = () => {
  const dispatch = useDispatch();
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const { maxPrice, sale } = useSelector((state) => state.products);

  const handleConfirmFilter = (e) => {
    e.preventDefault();
    // set the min < max
    const priceCheck = [(+minValue || 0), (+maxValue || +maxPrice)].sort((a, b) => a > b);
    setMinValue(priceCheck[0]);
    setMaxValue(priceCheck[1]);
    dispatch(setFilterPrice(priceCheck[0], priceCheck[1]));
  };

  const checkValueIsNum = (val, cb) => {
    if (!Number.isNaN(+val)) {
      cb(val);
    }
  };
  const handleResetFilter = () => {
    setMinValue('');
    setMaxValue('');
    dispatch(setFilterPrice(null, null));
  };

  return (
    <CustomFilterForm name="custom_filter" onSubmit={handleConfirmFilter}>
      <FilterTitle>
        Цена
      </FilterTitle>
      <PriceFilter>
        <InputBox>
          <PriceInpLabel htmlFor="min_price">от</PriceInpLabel>
          <PriceInput
            id="min_price"
            value={minValue}
            onChange={(e) => checkValueIsNum(e.target.value, setMinValue)}
          />
          <PriceInpLabel htmlFor="max_price">до</PriceInpLabel>
          <PriceInput
            id="max_price"
            value={maxValue}
            onChange={(e) => checkValueIsNum(e.target.value, setMaxValue)}
          />
        </InputBox>
        <InputBox style={{ marginTop: '15px' }}>
          <CheckBoxLabel htmlFor="sale">
            <InputCheckBox isSale={sale} />
            <input
              type="checkbox"
              id="sale"
              onChange={(e) => {
                dispatch(setSaleFilter(e.target.checked));
              }}
              checked={sale}
            />
            Товары со скидкой
          </CheckBoxLabel>
        </InputBox>
      </PriceFilter>
      {(minValue || maxValue) && (
        <>
          <SubmitButton type="submit" style={{ margin: '14px 20px 0 5px' }}>
            Показать
          </SubmitButton>
          <ResetBtn
            type="button"
            onClick={handleResetFilter}
          >
            <CloseIcon icon={close} size={20} />
          </ResetBtn>
        </>
      )}

    </CustomFilterForm>
  );
};

export default CustomFilter;
