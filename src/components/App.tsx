import {Fragment} from 'react';
import {AppDetailsNav} from 'components/AppDetailsNav';
import {Body} from 'components/Body';
import {Footer} from 'components/Footer';

export function App() {
  return (
    <Fragment>
      <Body />
      <Footer />
      <AppDetailsNav />
    </Fragment>
  );
}
