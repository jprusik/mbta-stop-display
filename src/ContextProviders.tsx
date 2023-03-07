import {
  ActionHandlersProvider,
  PredictionsProvider,
  RoutesProvider,
  ScheduleProvider,
  SelectionsProvider,
  StopsProvider
} from 'contexts';

export function ContextProviders ({
  children
}: {children: JSX.Element}): JSX.Element {
  return (
    <SelectionsProvider>
      <RoutesProvider>
        <StopsProvider>
          <ScheduleProvider>
            <PredictionsProvider>
              <ActionHandlersProvider>
                {children}
              </ActionHandlersProvider>
            </PredictionsProvider>
          </ScheduleProvider>
        </StopsProvider>
      </RoutesProvider>
    </SelectionsProvider>
  );
}
