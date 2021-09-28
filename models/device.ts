import { DEVICES } from '../constants';

export default class Device {
  deviceType: string;

  isDesktop: boolean;

  isMobile: boolean;

  constructor(deviceType: string) {
    this.deviceType = deviceType;
    this.isDesktop = deviceType === DEVICES.DESKTOP.key;
    this.isMobile = deviceType === DEVICES.MOBILE.key;
  }
}
