export enum DataTypes {
  PREDICTION = 'prediction',
  ROUTE = 'route',
  SCHEDULE = 'schedule',
  STOP = 'stop',
  TRIP = 'trip',
  VEHICLE = 'vehicle'
}

type RelationshipData = {
  id: string;
  type: DataTypes;
}

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
  relationships: PredictionRelationships;
  type: DataTypes.PREDICTION;
}

export type PredictionData = {
  data: Prediction[];
}

type ScheduleRelationships = {
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
  status: string | null; // @TODO string enum
  schedule_relationship: string | null; // @TODO string enum
}

export type Schedule = {
  attributes: ScheduleAttributes;
  id: string;
  relationships: ScheduleRelationships;
  type: DataTypes.PREDICTION;
}

export type ScheduleData = {
  data: Schedule[];
  included: Array<Route | Stop>;
}

export type RouteAttributes = {
  color: string; // hex value, e.g. "FFFFFF"
  description: string; // e.g. "Commuter Rail"
  direction_destinations: string[]; // e.g. ["Worcester", "S. Station"]
  direction_names: string[]; // e.g. ["Outbound", "Inbound"]
  fare_class: string; // e.g. "Commuter Rail"
  long_name: string; // e.g. "Framingham/Worcester Line"
  short_name: string; // e.g. "Red" - will have empty string value `""` if no value is otherwise defined.
  sort_order: number;
  text_color: string; // hex value, e.g. "FFFFFF"
  type: 0 | 1 | 2 | 3 | 4; // ex. 2 == "Commuter Rail"
}

export type Route = {
  attributes: RouteAttributes;
  id: string;
  links: {
    self: string;
  },
  relationships: {
    line: {
      data: RelationshipData;
    }
  },
  type: DataTypes.ROUTE;
}

export type StopAttributes = {
  address: string | null; // e.g. "Alewife Brook Parkway and Cambridge Park Drive, Cambridge, MA 02140",
  at_street: string | null; // e.g. "Essex Street",
  description: string; // e.g. "Alewife - Red Line",
  latitude: number; // e.g. -71.194994,
  location_type: 0 | 1 | 2 | 3; // e.g. 0,
  longitude: number; // e.g. 42.316115,
  municipality: string; // e.g. "Cambridge",
  name: string; // e.g. "Parker St @ Hagen Rd",
  on_street: string | null; // e.g. "Massachusetts Avenue",
  platform_code: string | null; // e.g. "5",
  platform_name: string; // e.g. "Red Line",
  vehicle_type: 0 | 1 | 2 | 3 | 4; // e.g. 3,
  wheelchair_boarding: 0 | 1 | 2; // e.g. 0,
}

export type Stop = {
  attributes: StopAttributes;
  id: string;
  links: {
    self: string;
  },
  relationships: {
    facilities: {
      data: RelationshipData;
    },
    parent_station: {
      data: RelationshipData;
    },
    zone: {
      data: RelationshipData;
    }
  },
  type: DataTypes.STOP;
}
