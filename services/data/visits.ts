import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  share,
  map,
  tap,
  catchError,
} from 'rxjs/operators';
import { httpService } from '../../services';
import { ISourceVisit, IVisit, IVisitCreateRequestBody } from '../../interfaces';
import { VisitModel } from '../../models';
import BaseDataService from './base';

class VisitsDataService extends BaseDataService {
  private visits: BehaviorSubject<IVisit[]> = new BehaviorSubject<IVisit[]>([]);

  scheduleVisit(data: IVisitCreateRequestBody) {
    return httpService.http('post', {}, '/api/visit/schedule', data);
  }

  getVisits(token: string): Observable<IVisit[]> {
    if (!this.isWaitingResponse && !this.isFetchingComplete) {
      this.fetchVisitsByToken(token).subscribe();
    }

    return this.visits.asObservable()
      .pipe(share());
  }

  getVisit(token: string, visitId: string): Observable<IVisit> {
    if (!this.isWaitingResponse && !this.isFetchingComplete) {
      this.fetchVisitsByToken(token).subscribe();
    }

    return this.visits.asObservable()
      .pipe(
        map((visits: IVisit[]) => (
          visits.find((visit: IVisit) => visit.uuid === visitId) as IVisit
        )),
        share(),
      );
  }

  private setVisits(data: ISourceVisit[]) {
    this.visits.next(data.map((visit: ISourceVisit) => new VisitModel(visit) as IVisit));
  }

  private fetchVisitsByToken(token: string) {
    this.setWaitingStatus(true);

    return httpService.http<ISourceVisit[]>('get', {}, `/api/visit/by-token/${token}`)
      .pipe(
        tap((data: ISourceVisit[]) => {
          this.setWaitingStatus(false);
          this.setVisits(data);
          this.isFetchingComplete = true;
        }),
        catchError(() => {
          this.setWaitingStatus(false);
          return of([]);
        }),
      );
  }
}

export default new VisitsDataService();
