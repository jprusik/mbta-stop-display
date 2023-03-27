import {
  createContext,
  useContext,
  PropsWithChildren
} from 'react';
import {UseRouteScheduleData} from 'types';
import {useRouteSchedule} from 'hooks';
import {SelectionsContext} from 'contexts';

export const ScheduleContext =
  createContext<UseRouteScheduleData>({
    error: null,
    isLoading: false,
    refetch: () => {}
  });

/*
We need to fetch schedule data independently since it is unavailable
as an `include` on predictions if no predictions are returned. Also,
for now we won't refetch the schedule data since it's not likely
to change frequently.
*/
export function ScheduleProvider (
  {children}: PropsWithChildren
): JSX.Element {
  const {
    selectedRoute,
    selectedRouteStop
  } = useContext(SelectionsContext);

  const routeSchedule = useRouteSchedule(selectedRoute, selectedRouteStop);

  return (
    <ScheduleContext.Provider value={routeSchedule}>
      {children}
    </ScheduleContext.Provider>
  );
};
