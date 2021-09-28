export interface IPaginatedResponse<T> {
  data: T;
  itemsCount: number;
  page: number;
  perPage: number;
  nextPage: string;
  prevPage: string;
}
