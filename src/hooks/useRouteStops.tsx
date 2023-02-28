import {useEffect, useState} from 'react';
import {
  ResponseError,
  Route,
  StopData,
  UseRouteStopData
} from 'types';
import {API_KEY, REQUEST_DOMAIN} from '../constants';

export function useRouteStops (
  routeId?: Route['id']
): UseRouteStopData {
  const [data, setData] = useState<StopData | null | undefined>(null);
  const [error, setError] = useState<Error | ResponseError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestURL = `${REQUEST_DOMAIN}/stops/?filter[route]=${routeId}`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    async function getRouteStops () {
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

    if (!data && !error && routeId) {
      try {
        getRouteStops();
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    }
  }, [data, error, isLoading, routeId, requestURL]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
