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
import Pagination from '../components/Pagination';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPagePastEvents, setCurrentPagePastEvents] = useState<number>(1);
  const [eventsPerPage] = useState<number>(6);

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

  const lastEventIndex = currentPage * eventsPerPage;
  const firstEventIndex = lastEventIndex - eventsPerPage;
  const currentEvents = events.slice(firstEventIndex, lastEventIndex);

  const lastPastEventIndex = currentPagePastEvents * eventsPerPage;
  const firstPastEventIndex = lastPastEventIndex - eventsPerPage;
  const currentPastEvents = pastEvents.slice(firstPastEventIndex, lastPastEventIndex);

  const itemsUp = currentEvents.map((event) => (
    <EventBlock key={event.id} status="events" deleteFun={true} {...event} />
  ));
  const itemsPast = currentPastEvents.map((event) => (
    <EventBlock key={event.id} status="pastEvents" deleteFun={true} {...event} />
  ));
  const skeletons = [...new Array(5)].map((_, i) => <Skeleton key={i} />);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const paginatePastEvents = (pageNumber: number) => setCurrentPagePastEvents(pageNumber);
  const nextPageEvents = () => setCurrentPage((prev) => prev + 1);
  const prevPageEvents = () => setCurrentPage((prev) => prev - 1);
  const nextPagePastEvents = () => setCurrentPagePastEvents((prev) => prev + 1);
  const prevPagePastEvents = () => setCurrentPagePastEvents((prev) => prev - 1);
  const paginateReset = () => {
    setCurrentPage(1);
    setCurrentPagePastEvents(1);
  };

  return (
    <div className="container">
      <div className="top-content">
        <SelectDate paginateReset={paginateReset} />
        <Search paginateReset={paginateReset} />
      </div>
      {statusEvents === 'error' ? (
        <div className="error-info">
          <h1>Произошла ошибка!😕</h1>
          <p>Не удалось получить мероприятия!</p>
        </div>
      ) : (
        <div className="events">
          {/* <h1>Мероприятия</h1> */}
          <TypesBlock paginateReset={paginateReset} />
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
                {!events.length && statusEvents === 'successful' && (
                  <div className="nothing-found">
                    <p>Ничего не найдено!😕</p>
                  </div>
                )}
              </div>
              {Math.ceil(events.length / eventsPerPage) === 1 ? (
                ''
              ) : (
                <Pagination
                  currentPage={currentPage}
                  eventsPerPage={eventsPerPage}
                  totalEvents={events.length}
                  paginate={paginate}
                  prevPage={prevPageEvents}
                  nextPage={nextPageEvents}
                />
              )}
            </>
          ) : (
            <>
              <h2>Прошедшие мероприятия</h2>
              <div className="events__list">
                <>{statusPastEvents === 'loading' ? skeletons : itemsPast}</>
                {!itemsPast.length && statusPastEvents === 'successful' && (
                  <div className="nothing-found">
                    <p>Ничего не найдено!😕</p>
                  </div>
                )}
              </div>
              {Math.ceil(pastEvents.length / eventsPerPage) === 1 ? (
                ''
              ) : (
                <Pagination
                  currentPage={currentPagePastEvents}
                  eventsPerPage={eventsPerPage}
                  totalEvents={pastEvents.length}
                  paginate={paginatePastEvents}
                  prevPage={prevPagePastEvents}
                  nextPage={nextPagePastEvents}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
