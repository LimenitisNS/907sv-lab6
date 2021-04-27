import React from 'react';
import { screen } from '@testing-library/react';
import List from './List';
import { makeTestStore, testRender } from '../../setupTests';
import { Store } from '../../store/slices';
import { initialState as todoInitialState } from '../../store/slices/todoReducer';
import { initialState as alertInitialState } from '../../store/slices/alertReducer';

const initialState: Store = {
  todo: todoInitialState,
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('render list', () => {
  testRender(<List />, { store });
  const list = screen.getByTestId('list');
  expect(list).toBeInTheDocument();
});
