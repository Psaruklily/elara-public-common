import { ISourceProperty, ISourceHouseDetails, ISchool } from '../interfaces';
import AbstractModel from './abstract-model';

export default class PropertyModel extends AbstractModel {
  constructor(data: ISourceProperty) {
    super(
      {
        uuid: 'uuid',
        address: 'address',
        script: 'script', // missing
        vosState: 'state',
        property_type_fk: 'type', // missing
        size: 'size', // missing
        houseDetails: [
          {
            key: 'coordinates',
            transform: (houseDetails: ISourceHouseDetails) => ({
              lat: houseDetails.latitude,
              lng: houseDetails.longitude,
            }),
          },
          {
            key: 'built',
            transform: (houseDetails: ISourceHouseDetails) => houseDetails.builtYear,
          },
          {
            key: 'newConstruction',
            transform: (houseDetails: ISourceHouseDetails) => houseDetails.buildNew,
          },
          {
            key: 'beds',
            transform: (houseDetails: ISourceHouseDetails) => houseDetails.beds,
          },
          {
            key: 'baths',
            transform: (houseDetails: ISourceHouseDetails) => houseDetails.baths,
          },
          {
            key: 'price',
            transform: (houseDetails: ISourceHouseDetails) => houseDetails.listingData.listPrice,
          },
          {
            key: 'comesWith',
            transform: (houseDetails: ISourceHouseDetails) => houseDetails.internalFeatures,
          },
          {
            key: 'schools',
            transform: (value: ISourceHouseDetails) => {
              const schools: ISchool[] = [];

              if (value.elementarySchool) {
                schools.push({
                  type: 'elementary',
                  name: value.elementarySchool,
                });
              }
              if (value.middleSchool) {
                schools.push({
                  type: 'middle',
                  name: value.middleSchool,
                });
              }
              if (value.highSchool) {
                schools.push({
                  type: 'high',
                  name: value.highSchool,
                });
              }

              return schools;
            },
          },
        ],
      },
      data,
    );
  }
}
