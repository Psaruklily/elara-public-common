import { reduce } from 'lodash-es';

export default (baseClass: string, modifiers?: IModifiers): string => {
  if (!modifiers) return baseClass;

  return reduce(modifiers, (result: string, isActive: boolean, modifier: string) => {
    let tmp: string = result;

    if (!result.length) {
      tmp = baseClass;
    }

    if (isActive) {
      tmp += ` ${baseClass}--${modifier}`;
    }

    return tmp;
  }, '');
};

interface IModifiers {
  [key: string]: boolean;
}
