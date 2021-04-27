import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserI } from '../interfaces/userInterface';
import api, { REQUEST_STATUS } from '../../api/Api';
import { set_request_status } from '../slices/todoSlice';
import { add, getAlertMessage } from '../slices/alertSlice';

export const fetchAuth = createAsyncThunk<boolean | undefined, UserI, { rejectValue: string }>(
  'auth/fetchAuth',
  async (user: UserI, thunkAPI) => {
    try {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
      const response = await api.auth(user.username, user.password);
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
      return response;
    } catch (error) {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
      thunkAPI.dispatch(add(getAlertMessage(error.message)));
    }
  }
);

export const fetchCheckAuth = createAsyncThunk<boolean | undefined, void, { rejectValue: string }>(
  'auth/fetchCheckAuth',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
      const response = await api.checkAuth();
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
      return response;
    } catch (error) {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
      thunkAPI.dispatch(add(getAlertMessage(error.message)));
    }
  }
);

export const fetchLogout = createAsyncThunk<boolean | undefined, void, { rejectValue: string }>(
  'todo/fetchLogout',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.LOADING));
      const response = await api.logout();
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.IDLE));
      return response;
    } catch (error) {
      thunkAPI.dispatch(set_request_status(REQUEST_STATUS.ERROR));
      thunkAPI.dispatch(add(getAlertMessage(error.message)));
    }
  }
);
