import {Fragment, useEffect, useState} from 'react';
import {SelectChangeEvent} from '@mui/material/Select';
import {Route, RouteTypeKeyName, Stop} from 'types';
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
  const [selectedRouteType, setSelectedRouteType] =
    useState<RouteTypeKeyName | undefined>();
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

  async function handleRouteTypeSelection (event: SelectChangeEvent) {
    const newRouteTypeSelection = event.target.value as RouteTypeKeyName;
    setSelectedRouteType(newRouteTypeSelection);
    setSelectedRoute(undefined);
    setSelectedRouteStop(undefined);
    routes.refetch();
    routeStops.refetch();
    predictions.refetch();
  }

  async function handleRouteSelection (event: SelectChangeEvent) {
    const newRouteIdSelection = event.target.value;
    setSelectedRoute(newRouteIdSelection);
    setSelectedRouteStop(undefined);

    if (routeStops.data && selectedRoute) {
      routeStops.refetch();
    }
  }

  function handleRouteStopSelection (event: SelectChangeEvent) {
    const newRouteStopIdSelection = event.target.value;
    setSelectedRouteStop(newRouteStopIdSelection);
  }

  return (
    <Fragment>
      <Body
        predictions={predictions}
        schedule={schedule}
        selectedRoute={selectedRoute}
        selectedRouteStop={selectedRouteStop}
        selectedRouteType={selectedRouteType}
      />
      <Footer
        routes={routes}
        routeStops={routeStops}
        selectedRoute={selectedRoute}
        selectedRouteStop={selectedRouteStop}
        selectedRouteType={selectedRouteType}
        handleRouteSelection={handleRouteSelection}
        handleRouteStopSelection={handleRouteStopSelection}
        handleRouteTypeSelection={handleRouteTypeSelection}
      />
    </Fragment>
  );
}
