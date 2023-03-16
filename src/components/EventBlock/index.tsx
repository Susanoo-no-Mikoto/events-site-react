import { FC } from 'react';
import { Link } from 'react-router-dom';

//styles
import styles from './EventBlock.module.scss';

interface IEventBlockProps {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  publicationDate: string;
}

const EventBlock: FC<IEventBlockProps> = ({ id, name, date, publicationDate }) => {
  return (
    <div className={styles.event}>
      <Link to={`list/${id}`}>
        <h3>{name}</h3>
      </Link>

      <p className={styles.event__date}>Актуально до: {date}</p>
      <p className={styles.event__publicationDate}>Дата публикации: {publicationDate}</p>
    </div>
  );
};

export default EventBlock;
