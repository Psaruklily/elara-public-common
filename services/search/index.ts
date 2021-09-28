import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

class SearchService {
  private searchCriteria: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getSearchCriteria(): Observable<string> {
    return this.searchCriteria.asObservable()
      .pipe(share());
  }

  setSearchCriteria(searchCriteria: string): void {
    this.searchCriteria.next(searchCriteria);
  }

  get currentSearchCriteria(): string {
    return this.searchCriteria.getValue();
  }

  get requestSearchQueryParams(): string[] {
    const queryParams: string[] = [];
    const addressSearchCriteria = this.searchCriteria.getValue();

    if (addressSearchCriteria) queryParams.push(`address:iLike:%${this.searchCriteria.getValue()}%`);

    return queryParams;
  }
}

export default new SearchService();
