import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { angleDoubleUp } from 'react-icons-kit/fa/angleDoubleUp';
import { angleDoubleDown } from 'react-icons-kit/fa/angleDoubleDown';
import { Icon } from 'react-icons-kit';
import {
  ListControls,
  ListControlsTitle,
  ControlsMainText,
  Select,
} from '../productListStyles';
import setSortType from '../../../../store/actions/setSortType';
import incDecSort from '../../../../store/actions/incDecSort';


const typesOfSort = [{
  name: 'По умолчанию',
  value: 'created_at',
},
{
  name: 'Автору',
  value: 'author',
},
{
  name: 'Цене',
  value: 'price',
},
{
  name: 'Названию',
  value: 'title',
},
];

const Sort = () => {
  const { sort, incDec } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <ListControls>
      <ListControlsTitle>
        Сортирова по:
      </ListControlsTitle>
      <ControlsMainText>
        <Select
          name="typeFilter"
          value={sort}
          onChange={(e) => dispatch(setSortType(e.target.value))}
        >
          {typesOfSort.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </Select>
        {incDec === 'ASC' ? (
          <Icon
            icon={angleDoubleUp}
            style={{ paddingLeft: '5px' }}
            onClick={() => dispatch(incDecSort('DESC'))}
          />
        ) : (
          <Icon
            icon={angleDoubleDown}
            style={{ paddingLeft: '5px' }}
            onClick={() => dispatch(incDecSort('ASC'))}
          />
        )}
      </ControlsMainText>
    </ListControls>
  );
};

export default Sort;
