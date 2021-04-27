import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { todoSlice } from './todoSlice';
import { alertSlice } from './alertSlice';
import { authSlice } from './authSlice';

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    alert: alertSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
