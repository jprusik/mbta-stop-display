export const PREDICTIONS_REFETCH_INTERVAL = process.env.REACT_APP_PREDICTIONS_REFETCH_INTERVAL ?
  parseInt(process.env.REACT_APP_PREDICTIONS_REFETCH_INTERVAL, 10) :
  300000; // 5 min

/*
Note: using an API key in a public-facing environment will expose it
to user clients! See notes in the included `.env.example` file.
*/
export const API_KEY = process.env.REACT_APP_API_KEY;
export const ROUTE = process.env.REACT_APP_DEFAULT_ROUTE;
export const ROUTE_STOP = process.env.REACT_APP_DEFAULT_ROUTE_STOP;

export const REQUEST_DOMAIN = `https://api-v3.mbta.com`
