import React, { ReactElement, useState, useRef } from 'react';
import { Coords } from 'google-map-react';
import { useSubscription } from '../../../../hooks';
import { propertiesDataService } from '../../../../services';
import { IProperty, ISelectedProperty } from '../../../../interfaces';
import { GoogleMapMarker, FilterButton } from '../../partials';
import { GoogleMap, Property } from '../../../../components';
import { ReactComponent as ListIcon } from '../../../../assets/list-icon.svg';
import './styles.scss';

export default function HomesPageMapView({ showListView }: IProps) {
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
    <div className="HomesPageMapView">
      <div className="HomesPageMapView__buttons">
        <div
          className="HomesPageMapView__buttons__list"
          onClick={showListView}
          role="button"
          tabIndex={0}
        >
          <ListIcon />
          <span>List</span>
        </div>

        <FilterButton text="Filters" filterBy="all" />
      </div>

      {Boolean(homes.length) && (
        <GoogleMap
          markers={markers}
          defaultCenter={properties[0].coordinates}
          center={properties.find((property) => property.uuid === selectedProperty?.uuid)?.coordinates as Coords}
        />
      )}

      <div
        ref={homesListRef}
        className="HomesPageMapView__properties"
      >
        {homes}
      </div>
    </div>
  );
}

interface IProps {
  showListView: () => void;
}
