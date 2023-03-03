import {useState, useEffect} from 'react';
import {
  ResponseError,
  Route,
  ScheduleData,
  Stop,
  UseRouteScheduleData
} from 'types';
import {API_KEY, REQUEST_DOMAIN} from '../constants';

export function useRouteSchedule (
  routeId?: Route['id'],
  routeStopId?: Stop['id']
): UseRouteScheduleData {
  const [data, setData] = useState<ScheduleData | null | undefined>(null);
  const [error, setError] = useState<Error | ResponseError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestURL = `${REQUEST_DOMAIN}/schedules/?filter[route]=${routeId}&filter[stop]=${routeStopId}&sort=direction_id,departure_time`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    async function getRouteStopSchedule () {
      const requestOptions = API_KEY ? {
        headers: {
          'x-api-key': API_KEY
        }
      } : {};

      const response = await fetch(
        requestURL,
        requestOptions
      );

      const responseData = await response.json();

      if (responseData.errors) {
        // @TODO handle response errors
        // {
        //   "code": "bad_request",
        //   "detail": "Invalid sort key.",
        //   "source": {
        //       "parameter": "sort"
        //   },
        //   "status": "400"
        // }
        setError(responseData.errors[0] as ResponseError);
      } else {
        setData(responseData);
      }

      setIsLoading(false);
    }

    if (!data && !error && routeId && routeStopId) {
      try {
        getRouteStopSchedule();
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    }
  }, [data, error, isLoading, requestURL, routeId, routeStopId]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
