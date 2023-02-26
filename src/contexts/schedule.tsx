import {createContext, PropsWithChildren} from 'react';
import {useRouteSchedule, RouteStopScheduleData} from 'hooks/useRouteSchedule';

type ScheduleContextProps = {
  value?: RouteStopScheduleData;
}

export const ScheduleContext =
  createContext<ScheduleContextProps>({});

export function ScheduleProvider (
  {children}: PropsWithChildren
): JSX.Element {
  /*
  We need to fetch schedule data separately since it is unavailable
  as an include on predictions if no predictions are returned. Also,
  for now we won't refetch the schedule data since it's not likely
  to change frequently.
  */
  const routeSchedule = useRouteSchedule();

  return (
    <ScheduleContext.Provider value={routeSchedule}>
      {children}
    </ScheduleContext.Provider>
  );
};
