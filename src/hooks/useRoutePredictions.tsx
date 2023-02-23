import {useState, useEffect} from 'react';
import { Prediction, Route } from 'types';

/*
Note: using an API key in a public-facing environment will expose it to user clients! If a key is needed for the request, proxy the client request on a backend service.

This configuration presently assumes you're running on a private/trusted network, and accessing via private/trusted clients.
*/
const API_KEY = process.env.REACT_APP_API_KEY;
const ROUTE = process.env.REACT_APP_ROUTE;
const ROUTE_STOP = process.env.REACT_APP_ROUTE_STOP;

const REQUEST_URL = `https://api-v3.mbta.com/predictions/?filter[route]=${ROUTE}&filter[stop]=${ROUTE_STOP}&include=route&sort=direction_id,arrival_time`;

type PredictionData = {
  data: Prediction[];
  included: Route[];
}

type RoutePredictionsData = {
  data?: PredictionData | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}

export function useRoutePredictions (): RoutePredictionsData {
  const [data, setData] = useState<PredictionData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    async function getRoutePredictions () {

      const requestOptions = API_KEY ? {
        headers: {
          'x-api-key': API_KEY
        }
      } : {};

      const response = await fetch(REQUEST_URL, requestOptions);

      const responseData = await response.json();

      setData(responseData);
    }

    if (!data && !error) {
      try {
        getRoutePredictions();
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
