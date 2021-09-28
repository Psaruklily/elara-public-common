import { map } from 'lodash-es';
import { IEnum, IEnumValue, ISelectOption } from '../interfaces';

export const enumToSelectOptions = (sourceEnum: IEnum): ISelectOption[] => (
  map(sourceEnum, (item: IEnumValue): ISelectOption => ({
    value: item.key,
    display: item.display,
  }))
);
