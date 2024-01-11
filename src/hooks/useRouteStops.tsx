import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  DataTypes,
  Route,
  StopData,
  UseRouteStopData
} from 'types';
import {REQUEST_DOMAIN} from '../constants';
import {get} from 'utils/data';

export function useRouteStops (
  routeId?: Route['id']
): UseRouteStopData {
  const {t} = useTranslation();
  const [data, setData] = useState<StopData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // `filter[direction_id]=0` implicitly sorts the stops by their order on the route
  const requestURL = `${REQUEST_DOMAIN}/stops/?filter[route]=${routeId}&filter[direction_id]=0`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && !data && !error && routeId) {
      get ({
        dataType: DataTypes.STOP,
        requestURL,
        setData,
        setError,
        setIsLoading,
        t,
        useLocalCache: true
      });
    }
  }, [t, data, error, routeId, requestURL]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
