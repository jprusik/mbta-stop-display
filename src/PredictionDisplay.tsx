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
  // @TODO verify that predictions are in the future, since predictions
  // from the immediate past can be returned from the API.
  const directionIndex = prediction.direction_id;
  const destinationText = `The next train to ${route.direction_destinations[directionIndex]} (${route.direction_names[directionIndex]}) is expected to arrive ${moment(prediction.arrival_time).fromNow()} and will be leaving ${moment(prediction.departure_time).fromNow()}.`

  return (
    <Fragment>
      <h2>
        {destinationText}
      </h2>
      <div>
      </div>
    </Fragment>
  )
}
