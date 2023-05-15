import { FC, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//Redux toolkit
import {
  fetchEvents,
  fetchUpcomingEvents,
  setUpcomingDateValue,
  setUpcomingDateId,
  fetchPastEvents,
  setPastDateValue,
  setPastDateId,
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
    events,
    eventsStatus,
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

  useEffect(() => {
    (async () => {
      await dispatch(fetchEvents());
    })();
    isSearch.current = true;
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(setUpcomingDateValue(getUpcomingDate()[0]));
      dispatch(setPastDateValue(getPastDate()[0]));
      dispatch(setUpcomingDateId(0));
      dispatch(setPastDateId(0));
    }
    isSearch.current = false;
  }, [events]);

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
      dispatch(setUpcomingDateId(params.upcomingDateId));
      dispatch(setPastDateId(params.pastDateId));
      dispatch(setFilter({ ...params }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (upcomingDateValue) {
      getUpcomingEvents();
    }
  }, [upcomingDateValue]);

  useEffect(() => {
    if (pastDateValue) {
      getPastEvents();
    }
  }, [pastDateValue]);

  const getDate = () => {
    let now = new Date();
    let time = now.getTime();
    now = new Date(time - (time % 86400000));
    const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const date = now.getFullYear() + '-' + fMonth[now.getMonth()] + '-' + now.getDate();

    return date;
  };

  const getUpcomingDate = () => {
    let dates: string[] = [];
    for (let i = 0; i < events.length; i++) {
      if (new Date(getDate()) < new Date(events[i].date.split('-').reverse().join('-'))) {
        dates.push(events[i].date);
      }
    }
    dates = dates.filter(function (item, pos) {
      return dates.indexOf(item) == pos;
    });

    dates
      .sort(function (a, b) {
        let dateA: any = new Date(a.split('-').reverse().join('-')),
          dateB: any = new Date(b.split('-').reverse().join('-'));
        return dateA - dateB;
      })
      .slice(0, 6);

    return dates;
  };

  const getPastDate = () => {
    let dates: string[] = [];
    for (let i = 0; i < events.length; i++) {
      if (new Date(getDate()) > new Date(events[i].date.split('-').reverse().join('-'))) {
        dates.push(events[i].date);
      }
    }
    dates = dates.filter(function (item, pos) {
      return dates.indexOf(item) == pos;
    });
    dates
      .sort(function (a, b) {
        let dateA: any = new Date(a.split('-').reverse().join('-')),
          dateB: any = new Date(b.split('-').reverse().join('-'));
        return dateA - dateB;
      })
      .reverse()
      .slice(0, 6);

    return dates;
  };

  const getUpcomingEvents = async () => {
    const upcomingDate = `&date=${upcomingDateValue}`;
    dispatch(fetchUpcomingEvents({ upcomingDate }));
  };

  const getPastEvents = async () => {
    const pastDate = `&date=${pastDateValue}`;
    dispatch(fetchPastEvents({ pastDate }));
  };

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
                week={getUpcomingDate()}
                dateId={upcomingDateId}
                dateValue={upcomingDateValue}
                setDateId={onChangeUpcomingDateValue}
              />
              {upcomingStatus === 'loading' ? skeletons : upcomingItems}
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
                week={getPastDate()}
                dateId={pastDateId}
                dateValue={pastDateValue}
                setDateId={onChangePastDateValue}
              />
              {pastStatus === 'loading' ? skeletons : pastItems}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
