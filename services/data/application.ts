import { Observable, of } from 'rxjs';
import { share, tap, catchError } from 'rxjs/operators';
import { httpService } from '../../services';
import { IApplication } from '../../interfaces';
import BaseDataService from './base';

class ApplicationDataService extends BaseDataService {
  createApplication(data: IApplication): Observable<any> {
    this.setWaitingStatus(true);

    return httpService.http('post', {}, '/api/lease/application', data)
      .pipe(
        tap(() => this.setWaitingStatus(false)),
        catchError(() => {
          this.setWaitingStatus(false);
          return of(null);
        }),
        share(),
      );
  }
}

export default new ApplicationDataService();
