import { css } from '@emotion/react';
import React from 'react';

import LoadingSpinner from '@Components/LoadingSpinner';
import { RouteConfig } from '@Config/routes';
import { Breakpoint, ColorPalette } from '@Config/style';
import useMediaQuery from '@Hooks/useMedia';
import { useRouteParams } from '@Hooks/useRouteParams';
import { useCheckoutDataQuery, usePaymentProvidersQuery } from 'src/services/checkout';

import Benefits from './sections/Benefits';
import CheckoutInfo from './sections/Checkout-info';
import OrderSummary from './sections/Order-summary';

const CheckoutPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { id } = useRouteParams(RouteConfig.CheckoutPage);

  const paymentProvidersQuery = usePaymentProvidersQuery();
  const checkoutDataQuery = useCheckoutDataQuery(id);

  if (paymentProvidersQuery.isLoading || checkoutDataQuery.isLoading) {
    return (
      <div css={styles.dataStatusContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!paymentProvidersQuery.data || !checkoutDataQuery.data) {
    return <div css={styles.dataStatusContainer}>Error loading checkout</div>;
  }

  return (
    <div css={styles.container}>
      <div css={styles.wrapper}>
        {isMobile ? (
          <>
            <div css={styles.greyBackgroundArea}>
              <OrderSummary orderData={checkoutDataQuery.data} />
            </div>
            <div css={styles.whiteBackgroundArea}>
              <CheckoutInfo paymentProviders={paymentProvidersQuery.data} />
            </div>
            <div css={styles.greyBackgroundArea}>
              <Benefits />
            </div>
          </>
        ) : (
          <>
            <div css={styles.whiteBackgroundArea}>
              <CheckoutInfo paymentProviders={paymentProvidersQuery.data} />
            </div>
            <div css={styles.greyBackgroundArea}>
              <OrderSummary orderData={checkoutDataQuery.data} />
              <Benefits />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

const styles = {
  dataStatusContainer: css`
    display: flex;
    justify-content: center;
    padding-top: 50px;
  `,
  container: css`
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: hidden;
  `,
  wrapper: css`
    max-width: 1040px;
    padding: 0 20px;
    width: 100%;
    display: flex;
    gap: 38px;
    position: relative;
    ${Breakpoint.mobile} {
      flex-direction: column;
      gap: 0;
      padding: 0;
    }
  `,
  whiteBackgroundArea: css`
    width: 597px;
    position: relative;
    padding-top: 32px;
    ${Breakpoint.mobile} {
      width: 100%;
      padding-top: 0;
    }
    &::before {
      content: '';
      background-color: ${ColorPalette.white};
      position: absolute;
      height: 100%;
      width: 100vw;
      left: -100vw;
      top: 0;
    }
  `,
  greyBackgroundArea: css`
    padding-top: 32px;
    width: 443px;
    text-align: left;
    position: relative;
    ${Breakpoint.mobile} {
      width: 100%;
      padding-top: 16px;
    }
    &::before {
      content: '';
      background-color: ${ColorPalette.gray_300};
      position: absolute;
      height: 100%;
      width: 100vw;
      right: -100vw;
      top: 0;
      left: 0;
      z-index: -1;
    }
  `,
};
