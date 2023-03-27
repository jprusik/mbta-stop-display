import {
  DataTypes,
  RelationshipData,
  ResponseError,
  VehicleType
} from 'types';

export enum RouteTypeKeyName {
  ALL = 'all',
  BUS = 'bus',
  COMMUTER_RAIL = 'commuter_rail',
  FERRY = 'ferry',
  TRAIN = 'train'
}

export enum LineColors {
  BLUE = '003DA5',
  BUS = 'FFC72C',
  COMMUTER = '80276C',
  FERRY = '008EAA',
  GREEN = '00843D',
  ORANGE = 'ED8B00',
  RED = 'DA291C',
  SILVER = '7C878E'
}

export type RouteAttributes = {
  color: LineColors; // hex value, e.g. "FFFFFF"
  description: string; // e.g. "Commuter Rail"
  direction_destinations: string[]; // e.g. ["Worcester", "S. Station"]
  direction_names: string[]; // e.g. ["Outbound", "Inbound"]
  fare_class: string; // e.g. "Commuter Rail"
  long_name: string; // e.g. "Framingham/Worcester Line"
  short_name: string; // e.g. "Red" - will have empty string value `""` if no value is otherwise defined.
  sort_order: number;
  text_color: string; // hex value, e.g. "FFFFFF"
  type: VehicleType; // ex. 2 == "Commuter Rail"
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

export type RouteData = {
  data: Route[];
  errors?: ResponseError[];
}

export type UseRoutesData = {
  data?: RouteData | null;
  error: Error | ResponseError | null;
  isLoading: boolean;
  refetch: () => void;
}
