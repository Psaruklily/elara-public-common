import React from 'react';
import { Coords } from 'google-map-react';
import { GoogleMap } from '../../../../components';
import { ReactComponent as GoogleMapMarkerIcon } from '../../../../assets/google-map-marker-icon.svg';
import './styles.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoogleMapMarker = (props: IGoogleMapMarkerProps) => (
  <GoogleMapMarkerIcon className="google-map-marker" />
);

export default (props: IProps) => {
  const { coordinates } = props;

  return (
    <div className="HomeLocation">
      <h2>Location</h2>

      <div className="map">
        <GoogleMap
          markers={[<GoogleMapMarker key="google-map-marker" {...coordinates} />]}
          defaultCenter={coordinates}
          defaultZoom={16}
        />
      </div>
    </div>
  );
};

interface IProps {
  coordinates: Coords;
}

interface IGoogleMapMarkerProps {
  lat: number; // eslint-disable-line react/no-unused-prop-types
  lng: number; // eslint-disable-line react/no-unused-prop-types
}
