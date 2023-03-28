import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';

//Redux toolkit
import { setLoginOpened, loginSelector, setUser } from '../redux/slices/loginSlice';

//types
import type { ChangeEvent } from 'react';
import type { FormEvent } from 'react';

//icons
import { MdModeEditOutline } from 'react-icons/md';

const FullEvent: FC = () => {
  interface IEvent {
    name: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    link: string;
  }

  const { id } = useParams();
  const { dataUser } = useSelector(loginSelector);
  const [event, setEvent] = useState<IEvent>();
  const [h2Change, setH2Change] = useState<boolean>(false);
  const [descriptionChange, setDescriptionChange] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/events/' + id);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!event) {
    return (
      <div className="container">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  const fetchH2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nameEvent } = e.target as typeof e.target & {
      nameEvent: { value: string };
    };

    const newEventName = { name: nameEvent.value };

    await axios
      .patch(`/events/${id}`, newEventName)
      .then(() => {
        setH2Change((prev) => !prev);
        setReload((prev) => !prev);
        const target = e.target as HTMLFormElement;
        target.reset();
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        alert(err);
        console.error(err.message);
      });
  };

  const fetchDescription = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { description } = e.target as typeof e.target & {
      description: { value: string };
    };

    const newDescription = { description: description.value };

    await axios
      .patch(`events/${id}`, newDescription)
      .then(() => {
        setDescriptionChange((prev) => !prev);
        setReload((prev) => !prev);
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        alert(err);
        console.error(err.message);
      });
  };

  const onClickH2Change = () => {
    setH2Change((prev) => !prev);
  };

  const onClickDescriptionChange = () => {
    setDescriptionChange((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="fullEvent">
        <div className="fullEvent__h2">
          {h2Change ? (
            <form onSubmit={(e) => fetchH2(e)}>
              <input type="text" name="nameEvent" />
              <button>Готово</button>
            </form>
          ) : (
            <h2>{event.name}</h2>
          )}
          {(dataUser?.user.access === 'Admin' || dataUser?.user.access === 'Moder') && (
            <MdModeEditOutline onClick={onClickH2Change} size="30px" color="#2a5c5d" />
          )}
        </div>

        <div className="fullEvent__dateEvent">Мероприятие состоится: {event.date}</div>
        <div className="fullEvent__description">
          {descriptionChange ? (
            <form onSubmit={(e) => fetchDescription(e)}>
              <textarea name="description" defaultValue={event.description}></textarea>
              <button>Готово</button>
            </form>
          ) : (
            <div className="fullEvent__description__content">{event.description}</div>
          )}
          {(dataUser?.user.access === 'Admin' || dataUser?.user.access === 'Moder') && (
            <MdModeEditOutline onClick={onClickDescriptionChange} size="30px" color="#2a5c5d" />
          )}
        </div>
        <div className="fullEvent__contactInfo">Контактная информация:</div>
        <div className="fullEvent__link">
          Подробнее тут: <br />
          <Link to={event.link}>{event.link}</Link>{' '}
        </div>
        <div className="fullEvent__publicationDate">
          Опубликовано: {event.publicationDate} - {event.whoPublished}
        </div>
      </div>
    </div>
  );
};

export default FullEvent;
