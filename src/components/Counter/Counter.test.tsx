import React from 'react';
import { screen } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import Counter from './Counter';
import {RootState } from '../../store/slices';
import { REQUEST_STATUS } from '../../api/Api';

const initialState: RootState = {
  todo: {
    items: [
      {
        id: Math.random().toString(36).substr(2),
        title: 'test',
        isChecked: false
      }
    ],
    filter: 'All',
    search: '',
    requestStatus: REQUEST_STATUS.IDLE
  },
  alert: {
    messages: [],
    delay: 3000
  },
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('counter render', () => {
  testRender(<Counter />, { store });
  let counter = screen.getByText('Всего: 1');
  expect(counter).toBeInTheDocument();
});
