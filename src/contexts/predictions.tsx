import {
  createContext,
  useContext,
  useEffect,
  PropsWithChildren
} from 'react';
import {UsePredictionData} from 'types';
import {PREDICTIONS_REFETCH_INTERVAL} from '../constants';
import {useRoutePredictions} from 'hooks';
import {ScheduleContext, SelectionsContext} from 'contexts';

export const PredictionsContext =
  createContext<UsePredictionData>({
    error: null,
    isLoading: false,
    refetch: () => {}
  });

export function PredictionsProvider (
  {children}: PropsWithChildren
): JSX.Element {
  const {
    selectedRoute,
    selectedRouteStop
  } = useContext(SelectionsContext);

  const predictions = useRoutePredictions(selectedRoute, selectedRouteStop);
  const {refetch: scheduleRefetch} = useContext(ScheduleContext);

  // Refetch route stop schedule and predictions
  // when selected route or stop changes
  useEffect(() => {
    if (selectedRoute && selectedRouteStop) {
      predictions.refetch();
      scheduleRefetch();
    }
  }, [selectedRoute, selectedRouteStop]);

  // Refresh the predictions data every x ms
  useEffect(() => {
    const refetchInterval =
      setInterval(predictions.refetch, PREDICTIONS_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [predictions]);

  return (
    <PredictionsContext.Provider value={predictions}>
      {children}
    </PredictionsContext.Provider>
  );
};
