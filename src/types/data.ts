enum ResponseErrorCode {
  BAD_REQUEST = 'bad_request',
  FORBIDDEN = 'forbidden',
  RATE_LIMITED = 'rate_limited'
}

export type ResponseError = {
  code: ResponseErrorCode;
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
