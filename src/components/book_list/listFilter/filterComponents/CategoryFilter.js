import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FilterForm, FilterTitle, Label } from '../listFilterStyles';
import setCategory from './../../../../store/actions/setCategory';

const CategoryFilter = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleCategoryFilter = (value) => {
    if (value !== 'Все') {
      dispatch(setCategory(value));
    } else {
      dispatch(setCategory(''));
    }
  };
  return (
    <FilterForm name="category">
      <FilterTitle>
        Категории
      </FilterTitle>
      {category.map((item) => (
        <Label
          key={item}
          htmlFor={item}
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <input type="radio" name="category" id={item} value={item} />
          {item}
        </Label>
      ))}
    </FilterForm>
  );
};


export default CategoryFilter;
