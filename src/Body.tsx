import {Fragment, useMemo} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import {
  Route,
  RouteAttributes,
  Stop,
  StopAttributes,
  UsePredictionData,
  UseRouteScheduleData
} from 'types';
import {SkeletonHeader, SkeletonArrivals} from './Loaders';
import {NextArrivalsContainer} from 'NextArrivalsContainer';
import {ActionSteps} from 'ActionSteps';

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
  const {t} = useTranslation();

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
    t('state.stop_title', {
      routeDescription: routeAttributes?.description,
      routeLongName: routeAttributes?.long_name,
      stopName: stopData?.name
    }) :
    t('error.no_stop_information');

  return (
    <Container>
      {!selectedRoute ? (
        <ActionSteps activeStep={0} />
      ) : !selectedRouteStop ? (
        <ActionSteps activeStep={1} />
      ) : (predictions.isLoading || schedule.isLoading) ? (
        <Fragment>
          <SkeletonHeader variant="rectangular" />
          <SkeletonArrivals variant="rounded" />
          <SkeletonArrivals variant="rounded" />
        </Fragment>
      ) : (predictions.error || schedule.error) ? (
        // @TODO better error feedback/messaging
        <CenterMessage>{t('error.generic')}</CenterMessage>
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
