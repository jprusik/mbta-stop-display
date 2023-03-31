
const GA_TAG_INIT_CODE = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.REACT_APP_GA_ID}', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  gtag('consent', 'default', {
    ad_storage: 'denied'
  });
`;

export function addAnalyticsTag(): void {
  const isDev = process.env.NODE_ENV === 'development';

  if (process.env.REACT_APP_GA_ID && !isDev) {
    let gtmScript = document.createElement('script');
    gtmScript.type = 'text/javascript';
    gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_ID}`;
    gtmScript.async = true;

    document?.head?.appendChild(gtmScript)?.parentNode?.removeChild(gtmScript);

    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = GA_TAG_INIT_CODE;

    document?.head?.appendChild(scriptTag)?.parentNode?.removeChild(scriptTag);
  }
}
