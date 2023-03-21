import { FC, useState } from 'react';
import axios from '../utils/axios';

//icons
import { AiOutlineClose } from 'react-icons/ai';

//types
import type { FormEvent } from 'react';

const AddEvent: FC = () => {
  const [statusAddEvent, setStatusAddEvent] = useState<string>();
  const [statusVisible, setStatusVisible] = useState<boolean>();

  const addEventDB = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nameEvent, selectType, description, dateEvent, linkEvent } =
      e.target as typeof e.target & {
        nameEvent: { value: string };
        selectType: { value: string };
        description: { value: string };
        dateEvent: { value: string };
        linkEvent: { value: string };
      };

    const currentDate = new Date();
    const Year = currentDate.getFullYear();
    const Month = currentDate.getMonth();
    const Day = currentDate.getDate();
    const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const userLocalStorage = localStorage.getItem('dataUser');
    const currentUser = userLocalStorage && JSON.parse(userLocalStorage);

    const newEvent = {
      name: nameEvent.value,
      type: Number(selectType.value),
      description: description.value,
      date: dateEvent.value.replace(/(\d*)-(\d*)-(\d*)/, '$3-$2-$1'),
      publicationDate: Day + '-' + fMonth[Month] + '-' + Year,
      whoPublished: currentUser.user.surname + ' ' + currentUser.user.name,
      link: linkEvent.value,
    };

    await axios
      .post('/events', newEvent)
      .then(() => {
        window.scrollTo(0, 0);
        setStatusAddEvent('Успешно');
        setStatusVisible(true);
        const target = e.target as HTMLFormElement;
        target.reset();
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        setStatusVisible(true);
        setStatusAddEvent('Ошибка!');
        console.error(err.message);
      });
  };

  const onClose = () => {
    setStatusVisible(false);
  };

  return (
    <div className="container">
      {statusAddEvent && (
        <div className={!statusVisible ? 'invisible' : ''}>
          <div
            className={`${
              statusAddEvent === 'Успешно'
                ? 'invisible__statusSuccessfull'
                : 'invisible__statusError'
            }`}>
            <div className={'invisible__info'}>
              {statusAddEvent}
              <span onClick={onClose}>
                <AiOutlineClose size="1.3rem" color="#fff" />
              </span>
            </div>
          </div>
        </div>
      )}
      <section className="content">
        <div className="add-event">
          <h2>Добавление мероприятия</h2>
          <form action="" className="add-event__form" onSubmit={(e) => addEventDB(e)}>
            <label htmlFor="name-event">Название мероприятия</label>
            <input
              type="text"
              id="name-event"
              name="nameEvent"
              placeholder="Название мероприятия"
              required
            />
            <p>Тип мероприятия</p>
            <select name="selectType">
              <option value={1}>Вузовское</option>
              <option value={2}>Региональное</option>
              <option value={3}>Всероссийское</option>
              <option value={4}>Международное</option>
            </select>
            <textarea name="description" placeholder="Описание..." required></textarea>
            <label htmlFor="date-event">Дата мероприятия</label>
            <input type="date" id="date-event" name="dateEvent" required />
            <label htmlFor="link-event">Ссылка</label>
            <input type="text" id="link-event" name="linkEvent" />
            <button>Отправить</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddEvent;
