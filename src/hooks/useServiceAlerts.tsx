import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  DataTypes,
  Route,
  ServiceAlertData,
  UseServiceAlertsData
} from 'types';
import {REQUEST_DOMAIN} from '../constants';
import {get} from 'utils/data';

export function useServiceAlerts (
  routeId?: Route['id']
): UseServiceAlertsData {
  const {t} = useTranslation();
  const [data, setData] = useState<ServiceAlertData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestURL = `${REQUEST_DOMAIN}/alerts/?filter[route]=${routeId}&sort=-severity`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && !data && !error && routeId) {
      get ({
        dataType: DataTypes.ALERT,
        requestURL,
        setData,
        setError,
        setIsLoading,
        t
      });
    }
  }, [t, data, error, requestURL, routeId]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
