import {
  createContext,
  useState,
  Dispatch,
  PropsWithChildren,
  SetStateAction
} from 'react';
import {Route, RouteTypeKeyName, Stop} from 'types';
import {ROUTE, ROUTE_STOP} from '../constants';

interface SelectionsContextType {
  selectedRoute?: Route['id'];
  selectedRouteStop?: Stop['id'];
  selectedRouteType?: RouteTypeKeyName;
  setSelectedRoute: Dispatch<SetStateAction<Route['id'] | undefined>>;
  setSelectedRouteStop: Dispatch<SetStateAction<Stop['id'] | undefined>>;
  setSelectedRouteType: Dispatch<SetStateAction<RouteTypeKeyName | undefined>>;
}

const initialState = {
  setSelectedRoute: () => {},
  setSelectedRouteStop: () => {},
  setSelectedRouteType: () => {}
}

export const SelectionsContext =
  createContext<SelectionsContextType>(initialState);

export function SelectionsProvider (
  {children}: PropsWithChildren
): JSX.Element {
  const [selectedRouteType, setSelectedRouteType] =
    useState<RouteTypeKeyName | undefined>(
      localStorage.getItem('selectedRouteType') as RouteTypeKeyName ||
      undefined
    );
  const [selectedRoute, setSelectedRoute] =
    useState<Route['id'] | undefined>(
      localStorage.getItem('selectedRoute') || ROUTE
    );
  const [selectedRouteStop, setSelectedRouteStop] =
    useState<Stop['id'] | undefined>(
      localStorage.getItem('selectedRouteStop') || ROUTE_STOP
    );

  const value = {
    selectedRoute,
    selectedRouteStop,
    selectedRouteType,
    setSelectedRoute,
    setSelectedRouteStop,
    setSelectedRouteType
  };

  return (
    <SelectionsContext.Provider value={value}>
      {children}
    </SelectionsContext.Provider>
  );
};
