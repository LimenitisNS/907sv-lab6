import { createSelector } from 'reselect';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { selectOptions } from '../slices/todoSlice';
import { RootState } from '../slices';

const getSelectFilter = (state: RootState) => state.todo.filter;

export const getSelectFilteredList = createSelector(
  getSearchFilteredItems,
  getSelectFilter,
  (items, filter) => {
    switch (filter) {
      case selectOptions.All: {
        return items;
      }
      case selectOptions.Completed: {
        return items.filter(element => element.isChecked);
      }
      case selectOptions.NotCompleted: {
        return items.filter(element => !element.isChecked);
      }
      default: {
        return items;
      }
    }
  }
);
