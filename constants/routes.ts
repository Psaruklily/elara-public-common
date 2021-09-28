import { IRoute } from '../interfaces';

const ROUTES: { [key: string]: IRoute } = {
  HOMES: {
    route: '/',
    title: 'Homes',
  },
  HOME_DETAILS: {
    route: '/:homeId',
    title: 'Home Details',
  },
  VISITED_HOMES: {
    route: '/visited-homes/:token',
    title: 'My Visited Homes',
  },
  VISITED_HOME: {
    route: '/visited-homes/:token/:visitId',
    title: 'Submit Application',
  },
  APPLICATION: {
    route: '/visited-homes/:token/:visitId/application',
    title: 'Submit Application',
  },
  APPLICATION_SUCCESS: {
    route: '/visited-homes/:token/:visitId/application/success',
    title: '',
  },
  DEFAULT: {
    route: '',
    title: '404',
  },
};

export default ROUTES;
