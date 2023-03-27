import {DataTypes} from 'types';
import {API_KEY} from '../constants';

type getProps = {
  dataType: DataTypes;
  requestURL: string;
  setData: (data: any) => void;
  setError: (error: Error) => void;
  setIsLoading: (loading: boolean) => void;
  t: (key: string) => string;
}

export async function get ({
  dataType,
  requestURL,
  setData,
  setError,
  setIsLoading,
  t
}: getProps) {
  setIsLoading(true);

  try {
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

    if (!response.ok) {
      throw new Error(responseData.errors[0].code, {cause: responseData.errors[0].detail});
    } else {
      setData(responseData);
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
        errorMesage = t(`error.request.rate_limited`);
        break;
      default:
        break;
    }

    setError(new Error(errorMesage));
  }

  setIsLoading(false);
}
