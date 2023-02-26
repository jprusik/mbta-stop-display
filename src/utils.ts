import moment from 'moment';
import {
  DataTypes,
  Prediction,
  PredictionAttributes,
  Schedule,
  ScheduleAttributes
} from 'types';

type RelevantArrivals = {
  [key: string]: Prediction | Schedule;
}

export function getRelevantTimes (
  data: Array<Prediction | Schedule>
): RelevantArrivals {
  return data
    .reduce((
      relevantData,
      time
    ) => {
      // Note: The last stop on a trip will always have a "null"
      // value for `departure_time` and is not relevant for our
      // use-case
      if (!time.attributes.departure_time) {
        return relevantData;
      }

      const now = moment();
      const departureTime = moment(time.attributes.departure_time);
      const directionId = time.attributes.direction_id;

      if (departureTime.isAfter(now)) {
        const existingAttributes = relevantData[directionId]?.attributes;
        const existingDepartureTime = existingAttributes?.departure_time ?
            moment(existingAttributes.departure_time) :
            null;

        return (
          existingDepartureTime &&
          departureTime.isAfter(existingDepartureTime)
        ) ?
          relevantData :
          {
            ...relevantData,
            [directionId]: time
          }
      }

      return relevantData;
    }, {} as RelevantArrivals);
}

export function getArrivalText (
  attributes: PredictionAttributes | ScheduleAttributes,
  type: DataTypes.PREDICTION | DataTypes.SCHEDULE
): string {
  const now = moment();
  const arrivalTime = moment(attributes.arrival_time);
  const departureTime = moment(attributes.departure_time);

  /*
  Verify that `arrival_time` predictions are in the
  future, since predictions from the immediate past can
  be returned from the API. `departure_time` values not in the future are filtered out upstream.
  */
  const arrivalIsInFuture = arrivalTime.isAfter(now);

  // @TODO i18n, aka: "why we're avoiding string concatenation here"
  const arrivalAndDepartureText = type === DataTypes.PREDICTION ?
    `The train is expected to arrive ${arrivalTime.fromNow()} and will be leaving ${departureTime.fromNow()}.` :
    `The train is scheduled to arrive ${arrivalTime.fromNow()} and leave ${departureTime.fromNow()}.`;
  const departureOnlyText = type === DataTypes.PREDICTION ?
    `The train will be leaving ${departureTime.fromNow()}.` :
    `The train is scheduled to leave ${departureTime.fromNow()}.`;

    return attributes.status || (
      attributes.departure_time ?
        (attributes.arrival_time && arrivalIsInFuture) ?
          arrivalAndDepartureText :
          departureOnlyText
        : 'is currently unknown' // should be unreachable
    );
}
