import {Fragment, useContext, useEffect, useMemo} from 'react';
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
import {updateWindowTitleAndIcon} from 'utils';
import {SkeletonHeader, SkeletonArrivals} from 'components/Loaders';
import {NextArrivalsContainer} from 'components/NextArrivalsContainer';
import {ActionSteps} from 'components/ActionSteps';
import {ServiceAlerts} from 'components/ServiceAlerts';

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
    `#${routeAttributes.text_color}` : '#FFFFFF';

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
  const appTitle = t('content.website_title_with_description');

  useEffect(() => {
    // Update window/tab title to match the stop title
    if (selectedRouteStop && routeAttributes?.color) {
      updateWindowTitleAndIcon(
        `${stopTitle} | ${appTitle}`,
        routeAttributes.color,
        selectedRouteStop
      );
    } else {
      updateWindowTitleAndIcon(appTitle);
    }
  }, [t, appTitle, routeAttributes, selectedRouteStop, stopTitle]);

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

  if (dataHasErrored) {
    throw dataHasErrored;
  }

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
      ) : (
        <Fragment>
          <RouteStopBanner
            backgroundColor={routeColor}
            textColor={routeTextColor}
          >
            {stopTitle}
          </RouteStopBanner>
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

type RouteStopBannerProps = {
  backgroundColor: string;
  textColor: string;
}

const RouteStopBanner = styled.h1<RouteStopBannerProps>`
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

const Container = styled.div`
  width: 100vw;

  > * {
    padding: 0 10%;
  }
`;
