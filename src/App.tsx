import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/slices';
import AuthView from './views/AuthView/AuthView';
import TodoView from './views/TodoView/TodoView';
import { fetchCheckAuth } from './store/actions/authAction';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCheckAuth());
  }, []);

  if (isAuth) {
    return (
      <>
        <TodoView />
      </>
    );
  } else {
    return (
      <>
        <AuthView />
      </>
    );
  }
}

export default App;
