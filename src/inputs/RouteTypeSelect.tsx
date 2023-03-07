import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {RouteTypeKeyName} from 'types';
import {ActionHandlersContext} from 'contexts';
import {RouteTypeIcon} from 'RouteTypeIcon';
import {MenuItemValue} from 'inputs/MenuItemValue';
import {SelectionIndicator} from 'inputs/SelectionIndicator';

type RouteTypeSelectProps = {
  selectedRouteType?: RouteTypeKeyName;
}

export function RouteTypeSelect({
  selectedRouteType
}: RouteTypeSelectProps): JSX.Element {
  const {t} = useTranslation();
  const {handleRouteTypeSelection} = useContext(ActionHandlersContext);

  return (
    <FormControl size="small">
      {!selectedRouteType && (
        <SelectionIndicator fontSize="large" />
      )}
      <InputLabel id="select-route">
        {t('input.route_type_label')}
      </InputLabel>
      <Select
        autoWidth
        error={!selectedRouteType}
        label={t('input.route_type_label')}
        labelId="select-route"
        sx={{minWidth: 90, minHeight: 50}}
        value={selectedRouteType || 'none'}
        variant="outlined"
        MenuProps={{transitionDuration: 0}}
        onChange={handleRouteTypeSelection}
      >
        <MenuItem
          key="none"
          value="none"
          disabled
        >
          {t('action_prompt.select_route_type_short')}
        </MenuItem>
        {Object.values(RouteTypeKeyName).map(key => (
          <MenuItem
            key={key}
            value={key}
          >
            <MenuItemValue>
              <RouteTypeIcon typeKey={key}/>
              {t(`input.${key}_label`)}
            </MenuItemValue>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
