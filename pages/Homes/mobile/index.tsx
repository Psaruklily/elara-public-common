import React, { useState } from 'react';
import HomesPageMapView from './map';
import HomesPageListView from './list';

export default function HomesPageMobile() {
  const [view, setView] = useState<IView>('list');

  if (view === 'map') return <HomesPageMapView showListView={() => setView('list')} />;

  return <HomesPageListView showMapView={() => setView('map')} />;
}

type IView = 'list' | 'map';
