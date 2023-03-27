import {createContext, PropsWithChildren} from 'react';
import {UseRoutesData} from 'types';
import {useRoutes} from 'hooks';

export const RoutesContext =
  createContext<UseRoutesData>({
    error: null,
    isLoading: false,
    refetch: () => {}
  });

export function RoutesProvider (
  {children}: PropsWithChildren
): JSX.Element {
  /*
  We need to fetch schedule data separately since it is unavailable
  as an include on predictions if no predictions are returned. Also,
  for now we won't refetch the schedule data since it's not likely
  to change frequently.
  */
  const routes = useRoutes();

  return (
    <RoutesContext.Provider value={routes}>
      {children}
    </RoutesContext.Provider>
  );
};
