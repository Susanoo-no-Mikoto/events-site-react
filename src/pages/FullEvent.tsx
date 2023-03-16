import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const FullEvent: FC = () => {
  interface IEvent {
    name: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    links: string;
  }

  const { id } = useParams();
  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/events/' + id);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!event) {
    return (
      <div className="container">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="fullEvent">
        <h2 className="fullEvent__h2">{event.name}</h2>
        <div className="fullEvent__dateEvent">Мероприятие состоится: {event.date}</div>
        <div className="fullEvent__description">{event.description}</div>
        <div className="fullEvent__contactInfo">Контактная информация:</div>
        <div className="fullEvent__publicationDate">
          Опубликовано: {event.publicationDate} - {event.whoPublished}
        </div>
      </div>
    </div>
  );
};

export default FullEvent;
