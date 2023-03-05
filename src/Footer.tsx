import {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {SelectChangeEvent} from '@mui/material/Select';
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
import {RouteSelect} from 'inputs/RouteSelect';
import {RouteStopSelect} from 'inputs/RouteStopSelect';
import {RouteTypeSelect} from 'inputs/RouteTypeSelect';

type FooterProps = {
  resetSelections: () => void;
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
  resetSelections,
  routes,
  routeStops,
  selectedRoute,
  selectedRouteStop,
  selectedRouteType,
  handleRouteSelection,
  handleRouteStopSelection,
  handleRouteTypeSelection,
}: FooterProps): JSX.Element {
  const {t} = useTranslation();
  const [footerIsOpen, setFooterIsOpen] = useState(true);

  function handleFooterToggle () {
    setFooterIsOpen(!footerIsOpen);
  }

  return (
    <FooterContainer
      footerIsOpen={footerIsOpen}
      className="footerContainer"
    >
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
            <RouteTypeSelect
              selectedRouteType={selectedRouteType}
              handleRouteTypeSelection={handleRouteTypeSelection}
            />
            {selectedRouteType && (
              <RouteSelect
                routes={routes}
                routeStops={routeStops}
                selectedRoute={selectedRoute}
                selectedRouteType={selectedRouteType}
                handleRouteSelection={handleRouteSelection}
              />
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
              <RouteStopSelect
                routeStops={routeStops}
                selectedRouteStop={selectedRouteStop}
                handleRouteStopSelection={handleRouteStopSelection}
              />
            )}
          </Fragment>
        )}
        <Button
          disabled={
            !selectedRoute &&
            !selectedRouteStop &&
            !selectedRouteType
          }
          sx={{minHeight: 50}}
          onClick={resetSelections}
        >
          {t('action_prompt.reset')}
        </Button>
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
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 20px;
  width: 100%;

  > div,
  > button {
    margin-bottom: 20px;
    text-align: left;

    &:not(:last-child) {
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
    bottom: ${footerIsOpen ? '0' : '-30px'};
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
        ${!footerIsOpen ? 'display: none;' : ''}
      }
    }
  `}
`;
