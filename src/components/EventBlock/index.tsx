import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

//Redux toolkit
import { loginSelector } from '../../redux/slices/loginSlice';
import { removeEvent } from '../../redux/slices/eventsSlice';

//styles
import styles from './EventBlock.module.scss';

//icons
import { RiDeleteBinLine } from 'react-icons/ri';

interface IEventBlockProps {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  publicationDate: string;
}

//console.log(dataUser);

const EventBlock: FC<IEventBlockProps> = ({ id, name, date, publicationDate }) => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector(loginSelector);

  const fetchDeleteEvent = async (id: number) => {
    if (window.confirm('Вы действительно хотите удалить это мероприятие?')) {
      await axios
        .delete(`/events/${id}`)
        .then(() => {
          dispatch(removeEvent(id));
        })
        .catch((err) => {
          window.scrollTo(0, 0);
          alert(err);
          console.error(err.message);
        });
    }
  };

  return (
    <div className={styles.event}>
      <Link to={`list/${id}`}>
        <h3>{name}</h3>
      </Link>
      {(dataUser?.user.access === 'Admin' || dataUser?.user.access === 'Moder') && (
        <RiDeleteBinLine onClick={() => fetchDeleteEvent(id)} size="20px" color="#b00000" />
      )}
      <p className={styles.event__date}>Актуально до: {date}</p>
      <p className={styles.event__publicationDate}>Дата публикации: {publicationDate}</p>
    </div>
  );
};

export default EventBlock;
