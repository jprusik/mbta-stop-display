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
export const APP_CODE_URL = 'https://github.com/jprusik/mbta-stop-display';
export const APP_AUTHOR_URL = 'https://www.jonathanprusik.com';
export const APP_AUTHOR_EMAIL = 'jprusik@classynemesis.com';
export const APP_AUTHOR_PATREON_URL = 'https://www.patreon.com/ClassyNemesis'
export const APP_AUTHOR_GITHUB_SPONSORS_URL = 'https://www.github.com/sponsors/jprusik'
export const APP_AUTHOR_PAYPAL_URL = 'https://www.paypal.me/jonprusik'
