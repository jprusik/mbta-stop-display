import {Fragment} from 'react';
import styled from '@emotion/styled';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  return (
    <FooterContainer>
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
    </FooterContainer>
  );
}

const SelectionContainer = styled.div`
  > div:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: flex-start;
  margin: 0 auto;
  border-top: 1px solid #666;
  background-color: #22272e;
  padding: 20px 0;
  width: 100vw;
  font-size: 1rem;

  > * {
    margin: 0 20px;
  }
`;
