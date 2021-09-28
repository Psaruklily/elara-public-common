import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ILocation } from '../../interfaces';
import defaultLocation from './default-location';

class NavigationStack {
  private _stack: string[] = [defaultLocation.pathname];

  private _location = new BehaviorSubject<ILocation>(defaultLocation);

  private navigateTo: (url: string) => void = () => {};

  init(onHistoryChange: Function, navigateTo: (pathname: string) => void): void {
    this.navigateTo = navigateTo;

    onHistoryChange((location: { pathname: string }, action: 'PUSH' | 'POP') => {
      if (action === 'POP') this.pop(true);
      if (action === 'PUSH') this.push(location.pathname, true);
    });
  }

  push(pathname: string, withoutNavigating: boolean = false): void {
    if (pathname === this.pathname) return;

    if (withoutNavigating) {
      this._stack.push(pathname);
      this._location.next({
        pathname,
        canGoBack: this.canGoBack,
      });

      return;
    }

    this.navigateTo(pathname);
  }

  pop(withoutNavigating: boolean = false): void {
    if (!this.canGoBack) return;

    const { previousPathname } = this;

    if (withoutNavigating) {
      this._stack.pop();
      this._location.next({
        pathname: previousPathname,
        canGoBack: this.canGoBack,
      });
      return;
    }

    this._stack.splice(-2);
    this.navigateTo(previousPathname);
  }

  get canGoBack(): boolean {
    return this._stack.length > 1;
  }

  get pathname(): string {
    return this._stack[this._stack.length - 1];
  }

  get previousPathname(): string {
    return this._stack[this._stack.length - 2];
  }

  get location(): Observable<ILocation> {
    return this._location.asObservable().pipe(share());
  }

  reloadPage(): void {
    window.location.reload();
  }
}

export default new NavigationStack();
