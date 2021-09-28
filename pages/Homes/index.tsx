import React, { useState } from 'react';
import { IDeviceModel } from '../../interfaces';
import { useSubscription } from '../../hooks';
import { deviceManager } from '../../services';
import HomesPageDesktop from './desktop';
import HomesPageMobile from './mobile';

export default function HomesPage() {
  const [device, setDevice] = useState<IDeviceModel | null>(null);
  useSubscription(deviceManager.device, setDevice);

  if (device?.isMobile) return <HomesPageMobile />;

  return <HomesPageDesktop />;
}
