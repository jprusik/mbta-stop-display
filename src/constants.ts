import {DataTypes} from "types";

export const DATA_REFETCH_INTERVAL = process.env.REACT_APP_DATA_REFETCH_INTERVAL ?
  parseInt(process.env.REACT_APP_DATA_REFETCH_INTERVAL, 10) : 60000;

/*
Note: using an API key in a public-facing environment will expose it
to user clients! See notes in the included `.env.example` file.
*/
export const API_KEY = process.env.REACT_APP_API_KEY;
export const ROUTE = process.env.REACT_APP_ROUTE;
export const ROUTE_STOP = process.env.REACT_APP_ROUTE_STOP;

const REQUEST_INCLUDES = [DataTypes.ROUTE, DataTypes.STOP];
// @TODO use `fields` to reduce response data to only what is used in the app
export const PREDICTIONS_REQUEST_URL = `https://api-v3.mbta.com/predictions/?filter[route]=${ROUTE}&filter[stop]=${ROUTE_STOP}&sort=direction_id,departure_time`;

export const SCHEDULE_REQUEST_URL = `https://api-v3.mbta.com/schedules/?filter[route]=${ROUTE}&filter[stop]=${ROUTE_STOP}&include=${REQUEST_INCLUDES.join(',')}&sort=direction_id,departure_time`;
