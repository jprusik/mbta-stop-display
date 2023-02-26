import {useState, useEffect} from 'react';
import {ScheduleData} from 'types';
import {API_KEY, SCHEDULE_REQUEST_URL} from '../constants';



export type RouteStopScheduleData = {
  data?: ScheduleData | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}

export function useRouteSchedule (): RouteStopScheduleData {
  const [data, setData] = useState<ScheduleData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        SCHEDULE_REQUEST_URL,
        requestOptions
      );

      const responseData = await response.json();

      setData(responseData);
    }

    if (!data && !error) {
      try {
        getRouteStopSchedule();
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }

      setIsLoading(false);
    }
  }, [data, error, isLoading]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
