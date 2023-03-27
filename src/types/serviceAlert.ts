import {
  DataTypes,
  ResponseError,
  Route,
  Stop,
  VehicleType
} from 'types';

export enum ServiceAlertLifecycle {
  NEW = 'NEW',
  ONGOING = 'ONGOING',
  ONGOING_UPCOMING = 'ONGOING_UPCOMING',
  UPCOMING = 'UPCOMING'
}

enum ServiceAlertActivities {
  BOARD = 'BOARD',	// MBTA: "Boarding a vehicle. Any passenger trip includes boarding a vehicle and exiting from a vehicle."
  BRINGING_BIKE = 'BRINGING_BIKE',	// MBTA: "Bringing a bicycle while boarding or exiting."
  EXIT = 'EXIT',	// MBTA: "Exiting from a vehicle (disembarking). Any passenger trip includes boarding a vehicle and exiting a vehicle."
  PARK_CAR = 'PARK_CAR',	// MBTA: "Parking a car at a garage or lot in a station."
  RIDE = 'RIDE',	// MBTA: "Riding through a stop without boarding or exiting… Not every passenger trip will include this – a passenger may board at one stop and exit at the next stop."
  STORE_BIKE = 'STORE_BIKE',	// MBTA: "Storing a bicycle at a station."
  USING_ESCALATOR = 'USING_ESCALATOR',	// MBTA: "Using an escalator while boarding or exiting (should only be used for customers who specifically want to avoid stairs.)"
  USING_WHEELCHAIR = 'USING_WHEELCHAIR'	// MBTA: "Using a wheelchair while boarding or exiting. Note that this applies to something that specifically affects customers who use a wheelchair to board or exit; a delay should not include this as an affected activity unless it specifically affects customers using wheelchairs."
}

enum ServiceAlertCause {
  ACCIDENT = 'ACCIDENT',
  AMTRAK = 'AMTRAK',
  AN_EARLIER_MECHANICAL_PROBLEM = 'AN_EARLIER_MECHANICAL_PROBLEM',
  AN_EARLIER_SIGNAL_PROBLEM = 'AN_EARLIER_SIGNAL_PROBLEM',
  AUTOS_IMPEDING_SERVICE = 'AUTOS_IMPEDING_SERVICE',
  COAST_GUARD_RESTRICTION = 'COAST_GUARD_RESTRICTION',
  CONGESTION = 'CONGESTION',
  CONSTRUCTION = 'CONSTRUCTION',
  CROSSING_MALFUNCTION = 'CROSSING_MALFUNCTION',
  DEMONSTRATION = 'DEMONSTRATION',
  DISABLED_BUS = 'DISABLED_BUS',
  DISABLED_TRAIN = 'DISABLED_TRAIN',
  DRAWBRIDGE_BEING_RAISED = 'DRAWBRIDGE_BEING_RAISED',
  ELECTRICAL_WORK = 'ELECTRICAL_WORK',
  FIRE = 'FIRE',
  FOG = 'FOG',
  FREIGHT_TRAIN_INTERFERENCE = 'FREIGHT_TRAIN_INTERFERENCE',
  HAZMAT_CONDITION = 'HAZMAT_CONDITION',
  HEAVY_RIDERSHIP = 'HEAVY_RIDERSHIP',
  HIGH_WINDS = 'HIGH_WINDS',
  HOLIDAY = 'HOLIDAY',
  HURRICANE = 'HURRICANE',
  ICE_IN_HARBOR = 'ICE_IN_HARBOR',
  MAINTENANCE = 'MAINTENANCE',
  MECHANICAL_PROBLEM = 'MECHANICAL_PROBLEM',
  MEDICAL_EMERGENCY = 'MEDICAL_EMERGENCY',
  PARADE = 'PARADE',
  POLICE_ACTION = 'POLICE_ACTION',
  POWER_PROBLEM = 'POWER_PROBLEM',
  SEVERE_WEATHER = 'SEVERE_WEATHER',
  SIGNAL_PROBLEM = 'SIGNAL_PROBLEM',
  SLIPPERY_RAIL = 'SLIPPERY_RAIL',
  SNOW = 'SNOW',
  SPECIAL_EVENT = 'SPECIAL_EVENT',
  SPEED_RESTRICTION = 'SPEED_RESTRICTION',
  SWITCH_PROBLEM = 'SWITCH_PROBLEM',
  TIE_REPLACEMENT = 'TIE_REPLACEMENT',
  TRACK_PROBLEM = 'TRACK_PROBLEM',
  TRACK_WORK = 'TRACK_WORK',
  TRAFFIC = 'TRAFFIC',
  UNRULY_PASSENGER = 'UNRULY_PASSENGER',
  WEATHER = 'WEATHER'
}

