import { FC } from 'react';

//styles
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено!
      </h1>
      <p className={styles.description}>К сожалени данная страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
