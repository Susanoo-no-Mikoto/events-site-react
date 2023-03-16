import { FC } from 'react';

//styles
import styles from './WeekBlock.module.scss';

interface WeekBlockProps {
  week: string[];
  dateId: number;
  dateValue: string;
  setDateId: (item: string, id: number) => void;
}

const WeekBlock: FC<WeekBlockProps> = ({ week, dateId, dateValue, setDateId }) => {
  return (
    <div className={styles.week}>
      <ul>
        {week.map((elem, i) => (
          <li
            key={elem}
            onClick={() => setDateId(elem, i)}
            className={Number(dateId) === i ? styles.active : ' '}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekBlock;
