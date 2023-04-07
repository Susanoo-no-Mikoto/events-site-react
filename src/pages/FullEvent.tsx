import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//Redux toolkit
import { loginSelector } from '../redux/slices/loginSlice';

//types
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
  const [h2Value, setH2Value] = useState('');
  const [descriptionChange, setDescriptionChange] = useState<boolean>(false);
  const [textEditor, setTextEditor] = useState('');
  const [reload, setReload] = useState<boolean>(false);

  const modules = {
    toolbar: [
      [{ header: [3, 4, 5, 6, false] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
    ],
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/events/' + id);
        setEvent(data);
        setH2Value(data.name);
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

    const newDescription = { description: textEditor };

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
    setH2Value(event.name);
  };

  const onClickDescriptionChange = () => {
    setDescriptionChange((prev) => !prev);
    setTextEditor(event.description);
  };

  return (
    <div className="container">
      <div className="fullEvent">
        <div className="fullEvent__h2">
          {h2Change ? (
            <form onSubmit={(e) => fetchH2(e)}>
              <input
                type="text"
                value={h2Value}
                onChange={(e) => setH2Value(e.target.value)}
                name="nameEvent"
                required
              />
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
              <ReactQuill
                theme="snow"
                modules={modules}
                value={textEditor}
                onChange={setTextEditor}
                className="text-editor"
              />
              <button>Готово</button>
            </form>
          ) : (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: event.description }}></div>
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
