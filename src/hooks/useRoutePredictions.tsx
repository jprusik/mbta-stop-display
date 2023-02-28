import {useState, useEffect} from 'react';
import {
  PredictionData,
  ResponseError,
  Route,
  Stop,
  UsePredictionData
} from 'types';
import {API_KEY, REQUEST_DOMAIN} from '../constants';

export function useRoutePredictions (
  routeId?: Route['id'],
  routeStopId?: Stop['id']
): UsePredictionData {
  const [data, setData] = useState<PredictionData | null | undefined>(null);
  const [error, setError] = useState<Error | ResponseError | null>(null);
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
    async function getRouteStopPredictions () {
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
        getRouteStopPredictions();
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
