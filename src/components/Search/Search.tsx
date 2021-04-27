import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/slices';
import { set_search } from '../../store/slices/todoSlice';

function Search() {
  const searchString = useSelector((state: RootState) => state.todo.search);
  const dispatch = useDispatch();
  function inputHandler(event: ChangeEvent<HTMLInputElement>) {
    dispatch(set_search(event.target.value));
  }

  return <input data-testid="search" value={searchString} onChange={inputHandler} />;
}

export default Search;
