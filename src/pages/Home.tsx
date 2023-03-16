import { FC, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//Redux toolkit
import {
  fetchUpcomingEvents,
  fetchPastEvents,
  setUpcomingDateId,
  setPastDateId,
  setUpcomingDateValue,
  setPastDateValue,
  setFilter,
  homeEventsSelector,
} from '../redux/slices/homeSlice';

//types
import { AppDispatch } from '../redux/store';

//components
import EventBlock from '../components/EventBlock';
import WeekBlock from '../components/WeekBlock';
import Skeleton from '../components/EventBlock/Skeleton';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    upcomingEvents,
    pastEvents,
    upcomingDateId,
    pastDateId,
    upcomingDateValue,
    pastDateValue,
    upcomingStatus,
    pastStatus,
  } = useSelector(homeEventsSelector);
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  let nowPlus = new Date();
  let nowMinus = new Date();
  let timePlus = nowPlus.getTime();
  let timeMinus = nowMinus.getTime();
  nowPlus = new Date(timePlus - (timePlus % 86400000));
  nowMinus = new Date(timeMinus - (timeMinus % 86400000));
  const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  let pWeek: string[] = [];
  for (let i = 0; i < 7; i++, nowMinus.setDate(nowMinus.getDate() - 1)) {
    pWeek.push(
      nowMinus.getDate() - 1 + '-' + fMonth[nowMinus.getMonth()] + '-' + nowMinus.getFullYear(),

      //  +
      // ' ' +
      // days[now.getDay()],
    );
  }

  let uWeek: string[] = [];
  for (let i = 0; i < 7; i++, nowPlus.setDate(nowPlus.getDate() + 1)) {
    uWeek.push(
      nowPlus.getDate() + '-' + fMonth[nowPlus.getMonth()] + '-' + nowPlus.getFullYear(),
      //  +
      // ' ' +
      // days[now.getDay()],
    );
  }

  const getUpcomingEvents = async () => {
    const upcomingDate = upcomingDateValue ? `&date=${upcomingDateValue}` : '';
    dispatch(fetchUpcomingEvents({ upcomingDate }));
  };

  const getPastEvents = async () => {
    const pastDate = pastDateValue ? `&date=${pastDateValue}` : '';
    dispatch(fetchPastEvents({ pastDate }));
  };

  useEffect(() => {
    dispatch(setUpcomingDateValue(upcomingDateValue));
  }, [upcomingDateValue]);

  useEffect(() => {
    dispatch(setPastDateValue(pastDateValue));
  }, [pastDateValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        upcomingDateValue,
        pastDateValue,
        upcomingDateId,
        pastDateId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [upcomingDateValue, pastDateValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilter({ ...params }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getUpcomingEvents();
    }
    isSearch.current = false;
  }, [upcomingDateValue]);

  useEffect(() => {
    if (!isSearch.current) {
      getPastEvents();
    }
    isSearch.current = false;
  }, [pastDateValue]);

  const onChangeUpcomingDateValue = (item: string, id: number) => {
    dispatch(setUpcomingDateValue(item));
    dispatch(setUpcomingDateId(id));
  };

  const onChangePastDateValue = (item: string, id: number) => {
    dispatch(setPastDateValue(item));
    dispatch(setPastDateId(id));
  };

  const upcomingItems = upcomingEvents.map((item) => <EventBlock key={item.id} {...item} />);
  const pastItems = pastEvents.map((item) => <EventBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <section>
        {upcomingStatus === 'error' ? (
          <div className="error-info">
            <h1>Произошла ошибка!😕</h1>
            <p>Не удалось получить ближайшие мероприятия!</p>
          </div>
        ) : (
          <>
            <h1>Ближайшие мероприятия</h1>
            <div className="homeEvents">
              <WeekBlock
                week={uWeek}
                dateId={upcomingDateId}
                dateValue={upcomingDateValue}
                setDateId={onChangeUpcomingDateValue}
              />
              {upcomingStatus === 'loading' ? skeletons : upcomingItems}
              {!upcomingItems.length && upcomingStatus === 'successful' && (
                <div className="nothing-found">
                  <p>На эту дату нет запланированных мероприятий!😕</p>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <section>
        {pastStatus === 'error' ? (
          <div className="error-info">
            <h1>Произошла ошибка!😕</h1>
            <p>Не удалось получить недавно прошедшие мероприятия!</p>
          </div>
        ) : (
          <>
            <h1>Недавно прошедшие</h1>
            <div className="homeEvents">
              <WeekBlock
                week={pWeek}
                dateId={pastDateId}
                dateValue={pastDateValue}
                setDateId={onChangePastDateValue}
              />
              {pastStatus === 'loading' ? skeletons : pastItems}
              {!pastItems.length && pastStatus === 'successful' && (
                <div className="nothing-found">
                  <p>На эту дату нет заплонированных мероприятий!😕</p>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
