import {useMemo} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import {
  DataTypes,
  PredictionAttributes,
  RouteAttributes,
  ScheduleAttributes
} from 'types';
import {getArrivalTextKey, vehicleTypeToVehicleKeyName} from 'utils';

type NextArrivalProps = {
  attributes: PredictionAttributes | ScheduleAttributes;
  route: RouteAttributes;
  type: DataTypes.PREDICTION | DataTypes.SCHEDULE;
}

export function NextArrival ({
  attributes,
  route,
  type
}: NextArrivalProps): JSX.Element | null {
  const {t} = useTranslation();

  const directionIndex = attributes.direction_id;
  const routeDestinationName = route.direction_destinations[directionIndex];
  const routeDirectionName = route.direction_names[directionIndex];

  // We don't memoize this because we want the arrival/departure strings to
  // update every x ms interval
  const {translationKey, ...translationVariables} =
    getArrivalTextKey(attributes, type, route.type);

  const vehicleTypeKey = useMemo(() =>
    vehicleTypeToVehicleKeyName(route.type),
    [route]
  );

  const destinationHeaderText =
    t(
      `state.destination_header_${vehicleTypeKey}`, {
      routeDestinationName,
      routeDirectionName
    });

  return (
    <PredictionContainer>
      <Header>
        {destinationHeaderText}
      </Header>
      <ArrivalDescription>
        {t(translationKey, translationVariables)}
      </ArrivalDescription>
    </PredictionContainer>
  )
}

const PredictionContainer = styled.div`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-color: #666;
  background: #3D3D3D;
  padding: 15px;
  width: 100%;
  max-width: 682px;
`;

const Header = styled.h2`
  margin: 0;
  font-size: 28px;
`
const ArrivalDescription = styled.div`
  margin: 8px auto;
  font-size: 22px;
`
