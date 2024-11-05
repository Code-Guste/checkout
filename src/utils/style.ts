import { css } from '@emotion/react';

import { ColorPalette, fontFamily, fontWeight } from '@Config/style';

export const styleUtils = {
  ulReset: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  buttonReset: css`
    border: none;
    background-color: unset;
    padding: 0;
    cursor: pointer;
  `,
};

export const typography = {
  heading2: css`
    font-size: 24px;
    font-weight: ${fontWeight.bold};
    color: ${ColorPalette.coalBlack};
    font-family: ${fontFamily.Roboto};
    line-height: 32px;
  `,
  mediumTitle: css`
    font-size: 18px;
    font-weight: ${fontWeight.bold};
    color: ${ColorPalette.coalBlack};
    font-family: ${fontFamily.Roboto};
    line-height: 24px;
  `,
  smallBodyRegular: css`
    font-size: 14px;
    font-weight: ${fontWeight.regular};
    color: ${ColorPalette.gray};
    font-family: ${fontFamily.Roboto};
    line-height: 20px;
  `,
  smallBodyMedium: css`
    font-size: 14px;
    font-weight: ${fontWeight.medium};
    color: ${ColorPalette.coalBlack};
    font-family: ${fontFamily.Roboto};
    line-height: 20px;
  `,
  smallBodyBold: css`
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    color: ${ColorPalette.coalBlack};
    font-family: ${fontFamily.Roboto};
    line-height: 20px;
  `,
  extraSmallBodyRegular: css`
    font-size: 12px;
    font-weight: ${fontWeight.regular};
    color: ${ColorPalette.gray};
    font-family: ${fontFamily.Roboto};
    line-height: 16px;
  `,
  extraSmallBodyBold: css`
    font-size: 12px;
    font-weight: ${fontWeight.bold};
    color: ${ColorPalette.coalBlack};
    font-family: ${fontFamily.Roboto};
    line-height: 16px;
  `,
};
