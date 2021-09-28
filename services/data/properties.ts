import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of,
} from 'rxjs';
import {
  share,
  map,
  tap,
  catchError,
  debounceTime,
} from 'rxjs/operators';
import {
  searchService,
  sortService,
  filterService,
  httpService,
} from '../../services';
import { IProperty, IRange, ISourceProperty } from '../../interfaces';
import { PropertyModel } from '../../models';
import BaseDataService from './base';

class PropertiesDataService extends BaseDataService {
  private properties: BehaviorSubject<IProperty[]> = new BehaviorSubject<IProperty[]>([]);

  private buildYearRange: BehaviorSubject<IRange> = new BehaviorSubject<IRange>({});

  constructor() {
    super();
    combineLatest([
      sortService.getSortCriteria(),
      searchService.getSearchCriteria(),
      filterService.getFilters(),
    ])
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.fetchProperties().subscribe();
      });
  }

  getBuildYearRange(): Observable<IRange> {
    return this.buildYearRange.asObservable()
      .pipe(share());
  }

  getProperties(): Observable<IProperty[]> {
    return this.properties.asObservable()
      .pipe(share());
  }

  getProperty(id: string): Observable<IProperty> {
    return this.properties.asObservable()
      .pipe(
        map((properties: IProperty[]) => (
          properties.find((property: IProperty) => property.uuid === id) as IProperty
        )),
        share(),
      );
  }

  private setProperties(data: ISourceProperty[]) {
    const currentProperties = this.properties.getValue();

    if (!currentProperties.length) {
      this.buildYearRange.next(data.reduce((range: IRange, property: ISourceProperty) => {
        const { builtYear } = property.houseDetails;

        if (!range.gte || !range.lte) {
          return {
            gte: builtYear,
            lte: builtYear,
          };
        }

        if (builtYear < range.gte) {
          return {
            ...range,
            gte: builtYear,
          };
        }

        if (builtYear > range.lte) {
          return {
            ...range,
            lte: builtYear,
          };
        }

        return range;
      }, {}));
    }

    this.properties.next(data.map((property: ISourceProperty) => new PropertyModel(property) as IProperty));
  }

  fetchProperties(): Observable<ISourceProperty[]> {
    this.setWaitingStatus(true);

    return httpService.http<ISourceProperty[]>(
      'get',
      {
        params: {
          // TODO: fix after backend changes
          filter: [
            ...filterService.requestFilters,
            ...searchService.requestSearchQueryParams,
          ],
          // sort: sortService.currentSortCriteria,
        },
      },
      '/api/property/public',
    ).pipe(
      tap((data: ISourceProperty[]) => {
        this.setWaitingStatus(false);
        this.setProperties(data);
      }),
      catchError(() => {
        this.setWaitingStatus(false);
        return of([]);
      }),
    );
  }
}

export default new PropertiesDataService();
