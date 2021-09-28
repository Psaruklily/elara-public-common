import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/elara-logo.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { ReactComponent as BackIcon } from '../../assets/back-arrow-icon.svg';
import { Input } from '../../components';
import { searchService, deviceManager, navigationStack } from '../../services';
import defaultLocation from '../../services/navigation-stack/default-location';
import { useDebounce, useSubscription } from '../../hooks';
import { ROUTES } from '../../constants';
import { getRouteByUrl, isUrlMatchesRoute } from '../../helpers';
import { IRoute, IDeviceModel, ILocation } from '../../interfaces';
import './styles.scss';

function Header() {
  const [searchCriteria, setSearchCriteria] = useState<string>(searchService.currentSearchCriteria);
  const [device, setDevice] = useState<IDeviceModel | null>(null);
  const [location, setLocation] = useState<ILocation>(defaultLocation);
  const route: IRoute = getRouteByUrl(location.pathname);

  useDebounce(searchCriteria, (value: string) => searchService.setSearchCriteria(value));
  useSubscription(deviceManager.device, setDevice);
  useSubscription(navigationStack.location, setLocation);

  if (device?.isMobile && !route.title) return null;

  return (
    <header className="Header">
      {device?.isDesktop && (
        <>
          <Link className="Header__logo" to={ROUTES.HOMES.route}>
            <Logo />
          </Link>

          {isUrlMatchesRoute(location.pathname, ROUTES.HOMES.route) && (
            <Input
              value={searchCriteria}
              onChange={(event) => setSearchCriteria(event.target.value)}
              placeholder="Search by address"
              IconComponent={SearchIcon}
            />
          )}
        </>
      )}

      {device?.isMobile && (
        <>
          {location.canGoBack && (
            <div
              className="Header__back-button"
              onClick={() => navigationStack.pop()}
              role="button"
              tabIndex={0}
            >
              <BackIcon />
            </div>
          )}

          {isUrlMatchesRoute(location.pathname, ROUTES.HOMES.route) && (
            <Input
              value={searchCriteria}
              onChange={(event) => setSearchCriteria(event.target.value)}
              placeholder="Search by address"
              IconComponent={SearchIcon}
            />
          )}

          {!isUrlMatchesRoute(location.pathname, ROUTES.HOMES.route) && (
            <h1 className="Header__page-title">{route.title}</h1>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
