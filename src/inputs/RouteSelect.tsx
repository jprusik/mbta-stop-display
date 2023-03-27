import {useContext, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  Route,
  RouteTypeKeyName,
  UseRoutesData,
  UseRouteStopData,
  VehicleType
} from 'types';
import {ActionHandlersContext} from 'contexts';
import {
  formatRouteDisplay,
  parseBusNumberStringForSort,
  routeTypeToRouteTypeKeyName
} from 'utils';
import {MenuItemValue} from 'inputs/MenuItemValue';
import {SelectionIndicator} from 'inputs/SelectionIndicator';
import {RouteIcon} from 'RouteIcon';

type RoutesByType = {
  [key: string]: Route[];
}

type RouteSelectProps = {
  routes: UseRoutesData;
  routeStops: UseRouteStopData;
  selectedRoute?: Route['id'];
  selectedRouteType: RouteTypeKeyName;
}

export function RouteSelect({
  routes,
  routeStops,
  selectedRoute,
  selectedRouteType
}: RouteSelectProps): JSX.Element {
  const {t} = useTranslation();
  const {handleRouteSelection} = useContext(ActionHandlersContext);

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

  // Sorts that are missing / not working from the API
  const sortedRoutesByTypeKeyName = useMemo(() => {
    if (!routesByTypeKeyName) {
      return;
    }

    /*
      Because the bus numbers are returned as strings, the API doesn't
      sort the number values properly (e.g. "109", "11", "110").

      Also, not all values are composed solely of numerical characters
      (e.g. "62/76", 34E", "SL1", "CT2"). See `parseBusNumberString`
      comments for parsing irregularly formatted values strategy.
    */
    const sortedBusesGroup =
      routesByTypeKeyName[RouteTypeKeyName.BUS]
        // map with sort value to avoid running
        // `parseBusNumberStringForSort` more than once per record in sort
        .map((busRoute) => ({
          ...busRoute,
          sortValue: parseBusNumberStringForSort(
            busRoute.attributes.short_name
          )
        }))
        .sort((a, b) => a.sortValue < b.sortValue ? -1 : 1);

    // Group lines by color
    const sortedTrainGroup = routesByTypeKeyName[RouteTypeKeyName.TRAIN]
      .sort((a, b) => a.attributes.color < b.attributes.color ? -1 : 1);

    return {
      ...routesByTypeKeyName,
      [RouteTypeKeyName.TRAIN]: sortedTrainGroup,
      [RouteTypeKeyName.BUS]: sortedBusesGroup
    };
  }, [routesByTypeKeyName]) as RoutesByType;

  const allRouteTypesIsSelected = selectedRouteType === RouteTypeKeyName.ALL;
  const groupedRouteData = (
    selectedRouteType && selectedRouteType !== RouteTypeKeyName.ALL
  ) ?
    sortedRoutesByTypeKeyName?.[selectedRouteType] :
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
        {/* API-sorted by: type, long_name, description */}
        {groupedRouteData?.map(({attributes, id}) => (
          <MenuItem
            key={id}
            value={id}
          >
            <MenuItemValue>
              {allRouteTypesIsSelected ?
                `(${attributes.description}) ` : (
                  <RouteIcon
                    color={attributes.color}
                    id={id}
                  />
                )
              }
              {formatRouteDisplay(attributes)}
            </MenuItemValue>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
