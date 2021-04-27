import { makeTestStore, testRender } from '../../setupTests';
import { screen } from '@testing-library/react';
import React from 'react';
import AlertMessage from './AlertMessage';
import { AlertMessageI } from '../../store/interfaces/alertMessageInterface';
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
const error: AlertMessageI = {
  id: 'id',
  message: 'error'
};

test('render alert message', () => {
  testRender(<AlertMessage error={error} />, { store });
  const alert = screen.getByTestId('alert-message');
  expect(alert).toBeInTheDocument();
});

test('render alert message', () => {
  testRender(<AlertMessage error={error} />, { store });
  const alert = screen.getByText('error');
  expect(alert).toBeInTheDocument();
});
