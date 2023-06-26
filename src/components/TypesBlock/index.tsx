import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//ReduxSlices
import {
  filterSelector,
  setTypeId,
  setSearchValue,
  setValue,
  setDateValue,
  setInputDateValue,
} from '../../redux/slices/filterSlice';

//styles
import styles from './TypesBlock.module.scss';

interface ITypesProps {
  paginateReset: () => void;
}

const Types: FC<ITypesProps> = ({ paginateReset }) => {
  const types = ['Все', 'Вузовские', 'Региональные', 'Всероссийские', 'Международные'];

  const dispatch = useDispatch();
  const { typeId } = useSelector(filterSelector);

  const onChangeType = (id: number) => {
    dispatch(setTypeId(id));
    paginateReset();
  };

  const onChangeTypeAll = (id: number) => {
    dispatch(setTypeId(id));
    dispatch(setSearchValue(''));
    dispatch(setDateValue(''));
    dispatch(setValue(''));
    dispatch(setInputDateValue(''));
    paginateReset();
  };

  return (
    <div className={styles.types}>
      <ul>
        {types.map((type, i) => (
          <li
            key={type}
            onClick={i === 0 ? () => onChangeTypeAll(i) : () => onChangeType(i)}
            className={Number(typeId) === i ? styles.active : ' '}>
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Types;
