import { FC, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//Redux toolkit
import { fetchEvents, fetchPastEvents, eventsSelector } from '../redux/slices/eventsSlice';
import { filterSelector, setFilters } from '../redux/slices/filterSlice';

//types
import { AppDispatch } from '../redux/store';

//components
import EventBlock from '../components/EventBlock';
import SelectDate from '../components/SelectDate';
import TypesBlock from '../components/TypesBlock';
import Search from '../components/Search';
import Skeleton from '../components/EventBlock/Skeleton';

//icons
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const Events: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, typeId, dateValue } = useSelector(filterSelector);
  const { events, pastEvents, statusEvents, statusPastEvents } = useSelector(eventsSelector);
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const [changeList, setChangeList] = useState<boolean>(false);

  const getEvents = async () => {
    const search = searchValue ? `&name_like=${searchValue}` : '';
    const type = typeId > 0 ? `type=${typeId}` : '';
    const date = dateValue ? `&date=${dateValue}` : '';

    dispatch(fetchEvents({ search, type, date }));
    dispatch(fetchPastEvents({ search, type, date }));
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
    //window.scrollTo(0, 0);
    if (!isSearch.current) {
      getEvents();
    }
    isSearch.current = false;
  }, [searchValue, typeId, dateValue]);

  const onClickArrow = () => {
    setChangeList((prev) => !prev);
  };

  const itemsUp = events.map((event) => (
    <EventBlock key={event.id} status="events" deleteFun={true} {...event} />
  ));
  const itemsPast = pastEvents.map((event) => (
    <EventBlock key={event.id} status="pastEvents" deleteFun={true} {...event} />
  ));
  const skeletons = [...new Array(5)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="top-content">
        <SelectDate />
        <Search />
      </div>
      {statusEvents === 'error' ? (
        <div className="error-info">
          <h1>Произошла ошибка!😕</h1>
          <p>Не удалось получить мероприятия!</p>
        </div>
      ) : (
        <div className="events">
          {/* <h1>Мероприятия</h1> */}
          <TypesBlock />
          <div className={!changeList ? 'events__arrow-right' : 'events__arrow-left'}>
            {!changeList ? (
              <div className="events__arrow-right__item" onClick={onClickArrow}>
                <p>Прошедшие</p>
                <FaArrowRight size="25px" color="#2a5c5d" />
              </div>
            ) : (
              <div className="events__arrow-left__item" onClick={onClickArrow}>
                <FaArrowLeft size="25px" color="#2a5c5d" />
                <p>Актуальные</p>
              </div>
            )}
          </div>

          {!changeList ? (
            <>
              <h2>Актуальные мероприятия</h2>
              <div className="events__list">
                <>{statusEvents === 'loading' ? skeletons : itemsUp}</>
              </div>
              {!events.length && statusEvents === 'successful' && (
                <div className="nothing-found">
                  <p>Ничего не найдено!😕</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h2>Прошедшие мероприятия</h2>
              <div className="events__list">
                <>{statusPastEvents === 'loading' ? skeletons : itemsPast}</>
              </div>
              {!itemsPast.length && statusPastEvents === 'successful' && (
                <div className="nothing-found">
                  <p>Ничего не найдено!😕</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
