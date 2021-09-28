// @ts-ignore
import { PROPERTY } from 'picket-node-common/constants/elara';

export default [
  {
    label: 'Type',
    valueKey: 'type',
    formatter: (value: string) => (
      PROPERTY.TYPES[value]?.display || value
    ),
  },
  {
    label: 'Built',
    valueKey: 'built',
  },
  {
    label: 'New Construction',
    valueKey: 'newConstruction',
    formatter: (value: boolean) => (
      value ? 'Yes' : 'No'
    ),
  },
];
