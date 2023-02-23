import {Fragment, useEffect} from 'react';
import styled from '@emotion/styled';
import {DATA_REFETCH_INTERVAL} from './constants';
import {RouteAttributes, StopAttributes} from 'types';
import {useRoutePredictions} from './hooks/useRoutePredictions';
import {PredictionDisplay} from './PredictionDisplay';

export function App() {
  const {data: predictionData, error, isLoading, refetch} = useRoutePredictions();

  // Route data
  const routeData =
    predictionData?.included?.find(({type}) => type === 'route')?.attributes as RouteAttributes;
  const routeColor = routeData?.color ?
    `#${routeData.color}` : 'transparent';
  const routeTextColor = routeData?.text_color ?
    `#${routeData.text_color}` : 'white';

  // Stop data
  const stopData =
    predictionData?.included?.find(({type}) => type === 'stop')?.attributes as StopAttributes;
  const stopTitle = `${routeData?.fare_class} (${routeData?.long_name}) at ${stopData?.name}`;
  const stopTitleIsAvailable = !!(routeData?.fare_class && routeData?.long_name && stopData?.name);

  // Prediction data
  const predictionDataIsAvailable = !!predictionData?.data?.length;

  // Refresh the data every x ms
  useEffect(() => {
    const refetchInterval = setInterval(refetch, DATA_REFETCH_INTERVAL);

    return () => clearInterval(refetchInterval);
  }, [refetch]);

  return (
    <Container>
      {error ?
        'something went wrong :-(' :
        isLoading ?
          'prediction data is loading...' : (
            <Fragment>
              <Header
                backgroundColor={routeColor}
                textColor={routeTextColor}
              >
                {stopTitleIsAvailable ?
                  stopTitle :
                  'The stop information was unable to load.'
                }
              </Header>
              {(predictionDataIsAvailable && routeData) ?
                predictionData?.data?.map(prediction => (
                  <PredictionDisplay
                    key={prediction.id}
                    prediction={prediction.attributes}
                    route={routeData}
                  />
                )) :
                'No predictions were found'
              }
            </Fragment>
          )
      }
    </Container>
  );
}

type HeaderProps = {
  backgroundColor: string;
  textColor: string;
}

const Header = styled.h1<HeaderProps>`
  ${({backgroundColor, textColor}) => `
    background-color: ${backgroundColor};
    color: ${textColor};
  `}
  font-size: 32px;
  padding: 10px 10%;
`;

const Container = styled.div`
  width: 100vw;

  > * {
    padding: 0 10%;
  }
`;
