import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  DataTypes,
  Route,
  ScheduleData,
  Stop,
  UseRouteScheduleData
} from 'types';
import {REQUEST_DOMAIN} from '../constants';
import {get} from 'utils/data';

export function useRouteSchedule (
  routeId?: Route['id'],
  routeStopId?: Stop['id']
): UseRouteScheduleData {
  const {t} = useTranslation();
  const [data, setData] = useState<ScheduleData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestURL = `${REQUEST_DOMAIN}/schedules/?filter[route]=${routeId}&filter[stop]=${routeStopId}&sort=direction_id,departure_time`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && !data && !error && routeId && routeStopId) {
      get ({
        dataType: DataTypes.SCHEDULE,
        requestURL,
        setData,
        setError,
        setIsLoading,
        t,
        useLocalCache: true
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
