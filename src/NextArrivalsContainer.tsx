import moment from 'moment';
import {
  Prediction,
  RouteAttributes,
  Schedule
} from 'types';
import {NextArrival} from './NextArrival';

type NextArrivalsContainerProps = {
  predictionsData: Prediction[] | undefined;
  routeAttributes: RouteAttributes;
  scheduleData: Schedule[] | undefined;
}

type RelevantArrivals = {
  [key: string]: Prediction | Schedule;
}

function getRelevantTimes (
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

export function NextArrivalsContainer ({
  predictionsData = [],
  routeAttributes,
  scheduleData = []
}: NextArrivalsContainerProps): JSX.Element {
  // Prediction data
  const relevantPredictionsData =
    getRelevantTimes(predictionsData || []);

  // Schedule data
  const relevantScheduleData =
    getRelevantTimes(scheduleData || []);

  // Assuming the schedule data will always have all possible
  // `direction_id` values
  const arrivalDataKeys: string[] = Object.keys(relevantScheduleData);
  const arrivalData = arrivalDataKeys.map((directionId) => (
    relevantPredictionsData[directionId] ||
    relevantScheduleData[directionId]
  ));

  return !!arrivalData.length ? (
    <div>
      {arrivalData.map(arrival => (
        <NextArrival
          key={arrival.id}
          attributes={arrival.attributes}
          route={routeAttributes}
          type={arrival.type}
        />
      ))}
    </div>
  ) : (
    <div>No arrival information for this stop was found.</div>
  );
}
