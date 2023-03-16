import { FC } from 'react';
import { Link } from 'react-router-dom';

//logo
import logo from '../assets/img/logo-footer.png';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__content__logo">
            <Link to="https://www.inueco.ru/">
              <img src={logo} alt="ЮУТУ" />
            </Link>
            <div>©2023. Южно-Уральский технологический университет.</div>
            <div>Дизайн и разработка сайта: Лаборатория веб-разработки, Фадеев Артём</div>
          </div>
          <div className="footer__content__contacts">
            <div>
              <p>г. Челябинск, Комсомольский пр, 113а</p>
              <a>+7 (351) 214-41-11</a>
            </div>
            <div>
              <p>г. Челябинск, ул. Кожзаводская 1</p>
              <p>+7 (351) 731-01-10</p>
            </div>
            <div>
              <p>г. Челябинск, ул. Комаровского 9а</p>
              <p>+7 (351) 726-22-11</p>
            </div>
            <div className="footer__content__contacts__email">feedbacksite@inueco.ru</div>
            <div>
              <p>Приемная комиссия</p>
              <p>+7 (351) 214-41-11</p>
            </div>
            <div>
              <p>Режим работы:</p>
              <p>Пн - Пт: 8:30 - 17:00</p>
              <p>Сб - Вс: выходной</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
