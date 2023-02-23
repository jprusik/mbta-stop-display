import {Fragment, useEffect} from 'react';
import {useRoutePredictions} from './hooks/useRoutePredictions';
import {PredictionDisplay} from './PredictionDisplay';
import {DATA_REFETCH_INTERVAL, REQUEST_INCLUDES} from './constants';
import {RouteAttributes, StopAttributes} from 'types';

export function App() {
  const {data: predictionData, error, isLoading, refetch} = useRoutePredictions();
  console.log('predictionData:', predictionData);

  const routeIncludeDataIndex = REQUEST_INCLUDES.indexOf('route');
  const routeData =
    predictionData?.included?.[routeIncludeDataIndex]?.attributes as RouteAttributes;

  const stopIncludeDataIndex = REQUEST_INCLUDES.indexOf('stop');
  const stopData =
    predictionData?.included?.[stopIncludeDataIndex]?.attributes as StopAttributes;

  // Refresh the data every x ms
  useEffect(() => {
    const refetchInterval = setInterval(refetch, DATA_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [refetch]);

  const stopTitle = `${routeData?.fare_class} (${routeData?.long_name}) at ${stopData?.name}`;
  const predictionDataIsAvailable = !!predictionData?.data?.length;

  return (
    <div>
      {error ?
        'something went wrong :-(' :
        isLoading ?
          'prediction data is loading...' : (
            <Fragment>
              <h1>
                {stopTitle}
              </h1>
              {(predictionDataIsAvailable && routeData) ?
                predictionData?.data?.map(prediction => (
                  <PredictionDisplay
                    key={prediction.id}
                    prediction={prediction.attributes}
                    route={routeData}
                  />
                )) :
                'No predictions were found'
              }
            </Fragment>
          )
      }
    </div>
  );
}
