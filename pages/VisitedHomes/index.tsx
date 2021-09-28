import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscription } from '../../hooks';
import { formatDate } from '../../helpers';
import { visitsDataService, navigationStack, deviceManager } from '../../services';
import { IDeviceModel, IVisit } from '../../interfaces';
import { Property, Button } from '../../components';
import './styles.scss';

interface ParamTypes {
  token: string;
}

export default function VisitedHomesPage() {
  const { token } = useParams<ParamTypes>();
  const [visits, setVisits] = useState<IVisit[]>([]);
  const [device, setDevice] = useState<IDeviceModel | null>(null);

  useSubscription(visitsDataService.getVisits(token), setVisits);
  useSubscription(deviceManager.device, setDevice);

  return (
    <div className="VisitedHomesPage">
      <div className="VisitedHomesPage__content">
        {device?.isDesktop && (
          <h1>My Visited Homes</h1>
        )}
        <p>You are able to apply for one house at a time.</p>

        <div className="VisitedHomesPage__list">
          {visits.map((visit: IVisit) => (
            <div key={visit.uuid}>
              <Property property={visit.property} />

              <div className="VisitedHomesPage__list__item__start-application">
                <div>
                  <span>Visited on</span>
                  <span>{formatDate(visit.beginTs, 'MMM DD, YYYY')}</span>
                </div>

                <Button
                  onClick={() => navigationStack.push(`/visited-homes/${token}/${visit.uuid}/application`)}
                  text="Start application"
                  type="secondary"
                  theme="application-theme"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
