import { FC } from 'react';

//styles
import styles from './Pagination.module.scss';

interface IPaginationProps {
  eventsPerPage: number;
  totalEvents: number;
  currentPage: number;
  currentPagePastEvents?: number;
  paginate: (pageNumber: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}
const Pagination: FC<IPaginationProps> = ({
  eventsPerPage,
  totalEvents,
  currentPage,
  currentPagePastEvents,
  paginate,
  prevPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumbers.map((num) => (
          <li
            className={
              currentPage === num ? styles.pagination__page__active : styles.pagination__page
            }
            key={num}
            onClick={() => paginate(num)}>
            {num}
          </li>
        ))}
      </ul>

      <div className={styles.btnBlock}>
        {currentPage === 1 ? (
          ''
        ) : (
          <button className={styles.btnBlock__btn} onClick={() => prevPage()}>
            Предыдущая
          </button>
        )}

        {currentPage === Math.ceil(totalEvents / eventsPerPage) || totalEvents === 0 ? (
          ''
        ) : (
          <button className={styles.btnBlock__btn} onClick={() => nextPage()}>
            Следующая
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
