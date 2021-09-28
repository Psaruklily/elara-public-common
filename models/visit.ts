import { ISourceProperty, ISourceVisit, IProperty } from '../interfaces';
import { PropertyModel } from '.';
import AbstractModel from './abstract-model';

export default class VisitModel extends AbstractModel {
  constructor(data: ISourceVisit) {
    super(
      {
        uuid: 'uuid',
        personUuid: 'personUuid',
        houseUuid: 'houseUuid',
        beginTs: 'beginTs',
        state: 'state',
        house_uuid: null,
        property: {
          key: 'property',
          transform: (value: ISourceProperty) => new PropertyModel(value) as IProperty,
        },
        person: 'person',
      },
      data,
    );
  }
}
