import {TodoI} from '../interfaces/todoInterface';
import {REQUEST_STATUS} from '../../api/Api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAddAllTodos, fetchAddTodo, fetchCheckedTodo, fetchRemoveTodo} from '../actions/todoAction';
import {ItemI} from "../interfaces/itemInterface";

export const selectOptions = {
  All: 'Все',
  Completed: 'Выполненные',
  NotCompleted: 'Не выполненные'
};

export const initialState: TodoI = {
  items: [],
  filter: selectOptions.All,
  search: '',
  requestStatus: REQUEST_STATUS.IDLE
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    set_request_status: (state, action: PayloadAction<REQUEST_STATUS>) => {
      state.requestStatus = action.payload;
    },
    set_filter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    set_search: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddTodo.pending, state => {
        state.requestStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchAddTodo.fulfilled, (state, action: PayloadAction<ItemI | undefined>) => {
        state.requestStatus = REQUEST_STATUS.IDLE;
        if(action.payload)
        {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchAddTodo.rejected, (state, action) => {
        if(action.payload) {
          state.requestStatus = REQUEST_STATUS.ERROR;
        }
      })
      .addCase(fetchAddAllTodos.pending, state => {
        state.requestStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchAddAllTodos.fulfilled, (state, action: PayloadAction<ItemI[] | undefined>) => {
        if(action.payload)
        {
          state.items = action.payload;
        }
      })
      .addCase(fetchAddAllTodos.rejected, (state, action) => {
        if(action.payload) {
          state.requestStatus = REQUEST_STATUS.ERROR;
        }
      })
      .addCase(fetchRemoveTodo.pending, state => {
        state.requestStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchRemoveTodo.fulfilled, (state, action: PayloadAction<string | undefined>) => {
        console.log("remove", action.payload)
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(fetchRemoveTodo.rejected, (state, action) => {
        if(action.payload) {
          state.requestStatus = REQUEST_STATUS.ERROR;
        }
      })
      .addCase(fetchCheckedTodo.pending, state => {
        state.requestStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchCheckedTodo.fulfilled, (state, action: PayloadAction<ItemI | undefined>) => {
        state.items.map(item => {
          if (item.id === action.payload?.id) {
            item.isChecked = !item.isChecked;
          }
          return item;
        });
      })
      .addCase(fetchCheckedTodo.rejected, (state, action) => {
        if(action.payload) {
          state.requestStatus = REQUEST_STATUS.ERROR;
        }
      });
  }
});

export const { set_request_status, set_search, set_filter } = todoSlice.actions;
