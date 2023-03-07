import {createContext, PropsWithChildren, useContext} from 'react';
import {SelectChangeEvent} from '@mui/material/Select';
import {RouteTypeKeyName} from 'types';
import {
  PredictionsContext,
  RoutesContext,
  SelectionsContext,
  StopsContext
} from 'contexts';

interface ActionHandlersContextType {
  handleRouteSelection: (event: SelectChangeEvent) => void;
  handleRouteStopSelection: (event: SelectChangeEvent) => void;
  handleRouteTypeSelection: (event: SelectChangeEvent) => void;
  resetSelections: () => void;
}

export const ActionHandlersContext =
  createContext<ActionHandlersContextType>({
    handleRouteSelection: () => {},
    handleRouteStopSelection: () => {},
    handleRouteTypeSelection: () => {},
    resetSelections: () => {},
  });

export function ActionHandlersProvider (
  {children}: PropsWithChildren
): JSX.Element {
  const {
    selectedRoute,
    setSelectedRoute,
    setSelectedRouteStop,
    setSelectedRouteType
  } = useContext(SelectionsContext);
  const {refetch: routesRefetch} = useContext(RoutesContext);
  const {data: stopsData, refetch: stopsRefetch} = useContext(StopsContext);
  const predictions = useContext(PredictionsContext);

  function handleRouteTypeSelection (event: SelectChangeEvent) {
    const newRouteTypeSelection = event.target.value as RouteTypeKeyName;
    setSelectedRouteType(newRouteTypeSelection);
    localStorage.setItem('selectedRouteType', newRouteTypeSelection);
    setSelectedRoute(undefined);
    localStorage.removeItem('selectedRoute');
    setSelectedRouteStop(undefined);
    localStorage.removeItem('selectedRouteStop');
    routesRefetch();
    stopsRefetch();
    predictions.refetch();
  }

  function handleRouteSelection (event: SelectChangeEvent) {
    const newRouteIdSelection = event.target.value;
    setSelectedRoute(newRouteIdSelection);
    localStorage.setItem('selectedRoute', newRouteIdSelection);
    setSelectedRouteStop(undefined);
    localStorage.removeItem('selectedRouteStop');

    if (stopsData && selectedRoute) {
      stopsRefetch();
    }
  }

  function handleRouteStopSelection (event: SelectChangeEvent) {
    const newRouteStopIdSelection = event.target.value;
    setSelectedRouteStop(newRouteStopIdSelection);
    localStorage.setItem('selectedRouteStop', newRouteStopIdSelection);
  }

  function resetSelections () {
    setSelectedRouteType(undefined);
    localStorage.removeItem('selectedRouteType');
    setSelectedRoute(undefined);
    localStorage.removeItem('selectedRoute');
    setSelectedRouteStop(undefined);
    localStorage.removeItem('selectedRouteStop');
  }

  const actionHandlers = {
    handleRouteTypeSelection,
    handleRouteSelection,
    handleRouteStopSelection,
    resetSelections
  }

  return (
    <ActionHandlersContext.Provider value={actionHandlers}>
      {children}
    </ActionHandlersContext.Provider>
  );
};
