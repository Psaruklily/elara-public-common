import { Observable, of } from 'rxjs';
import { share, tap, catchError } from 'rxjs/operators';
import { httpService } from '../../services';
import { IPerson } from '../../interfaces';
import BaseDataService from './base';

class PersonDataService extends BaseDataService {
  validatePerson(data: IPerson): Observable<boolean> {
    this.setWaitingStatus(true);

    return httpService.http<boolean>('post', {}, '/api/validate-person', data)
      .pipe(
        tap(() => this.setWaitingStatus(false)),
        catchError(() => {
          this.setWaitingStatus(false);
          return of(false);
        }),
        share(),
      );
  }
}

export default new PersonDataService();
