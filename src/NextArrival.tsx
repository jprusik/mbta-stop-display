import moment from 'moment';
import styled from '@emotion/styled';
import {
  DataTypes,
  PredictionAttributes,
  RouteAttributes,
  ScheduleAttributes
} from 'types';

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
  const now = moment();
  const arrivalTime = moment(attributes.arrival_time);
  const departureTime = moment(attributes.departure_time);

  // verify that predictions are in the future, since predictions
  // from the immediate past can be returned from the API.
  const arrivalIsInFuture = arrivalTime.isAfter(now);
  const departureIsInFuture = departureTime.isAfter(now);

  // @TODO show scheduled times when prediction is in the past
  // @TODO show adjusted message when arrival is in the past but
  // departure is in the future (train still at station)
  if (!arrivalIsInFuture && !departureIsInFuture) {
    return null;
  }

  const directionIndex = attributes.direction_id;
  const routeDestinationName = route.direction_destinations[directionIndex];
  const routeDirectionName = route.direction_names[directionIndex];

  // @TODO fix vehicle type assumption
  const destinationHeaderText = `The next train to ${routeDestinationName} (${routeDirectionName}):`

  // @TODO update times without data refresh
  // @TODO i18n
  const arrivalAndDepartureText = type === DataTypes.PREDICTION ?
    `The train is expected to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.` :
    `The train is scheduled to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.`;
  const arrivalOnlyText = type === DataTypes.PREDICTION ?
    `The train is expected to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.` :
    `The train is scheduled to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.`;

  return (
    <PredictionContainer>
      <Header>
        {destinationHeaderText}
      </Header>
      <ArrivalDescription>
        {/* @TODO show scheduled time when prediction is unavailable */}
        {attributes.arrival_time ? (
          attributes.departure_time ?
            arrivalAndDepartureText :
            arrivalOnlyText
        // "Commuter Rail predictions with neither a departure time nor
        // arrival time, often have a status field with their boarding
        // status."
        // Predictions with none of an arrival time, departure time, nor
        // status, indicate the vehicle will not make the scheduled stop.
        // The `schedule_relationship` field may explain why.
        ) : attributes.status || 'is currently unknown'}
      </ArrivalDescription>
    </PredictionContainer>
  )
}

const PredictionContainer = styled.div`
  margin: 0 auto 20px auto;
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
