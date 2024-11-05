import { css, keyframes } from '@emotion/react';
import React from 'react';

import { ColorPalette } from '@Config/style';

const rotatorKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dashKeyframes = keyframes`
  0% {
    stroke-dashoffset: 180;
    transform: rotate(0deg);
  }
  50% {
    stroke-dashoffset: ${180 / 4};
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 180;
    transform: rotate(360deg);
  }
`;

const styles = {
  svg: css`
    animation: ${rotatorKeyframes} 1.4s linear infinite;
  `,
  spinnerPath: css`
    stroke-dasharray: 180;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dashKeyframes} 1.4s linear infinite;
    stroke: ${ColorPalette.gray};
  `,
};

const LoadingSpinner = () => {
  return (
    <svg width="80" height="80" css={styles.svg} viewBox="0 0 86 86" xmlns="http://www.w3.org/2000/svg">
      <circle css={styles.spinnerPath} fill="none" strokeWidth="6" strokeLinecap="round" cx="43" cy="43" r="30" />
    </svg>
  );
};

export default LoadingSpinner;
