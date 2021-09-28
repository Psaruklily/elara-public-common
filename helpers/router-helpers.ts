import { find } from 'lodash-es';
import { ROUTES } from '../constants';
import { IRoute } from '../interfaces';

export const isUrlMatchesRoute = (url: string, route: string): boolean => {
  const urlParts = url.split('/');
  const routeParts = route.split('/');

  return !urlParts.some((urlPart: string, index: number) => {
    const routePart = routeParts[index];

    if (routePart?.startsWith(':')) return false;

    return routePart !== urlPart;
  });
};

export const getRouteByUrl = (url: string): IRoute => (
  find(ROUTES, (route: IRoute) => isUrlMatchesRoute(url, route.route)) || ROUTES.DEFAULT
);
