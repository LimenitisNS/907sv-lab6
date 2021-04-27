import { AuthI } from '../interfaces/authInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuth, fetchCheckAuth, fetchLogout } from '../actions/authAction';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false
  } as AuthI,
  reducers: {
    set_auth_status: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    }
  },
extraReducers: builder => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<boolean | undefined>) => {
        if(action.payload)
          state.isAuth = action.payload
      })
      .addCase(fetchCheckAuth.fulfilled, (state, action: PayloadAction<boolean | undefined>) => {
        if(action.payload)
          state.isAuth = action.payload
      })
      .addCase(fetchLogout.fulfilled, (state, action: PayloadAction<boolean | undefined>) => {
        if(action.payload)
          state.isAuth = action.payload
      });
  }
});

export const { set_auth_status } = authSlice.actions;
