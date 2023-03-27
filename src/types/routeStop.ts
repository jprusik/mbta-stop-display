import {
  DataTypes,
  RelationshipData,
  ResponseError,
  VehicleType
} from 'types';

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
  vehicle_type: VehicleType; // e.g. 3,
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

export type StopData = {
  data: Stop[];
  errors?: ResponseError[];
}

export type UseRouteStopData = {
  data?: StopData | null;
  error: Error | ResponseError | null;
  isLoading: boolean;
  refetch: () => void;
}
