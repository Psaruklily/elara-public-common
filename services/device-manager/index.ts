import { BehaviorSubject, Observable } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { IDeviceModel } from '../../interfaces';
import { DEVICES } from '../../constants';
import { Device } from '../../models';

class DeviceManager {
  private _deviceType = new BehaviorSubject<string>(DEVICES.DESKTOP.key);

  constructor() {
    this.onResize(window.innerWidth, window.innerHeight);
    this.observeScreenResize();
  }

  get deviceType(): Observable<string> {
    return this._deviceType.asObservable().pipe(share());
  }

  get device(): Observable<IDeviceModel> {
    return this._deviceType.asObservable()
      .pipe(
        map((deviceType: string) => new Device(deviceType)),
        share(),
      );
  }

  isMobile(): Observable<boolean> {
    return this.deviceType
      .pipe(map((deviceType: string) => deviceType === DEVICES.MOBILE.key));
  }

  observeScreenResize(): void {
    let timeout: any;
    window.addEventListener('resize', (event: UIEvent) => {
      clearTimeout(timeout);

      const eventTarget = event?.target as Window;

      timeout = setTimeout(() => this.onResize(eventTarget.innerWidth, eventTarget.innerHeight), 100);
    });
  }

  private onResize(screenWidth: number, screenHeight: number): void {
    const root = document.getElementById('root') as HTMLElement;
    const newDeviceType = this.getDeviceTypeByScreenWidth(screenWidth);

    if (root.offsetHeight !== screenHeight) {
      root.style.height = `${screenHeight}px`;
    }

    if (this.currentDeviceType === newDeviceType) return;

    root.className = newDeviceType;
    this._deviceType.next(newDeviceType);
  }

  private getDeviceTypeByScreenWidth(screenWidth: number) {
    if (screenWidth <= DEVICES.MOBILE.maxWidth) {
      return DEVICES.MOBILE.key;
    }

    return DEVICES.DESKTOP.key;
  }

  private get currentDeviceType(): string {
    return this._deviceType.getValue();
  }
}

export default new DeviceManager();
