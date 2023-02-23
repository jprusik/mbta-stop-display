import {Fragment} from 'react';
import moment from 'moment';
import {PredictionAttributes, RouteAttributes} from 'types';

type PredictionDisplayProps = {
  prediction: PredictionAttributes,
  route: RouteAttributes
}

export function PredictionDisplay ({
  prediction,
  route
}: PredictionDisplayProps): JSX.Element {
  const now = moment();
  const arrivalTime = moment(prediction.arrival_time);
  const departureTime = moment(prediction.departure_time);

  // verify that predictions are in the future, since predictions
  // from the immediate past can be returned from the API.
  const arrivalIsInFuture = arrivalTime.isAfter(now);

  const directionIndex = prediction.direction_id;
  const routeDestinationName = route.direction_destinations[directionIndex];
  const routeDirectionName = route.direction_names[directionIndex];

  const destinationHeaderText = `The next train to ${routeDestinationName} (${routeDirectionName})`

  // @TODO fix string concatenation with i18n
  const arrivalOnlyText = `is expected to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.`
  const arrivalAndDepartureText = `is expected to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.`;

  return (
    <Fragment>
      <h2>
        {destinationHeaderText}
      </h2>
      <div>
        {arrivalIsInFuture ? (
          departureTime ?
            arrivalAndDepartureText :
            arrivalOnlyText
          ) : 'is currently unknown' // @TODO use scheduled time
        }
      </div>
    </Fragment>
  )
}
