import { createAsyncThunk } from '@reduxjs/toolkit';
import { ItemI } from '../interfaces/itemInterface';
import api, {REQUEST_STATUS} from '../../api/Api';
import { add, getAlertMessage } from '../slices/alertSlice';
import {set_request_status} from "../slices/todoSlice";

export const fetchAddTodo = createAsyncThunk<ItemI | undefined, string, { rejectValue: string }>(
  'todo/fetchAddTodo',
  async (title: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
      const response = await api.add(title);
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
      return response
    } catch (error) {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
      thunkAPI.dispatch(add(getAlertMessage(error.message)));
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAddAllTodos = createAsyncThunk<ItemI[] | undefined, void, { rejectValue: string }>(
  'todo/fetchAddAllTodos',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
      const response = await api.list();
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
      return response;
    } catch (error) {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
      thunkAPI.dispatch(add(getAlertMessage(error.message)));
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRemoveTodo = createAsyncThunk<string | undefined, string, { rejectValue: string }>(
  'todo/fetchRemoveTodo',
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
      await api.remove(id);
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
      return id;
    } catch (error) {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
      thunkAPI.dispatch(add(getAlertMessage(error.message)));
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCheckedTodo = createAsyncThunk<
  ItemI | undefined,
  { id: string; isChecked: boolean },
  { rejectValue: string }
>('todo/fetchCheckedTodo', async (item, thunkAPI) => {
  try {
    thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
    const response = await api.checked(item.id, item.isChecked);
    thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
    return response
  } catch (error) {
    thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
    thunkAPI.dispatch(add(getAlertMessage(error.message)));
    thunkAPI.rejectWithValue(error.message);
  }
});
