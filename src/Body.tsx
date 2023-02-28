import {Fragment, useMemo} from 'react';
import styled from '@emotion/styled';
import {
  Route,
  RouteAttributes,
  Stop,
  StopAttributes,
  UsePredictionData,
  UseRouteScheduleData
} from 'types';
import {NextArrivalsContainer} from './NextArrivalsContainer';

type BodyProps = {
  predictions: UsePredictionData;
  schedule: UseRouteScheduleData;
  selectedRoute?: Route['id'];
  selectedRouteStop?: Stop['id'];
}

export function Body({
  predictions,
  schedule,
  selectedRoute,
  selectedRouteStop
}: BodyProps): JSX.Element {
  // Route data
  const routeAttributes = useMemo(() =>
    schedule.data?.included?.find(({type}) => type === 'route')?.attributes as RouteAttributes
  , [schedule]);
  const routeColor = routeAttributes?.color ?
    `#${routeAttributes.color}` : 'transparent';
  const routeTextColor = routeAttributes?.text_color ?
    `#${routeAttributes.text_color}` : 'white';

  // Stop data
  // Note: more than one stop record may be returned if the place has
  // multiple berths
  const stopData = useMemo(() =>
    schedule.data?.included?.find(({type}) => type === 'stop')?.attributes as StopAttributes
  , [schedule]);
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
      {(predictions.isLoading || schedule.isLoading) ? (
        <CenterMessage>Arrival information is loading...</CenterMessage>
      ) : (predictions.error || schedule.error) ? (
        // @TODO better error feedback/messaging
        <CenterMessage>Something went wrong :-(</CenterMessage>
      ) : !selectedRoute ? (
        <CenterMessage>Please select a route.</CenterMessage>
      ) : !selectedRouteStop ? (
        <CenterMessage>Please select a route stop.</CenterMessage>
      ) : (
        <Fragment>
          <Header
            backgroundColor={routeColor}
            textColor={routeTextColor}
          >
            {stopTitle}
          </Header>
          <NextArrivalsContainer
            predictionsData={predictions.data?.data}
            routeAttributes={routeAttributes}
            scheduleData={schedule.data?.data}
          />
        </Fragment>
      )}
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

const CenterMessage = styled.div`
  margin: 40vh auto;
`;

const Container = styled.div`
  width: 100vw;

  > * {
    padding: 0 10%;
  }
`;
