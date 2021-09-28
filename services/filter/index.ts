import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import {
  merge,
  set,
  get,
  cloneDeep,
  reduce,
  isEqual,
  forEach,
  isObject,
} from 'lodash-es';
import {
  IFilters,
  IResetOptions,
  IResetOption,
  IObject, IFilterByItem, ISelectOption,
} from '../../interfaces';
import defaultFilters from './default-filters';
import filterOptions from './options';

class FilterService {
  private filters: BehaviorSubject<IFilters> = new BehaviorSubject<IFilters>(defaultFilters);

  getFilters(): Observable<IFilters> {
    return this.filters.asObservable()
      .pipe(share());
  }

  setFilters(filtersToUpdate: IObject): void {
    this.filters.next(merge(this.currentFilters, filtersToUpdate));
  }

  resetFilters(filters: IResetOptions = 'all'): void {
    if (filters === 'all') {
      this.filters.next(defaultFilters);
      return;
    }

    const newValue = this.currentFilters;
    (filters as IResetOption[]).forEach((filter: IResetOption) => {
      set(newValue, filter, get(defaultFilters, filter));
    });

    this.filters.next(newValue);
  }

  countAppliedFilters(filters: 'all' | IFilterByItem[]): number {
    const { currentFilters } = this;

    if (filters === 'all') {
      return reduce(currentFilters, (result: number, value: number | IObject, key: string) => (
        isEqual(value, defaultFilters[key as keyof IFilters]) ? result : result + 1
      ), 0);
    }

    return filters.reduce((result: number, filter: IFilterByItem) => (
      get(currentFilters, filter.key) === get(defaultFilters, filter.key) ? result : result + 1
    ), 0);
  }

  getFilterOptionsByKey(key: string): ISelectOption[] {
    return get(filterOptions, key, []);
  }

  getFilterOptionByKey(key: string, customOptions?: ISelectOption[]): ISelectOption {
    const { currentFilters } = this;
    const defaultValue = get(currentFilters, key);
    const options = customOptions || this.getFilterOptionsByKey(key);

    return options.find((option: ISelectOption) => option.value === defaultValue) as ISelectOption;
  }

  get requestFilters() {
    const filters = this.filters.getValue();
    const queryParams: string[] = [];

    forEach(filters, (value, key) => {
      if (value?.lte > 0) {
        queryParams.push(this.createQueryParam(key, 'lte', value.lte));
      }

      if (value?.gte > 0) {
        queryParams.push(this.createQueryParam(key, 'gte', value.gte));
      }

      if (!isObject(value) && value !== -1) {
        queryParams.push(this.createQueryParam(key, 'eq', value));
      }
    });

    return queryParams;
  }

  private get currentFilters(): IFilters {
    return cloneDeep(this.filters.getValue());
  }

  private createQueryParam(column: string, operator: string, value: string): string {
    return `${column}:${operator}:${value}`;
  }
}

export default new FilterService();
