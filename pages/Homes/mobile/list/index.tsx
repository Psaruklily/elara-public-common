import React, { useState, Fragment } from 'react';
import pluralize from 'pluralize';
import { IProperty } from '../../../../interfaces';
import { useSubscription } from '../../../../hooks';
import { propertiesDataService } from '../../../../services';
import { Property } from '../../../../components';
import { ReactComponent as MapIcon } from '../../../../assets/map-icon.svg';
import { FilterButtons, SortMenu } from '../../partials';
import './styles.scss';

export default function HomesPageListView({ showMapView }: IProps) {
  const [properties, setProperties] = useState<IProperty[]>([]);
  useSubscription(propertiesDataService.getProperties(), setProperties);

  const homes = properties.map((property: IProperty) => (
    <Fragment key={property.uuid}>
      <Property property={property} />

      {/*<div className="HomesPageListView__property-area">*/}
      {/*  {property.area}*/}
      {/*</div>*/}
    </Fragment>
  ));

  return (
    <div className="HomesPageListView">
      <div className="HomesPageListView__filters-row">
        <FilterButtons />

        <div
          className="HomesPageListView__filters-row__button-map"
          onClick={showMapView}
          role="button"
          tabIndex={0}
        >
          <MapIcon />
          <span>Map</span>
        </div>
      </div>

      <div className="HomesPageListView__sort-row">
        <p>{`${pluralize('home', homes.length, true)} available`}</p>

        <SortMenu />
      </div>

      <div className="HomesPageListView__properties">
        {homes}
      </div>
    </div>
  );
}

interface IProps {
  showMapView: () => void;
}
