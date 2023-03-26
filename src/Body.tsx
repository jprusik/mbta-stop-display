import {Fragment, useContext, useMemo} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import {
  PredictionsContext,
  RoutesContext,
  ScheduleContext,
  SelectionsContext,
  ServiceAlertsContext,
  StopsContext
} from 'contexts';
import {SkeletonHeader, SkeletonArrivals} from 'Loaders';
import {NextArrivalsContainer} from 'NextArrivalsContainer';
import {ActionSteps} from 'ActionSteps';
import {ServiceAlerts} from 'ServiceAlerts';

export function Body(): JSX.Element {
  const {t} = useTranslation();

  const {
    selectedRoute,
    selectedRouteStop,
    selectedRouteType
  } = useContext(SelectionsContext);
  const serviceAlerts = useContext(ServiceAlertsContext);
  const routes = useContext(RoutesContext);
  const routeStops = useContext(StopsContext);
  const predictions = useContext(PredictionsContext);
  const schedule = useContext(ScheduleContext);

  // Route data
  const routeAttributes = useMemo(() =>
    routes.data?.data.find(({id}) => id === selectedRoute)?.attributes
  , [routes, selectedRoute]);
  const routeColor = routeAttributes?.color ?
    `#${routeAttributes.color}` : 'transparent';
  const routeTextColor = routeAttributes?.text_color ?
    `#${routeAttributes.text_color}` : '#FFF';

  // Stop data
  // Note: more than one stop record may be returned if the place has
  // multiple berths
  const stopData = useMemo(() =>
    routeStops.data?.data.find(({id}) => id === selectedRouteStop)?.attributes
  , [routeStops, selectedRouteStop]);
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

  const dataIsLoading =
    predictions.isLoading ||
    routes.isLoading ||
    routeStops.isLoading ||
    schedule.isLoading;

  const dataHasErrored =
    predictions.error ||
    routes.error ||
    routeStops.error ||
    schedule.error;

  return (
    <Container>
      {!selectedRouteType ? (
        <ActionSteps activeStep={0} />
      ) : !selectedRoute ? (
        <ActionSteps activeStep={1} />
      ) : !selectedRouteStop ? (
        <ActionSteps activeStep={2} />
      ) : dataIsLoading ? (
        <Fragment>
          <SkeletonHeader variant="rectangular" />
          <SkeletonArrivals variant="rounded" />
          <SkeletonArrivals variant="rounded" />
        </Fragment>
      ) : dataHasErrored ? (
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
          {!!serviceAlerts?.data?.data?.length && (
            <ServiceAlerts alerts={serviceAlerts?.data?.data} />
          )}
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
  line-height: 1em;
  font-size: 32px;
  font-size: 4.75vmin;
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
