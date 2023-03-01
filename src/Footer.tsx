import {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import {Route, Stop, UseRoutesData, UseRouteStopData} from 'types';

type FooterProps = {
  routes: UseRoutesData;
  routeStops: UseRouteStopData;
  selectedRoute?: Route['id'];
  selectedRouteStop?: Stop['id'];
  handleRouteSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
  handleRouteStopSelection: (
    event: SelectChangeEvent,
    child?: React.ReactNode
  ) => void;
}

export function Footer ({
  routes,
  routeStops,
  selectedRoute,
  selectedRouteStop,
  handleRouteSelection,
  handleRouteStopSelection,
}: FooterProps): JSX.Element {
  const {t} = useTranslation();
  const [footerIsOpen, setFooterIsOpen] = useState(true);

  function handleFooterToggle () {
    setFooterIsOpen(!footerIsOpen);
  }

  return (
    <FooterContainer footerIsOpen={footerIsOpen}>
      <SelectionContainer>
        {routes.isLoading ? (
          <SelectionMessage>
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
                onChange={handleRouteSelection}
                value={selectedRoute || 'none'}
                variant="outlined"
                MenuProps={{transitionDuration: 0}}
              >
                <MenuItem
                  key="none"
                  value="none"
                  disabled
                >
                  {t('action_prompt.select_route_short')}
                </MenuItem>
                {/* Sorted by API by: type, long_name, description */}
                {routes.data.data?.map(({attributes, id}) => (
                  <MenuItem
                    key={id}
                    value={id}
                  >
                    {`(${attributes.description}) ${attributes.long_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {!selectedRoute ? (
              null
            ) : routeStops.isLoading ? (
              <SelectionMessage>
                {t('state.data_loading')}
              </SelectionMessage>
            ): routeStops.error ? (
              <SelectionMessage>
                {t('error.generic')}
              </SelectionMessage>
            ) : !routeStops.data?.data.length ? (
              <SelectionMessage>
                <SelectionIndicator fontSize="large" />
                {t('error.no_route_stops')}
              </SelectionMessage>
            ) : (
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
                  onChange={handleRouteStopSelection}
                  value={selectedRouteStop || 'none'}
                  variant="outlined"
                  MenuProps={{transitionDuration: 0}}
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

const SelectionIndicator = styled(SouthRoundedIcon)`
  position: absolute;
  top: -140px;
  left: 20px;
  opacity: 0.6;
  margin: auto;
  width: auto;
  height: 125px;
  text-align: center;
  color: red;
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

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;

const FooterContainer = styled.div<{footerIsOpen: boolean;}>`
  ${({footerIsOpen}) => `
    display: flex;
    position: fixed;
    bottom: ${footerIsOpen ? '0' : '-70px'};
    justify-content: flex-start;
    margin: 0 auto;
    border-top: 1px solid #666;
    background-color: #22272e;
    padding: 0;
    width: 100vw;
    font-size: 1rem;

    > div > div > *:not(svg) {
      visibility: ${footerIsOpen ? 'visible' : 'hidden'};
      margin: 0 20px;
    }
  `}
`;
