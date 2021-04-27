import { AlertI } from '../interfaces/alertinterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessageI } from '../interfaces/alertMessageInterface';

export function getAlertMessage(error: string): AlertMessageI {
  return {
    id: Math.random().toString(36).substr(2),
    message: error
  };
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    messages: [],
    delay: 3000
  } as AlertI,
  reducers: {
    add: (state, action: PayloadAction<AlertMessageI>) => {
      state.messages.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    }
  }
});

export const { add, remove } = alertSlice.actions;
