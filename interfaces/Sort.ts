export type ISortCriteria = 'built:desc' | 'price:asc' | 'price:desc';

export interface ISortOption {
  display: string;
  value: ISortCriteria;
}
