import {Fragment, useMemo, useState} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import {
  Route,
  RouteTypeKeyName,
  Stop,
  UseRoutesData,
  UseRouteStopData
} from 'types';
import {routeTypeToRouteTypeKeyName} from 'utils';
import {RouteTypeIcon} from 'RouteTypeIcon';

type FooterProps = {
  routes: UseRoutesData;
  routeStops: UseRouteStopData;
  selectedRoute?: Route['id'];
  selectedRouteStop?: Stop['id'];
  selectedRouteType?: RouteTypeKeyName;
  handleRouteSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
  handleRouteStopSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
  handleRouteTypeSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
}

export function Footer ({
  routes,
  routeStops,
  selectedRoute,
  selectedRouteStop,
  selectedRouteType,
  handleRouteSelection,
  handleRouteStopSelection,
  handleRouteTypeSelection
}: FooterProps): JSX.Element {
  const {t} = useTranslation();
  const [footerIsOpen, setFooterIsOpen] = useState(true);

  function handleFooterToggle () {
    setFooterIsOpen(!footerIsOpen);
  }

  type RoutesByType = {
    [key: string]: Route[];
  }

  const routesByTypeKeyName = useMemo(() =>
    routes.data?.data.reduce((acc, route) => {
      const routeTypeKey = routeTypeToRouteTypeKeyName(route.attributes.type);

      return {
        ...acc,
        [routeTypeKey]: acc[routeTypeKey] ?
          [...acc[routeTypeKey], route] :
          [route]
      };
    }, {} as RoutesByType)
  , [routes]);

  const groupedRouteData = (
    selectedRouteType && selectedRouteType !== RouteTypeKeyName.ALL
  ) ?
    routesByTypeKeyName?.[selectedRouteType] :
    routes.data?.data;

  return (
    <FooterContainer footerIsOpen={footerIsOpen}>
      <SelectionContainer>
        {routes.isLoading ? (
          <SelectionMessage>
            <CircularProgress size={16} />
            &nbsp;
            {t('state.data_loading')}
          </SelectionMessage>
        ) : routes.error ? (
          <SelectionMessage>
            {t('error.generic')}
          </SelectionMessage>
        ) : !routes.data?.data.length ? (
          <SelectionMessage>
            {t('error.no_routes_information')}
          </SelectionMessage>
        ) : (
          <Fragment>
            <FormControl size="small"> {/* Route Type Select */}
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
            {selectedRouteType && (
              <FormControl size="small"> {/* Route Select */}
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
                      {`(${attributes.description}) ${attributes.long_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {!selectedRoute ? (
              null
            ) : routeStops.isLoading ? (
              <SelectionMessage>
                <CircularProgress size={16} />
                &nbsp;
                {t('state.data_loading')}
              </SelectionMessage>
            ) : routeStops.error ? (
              <SelectionMessage>
                {t('error.generic')}
              </SelectionMessage>
            ) : !routeStops.data?.data.length ? (
              <SelectionMessage>
                <SelectionIndicator fontSize="large" />
                {t('error.no_route_stops')}
              </SelectionMessage>
            ) : (
              <FormControl size="small"> {/* Route Stop Select */}
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
            )}
          </Fragment>
        )}
      </SelectionContainer>
      <FooterToggle
        disableFocusRipple={true}
        disableTouchRipple={true}
        endIcon={footerIsOpen ? (
          <KeyboardDoubleArrowDownIcon />
        ) : (
          <KeyboardDoubleArrowUpIcon />
        )}
        size="small"
        variant="text"
        onClick={handleFooterToggle}
      >
        {footerIsOpen ?
          t('action_prompt.toggle_hide') : t('action_prompt.toggle_show')
        }
      </FooterToggle>
    </FooterContainer>
  );
}

const MenuItemValue = styled.div`
  display: flex;
  align-items: center;
  flex-flow: nowrap;

  > svg {
    margin-right: 6px;
    width: auto;
    height: 32px;
  }
`;

const SelectionIndicator = styled(SouthRoundedIcon)`
  position: absolute;
  top: -140px;
  left: 20px;
  margin: auto;
  width: auto;
  height: 125px;
  text-align: center;
  color: #d8493f;
`;

const SelectionMessage = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
`

const SelectionContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  width: 100%;

  > div {
    margin-bottom: 20px;
    max-width: 45%;
    text-align: left;

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;

const FooterToggle = styled(Button)`
  margin: 0;
  position: absolute;
  top: -28px;
  right: 0;
  text-transform: none;
  color: #FFF;
  padding: 0;
  border: 2px solid transparent;

  :hover,
  :active,
  :focus-visible {
    color: #a0cbf5;
    background: none;
  }

  :focus-visible {
    border-color: #a0cbf5;
  }

  > span {
    margin: 0;
  }
`;

const FooterContainer = styled.div<{footerIsOpen: boolean;}>`
  ${({footerIsOpen}) => `
    display: flex;
    position: fixed;
    bottom: ${footerIsOpen ? '0' : '-80px'};
    justify-content: flex-start;
    margin: 0 auto;
    border-top: 1px solid #666;
    background-color: #22272e;
    padding: 0;
    width: 100vw;
    font-size: 1rem;

    > div {
      margin: 0 20px;

      > div > *:not(svg) {
        visibility: ${footerIsOpen ? 'visible' : 'hidden'};
      }
    }
  `}
`;
