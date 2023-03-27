import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {DataTypes, RouteData, UseRoutesData} from 'types';
import {REQUEST_DOMAIN} from '../constants';
import {get} from 'utils/data';

export function useRoutes (): UseRoutesData {
  const {t} = useTranslation();
  const [data, setData] = useState<RouteData | null | undefined>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestURL = `${REQUEST_DOMAIN}/routes/?sort=type,short_name,long_name,description`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && !data && !error) {
      get ({
        dataType: DataTypes.ROUTE,
        requestURL,
        setData,
        setError,
        setIsLoading,
        t
      });
    }

    return () => {
      unmounted = true;
    };
  }, [t, data, error, requestURL]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
