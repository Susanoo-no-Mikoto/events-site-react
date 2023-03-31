import { FC, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Redux toolkit
import { setLoginOpened, loginSelector, setUser } from '../redux/slices/loginSlice';

//components
import LoginForm from './LoginForm';

//logo
import logo from '../assets/img/logo_dark.png';

//types
import { AppDispatch } from '../redux/store';

//icons
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { AiOutlineUnorderedList, AiOutlineClose } from 'react-icons/ai';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { dataUser } = useSelector(loginSelector);
  const [openedMenu, setOpenedMenu] = useState<boolean>(false);
  const [openedProfile, setOpenedProfile] = useState<boolean>(false);
  const popupProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupProfileRef.current && !event.composedPath().includes(popupProfileRef.current)) {
        setOpenedProfile(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openPoupMenu = () => {
    setOpenedMenu((prev) => !prev);
  };

  const openProfilePopup = () => {
    setOpenedProfile((prev) => !prev);
  };

  const logOutUser = () => {
    dispatch(setUser(null));
    localStorage.removeItem('dataUser');
    navigate('/');
  };

  return (
    <header className="header">
      <LoginForm />
      <div className="container">
        <div className="header__nav">
          <Link to="/">
            <img className="header__logo" src={logo} alt="ЮУТУ" />
          </Link>

          {dataUser !== null ? (
            <div ref={popupProfileRef} onClick={openProfilePopup} className="header__nav__profile">
              <div className="header__nav__profile__content">
                <FaUserCircle size="2.5rem" color="#2a5c5d" />
                <span className="header__nav__profile__content__name-user">
                  {dataUser.user.name}
                </span>
              </div>
              {openedProfile && (
                <div className="header__nav__profile__popup">
                  <ul>
                    <Link to="personalData">
                      <li>
                        <MdOutlineVerifiedUser
                          className="header__nav__profile__popup__data-user-logo"
                          size="1.2rem"
                          color="#2a5c5d"
                        />
                        Личные данные
                      </li>
                    </Link>

                    <li onClick={logOutUser}>
                      <BiLogOut
                        className="header__nav__profile__popup__logout-logo"
                        size="1.2rem"
                        color="#2a5c5d"
                      />
                      Выйти
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div onClick={() => dispatch(setLoginOpened(true))} className="header__nav__login">
              Вход
              <BiLogIn size="1.4rem" />
            </div>
          )}
          <div className="header__nav__wrapper">
            <div className="header__nav__wrapper__menu-burger">
              <AiOutlineUnorderedList
                onClick={openPoupMenu}
                className="header__nav__wrapper__menu-burger__logo"
                size="2.5rem"
                color="#2a5c5d"
              />
              {openedMenu && (
                <div className="overlay" onClick={openPoupMenu}>
                  <ul
                    className="header__nav__wrapper__menu-burger__content"
                    onClick={(e) => e.stopPropagation()}>
                    <AiOutlineClose
                      onClick={openPoupMenu}
                      size="2rem"
                      color="#2a5c5d"
                      className="header__nav__wrapper__menu-burger__content__close"
                    />
                    <Link to="events">
                      <li onClick={() => setOpenedMenu(false)}>Мероприятия</li>
                    </Link>
                    {(dataUser?.user.access === 'Admin' || dataUser?.user.access === 'Moder') && (
                      <Link to="add-event">
                        <li onClick={() => setOpenedMenu(false)}>Добавить мероприятие</li>
                      </Link>
                    )}
                    {dataUser?.user.access === 'Admin' && (
                      <Link to="registration">
                        <li onClick={() => setOpenedMenu(false)}>Регистрация пользователей</li>
                      </Link>
                    )}
                    <Link to="contacts">
                      <li onClick={() => setOpenedMenu(false)}>Контакты</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>

            <ul className="header__nav__wrapper__menu">
              <Link to="events">
                <li>Мероприятия</li>
              </Link>
              {(dataUser?.user.access === 'Moder' || dataUser?.user.access === 'Admin') && (
                <Link to="add-event">
                  <li>Добавить мероприятие</li>
                </Link>
              )}
              {dataUser?.user.access === 'Admin' && (
                <Link to="registration">
                  <li>Регистрация пользователей</li>
                </Link>
              )}
              <Link to="contacts">
                <li>Контакты</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
