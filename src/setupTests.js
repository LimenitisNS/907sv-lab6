import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { todoSlice, initialState as todoInitialState } from './store/slices/todoSlice';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const TestProvider = ({ store, children }) => <Provider store={store}>{children}</Provider>;

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}

export function makeTestStore({ initialState = todoSlice.reducer, useMockStore = false } = {}) {
  let store;
  if (useMockStore) {
    if (initialState === undefined) {
      initialState = todoInitialState;
    }
    store = mockStore(initialState);
  } else {
    store = createStore(todoSlice.reducer, initialState);
  }
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}
