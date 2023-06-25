import { FC } from 'react';
import { YMaps, Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

interface IYaMapProps {
  width: string;
  height: string;
}

const YaMap: FC<IYaMapProps> = ({ width, height }) => {
  return (
    <YMaps query={{ apikey: import.meta.env.VITE_MAP_KEY }}>
      <Map
        state={{ center: [55.2, 61.34], zoom: 12 }}
        width={width}
        height={height}
        modules={['control.SearchControl']}>
        <ZoomControl options={{ position: { top: 150, left: 10 } }} />
        <Placemark
          modules={['geoObject.addon.balloon']}
          defaultGeometry={[55.184578, 61.285363]}
          options={{
            preset: 'islands#dotIcon',
            iconColor: '#2a5c5d',
          }}
          properties={{
            balloonContentBody: `<h3>ГЛАВНЫЙ КОРПУС</h3>
              <div>г. Челябинск, Курчатовский район, Комсомольский проспект, 113А.</div>
              <p>тел. +7 (351) 214-41-11 (многоканальный).</p>`,
          }}
        />
        <Placemark
          modules={['geoObject.addon.balloon']}
          defaultGeometry={[55.191223, 61.394677]}
          options={{
            preset: 'islands#dotIcon',
            iconColor: '#2a5c5d',
          }}
          properties={{
            balloonContentBody: `<h3>КОРПУС 2</h3>
              <div>г. Челябинск, Калининский район, ул. Кожзаводская 1.</div>
              <p>тел.: +7 (351) 731-01-10, 731-01-18.</p>`,
          }}
        />
        <Placemark
          modules={['geoObject.addon.balloon']}
          defaultGeometry={[55.239983, 61.375256]}
          options={{
            preset: 'islands#dotIcon',
            iconColor: '#2a5c5d',
          }}
          properties={{
            balloonContentBody: `<h3>КОРПУС 1</h3>
              <div>г. Челябинск, Металлургический район, ул. Комаровского 9-а.</div>
              <p>тел.: +7 (351) 726-22-11, 726-22-00.</p>`,
          }}
        />
      </Map>
    </YMaps>
  );
};

export default YaMap;
