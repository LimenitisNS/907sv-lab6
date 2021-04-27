import React from 'react';
import { useSelector } from 'react-redux';
import AlertMessage from '../AlertMessage/AlertMessage';
import styles from './style.module.css';
import { RootState } from '../../store/slices';

function Alert() {
  const messages = useSelector((state: RootState) => state.alert.messages);
  return (
    <div data-testid="alert" className={styles.alert}>
      {messages.map(message => (
        <AlertMessage key={message.id} error={message} />
      ))}
    </div>
  );
}

export default Alert;
