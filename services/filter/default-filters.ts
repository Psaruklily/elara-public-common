import { IFilters } from '../../interfaces';

const defaultFilters: IFilters = {
  price: {
    gte: 0,
    lte: -1,
  },
  beds: {
    gte: -1,
  },
  baths: {
    gte: -1,
  },
  size: {
    gte: 0,
    lte: -1,
  },
  built: {
    gte: -1,
    lte: -1,
  },
  propertyType: -1,
};

export default defaultFilters;
