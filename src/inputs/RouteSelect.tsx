import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {
  Route,
  RouteTypeKeyName,
  UseRoutesData,
  UseRouteStopData,
  VehicleType
} from 'types';
import {formatRouteDisplay, routeTypeToRouteTypeKeyName} from 'utils';
import {SelectionIndicator} from 'inputs/SelectionIndicator';

type RoutesByType = {
  [key: string]: Route[];
}

type RouteSelectProps = {
  routes: UseRoutesData;
  routeStops: UseRouteStopData;
  selectedRoute?: Route['id'];
  selectedRouteType: RouteTypeKeyName;
  handleRouteSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
}

export function RouteSelect({
  routes,
  routeStops,
  selectedRoute,
  selectedRouteType,
  handleRouteSelection
}: RouteSelectProps): JSX.Element {
  const {t} = useTranslation();

  const routesByTypeKeyName = useMemo(() =>
    routes.data?.data.reduce((routeGroups, route) => {
      const routeTypeKey = routeTypeToRouteTypeKeyName(route.attributes.type);

      const newRouteGroups = {
        ...routeGroups,
        [routeTypeKey]: routeGroups[routeTypeKey] ?
          [...routeGroups[routeTypeKey], route] :
          [route]
      };

      // Special exception for the Silver Line routes: *also* add it
      // to the trains group, since it's commonly contextually relevant to
      // the train lines
      if (
        route.attributes.short_name.match(/^SL[\w]$/i) &&
        route.attributes.type === VehicleType.BUS
      ) {
        return {
        ...routeGroups,
        ...newRouteGroups,
        [RouteTypeKeyName.TRAIN]: routeGroups[RouteTypeKeyName.TRAIN] ?
          [...routeGroups[RouteTypeKeyName.TRAIN], route] :
          [route]
        }
      };

      return newRouteGroups;
    }, {} as RoutesByType)
  , [routes]);

  const allRouteTypesIsSelected = selectedRouteType === RouteTypeKeyName.ALL;
  const groupedRouteData = (
    selectedRouteType && selectedRouteType !== RouteTypeKeyName.ALL
  ) ?
    routesByTypeKeyName?.[selectedRouteType] :
    routes.data?.data;

  return (
    <FormControl size="small">
      {!selectedRoute && (
        <SelectionIndicator fontSize="large" />
      )}
      <InputLabel id="select-route">
        {t('input.route_label')}
      </InputLabel>
      <Select
        autoWidth
        error={!selectedRoute || !routeStops.data?.data.length}
        label={t('input.route_label')}
        labelId="select-route"
        sx={{minWidth: 40, minHeight: 50}}
        value={selectedRoute || 'none'}
        variant="outlined"
        MenuProps={{transitionDuration: 0}}
        onChange={handleRouteSelection}
      >
        <MenuItem
          key="none"
          value="none"
          disabled
        >
          {t('action_prompt.select_route_short')}
        </MenuItem>
        {/* Sorted by API by: type, long_name, description */}
        {groupedRouteData?.map(({attributes, id}) => (
          <MenuItem
            key={id}
            value={id}
          >
            {allRouteTypesIsSelected &&
              `(${attributes.description}) `
            }
            {formatRouteDisplay(attributes)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
