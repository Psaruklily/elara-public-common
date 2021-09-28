import {
  get,
  forEach,
  set,
  isString,
  isArray,
  isNull,
  isUndefined,
} from 'lodash-es';
import { IObject } from '../interfaces';

export default abstract class AbstractModel implements IObject {
  protected constructor(keysMap: IKeysMap, source?: IObject) {
    forEach(keysMap, (target: IMapper, sourceKey: string) => {
      if (!target) return;

      const sourceValue = get(source, sourceKey);

      if (isNull(sourceValue) || isUndefined(sourceValue)) return;

      if (isString(target)) {
        set(this, target, sourceValue);

        return;
      }

      if (isArray(target)) {
        target.forEach((item) => {
          set(this, item.key, item.transform(sourceValue));
        });

        return;
      }

      set(this, target.key, target.transform(sourceValue));
    });
  }
}

interface IKeysMap {
  [key: string]: IMapper;
}

type IMapper = string | null | IMapperObj | IMapperObj[];

interface IMapperObj {
  key: string;
  transform: Function;
}
