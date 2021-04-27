import React, { useEffect } from 'react';
import Item from '../Item/Item';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectFilteredList } from '../../store/selectors/getSelectFilteredList';
import { ItemI } from '../../store/interfaces/itemInterface';
import styles from './style.module.css';
import { fetchAddAllTodos } from '../../store/actions/todoAction';

function List() {
  const list: ItemI[] = useSelector(getSelectFilteredList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddAllTodos());
  }, []);

  return (
    <>
      <ul data-testid="list" className={styles.list}>
        <div>
          {list.map(item => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </ul>
    </>
  );
}

export default List;
