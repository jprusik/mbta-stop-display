import {ScheduleProvider} from 'contexts/schedule';
import {Body} from './Body';

export function App() {
  return (
    <ScheduleProvider>
      <Body />
    </ScheduleProvider>
  );
}
