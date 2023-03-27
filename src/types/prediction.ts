import {
  DataTypes,
  RelationshipData,
  ResponseError,
  ScheduleRelationships
} from 'types';

type PredictionRelationships = ScheduleRelationships & {
  vehicle: {
    data: RelationshipData;
  }
}

export type PredictionAttributes = {
  arrival_time: string;
  departure_time: string | null;
  direction_id: 0 | 1;
  stop_sequence: number;
  status: string | null; // @TODO string enum
  schedule_relationship: string | null; // @TODO string enum
}

export type Prediction = {
  attributes: PredictionAttributes;
  id: string;
  links: {
    self: string;
  },
  relationships: PredictionRelationships;
  type: DataTypes.PREDICTION;
}

export type PredictionData = {
  data: Prediction[];
}

export type UsePredictionData = {
  data?: PredictionData | null;
  error: Error | ResponseError | null;
  isLoading: boolean;
  refetch: () => void;
}
