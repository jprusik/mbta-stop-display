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

  // Ideally, we'd sort the stops by route order instead of name,
  // but that's unavailable AFAIK
  const requestURL = `${REQUEST_DOMAIN}/stops/?filter[route]=${routeId}&sort=name`;

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
        t
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
