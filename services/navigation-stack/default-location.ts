import { ILocation } from '../../interfaces';

const defaultLocation: ILocation = {
  pathname: window.location.pathname,
  canGoBack: false,
};

export default defaultLocation;
