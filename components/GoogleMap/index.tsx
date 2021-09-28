import React, { ReactElement } from 'react';
import GoogleMapReact, { Coords, ChangeEventValue } from 'google-map-react';
import './styles.scss';

export default function GoogleMap(props: IProps) {
  const {
    defaultCenter,
    defaultZoom,
    markers,
    onChange,
    center,
  } = props;
  return (
    <div className="GoogleMap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY as string }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onChange={onChange}
        center={center}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}

interface IProps {
  defaultCenter?: Coords,
  center?: Coords,
  defaultZoom?: number,
  markers?: ReactElement[],
  onChange?: (value: ChangeEventValue) => any;
}

GoogleMap.defaultProps = {
  defaultCenter: {
    lat: 0,
    lng: 0,
  },
  center: undefined,
  defaultZoom: 14,
  markers: [],
  onChange: () => {},
};
