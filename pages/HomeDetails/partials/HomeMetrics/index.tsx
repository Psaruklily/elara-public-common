import React from 'react';
import pluralize from 'pluralize';
import { ReactComponent as SizeIcon } from '../../../../assets/home-size-icon.svg';
import { ReactComponent as BathIcon } from '../../../../assets/home-bath-icon.svg';
import { ReactComponent as BedIcon } from '../../../../assets/home-bed-icon.svg';
import './styles.scss';

export default (props: IProps) => {
  const { beds, baths, size } = props;

  return (
    <div className="HomeMetrics">
      <SizeIcon />
      <span>{pluralize('bed', beds, true)}</span>

      <BathIcon />
      <span>{pluralize('bath', baths, true)}</span>

      <BedIcon />
      <span>{`${size} sq.ft.`}</span>
    </div>
  );
};

interface IProps {
  beds: number;
  baths: number;
  size: number;
}
