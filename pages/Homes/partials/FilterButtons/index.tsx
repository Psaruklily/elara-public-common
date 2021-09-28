import React, { useState } from 'react';
import { IDeviceModel } from '../../../../interfaces';
import { useSubscription } from '../../../../hooks';
import { deviceManager } from '../../../../services';
import FilterButton from '../FilterButton';
import './styles.scss';

export default function FilterButtons() {
  const [device, setDevice] = useState<IDeviceModel | null>(null);
  useSubscription(deviceManager.device, setDevice);

  return (
    <div className="FilterButtons">
      <FilterButton
        text={device?.isDesktop ? 'Beds and baths' : 'Bd & ba'}
        filterBy={[
          { label: 'Beds', key: 'beds.gte' },
          { label: 'Baths', key: 'baths.gte' },
        ]}
      />
      <FilterButton
        text="Price"
        filterBy={[
          { label: 'Min', key: 'price.gte' },
          { label: 'Max', key: 'price.lte' },
        ]}
        isRange
      />
      <FilterButton text={device?.isDesktop ? 'More filters' : 'More'} filterBy="all" />
    </div>
  );
}
