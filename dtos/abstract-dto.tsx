import { forEach, set } from 'lodash-es';
import { IObject } from '../interfaces';

export default abstract class AbstractDto implements IObject {
  protected constructor(keysMap: IKeysMap, source: IObject) {
    forEach(keysMap, (target: string, sourceKey: string) => {
      if (!target) return;

      set(this, target, source[sourceKey]);
    });
  }
}

interface IKeysMap {
  [key: string]: string;
}
