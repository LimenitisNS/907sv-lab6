import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { testRender, makeTestStore } from './setupTests';
import { Store } from './store/slices';
import { initialState as todoInitialState } from './store/slices/todoReducer';
import { initialState as alertInitialState } from './store/slices/alertReducer';

const initialState: Store = {
  todo: todoInitialState,
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('render App', () => {
  testRender(<App />, { store });
  const text = screen.getByText('Лабораторная №4 по теме Redux');
  expect(text).toBeInTheDocument();
});
