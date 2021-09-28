import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProperty } from '../../../../interfaces';
import { useSubscription } from '../../../../hooks';
import { propertiesDataService, imagesDataService } from '../../../../services';
import { formatDate } from '../../../../helpers';
import './styles.scss';

interface ParamTypes {
  homeId: string;
}

export default function SuccessNotification(props: IProps) {
  const { date } = props;

  const { homeId } = useParams<ParamTypes>();
  const [homeDetails, setHomeDetails] = useState<IProperty | null>(null);
  useSubscription(propertiesDataService.getProperty(homeId), setHomeDetails);

  if (!homeDetails) return null;

  return (
    <div className="SuccessNotification">
      <p>Please check your SMS message to confirm your visit.</p>

      <div className="SuccessNotification__visit-details">
        <img src={imagesDataService.getHouseThumbnailUrl(homeId)} alt="" />

        <div>
          <div className="SuccessNotification__visit-details__row">
            <p>Address</p>
            <p>{homeDetails.address}</p>
          </div>

          <div className="SuccessNotification__visit-details__row">
            <p>Time</p>
            <p>{formatDate(date, 'ddd hh:mm A, MM/DD/YYYY')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IProps {
  date: Date,
}
