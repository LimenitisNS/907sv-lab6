import React, { useEffect, useState } from 'react';
import { AlertMessageI } from '../../store/interfaces/alertMessageInterface';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/slices';
import { remove } from '../../store/slices/alertSlice';

type AlertMessagePost = {
  error: AlertMessageI;
};

function AlertMessage({ error }: AlertMessagePost) {
  const dispatch = useDispatch();
  const [fadeIn, setFadeIn] = useState(styles.fadeInLeft);
  const delay = useSelector((state: RootState) => state.alert.delay);

  useEffect(() => {
    const timeout = setTimeout(() => removeDispatch(), delay);
    return () => clearTimeout(timeout);
  }, []);

  function removeDispatch() {
    setFadeIn(styles.fadeOut);
    setTimeout(() => dispatch(remove(error.id)), 1000);
  }

  return (
    <div
      onClick={removeDispatch}
      data-testid="alert-message"
      className={styles.error_message + ' ' + styles.animate + ' ' + fadeIn}
    >
      <span>{error.message}</span>
    </div>
  );
}

export default AlertMessage;
