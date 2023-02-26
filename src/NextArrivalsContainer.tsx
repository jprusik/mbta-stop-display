import { useEffect, useState, useMemo } from 'react';
import {useContext} from 'react';
import styled from '@emotion/styled';
import {
  Prediction,
  RouteAttributes,
  Schedule
} from 'types';
import {ScheduleContext} from 'contexts/schedule';
import {NextArrival} from 'NextArrival';
import {getRelevantTimes} from 'utils';

type NextArrivalsContainerProps = {
  predictionsData: Prediction[] | undefined;
  routeAttributes: RouteAttributes;
}

export function NextArrivalsContainer ({
  predictionsData = [],
  routeAttributes
}: NextArrivalsContainerProps): JSX.Element {
  const {data} = useContext(ScheduleContext);
  const scheduleData = useMemo(() => (data?.data || []), [data.data]);
  const [arrivalData, setArrivalData] =
    useState<Array<Prediction | Schedule>>([]);

  // Refresh the arrival data every x ms so that it always shows
  // information about the future, even if predictions have gotten
  // stale and haven't been refreshed yet.
  useEffect(() => {
    function updateNewArrivalData () {
      // Prediction data
      const relevantPredictionsData =
        getRelevantTimes(predictionsData || []);

      // Schedule data
      const relevantScheduleData =
        getRelevantTimes(scheduleData || []);

      // Assuming the schedule data will always have all possible
      // `direction_id` values
      const arrivalDataKeys: string[] = Object.keys(relevantScheduleData);

      setArrivalData(
        arrivalDataKeys.map((directionId) => (
          relevantPredictionsData[directionId] ||
          relevantScheduleData[directionId]
        ))
      );
    }

    /*
    This will have the side effect of causing `NextArrival` components to re-render as well. This is desired here, since `NextArrival` contains presentation "countdowns" which we also want to re-evaluate at this same interval.
    */
    const newArrivalDataInterval =
      setInterval(updateNewArrivalData, 1000);

    return () => clearInterval(newArrivalDataInterval);
  }, [predictionsData, scheduleData]);

  return !!arrivalData.length ? (
    <ArrivalsContainer>
      {arrivalData.map(arrival => (
        <NextArrival
          key={arrival.id}
          attributes={arrival.attributes}
          route={routeAttributes}
          type={arrival.type}
        />
      ))}
    </ArrivalsContainer>
  ) : (
    <ArrivalsContainer>
      No arrival information for this stop was found.
    </ArrivalsContainer>
  );
}

const ArrivalsContainer = styled.div`
  > div {
    margin: 20px auto;
  }
`;
