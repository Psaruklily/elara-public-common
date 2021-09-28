import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageNotFound } from '../../pages';
import { useSubscription } from '../../hooks';
import { visitsDataService } from '../../services';
import { IVisit } from '../../interfaces';

interface ParamTypes {
  token: string;
}

function SecureApplicationWrapper(props: IProps) {
  const { children } = props;
  const { token } = useParams<ParamTypes>();
  const [visits, setVisits] = useState<IVisit[]>([]);

  useSubscription(visitsDataService.getVisits(token), setVisits);

  const cantRenderPage: boolean = !visits.length && visitsDataService.isFetchingComplete;

  if (cantRenderPage) return <PageNotFound />;

  return children;
}

interface IProps {
  children: any,
}

export default SecureApplicationWrapper;
