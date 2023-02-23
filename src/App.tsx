import {Fragment, useEffect} from 'react';
import styled from '@emotion/styled';
import {DATA_REFETCH_INTERVAL} from './constants';
import {DataTypes, RouteAttributes, StopAttributes} from 'types';
import {useRoutePredictions} from './hooks/useRoutePredictions';
import {useRouteSchedule} from './hooks/useRouteSchedule';
import {NextArrival} from './NextArrival';

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

  // Prediction data
  const predictionDataIsAvailable = !!predictionsData?.data?.length;

  // Refresh the data every x ms
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
              {(predictionDataIsAvailable && routeData) ?
                // @TODO only show the next train for each direction (two entries max)
                predictionsData?.data?.map(prediction => (
                  <NextArrival
                    key={prediction.id}
                    attributes={prediction.attributes}
                    route={routeData}
                    type={DataTypes.PREDICTION}
                  />
                )) :
                'No predictions were found'
              }
              {/* Placeholder */}
              {/* {(scheduleData && routeData) && (
                <NextArrival
                  attributes={scheduleData.data?.[0]?.attributes}
                  route={routeData}
                  type={DataTypes.SCHEDULE}
                />
              )} */}
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
