export const DATA_REFETCH_INTERVAL = process.env.REACT_APP_DATA_REFETCH_INTERVAL ?
  parseInt(process.env.REACT_APP_DATA_REFETCH_INTERVAL, 10) : 60000;

/*
Note: using an API key in a public-facing environment will expose it to user clients! If a key is needed for the request, proxy the client request on a backend service.

This configuration presently assumes you're running on a private/trusted network, and accessing via private/trusted clients.
*/
export const API_KEY = process.env.REACT_APP_API_KEY;
export const ROUTE = process.env.REACT_APP_ROUTE;
export const ROUTE_STOP = process.env.REACT_APP_ROUTE_STOP;

export const REQUEST_INCLUDES = ['route', 'stop'];
export const REQUEST_URL = `https://api-v3.mbta.com/predictions/?filter[route]=${ROUTE}&filter[stop]=${ROUTE_STOP}&include=${REQUEST_INCLUDES.join(',')}&sort=direction_id,arrival_time`;
