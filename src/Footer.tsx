import {ChangeEvent, Fragment} from 'react';
import styled from '@emotion/styled';
import {Route, Stop, UseRoutesData, UseRouteStopData} from 'types';

type FooterProps = {
  routes: UseRoutesData;
  routeStops: UseRouteStopData;
  selectedRoute?: Route['id'];
  selectedRouteStop?: Stop['id'];
  handleRouteSelection: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleRouteStopSelection: (event: ChangeEvent<HTMLSelectElement>) => void;
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
      {routes.isLoading ? (
        <div>Data is loading...</div>
      ): routes.error ? (
        <div>Something went wrong :-(</div>
      ) : !routes.data?.data.length ? (
        <div>The routes information unable to load.</div>
      ) : (
        <Fragment>
          <SelectionContainer>
            <select
              onChange={handleRouteSelection}
              defaultValue={selectedRoute || 'none'}
            >
              {!selectedRouteStop && (
                  <option
                    key="none"
                    value="none"
                    disabled
                  >
                    Select a route
                  </option>
                )}
              {/* Sorted by API by: type, long_name, description */}
              {routes.data.data?.map(({attributes, id}) => (
                <option
                  key={id}
                  value={id}
                >
                  {`(${attributes.description}) ${attributes.long_name}`}
                </option>
              ))}
            </select>
          </SelectionContainer>
          {!selectedRoute ? (
            null
          ) : routeStops.isLoading ? (
            <div>Data is loading...</div>
          ): routeStops.error ? (
            <div>Something went wrong :-(</div>
          ) : !routeStops.data?.data.length ? (
            <div>There are no stops for this route.</div>
          ) : (
            <SelectionContainer>
              <select
                onChange={handleRouteStopSelection}
                defaultValue={selectedRouteStop || 'none'}
              >
                {!selectedRouteStop && (
                  <option
                    key="none"
                    value="none"
                    disabled
                  >
                    Select a stop
                  </option>
                )}
                {routeStops.data?.data?.map(({attributes, id}) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {attributes.name}
                  </option>
                ))}
              </select>
            </SelectionContainer>
          )}
        </Fragment>
      )}
    </FooterContainer>
  );
}

const SelectionContainer = styled.div``;

const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: flex-start;
  margin: 0 auto;
  border-top: 1px solid #666;
  background: #3d3d3d;
  padding: 20px 0;
  width: 100vw;
  font-size: 1rem;

  > * {
    margin: 0 20px;
  }
`;
