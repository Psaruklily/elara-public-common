import React, { MouseEventHandler, useEffect, useRef } from 'react';
import pluralize from 'pluralize';
import { isNull } from 'lodash-es';
import { IProperty, ISelectedProperty } from '../../interfaces';
import { currencyFormatter, bemHelper } from '../../helpers';
import { imagesDataService, navigationStack } from '../../services';
import './styles.scss';

export default function Property(props: IProps) {
  const {
    property,
    onMouseEnter,
    onMouseLeave,
    selectedProperty,
    listElement,
  } = props;
  const propertyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listElement && selectedProperty?.event === 'click' && selectedProperty?.uuid === property?.uuid && !isNull(propertyRef)) {
      const options: any = {
        behavior: 'smooth',
      };

      if (listElement.scrollHeight > listElement.scrollWidth) {
        options.top = (propertyRef?.current?.offsetTop || 0) - listElement?.offsetTop;
      } else {
        options.left = (propertyRef?.current?.offsetLeft || 0) - listElement?.offsetLeft - 11;
      }

      listElement?.scrollTo?.(options);
    }
  }, [selectedProperty?.uuid]);

  return (
    <div
      ref={propertyRef}
      className={bemHelper('Property', { selected: selectedProperty?.uuid === property?.uuid })}
      onClick={() => navigationStack.push(`/${property.uuid}`)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
    >
      <img src={imagesDataService.getHouseThumbnailUrl(property.uuid)} alt="" />

      <div className="Property__details-row">
        <div className="Property__amount">
          <span>{currencyFormatter.format(property.price)}</span>
          <span>/mo</span>
        </div>

        <div className="Property__metrics">
          <span>{pluralize('bed', property.beds, true)}</span>
          <div className="Property__metrics__separator" />
          <span>{pluralize('bath', property.baths, true)}</span>
          <div className="Property__metrics__separator" />
          <span>{`${property.size} sq.ft.`}</span>
        </div>
      </div>

      <div className="Property__details-row">
        <span className="Property__address">{property.address}</span>
      </div>
    </div>
  );
}

interface IProps {
  property: IProperty,
  listElement?: HTMLDivElement | null,
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
  selectedProperty?: ISelectedProperty | null,
}

Property.defaultProps = {
  listElement: null,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  selectedProperty: null,
};
