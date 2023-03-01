import {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
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
  const [footerIsOpen, setFooterIsOpen] = useState(true);

  function handleFooterToggle () {
    setFooterIsOpen(!footerIsOpen);
  }

  return (
    <FooterContainer footerIsOpen={footerIsOpen}>
      <SelectionContainer>
        {routes.isLoading ? (
          <div>Data is loading...</div>
        ) : routes.error ? (
          <div>Something went wrong :-(</div>
        ) : !routes.data?.data.length ? (
          <div>The routes information unable to load.</div>
        ) : (
          <Fragment>
            <FormControl size="small">
              <InputLabel id="select-route">Route</InputLabel>
              <Select
                autoWidth
                error={!selectedRoute}
                label="Route"
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
                  Select a route
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
              <div>Data is loading...</div>
            ): routeStops.error ? (
              <div>Something went wrong :-(</div>
            ) : !routeStops.data?.data.length ? (
              <div>There are no stops for this route.</div>
            ) : (
              <FormControl size="small">
                <InputLabel id="select-route-stop">Route Stop</InputLabel>
                <Select
                  autoWidth
                  error={!selectedRouteStop}
                  label="Route Stop"
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
                    Select a stop
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
        {footerIsOpen ? 'Hide' : 'Show'}
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

const SelectionContainer = styled.div`
  > div:not(:last-of-type) {
    margin-right: 10px;
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
    padding: 20px 0;
    width: 100vw;
    font-size: 1rem;

    > div {
      visibility: ${footerIsOpen ? 'visible' : 'hidden'};
      margin: 0 20px;
    }
  `}
`;
