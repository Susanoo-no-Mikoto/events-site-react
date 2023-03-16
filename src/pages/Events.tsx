import { FC, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//Redux toolkit
import { fetchEvents, eventsSelector } from '../redux/slices/eventsSlice';
import { filterSelector, setFilters } from '../redux/slices/filterSlice';

//types
import { AppDispatch } from '../redux/store';

//components
import EventBlock from '../components/EventBlock';
import SelectDate from '../components/SelectDate';
import TypesBlock from '../components/TypesBlock';
import Search from '../components/Search';
import Skeleton from '../components/EventBlock/Skeleton';

const Events: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, typeId, dateValue } = useSelector(filterSelector);
  const { events, status } = useSelector(eventsSelector);
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const getEvents = async () => {
    const search = searchValue ? `&name_like=${searchValue}` : '';
    const type = typeId > 0 ? `type=${typeId}` : '';
    const date = dateValue ? `&date=${dateValue}` : '';

    dispatch(fetchEvents({ search, type, date }));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        typeId,
        dateValue: dateValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [typeId, dateValue]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем мероприятия
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getEvents();
    }
    isSearch.current = false;
  }, [searchValue, typeId, dateValue]);

  const items = events.map((event) => <EventBlock key={event.id} {...event} />);
  const skeletons = [...new Array(5)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="top-content">
        <SelectDate />
        <Search />
      </div>
      {status === 'error' ? (
        <div className="error-info">
          <h1>Произошла ошибка!😕</h1>
          <p>Не удалось получить мероприятия!</p>
        </div>
      ) : (
        <div className="events">
          <h1>Мероприятия</h1>
          <TypesBlock />

          <div className="events__list">
            <>{status === 'loading' ? skeletons : items}</>
          </div>
          {!events.length && status === 'successful' && (
            <div className="nothing-found">
              <p>Ничего не найдено!😕</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
