import React from 'react';
import { bemHelper, currencyFormatter } from '../../../../helpers';
import './styles.scss';

const GoogleMapMarker = (props: IGoogleMapMarkerProps) => {
  const { amount, isSelected, selectMarker } = props;

  return (
    <div
      className={bemHelper('HomesGoogleMapMarker', { selected: isSelected })}
      onClick={selectMarker}
      role="button"
      tabIndex={0}
    >
      {currencyFormatter.format(amount)}
    </div>
  );
};

interface IGoogleMapMarkerProps {
  amount: number;
  isSelected: boolean;
  selectMarker: () => void;
  lat: number; // eslint-disable-line react/no-unused-prop-types
  lng: number; // eslint-disable-line react/no-unused-prop-types
}

export default GoogleMapMarker;
