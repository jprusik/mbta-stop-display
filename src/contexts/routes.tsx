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
  const routes = useRoutes();

  return (
    <RoutesContext.Provider value={routes}>
      {children}
    </RoutesContext.Provider>
  );
};
