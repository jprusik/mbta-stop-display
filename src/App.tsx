import {Fragment, useEffect} from 'react';
import {useRoutePredictions} from './hooks/useRoutePredictions';
import {PredictionDisplay} from './PredictionDisplay';

const DATA_REFETCH_INTERVAL = process.env.REACT_APP_DATA_REFETCH_INTERVAL ?
  parseInt(process.env.REACT_APP_DATA_REFETCH_INTERVAL, 10) : 60000;

export function App() {
  const {data: predictionData, error, isLoading, refetch} = useRoutePredictions();

  // @TODO tie this to the key names used in the include portion of the request
  const routeData = predictionData?.included?.[0]?.attributes; // first (and only) include value

  // Refresh the data every x ms
  useEffect(() => {
    const refetchInterval = setInterval(refetch, DATA_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [refetch]);

  const stopTitle = `${routeData?.fare_class} (${routeData?.long_name}) at Framingham`;
  const predictionDataIsAvailable = !!predictionData?.data?.length;

  return (
    <div>
      {isLoading ? 'prediction data is loading...' : (
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
      )}
    </div>
  );
}
