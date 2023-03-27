import {
  ActionHandlersProvider,
  PredictionsProvider,
  RoutesProvider,
  ScheduleProvider,
  SelectionsProvider,
  ServiceAlertsProvider,
  StopsProvider
} from 'contexts';

export function ContextProviders ({
  children
}: {children: JSX.Element}): JSX.Element {
  return (
    <SelectionsProvider>
      <RoutesProvider>
        <StopsProvider>
          <ServiceAlertsProvider>
            <ScheduleProvider>
              <PredictionsProvider>
                <ActionHandlersProvider>
                  {children}
                </ActionHandlersProvider>
              </PredictionsProvider>
            </ScheduleProvider>
          </ServiceAlertsProvider>
        </StopsProvider>
      </RoutesProvider>
    </SelectionsProvider>
  );
}
