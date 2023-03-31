import {Fragment, useEffect} from 'react';
import {addAnalyticsTag} from 'utils';
import {AppDetailsNav} from 'components/AppDetailsNav';
import {Body} from 'components/Body';
import {Footer} from 'components/Footer';

export function App() {
  useEffect(() => addAnalyticsTag(), []);

  return (
    <Fragment>
      <Body />
      <Footer />
      <AppDetailsNav />
    </Fragment>
  );
}
