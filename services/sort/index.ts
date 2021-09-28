import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { share } from 'rxjs/operators';
import { ISortCriteria, ISortOption } from '../../interfaces';
import sortOptions from './options';

class SortService {
  static INITIAL_STATE: ISortCriteria = sortOptions[0].value;

  private sortCriteria: BehaviorSubject<ISortCriteria> = new BehaviorSubject<ISortCriteria>(SortService.INITIAL_STATE);

  getSortCriteria(): Observable<ISortCriteria> {
    return this.sortCriteria.asObservable()
      .pipe(share());
  }

  setSortCriteria(sortCriteria: ISortCriteria): void {
    this.sortCriteria.next(sortCriteria);
  }

  get sortOptions(): ISortOption[] {
    return sortOptions;
  }

  get currentSortCriteria(): ISortCriteria {
    return cloneDeep(this.sortCriteria.getValue());
  }
}

export default new SortService();
