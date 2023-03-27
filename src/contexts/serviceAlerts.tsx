import {createContext, PropsWithChildren, useContext} from 'react';
import {UseServiceAlertsData} from 'types';
import {useServiceAlerts} from 'hooks';
import {SelectionsContext} from 'contexts';

export const ServiceAlertsContext =
  createContext<UseServiceAlertsData>({
    error: null,
    isLoading: false,
    refetch: () => {}
  });

export function ServiceAlertsProvider (
  {children}: PropsWithChildren
): JSX.Element {
  const {
    selectedRoute
  } = useContext(SelectionsContext);

  const alerts = useServiceAlerts(selectedRoute);

  return (
    <ServiceAlertsContext.Provider value={alerts}>
      {children}
    </ServiceAlertsContext.Provider>
  );
};
