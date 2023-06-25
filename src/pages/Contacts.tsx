import { FC } from 'react';
import YaMap from '../components/Map';

const Contacts: FC = () => {
  return (
    <div className="container">
      <div className="contacts">
        <YaMap width="100%" height="550px" />
        <div className="contacts__block">
          <div className="contacts__block__items">
            <h3>ГЛАВНЫЙ КОРПУС</h3>
            <div className="contacts__block__items__adress">
              г. Челябинск, Курчатовский район, Комсомольский проспект, 113А.
            </div>
            <p>тел. +7 (351) 214-41-11 (многоканальный).</p>
            <div className="contacts__block__items__e-mail">
              <p>e-mail:</p>
              <a href="mailto:contact@inueco.ru">contact@inueco.ru</a>
            </div>
          </div>
          <div className="contacts__block__items">
            <h3>КОРПУС 1</h3>
            <div className="contacts__block__items__adress">
              г. Челябинск, Металлургический район, ул. Комаровского 9-а.
            </div>
            <p>тел.: +7 (351) 726-22-11, 726-22-00.</p>
            <div className="contacts__block__items__e-mail">
              <p>e-mail:</p>
              <a href="mailto:contact@inueco.ru">contact@inueco.ru</a>
            </div>
          </div>
          <div className="contacts__block__items">
            <h3>КОРПУС 2</h3>
            <div className="contacts__block__items__adress">
              г. Челябинск, Калининский район, ул. Кожзаводская 1.
            </div>
            <p>тел.: +7 (351) 731-01-10, 731-01-18.</p>
            <div className="contacts__block__items__e-mail">
              <p>e-mail:</p>
              <a href="mailto:contact@inueco.ru">contact@inueco.ru</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
