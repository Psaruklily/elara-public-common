import { IDevice } from '../interfaces';

const DEVICES: { [key: string]: IDevice } = {
  MOBILE: {
    key: 'mobile',
    maxWidth: 800,
  },
  DESKTOP: {
    key: 'desktop',
    maxWidth: Infinity,
  },
};

export default DEVICES;
