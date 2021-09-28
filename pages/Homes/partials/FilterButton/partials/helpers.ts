import {
  get,
  isEmpty,
  omit,
  set,
} from 'lodash-es';
import { filterService } from '../../../../../services';
import { IFilterByItem, IFilters, IObject } from '../../../../../interfaces';

export const onFilterChange = (
  value: any,
  key: string,
  filters: IFilters,
  filtersToUpdate: IObject,
  update: Function,
) => {
  if (get(filters, key) === value) {
    update(omit(filtersToUpdate, key));
    return;
  }

  update(set({ ...filtersToUpdate }, key, value));
};

export const canSave = (filtersToUpdate: IObject): boolean => !isEmpty(filtersToUpdate);

export const onSave = (filtersToUpdate: IObject, update: Function, hideMenu: Function): void => {
  filterService.setFilters(filtersToUpdate);
  update({});
  hideMenu();
};

export const onReset = (filterBy: 'all' | IFilterByItem[], hideMenu: Function): void => {
  if (filterBy === 'all') {
    filterService.resetFilters('all');
  } else {
    filterService.resetFilters(
      filterBy.map(
        (filterByItem: IFilterByItem) => filterByItem.key,
      ),
    );
  }

  hideMenu();
};

export const getEdgeValue = (
  key: string,
  edge: 'gte' | 'lte',
  filtersToUpdate: IObject,
): undefined | number => {
  const [field, edgeFromKey] = key.split('.') as [string, 'gte' | 'lte' | undefined];

  if (!edge || !edgeFromKey || edge === edgeFromKey) return;

  if (edgeFromKey === 'gte') return get(filtersToUpdate, `${field}.lte`);

  return get(filtersToUpdate, `${field}.gte`);
};
