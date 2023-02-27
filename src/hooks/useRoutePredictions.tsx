import {useState, useEffect} from 'react';
import {PredictionData} from 'types';
import {API_KEY, PREDICTIONS_REQUEST_URL} from '../constants';

type RouteStopPredictionsData = {
  data?: PredictionData | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}

export function useRoutePredictions (): RouteStopPredictionsData {
  const [data, setData] = useState<PredictionData | null | undefined>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        PREDICTIONS_REQUEST_URL,
        requestOptions
      );

      const responseData = await response.json();

      setData(responseData);
      setIsLoading(false);
    }

    if (!data && !error) {
      try {
        getRouteStopPredictions();
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    }
  }, [data, error, isLoading]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