export enum ServiceAlertEffect {
  ACCESS_ISSUE = 'ACCESS_ISSUE',
  ADDITIONAL_SERVICE = 'ADDITIONAL_SERVICE',
  AMBER_ALERT = 'AMBER_ALERT',
  BIKE_ISSUE = 'BIKE_ISSUE',
  CANCELLATION = 'CANCELLATION',
  DELAY = 'DELAY',
  DETOUR = 'DETOUR',
  DOCK_CLOSURE = 'DOCK_CLOSURE',
  DOCK_ISSUE = 'DOCK_ISSUE',
  ELEVATOR_CLOSURE = 'ELEVATOR_CLOSURE',
  ESCALATOR_CLOSURE = 'ESCALATOR_CLOSURE',
  EXTRA_SERVICE = 'EXTRA_SERVICE',
  FACILITY_ISSUE = 'FACILITY_ISSUE',
  MODIFIED_SERVICE = 'MODIFIED_SERVICE',
  NO_SERVICE = 'NO_SERVICE',
  OTHER_EFFECT = 'OTHER_EFFECT',
  PARKING_CLOSURE = 'PARKING_CLOSURE',
  PARKING_ISSUE = 'PARKING_ISSUE',
  POLICY_CHANGE = 'POLICY_CHANGE',
  SCHEDULE_CHANGE = 'SCHEDULE_CHANGE',
  SERVICE_CHANGE = 'SERVICE_CHANGE',
  SHUTTLE = 'SHUTTLE',
  SNOW_ROUTE = 'SNOW_ROUTE',
  STATION_CLOSURE = 'STATION_CLOSURE',
  STATION_ISSUE = 'STATION_ISSUE',
  STOP_CLOSURE = 'STOP_CLOSURE',
  STOP_MOVE = 'STOP_MOVE',
  STOP_MOVED = 'STOP_MOVED',
  SUMMARY = 'SUMMARY',
  SUSPENSION = 'SUSPENSION',
  TRACK_CHANGE = 'TRACK_CHANGE',
  UNKNOWN_EFFECT = 'UNKNOWN_EFFECT'
}

export type ServiceAlertAttributes = {
  active_period: // Start and End dates for active alert
    {
      end: string | null; // MBTA: "Format is ISO8601."
      start: string; // MBTA: "Format is ISO8601."
    }[];
  banner: string | null; // MBTA: "Set if alert is meant to be displayed prominently, such as the top of every page."
  cause: ServiceAlertCause; // MBTA: "What is causing the alert.", key name, e.g. "ACCIDENT"
  created_at: string; // MBTA: "Format is ISO8601.", e.g. "2023-03-10T22:16:25-05:00"
  description: string | null; // MBTA: "This plain-text string will be formatted as the body of the alert (or shown on an explicit “expand” request by the user). The information in the description should add to the information of the header."
  effect: ServiceAlertEffect; // MBTA: "The effect of this problem on the affected entity.", key name, e.g. "ACCESS_ISSUE"
  effect_name?: string; // MBTA: "This plain-text string will be highlighted, for example in boldface.", note: not currently delivered by v3 API
  header: string; // MBTA: "This plain-text string will be highlighted, for example in boldface."
  informed_entity: // MBTA: "An entity affected by an alert. At least one of the fields other than activities will be non-null. The affected entity is the intersection of these fields, not the union: if stop and route both have values, the alert does not affect the entire route."
    {
      activities: ServiceAlertActivities[]; // MBTA: "Activities affected by this alert."
      route: Route['id'] | null;
      route_type: VehicleType;
      stop: Stop['id'] | null;
      trip?: string | null; // MBTA: "id of the affected Trip.", e.g. "CR-Weekday-Spring-17-517"
    }[];
  lifecycle: ServiceAlertLifecycle; // MBTA: "Identifies whether alert is a new or old, in effect or upcoming.", key name
  service_effect: string; // MBTA: "Summarizes the service and the impact to that service."
  severity: number; // MBTA: "How severe the alert it from least (0) to most (10) severe."
  short_header: string; // MBTA: "A shortened version of */attributes/header.", e.g. "All weekend Fairmount Line trains will be bused between Morton St. & Readville due to construction of Blue Hill Ave Station."
  timeframe: string | null; // MBTA: "Summarizes when an alert is in effect.", e.g. "ongoing"
  updated_at: string | null, // MBTA: "Format is ISO8601."
  url: string | null; // MBTA: "A URL for extra details, such as outline construction or maintenance plans."
}

export type ServiceAlert = {
  attributes: ServiceAlertAttributes;
  id: string;
  links: {
    self: string;
  },
  type: DataTypes.ALERT;
}

export type ServiceAlertData = {
  data: ServiceAlert[];
  errors?: ResponseError[];
}

export type UseServiceAlertsData = {
  data?: ServiceAlertData | null;
  error: Error | ResponseError | null;
  isLoading: boolean;
  refetch: () => void;
}
