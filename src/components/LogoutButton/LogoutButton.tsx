import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../store/actions/authAction';

function LogoutButton() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(fetchLogout());
  }

  return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;
