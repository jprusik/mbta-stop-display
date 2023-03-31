import {DataTypes} from 'types';
import {API_KEY} from '../constants';

const CACHE_EXPIRY_HOURS = 2;

type getProps = {
  dataType: DataTypes;
  requestURL: string;
  setData: (data: any) => void;
  setError: (error: Error) => void;
  setIsLoading: (loading: boolean) => void;
  t: (key: string) => string;
  useLocalCache?: boolean;
}

export async function get ({
  dataType,
  requestURL,
  setData,
  setError,
  setIsLoading,
  t,
  useLocalCache = false
}: getProps) {
  setIsLoading(true);

  try {
    const requestOptions = API_KEY ? {
      headers: {
        'x-api-key': API_KEY
      }
    } : {};

    if (useLocalCache) {
      const cachedResponse = checkRequestCache(requestURL);

      if (cachedResponse) {
        setData(cachedResponse);
        setIsLoading(false);
        return;
      }
    }

    const response = await fetch(
      requestURL,
      requestOptions
    );

    if (useLocalCache) {
      setRequestCache(response);
    }

    const responseData = await response.json();

    if (response.ok) {
      setData(responseData);
    } else {
      throw new Error(responseData.errors[0].code, {cause: responseData.errors[0].detail});
    }
  } catch (caughtError: any) {
    let errorMesage = t(`error.request.${dataType}.generic_problem`);

    switch (caughtError?.message) {
      case 'bad_request':
        errorMesage = t(`error.request.${dataType}.bad`);
        break;
      case 'forbidden':
        errorMesage = t(`error.request.${dataType}.forbidden`);
        break;
      case 'rate_limited':
        /*
        @TODO let the user know how long they need to wait with
        `x-ratelimit-reset`. May need to reach our to the API maintainers;
        see:

        https://stackoverflow.com/questions/70729764/api-hosts-rate-limit-header-not-read-properly#comment125042213_70729764 :
        "The server needs to send the `Access-Control-Expose-Headers:
        x-ratelimit` alongside the `x-ratelimit: somevalue` to allow a cors
        client to read the ratelimit value."
        */
        errorMesage = t(`error.request.rate_limited`);
        break;
      default:
        break;
    }

    setError(new Error(errorMesage));
  }

  setIsLoading(false);
}

function setRequestCache(response: Response): void {
  const requestDomain = window.location.origin;
  const requestPath = response.url.replace(requestDomain,'');

  response
    .clone() // don't consume the original promise resolution
    .json()
    .then(responseJSON => {
      // do not cache JSON response if there was a service error
      if (response.ok && responseJSON.data) {
        localStorage.setItem(requestPath, JSON.stringify({
          ...responseJSON,
          datetime: Date.now()
        }));
      }
    });
}

function cacheHoursExpiry(hours: number): number {
  return (hours * 1000 * 60 * 60);
}

function checkRequestCache(requestURL: string): any | null {
  const cachedResponse = localStorage.getItem(requestURL);

  if (cachedResponse) {
    const cachedResponseParsed = JSON.parse(cachedResponse);
    const timePassed = Date.now() - cachedResponseParsed.datetime;
    const cacheIsTooOld = timePassed > cacheHoursExpiry(CACHE_EXPIRY_HOURS);

    const requestResponse = JSON.parse(cachedResponse);

    return cacheIsTooOld ? null : requestResponse;
  }

  return null;
}
