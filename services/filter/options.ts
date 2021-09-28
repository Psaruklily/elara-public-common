// @ts-ignore
import { PROPERTY } from 'picket-node-common/constants/elara';
import { IFilterOptions } from '../../interfaces';
import { enumToSelectOptions } from '../../helpers';

const options: IFilterOptions = {
  'price.gte': [
    { value: 0, display: '0' },
    { value: 1000, display: '$1,000' },
    { value: 1500, display: '$1,500' },
    { value: 2000, display: '$2,000' },
    { value: 2500, display: '$2,500' },
    { value: 3000, display: '$3,000' },
    { value: 4000, display: '$4,000' },
  ],
  'price.lte': [
    { value: -1, display: 'Any' },
    { value: 1000, display: '$1,000' },
    { value: 1500, display: '$1,500' },
    { value: 2000, display: '$2,000' },
    { value: 2500, display: '$2,500' },
    { value: 3000, display: '$3,000' },
    { value: 4000, display: '$4,000' },
  ],
  'beds.gte': [
    { value: -1, display: 'Any' },
    { value: 1, display: '1+' },
    { value: 2, display: '2+' },
    { value: 3, display: '3+' },
    { value: 4, display: '4+' },
    { value: 5, display: '5+' },
  ],
  'baths.gte': [
    { value: -1, display: 'Any' },
    { value: 1, display: '1+' },
    { value: 2, display: '2+' },
    { value: 3, display: '3+' },
    { value: 4, display: '4+' },
    { value: 5, display: '5+' },
  ],
  'size.gte': [
    { value: 0, display: '0' },
    { value: 500, display: '500 sq.ft.' },
    { value: 800, display: '800 sq.ft.' },
    { value: 1200, display: '1200 sq.ft.' },
    { value: 1500, display: '1500 sq.ft.' },
    { value: 2000, display: '2000 sq.ft.' },
    { value: 2500, display: '2500 sq.ft.' },
  ],
  'size.lte': [
    { value: -1, display: 'Any' },
    { value: 500, display: '500 sq.ft.' },
    { value: 800, display: '800 sq.ft.' },
    { value: 1200, display: '1200 sq.ft.' },
    { value: 1500, display: '1500 sq.ft.' },
    { value: 2000, display: '2000 sq.ft.' },
    { value: 2500, display: '2500 sq.ft.' },
  ],
  'built.gte': [
    { value: -1, display: 'Any' },
  ],
  'built.lte': [
    { value: -1, display: 'Any' },
  ],
  propertyType: [
    { value: -1, display: 'Any' },
    ...enumToSelectOptions(PROPERTY.TYPES),
  ],
};

export default options;
