import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

abstract class BaseDataService {
  isFetchingComplete: boolean = false;

  protected waitingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  protected get isWaitingResponse(): boolean {
    return this.waitingStatus.getValue();
  }

  getWaitingStatus(): Observable<boolean> {
    return this.waitingStatus.asObservable()
      .pipe(share());
  }

  protected setWaitingStatus(status: boolean): void {
    this.waitingStatus.next(status);
  }
}

export default BaseDataService;
