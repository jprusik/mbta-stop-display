import {Fragment, useEffect, useMemo} from 'react';
import styled from '@emotion/styled';
import {DATA_REFETCH_INTERVAL} from './constants';
import {RouteAttributes, StopAttributes} from 'types';
import {useRoutePredictions} from './hooks/useRoutePredictions';
import {useRouteSchedule} from './hooks/useRouteSchedule';
import {NextArrivalsContainer} from './NextArrivalsContainer';

export function Body() {
  const {
    data: predictionsData,
    error: predictionsError,
    isLoading: predictionsAreLoading,
    refetch: predictionsRefetch
  } = useRoutePredictions();

  // Refresh the predictions data every x ms
  useEffect(() => {
    const refetchInterval =
      setInterval(predictionsRefetch, DATA_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [predictionsRefetch]);

  /*
  We need to fetch schedule data separately since it is unavailable
  as an include on predictions if no predictions are returned. Also,
  for now we won't refetch the schedule data since it's not likely
  to change frequently.
  */
  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: scheduleIsLoading
  } = useRouteSchedule();

  // Route data
  const routeAttributes = useMemo(() =>
    scheduleData?.included?.find(({type}) => type === 'route')?.attributes as RouteAttributes
  , [scheduleData]);
  const routeColor = routeAttributes?.color ?
    `#${routeAttributes.color}` : 'transparent';
  const routeTextColor = routeAttributes?.text_color ?
    `#${routeAttributes.text_color}` : 'white';

  // Stop data
  // Note: more than one stop record may be returned if the place has
  // multiple berths
  const stopData = useMemo(() =>
    scheduleData?.included?.find(({type}) => type === 'stop')?.attributes as StopAttributes
  , [scheduleData]);
  const stopTitleIsAvailable = !!(
    routeAttributes?.description &&
    routeAttributes?.long_name &&
    stopData?.name
  );
  const stopTitle = stopTitleIsAvailable ?
    `${routeAttributes?.description} (${routeAttributes?.long_name}) at ${stopData?.name}` :
    'The information for this stop was unable to load.';

  return (
    <Container>
      {(predictionsError || scheduleError) ?
        // @TODO better error feedback/messaging
        'Something went wrong :-(' :
        (predictionsAreLoading || scheduleIsLoading) ?
          'Arrival information is loading...' : (
            <Fragment>
              <Header
                backgroundColor={routeColor}
                textColor={routeTextColor}
              >
                {stopTitle}
              </Header>
              <NextArrivalsContainer
                predictionsData={predictionsData?.data}
                routeAttributes={routeAttributes}
                scheduleData={scheduleData?.data}
              />
            </Fragment>
          )
      }
    </Container>
  );
}

type HeaderProps = {
  backgroundColor: string;
  textColor: string;
}

const Header = styled.h1<HeaderProps>`
  ${({backgroundColor, textColor}) => `
    background-color: ${backgroundColor};
    color: ${textColor};
  `}
  margin: 0;
  padding: 10px 10%;
  font-size: 32px;
`;

const Container = styled.div`
  width: 100vw;

  > * {
    padding: 0 10%;
  }
`;
