import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IDeviceModel, IVisit } from '../../interfaces';
import { useSubscription } from '../../hooks';
import { visitsDataService, navigationStack, deviceManager } from '../../services';
import { Button, Property } from '../../components';
import './styles.scss';

interface ParamTypes {
  token: string;
  visitId: string;
}

export default function VisitedHomePage() {
  const { token, visitId } = useParams<ParamTypes>();
  const [visit, setVisit] = useState<IVisit | null>(null);
  const [visits, setVisits] = useState<IVisit[]>([]);
  const [device, setDevice] = useState<IDeviceModel | null>(null);

  useSubscription(visitsDataService.getVisits(token), setVisits);
  useSubscription(visitsDataService.getVisit(token, visitId), setVisit);
  useSubscription(deviceManager.device, setDevice);

  if (!visit) return null;

  return (
    <div className="VisitedHomePage">
      <div className="VisitedHomePage__content">
        {device?.isDesktop && (
          <h1>Submit Application</h1>
        )}

        <p>
          <span>{`Hi ${visit.person.firstName}, `}</span>
          <span className="VisitedHomePage__smile">:)</span>
        </p>
        <p>We hope you enjoyed your recent visit with Elara. Click the button below to start application.</p>

        <div className="VisitedHomePage__container">
          <Property property={visit.property} />

          <div className="VisitedHomePage__container__buttons">
            <Button
              onClick={() => navigationStack.push(`/visited-homes/${token}/${visit.uuid}/application`)}
              text="Start Application"
              theme="application-theme"
            />

            {visits.length > 1 && (
              <Button
                onClick={() => navigationStack.push(`/visited-homes/${token}`)}
                text="My Visited Homes"
                type="secondary"
                theme="application-theme"
              />
            )}

            <Button
              onClick={() => {}}
              text="Application policy"
              type="text"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
