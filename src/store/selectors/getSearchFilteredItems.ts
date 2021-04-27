import { createSelector } from 'reselect';
import { RootState } from '../slices';

const getSearchFilter = (state: RootState) => state.todo.search;
const getTodoItems = (state: RootState) => state.todo.items;

export const getSearchFilteredItems = createSelector(
  getSearchFilter,
  getTodoItems,
  (search, items) =>
    items.filter(element => element.title.toUpperCase().indexOf(search.toUpperCase()) != -1)
);
