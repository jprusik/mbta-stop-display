import moment from 'moment';
import {
  DataTypes,
  Prediction,
  PredictionAttributes,
  RouteAttributes,
  RouteTypeKeyName,
  Schedule,
  ScheduleAttributes,
  VehicleType,
  VehicleTypeKeyName
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

type ArrivalTextData = {
  translationKey: string;
  arrivalTime?: string;
  departureTime?: string;
}

export function getArrivalTextKey (
  attributes: PredictionAttributes | ScheduleAttributes,
  arrivalType: DataTypes.PREDICTION | DataTypes.SCHEDULE,
  routeTypeId: VehicleType
): ArrivalTextData {
  const now = moment();
  const arrivalTime = moment(attributes.arrival_time);
  const departureTime = moment(attributes.departure_time);

  /*
  Verify that `arrival_time` predictions are in the
  future, since predictions from the immediate past can
  be returned from the API. `departure_time` values
  not in the future are filtered out upstream.
  */
  const arrivalIsInFuture = arrivalTime.isAfter(now);
  const routeVehicleKeyName = vehicleTypeToVehicleKeyName(routeTypeId);

  return attributes.status ? {
    // `status` is a en-US string returned from the API
    translationKey: attributes.status
  } : (
    attributes.departure_time ?
      (attributes.arrival_time && arrivalIsInFuture) ?
        {
          translationKey: `state.arrival_and_departure_${routeVehicleKeyName}_${arrivalType}`,
          arrivalTime: arrivalTime.fromNow(true),
          departureTime: departureTime.fromNow(true)
        } : {
          translationKey: `state.departure_${routeVehicleKeyName}_${arrivalType}`,
          departureTime: departureTime.fromNow(true)
        }
      : {translationKey: 'state.arrival_currently_unknown'} // should be unreachable
  );
}

export function formatRouteDisplay(attributes: RouteAttributes): string {
  switch (attributes.type) {
    case VehicleType.LIGHT_RAIL:
      return attributes.long_name;
      // e.g. "Green Line E"
    case VehicleType.HEAVY_RAIL:
      return attributes.long_name;
      // e.g. "Red Line"
    case VehicleType.COMMUTER_RAIL:
      return attributes.long_name;
      // e.g. "Needham Line"
    case VehicleType.BUS:
      return `${attributes.short_name} - ${attributes.long_name}`;
      // e.g. "80 - "Arlington Center - Lechmere Station"
    case VehicleType.FERRY:
      return attributes.long_name;
      // e.g. "Hingham/Hull Ferry"
    default:
      return `(${attributes.description}) ${attributes.long_name}`;
      // e.g. "(Local Bus) Arlington Center - Lechmere Station"
  }
}

export function vehicleTypeToVehicleKeyName (
  typeId: VehicleType
): VehicleTypeKeyName {
    switch (typeId) {
      case VehicleType.LIGHT_RAIL:
        return VehicleTypeKeyName.TRAIN;
      case VehicleType.HEAVY_RAIL:
        return VehicleTypeKeyName.TRAIN;
      case VehicleType.COMMUTER_RAIL:
        return VehicleTypeKeyName.TRAIN;
      case VehicleType.BUS:
        return VehicleTypeKeyName.BUS;
      case VehicleType.FERRY:
        return VehicleTypeKeyName.FERRY;
    }
}

export function routeTypeToRouteTypeKeyName (
  typeId: VehicleType
): RouteTypeKeyName {
    switch (typeId) {
      case VehicleType.LIGHT_RAIL:
        return RouteTypeKeyName.TRAIN;
      case VehicleType.HEAVY_RAIL:
        return RouteTypeKeyName.TRAIN;
      case VehicleType.COMMUTER_RAIL:
        return RouteTypeKeyName.COMMUTER_RAIL;
      case VehicleType.BUS:
        return RouteTypeKeyName.BUS;
      case VehicleType.FERRY:
        return RouteTypeKeyName.FERRY;
    }
}
