import {Fragment, useEffect} from 'react';
import styled from '@emotion/styled';
import {DATA_REFETCH_INTERVAL} from './constants';
import {RouteAttributes, StopAttributes} from 'types';
import {useRoutePredictions} from './hooks/useRoutePredictions';
import {useRouteSchedule} from './hooks/useRouteSchedule';
import {NextArrivalsContainer} from './NextArrivalsContainer';

export function App() {
  const {
    data: predictionsData,
    error: predictionsError,
    isLoading: predictionsAreLoading,
    refetch: predictionsRefetch
  } = useRoutePredictions();

  // We need to fetch schedule data separately since it is unavailable as
  // an include on predictions if no predictions are returned.
  // For now, we won't refetch the schedule data since it's not likely to change frequently
  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: scheduleIsLoading
  } = useRouteSchedule();

  // Route data
  const routeData =
    scheduleData?.included?.find(({type}) => type === 'route')?.attributes as RouteAttributes;
  const routeColor = routeData?.color ?
    `#${routeData.color}` : 'transparent';
  const routeTextColor = routeData?.text_color ?
    `#${routeData.text_color}` : 'white';

  // Stop data
  const stopData =
    scheduleData?.included?.find(({type}) => type === 'stop')?.attributes as StopAttributes;
  const stopTitle = `${routeData?.fare_class} (${routeData?.long_name}) at ${stopData?.name}`;
  const stopTitleIsAvailable = !!(routeData?.fare_class && routeData?.long_name && stopData?.name);

  // Refresh the predictions data every x ms
  useEffect(() => {
    const refetchInterval =
      setInterval(predictionsRefetch, DATA_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [predictionsRefetch]);

  return (
    <Container>
      {(predictionsError || scheduleError) ?
        'something went wrong :-(' :
        (predictionsAreLoading || scheduleIsLoading) ?
          'prediction data is loading...' : (
            <Fragment>
              <Header
                backgroundColor={routeColor}
                textColor={routeTextColor}
              >
                {stopTitleIsAvailable ?
                  stopTitle :
                  'The stop information was unable to load.'
                }
              </Header>
              <NextArrivalsContainer
                predictionsData={predictionsData}
                routeData={routeData}
                scheduleData={scheduleData}
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
  font-size: 32px;
  padding: 10px 10%;
`;

const Container = styled.div`
  width: 100vw;

  > * {
    padding: 0 10%;
  }
`;
