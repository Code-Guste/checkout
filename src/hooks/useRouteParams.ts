import { useParams } from 'react-router-dom';

import { RouteConfig } from '@Config/routes';

export const useRouteParams = <T extends (typeof RouteConfig)[keyof typeof RouteConfig]>(routeConfig: T) => {
  type UrlParams = Parameters<(typeof routeConfig)['buildLink']>[0];
  // Cannot use generics because it resolves to partial type, and would require a lot of pointless null checks
  return useParams() as unknown as UrlParams extends Record<string, string> ? UrlParams : Record<string, never>;
};
