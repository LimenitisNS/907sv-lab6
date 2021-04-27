import React from 'react';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { ItemI } from '../../store/interfaces/itemInterface';
import { fetchCheckedTodo, fetchRemoveTodo } from '../../store/actions/todoAction';

type ItemProps = {
  item: ItemI;
};

function Item({ item }: ItemProps) {
  const dispatch = useDispatch();
  function dispatchChecked() {
    dispatch(
      fetchCheckedTodo({
        id: item.id,
        isChecked: !item.isChecked
      })
    );
  }

  function dispatchRemove() {
    dispatch(fetchRemoveTodo(item.id));
  }

  return (
    <div className={styles.item}>
      <li>
        <div className={styles.flexItem}>
          <input
            type="checkbox"
            data-testid="checkbox"
            checked={item.isChecked}
            onChange={dispatchChecked}
          />
          <span data-testid="item">{item.title}</span>
          <button data-testid="delete" onClick={dispatchRemove}>
            X
          </button>
        </div>
      </li>
    </div>
  );
}

export default Item;
