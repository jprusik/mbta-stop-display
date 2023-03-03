import {useTranslation} from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Stop, UseRouteStopData} from 'types';
import {SelectionIndicator} from 'inputs/SelectionIndicator';

type RouteStopSelectProps = {
  routeStops: UseRouteStopData;
  selectedRouteStop?: Stop['id'];
  handleRouteStopSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
}

export function RouteStopSelect({
  routeStops,
  selectedRouteStop,
  handleRouteStopSelection
}: RouteStopSelectProps): JSX.Element {
  const {t} = useTranslation();

  return (
    <FormControl size="small">
      {!selectedRouteStop && (
        <SelectionIndicator fontSize="large" />
      )}
      <InputLabel id="select-route-stop">
        {t('input.stop_label')}
      </InputLabel>
      <Select
        autoWidth
        error={!selectedRouteStop}
        label={t('input.stop_label')}
        labelId="select-route-stop"
        sx={{minWidth: 88, minHeight: 50, textAlign: 'left'}}
        value={selectedRouteStop || 'none'}
        variant="outlined"
        MenuProps={{transitionDuration: 0}}
        onChange={handleRouteStopSelection}
      >
        <MenuItem
          key="none"
          value="none"
          disabled
        >
          {t('action_prompt.select_stop_short')}
        </MenuItem>
        {routeStops.data?.data?.map(({attributes, id}) => (
          <MenuItem
            key={id}
            value={id}
          >
            {attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
