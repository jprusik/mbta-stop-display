type RelationshipData = {
  id: string;
  type: string;
}

type PredictionRelationships = {
  route: {
    data: RelationshipData;
  },
  stop: {
    data: RelationshipData;
  },
  trip: {
    data: RelationshipData;
  },
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
  type: 'prediction';
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
  type: 1 | 2 | 3 | 4; // ex. 2 == "Commuter Rail"
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
  type: 'route';
}
