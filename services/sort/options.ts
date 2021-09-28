import { ISortOption } from '../../interfaces';

const options: ISortOption[] = [
  { display: 'Newest', value: 'built:desc' },
  { display: 'Price low to high', value: 'price:asc' },
  { display: 'Price high to low', value: 'price:desc' },
];

export default options;
