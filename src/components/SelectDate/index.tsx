import { FC, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

//ReduxSlices
import { setDateValue } from '../../redux/slices/filterSlice';

//styles
import styles from './SelectDate.module.scss';

const SelectDate: FC = () => {
  const dispatch = useDispatch();

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateValue(e.target.value.replace(/(\d*)-(\d*)-(\d*)/, '$3-$2-$1')));
  };

  return (
    <div className={styles.selectDate}>
      <p>Вас интересует определённая дата?</p>
      <input onChange={onChangeDate} type="date" />
    </div>
  );
};

export default SelectDate;
