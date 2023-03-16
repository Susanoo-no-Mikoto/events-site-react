import { FC, useState } from 'react';
import axios from '../utils/axios';

//types
import type { FormEvent } from 'react';

//icons
import { AiFillEyeInvisible, AiFillEye, AiOutlineClose } from 'react-icons/ai';

const Registration: FC = () => {
  const [checkPass, setCheckPass] = useState<boolean>(false);
  const [statusRegistration, setStatusRegistration] = useState<string>();
  const [statusVisible, setStatusVisible] = useState<boolean>();

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, surname, access, login, password } = e.target as typeof e.target & {
      name: { value: string };
      surname: { value: string };
      access: { value: string };
      login: { value: string };
      password: { value: string };
    };

    const newUser = {
      name: name.value,
      surname: surname.value,
      access: access.value,
      email: login.value,
      password: password.value,
    };

    await axios
      .post('/register', newUser)
      .then(() => {
        window.scrollTo(0, 0);
        setStatusRegistration('Успешно');
        setStatusVisible(true);
        const target = e.target as HTMLFormElement;
        target.reset();
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        setStatusVisible(true);
        setStatusRegistration('Ошибка!');
        console.error(err.message);
      });
  };

  const onClose = () => {
    setStatusVisible(false);
  };

  return (
    <div className="container">
      {statusRegistration && (
        <div className={!statusVisible ? 'invisible' : ''}>
          <div
            className={`${statusRegistration === 'Успешно' ? 'statusSuccessfull' : 'statusError'}`}>
            <div className="info">
              {statusRegistration}
              <span onClick={onClose}>
                <AiOutlineClose size="1.3rem" color="#fff" />
              </span>
            </div>
          </div>
        </div>
      )}
      <section className="main__content">
        <div className="registration">
          <h2>Регистрация пользователя </h2>
          <form action="" className="registration__form" onSubmit={(e) => registerUser(e)}>
            <input type="text" name="name" placeholder="Имя" required />
            <input type="text" name="surname" placeholder="Фамилия" required />
            <select name="access">
              <option value="User">Пользователь</option>
              <option value="Moder">Модератор</option>
              <option value="Admin">Админ</option>
            </select>
            <input type="text" name="login" placeholder="Логин" required />
            <div className="registration__form__pass">
              <input
                type={checkPass ? 'text' : 'password'}
                name="password"
                placeholder="Пароль"
                required
              />
              <span
                onClick={() => setCheckPass((prev) => !prev)}
                className="registration__form__pass__eye">
                {!checkPass ? <AiFillEye size="1.5rem" /> : <AiFillEyeInvisible size="1.5rem" />}
              </span>
            </div>

            <button type="submit">Зарегистрировать</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Registration;
