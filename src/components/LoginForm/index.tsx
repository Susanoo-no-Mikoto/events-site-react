import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

//Redux toolkit
import { loginSelector, setLoginOpened, setUser } from '../../redux/slices/loginSlice';

//styles
import styles from './LoginForm.module.scss';

//icons
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

//types
import { AppDispatch } from '../../redux/store';
import type { FormEvent } from 'react';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loginOpened } = useSelector(loginSelector);
  const [checkPass, setCheckPass] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const scrollController = {
    disabledScroll() {
      document.body.style.cssText = 'overflow: hidden';
    },
    enableScroll() {
      document.body.style.cssText = 'overflow: auto';
    },
  };

  const onClose = () => {
    dispatch(setLoginOpened(false));
    setError(false);
  };

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    let dataUser = {
      email: email.value,
      password: password.value,
    };

    await axios
      .post('/login', dataUser)
      .then(({ data }) => {
        dispatch(setUser({ ...data }));
        localStorage.setItem('dataUser', JSON.stringify({ ...data }));
        const target = e.target as HTMLFormElement;
        target.reset();
        onClose();
        navigate('/');
      })
      .catch((err) => {
        setError(true);
        console.error(err.message);
      });
  };

  loginOpened ? scrollController.disabledScroll() : scrollController.enableScroll();

  return (
    <div
      onMouseDown={onClose}
      className={`${styles.overlay} ${loginOpened ? styles.overlayVisible : ''}`}>
      <div onMouseDown={(e) => e.stopPropagation()} className={styles.login}>
        <h2 className={styles.login__h2}>
          Вход{' '}
          <AiOutlineClose onClick={onClose} size="2.5rem" className={styles.login__h2__close} />
        </h2>
        {error && (
          <div className={styles.login__err}>
            Ошибка! Проверьте введённые данные и повторите попытку.
          </div>
        )}
        <form action="" className={styles.login__form} onSubmit={(e) => loginUser(e)}>
          <input type="text" name="email" placeholder="Введите логин..." />
          <div className={styles.login__form__pass}>
            <input
              type={checkPass ? 'text' : 'password'}
              name="password"
              placeholder="Введите пароль..."
            />
            <span
              onClick={() => setCheckPass((prev) => !prev)}
              className={styles.login__form__pass__eye}>
              {!checkPass ? <AiFillEye size="1.5rem" /> : <AiFillEyeInvisible size="1.5rem" />}
            </span>
          </div>

          <button>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
