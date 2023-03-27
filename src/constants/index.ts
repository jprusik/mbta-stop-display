export const PREDICTIONS_REFETCH_INTERVAL = process.env.REACT_APP_PREDICTIONS_REFETCH_INTERVAL ?
  parseInt(process.env.REACT_APP_PREDICTIONS_REFETCH_INTERVAL, 10) :
  300000; // 5 min

/*
Note: using an API key in a public-facing environment will expose it
to user clients! See notes in the included `.env.example` file.
*/
export const API_KEY = process.env.REACT_APP_API_KEY;

export const REQUEST_DOMAIN = 'https://api-v3.mbta.com';

export const ISSUE_REPORTING_URL = 'https://github.com/jprusik/mbta-stop-display/issues';
