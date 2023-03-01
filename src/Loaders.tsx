import Skeleton from '@mui/material/Skeleton';
import styled from '@emotion/styled';

export const SkeletonHeader = styled(Skeleton)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 68px;
`;

export const SkeletonArrivals = styled(Skeleton)`
  position: relative;
  top: 78px;
  margin: 20px auto;
  width: 100%;
  max-width: 682px;
  height: 128px;
`;
