import React, { ChangeEvent } from 'react';
import { selectOptions } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import './style.css';
import { set_filter } from '../../store/slices/todoSlice';

function SelectFilter() {
  const options = Object.values(selectOptions);
  const dispatch = useDispatch();
  function selectHandler(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(set_filter(event.target.value));
  }

  return (
    <select data-testid="select" onChange={selectHandler}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectFilter;
