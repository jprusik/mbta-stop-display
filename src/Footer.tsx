import {Fragment, useContext, useState} from 'react';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import {
  ActionHandlersContext,
  RoutesContext,
  SelectionsContext,
  StopsContext
} from 'contexts';
import {RouteSelect} from 'inputs/RouteSelect';
import {RouteStopSelect} from 'inputs/RouteStopSelect';
import {RouteTypeSelect} from 'inputs/RouteTypeSelect';

export function Footer (): JSX.Element {
  const {t} = useTranslation();

  const {
    selectedRoute,
    selectedRouteStop,
    selectedRouteType
  } = useContext(SelectionsContext);
  const {resetSelections} = useContext(ActionHandlersContext);
  const routes = useContext(RoutesContext);
  const routeStops = useContext(StopsContext);

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
            <RouteTypeSelect selectedRouteType={selectedRouteType} />
            {selectedRouteType && (
              <RouteSelect
                routes={routes}
                routeStops={routeStops}
                selectedRoute={selectedRoute}
                selectedRouteType={selectedRouteType}
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
  color: #D8493F;
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
  position: absolute;
  top: -28px;
  right: 0;
  margin: 0;
  border: 2px solid transparent;
  padding: 0;
  text-transform: none;
  color: #FFF;

  :hover,
  :active,
  :focus-visible {
    background: none;
    color: #A0CBF5;
  }

  :focus-visible {
    border-color: #A0CBF5;
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
    background-color: #22272E;
    padding: 0;
    width: 100vw;
    font-size: 1rem;

    > div {
      padding-right: 20px;
      padding-left: 20px;

      > div > *:not(svg),
      button {
        ${!footerIsOpen ? 'display: none;' : ''}
      }
    }
  `}
`;
