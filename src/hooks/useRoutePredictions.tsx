import {useState, useEffect} from 'react';
import {Prediction, Route, Stop} from 'types';
import {API_KEY, REQUEST_URL} from '../constants';

type PredictionData = {
  data: Prediction[];
  included: Array<Route | Stop>;
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
