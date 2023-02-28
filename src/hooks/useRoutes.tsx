import {useState, useEffect} from 'react';
import {RouteData, ResponseError, UseRoutesData} from 'types';
import {API_KEY, REQUEST_DOMAIN} from '../constants';

export function useRoutes (): UseRoutesData {
  const [data, setData] = useState<RouteData | null | undefined>(null);
  const [error, setError] = useState<Error | ResponseError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestURL = `${REQUEST_DOMAIN}/routes/?sort=type,long_name,description`;

  function refetch () {
    setData(null);
    setError(null);
    setIsLoading(true);
  }

  useEffect(() => {
    async function getRoutes () {
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

    if (!data && !error) {
      try {
        getRoutes();
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    }
  }, [data, error, isLoading, requestURL]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
