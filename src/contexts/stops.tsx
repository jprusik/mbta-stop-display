import {
  createContext,
  useContext,
  PropsWithChildren
} from 'react';
import {UseRouteStopData} from 'types';
import {useRouteStops} from 'hooks';
import {SelectionsContext} from 'contexts';

export const StopsContext =
  createContext<UseRouteStopData>({
    error: null,
    isLoading: false,
    refetch: () => {}
  });

export function StopsProvider (
  {children}: PropsWithChildren
): JSX.Element {
  const {selectedRoute} = useContext(SelectionsContext);
  const routeStops = useRouteStops(selectedRoute);

  return (
    <StopsContext.Provider value={routeStops}>
      {children}
    </StopsContext.Provider>
  );
};
