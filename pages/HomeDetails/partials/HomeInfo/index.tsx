import React, { ReactElement } from 'react';
import { IProperty } from '../../../../interfaces';
import config from './config';
import './styles.scss';

export default (props: IProps) => {
  const { homeDetails } = props;

  const detailsTable: ReactElement[] = [];
  config.forEach((configItem: IConfigItem, index: number): any => {
    const { label, valueKey, formatter } = configItem;
    const value = formatter
      ? formatter(homeDetails[valueKey as keyof IProperty])
      : homeDetails[valueKey as keyof IProperty];

    if (!value) return null;

    detailsTable.push(
      <div key={`table-cell-label-${index}`} className="HomeInfo__table__cell__label">{label}</div>,
      <div key={`table-cell-value-${index}`} className="HomeInfo__table__cell__value">{value}</div>,
    );
  });

  return (
    <div className="HomeInfo">
      <h2>Home Details</h2>

      <div className="HomeInfo__table">
        {detailsTable}
      </div>
    </div>
  );
};

interface IProps {
  homeDetails: IProperty;
}

interface IConfigItem {
  label: string;
  valueKey: string;
  formatter?: any;
}
