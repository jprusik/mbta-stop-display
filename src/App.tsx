import {Fragment, useEffect, useState} from 'react';
import {Route, Stop} from 'types';
import {DATA_REFETCH_INTERVAL, ROUTE, ROUTE_STOP} from './constants';
import {
  useRoutePredictions,
  useRoutes,
  useRouteSchedule,
  useRouteStops
} from 'hooks';
import {Body} from 'Body';
import {Footer} from 'Footer';

export function App() {
  // @TODO store selections in localStorage and check for localStorage
  // values upon page reload
  const [selectedRoute, setSelectedRoute] =
    useState<Route['id'] | undefined>(ROUTE);
  const [selectedRouteStop, setSelectedRouteStop] =
    useState<Stop['id'] | undefined>(ROUTE_STOP);

  const routes = useRoutes();
  const routeStops = useRouteStops(selectedRoute);
  const predictions = useRoutePredictions(selectedRoute, selectedRouteStop);

  /*
  We need to fetch schedule data separately since it is unavailable
  as an include on predictions if no predictions are returned. Also,
  for now we won't refetch the schedule data since it's not likely
  to change frequently.
  */
  const schedule = useRouteSchedule(selectedRoute, selectedRouteStop);

  // Refresh the predictions data every x ms
  useEffect(() => {
    const refetchInterval =
      setInterval(predictions.refetch, DATA_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [predictions]);

  useEffect(() => {
    if (selectedRoute && selectedRouteStop) {
      predictions.refetch();
      schedule.refetch();
    }
  }, [selectedRoute, selectedRouteStop]);

  async function handleRouteSelection (event: any) {
    const newRouteSelectionId = event.target.value;
    setSelectedRoute(newRouteSelectionId);
    setSelectedRouteStop(undefined);

    if (routeStops.data && selectedRoute) {
      routeStops.refetch();
    }
  }

  function handleRouteStopSelection (event: any) {
    const newRouteStopSelectionId = event.target.value;
    setSelectedRouteStop(newRouteStopSelectionId);
  }

  return (
    <Fragment>
      <Body
        predictions={predictions}
        schedule={schedule}
        selectedRoute={selectedRoute}
        selectedRouteStop={selectedRouteStop}
      />
      <Footer
        routes={routes}
        routeStops={routeStops}
        selectedRoute={selectedRoute}
        selectedRouteStop={selectedRouteStop}
        handleRouteSelection={handleRouteSelection}
        handleRouteStopSelection={handleRouteStopSelection}
      />
    </Fragment>
  );
}
