export type ResponseError = {
  code: string;
  detail: string;
  source: {
    parameter: string;
  },
  status: string;
}

export enum DataTypes {
  ALERT = 'alert',
  PREDICTION = 'prediction',
  ROUTE = 'route',
  SCHEDULE = 'schedule',
  STOP = 'stop',
  TRIP = 'trip',
  VEHICLE = 'vehicle'
}

export type RelationshipData = {
  id: string;
  type: DataTypes;
}
