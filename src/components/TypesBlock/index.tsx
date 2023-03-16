import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//ReduxSlices
import { filterSelector, setTypeId } from '../../redux/slices/filterSlice';

//styles
import styles from './TypesBlock.module.scss';

const Types: FC = () => {
  const types = ['Все', 'Вузовские', 'Региональные', 'Всероссийские', 'Международные'];

  const dispatch = useDispatch();
  const { typeId } = useSelector(filterSelector);

  const onChangeType = (id: number) => {
    dispatch(setTypeId(id));
  };

  return (
    <div className={styles.types}>
      <ul>
        {types.map((type, i) => (
          <li
            key={type}
            onClick={() => onChangeType(i)}
            className={Number(typeId) === i ? styles.active : ' '}>
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Types;
