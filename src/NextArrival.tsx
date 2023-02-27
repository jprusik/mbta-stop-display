import styled from '@emotion/styled';
import {
  DataTypes,
  PredictionAttributes,
  RouteAttributes,
  ScheduleAttributes
} from 'types';
import {getArrivalText} from 'utils';

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
  const arrivalText = getArrivalText(attributes, type, route.type);

  const directionIndex = attributes.direction_id;
  const routeDestinationName = route.direction_destinations[directionIndex];
  const routeDirectionName = route.direction_names[directionIndex];

  // @TODO fix vehicle type assumption
  const destinationHeaderText =
    `The next train to ${routeDestinationName} (${routeDirectionName}):`

  return (
    <PredictionContainer>
      <Header>
        {destinationHeaderText}
      </Header>
      <ArrivalDescription>
        {arrivalText}
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
  max-width: 80%;
`;

const Header = styled.h2`
  margin: 0;
  font-size: 28px;
`
const ArrivalDescription = styled.div`
  margin: 8px auto;
  font-size: 22px;
`
