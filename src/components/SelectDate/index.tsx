import { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//ReduxSlices
import { filterSelector, setDateValue, setInputDateValue } from '../../redux/slices/filterSlice';

//styles
import styles from './SelectDate.module.scss';

const SelectDate: FC = () => {
  const dispatch = useDispatch();
  const { inputDateValue } = useSelector(filterSelector);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputDateValue(e.target.value));
    dispatch(setDateValue(e.target.value.replace(/(\d*)-(\d*)-(\d*)/, '$3-$2-$1')));
  };

  return (
    <div className={styles.selectDate}>
      <p>Вас интересует определённая дата?</p>
      <input onChange={onChangeDate} value={inputDateValue} type="date" />
    </div>
  );
};

export default SelectDate;
