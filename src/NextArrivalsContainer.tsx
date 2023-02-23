import {
  DataTypes,
  PredictionData,
  RouteAttributes,
  ScheduleData
} from 'types';
import {NextArrival} from './NextArrival';

type NextArrivalsContainerProps = {
  predictionsData: PredictionData | null | undefined,
  routeData: RouteAttributes,
  scheduleData: ScheduleData | null | undefined,
}

export function NextArrivalsContainer ({
  predictionsData,
  routeData,
  scheduleData
}: NextArrivalsContainerProps): JSX.Element {
  // Prediction data
  const predictionDataIsAvailable = !!predictionsData?.data?.length;

  return (predictionDataIsAvailable && routeData) ? (
    <div>
      {/* @TODO only show the next train for each direction (two entries max) */}
      {predictionsData?.data?.map(prediction => (
        <NextArrival
          key={prediction.id}
          attributes={prediction.attributes}
          route={routeData}
          type={DataTypes.PREDICTION}
        />
      ))}
    </div>
  ) : (
    <div>No predictions were found</div>
  );
}

// {/* Placeholder */}
// {/* {(scheduleData && routeData) && (
//   <NextArrival
//     attributes={scheduleData.data?.[0]?.attributes}
//     route={routeData}
//     type={DataTypes.SCHEDULE}
//   />
// )} */}
