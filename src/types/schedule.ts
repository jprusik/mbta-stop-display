import {
  DataTypes,
  RelationshipData,
  ResponseError,
  Route,
  Stop
} from 'types';

export type ScheduleRelationships = {
  route: {
    data: RelationshipData;
  },
  stop: {
    data: RelationshipData;
  },
  trip: {
    data: RelationshipData;
  }
}

export type ScheduleAttributes = {
  arrival_time: string;
  departure_time: string | null;
  direction_id: 0 | 1;
  stop_sequence: number;
  status: string | null;
  schedule_relationship: string | null; // @TODO string enum
}

export type Schedule = {
  attributes: ScheduleAttributes;
  id: string;
  links: {
    self: string;
  },
  relationships: ScheduleRelationships;
  type: DataTypes.SCHEDULE;
}

export type ScheduleData = {
  data: Schedule[];
  included: Array<Route | Stop>;
}

export type UseRouteScheduleData = {
  data?: ScheduleData | null;
  error: Error | ResponseError | null;
  isLoading: boolean;
  refetch: () => void;
}
