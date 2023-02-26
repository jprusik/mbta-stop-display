import {Fragment, useEffect} from 'react';
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
  const routeAttributes =
    scheduleData?.included?.find(({type}) => type === 'route')?.attributes as RouteAttributes;
  const routeColor = routeAttributes?.color ?
    `#${routeAttributes.color}` : 'transparent';
  const routeTextColor = routeAttributes?.text_color ?
    `#${routeAttributes.text_color}` : 'white';

  // Stop data
  const stopData =
    scheduleData?.included?.find(({type}) => type === 'stop')?.attributes as StopAttributes;
  // @TODO `fare_class` may not be quite the right descriptor for
  // this purpose; `description` or `type` is probably better.
  const stopTitle = `${routeAttributes?.fare_class} (${routeAttributes?.long_name}) at ${stopData?.name}`;
  const stopTitleIsAvailable = !!(routeAttributes?.fare_class && routeAttributes?.long_name && stopData?.name);

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
