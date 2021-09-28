import React, { ReactElement, useState, useRef } from 'react';
import { Coords } from 'google-map-react';
import pluralize from 'pluralize';
import { IProperty, ISelectedProperty } from '../../../interfaces';
import { propertiesDataService } from '../../../services';
import { useSubscription } from '../../../hooks';
import {
  Property,
  GoogleMap,
} from '../../../components';
import { GoogleMapMarker, FilterButtons, SortMenu } from '../partials';
import './styles.scss';

export default function HomesPageDesktop() {
  const [selectedProperty, setSelectedProperty] = useState<ISelectedProperty | null>(null);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const homesListRef = useRef<HTMLDivElement | null>(null);

  useSubscription(propertiesDataService.getProperties(), setProperties);

  const markers: ReactElement[] = [];
  const homes = properties.map((property: IProperty) => {
    markers.push((
      <GoogleMapMarker
        selectMarker={() => setSelectedProperty({ uuid: property.uuid, event: 'click' })}
        key={`property-marker-${property.uuid}`}
        isSelected={selectedProperty?.uuid === property.uuid}
        amount={property.price}
        lat={property.coordinates.lat}
        lng={property.coordinates.lng}
      />
    ));

    return (
      <Property
        key={property.uuid}
        property={property}
        selectedProperty={selectedProperty}
        listElement={homesListRef?.current}
        onMouseEnter={() => setSelectedProperty({ uuid: property.uuid, event: 'hover' })}
        onMouseLeave={() => setSelectedProperty(null)}
      />
    );
  });

  return (
    <div className="HomesPageDesktop">
      <div className="HomesPageDesktop__filters-row">
        <FilterButtons />

        <SortMenu />
      </div>

      <div className="HomesPageDesktop__content">
        <div className="HomesPageDesktop__homes">
          <p>{`${pluralize('home', homes.length, true)} available`}</p>

          <div
            ref={homesListRef}
            className="HomesPageDesktop__homes__list"
          >
            {homes}
          </div>
        </div>

        {Boolean(properties.length) && (
          <GoogleMap
            markers={markers}
            defaultCenter={properties[0].coordinates}
            center={properties.find((property) => property.uuid === selectedProperty?.uuid)?.coordinates as Coords}
          />
        )}
      </div>
    </div>
  );
}
