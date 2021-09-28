import { IRange, ISelectOption } from '.';

export interface IFilters {
  price: IRange;
  beds: IRange;
  baths: IRange;
  size: IRange;
  built: IRange;
  propertyType: any;
}

export type IResetOption = 'beds' | 'baths' | 'price.gte' | 'price.lte';
export type IResetOptions = 'all' | IResetOption[] | string[];

export interface IFilterByItem {
  label: string;
  key: IFilterByItemKeys;
}

export type IFilterByItemKeys = 'price.gte' | 'price.lte' | 'beds.gte' | 'baths.gte' | 'size.gte' | 'size.lte' | 'built.gte' | 'built.lte' | 'propertyType';

export type IFilterOptions = {
  [K in IFilterByItemKeys]: ISelectOption[];
}
