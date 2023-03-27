import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  DataTypes,
  PredictionData,
  Route,
  Stop,
  UsePredictionData
} from 'types';
import {REQUEST_DOMAIN} from '../constants';
import {get} from 'utils/data';

export function useRoutePredictions (
  routeId?: Route['id'],
  routeStopId?: Stop['id']
): UsePredictionData {
  const {t} = useTranslation();
  const [data, setData] = useState<PredictionData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // @TODO use `fields` to reduce response data to only what is used in the app
  const requestURL =
    `${REQUEST_DOMAIN}/predictions/?filter[route]=${routeId}&filter[stop]=${routeStopId}&sort=direction_id,departure_time`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && !data && !error && routeId && routeStopId) {
      get ({
        dataType: DataTypes.PREDICTION,
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
  }, [t, data, error, requestURL, routeId, routeStopId]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
