import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS } from '../../api/Api';
import styles from './style.module.css';
import { fetchAddTodo } from '../../store/actions/todoAction';
import { RootState } from '../../store/slices';

function Form() {
  const [value, setValue] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const reqStatus = useSelector((state: RootState) => state.todo.requestStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reqStatus === REQUEST_STATUS.LOADING) {
      setDisabled(true);
    }
    if (reqStatus === REQUEST_STATUS.ERROR) {
      setDisabled(false);
    }
    if (reqStatus === REQUEST_STATUS.IDLE) {
      setDisabled(false);
      setValue('');
    }
  }, [reqStatus]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(fetchAddTodo(value));
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmit}>
        <div className={styles.form}>
          <input
            data-testid="input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button disabled={disabled} type="submit" onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
