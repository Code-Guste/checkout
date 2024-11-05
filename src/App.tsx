import { css, Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { lazy, useMemo } from 'react';
import { RouteObject, useRoutes, Navigate, BrowserRouter } from 'react-router-dom';

import { RouteConfig } from '@Config/routes';
import { fontWeight } from '@Config/style';
import Layout from '@UI/Layout';

import { mockedCheckoutId } from './utils/constants';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    margin: unset;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li {
    margin: 0;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Regular.ttf');
    font-style: normal;
    font-weight: ${fontWeight.regular};
    font-display: block;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Medium.ttf');
    font-style: normal;
    font-weight: ${fontWeight.medium};
    font-display: block;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Bold.ttf');
    font-style: normal;
    font-weight: ${fontWeight.bold};
    font-display: block;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/Poppins-Bold.ttf');
    font-style: normal;
    font-weight: ${fontWeight.bold};
    font-display: block;
  }
`;

const CheckoutView = lazy(() => import('./pages/checkout/Checkout-view'));

const NavigateToCheckout = () => {
  return <Navigate to={`/checkout/${mockedCheckoutId}`} replace />;
};

const Router = () => {
  const routes: RouteObject[] = useMemo(
    () => [
      {
        path: RouteConfig.Home.template,
        element: <Layout />,
        children: [
          {
            index: true,
            element: <NavigateToCheckout />,
          },
          {
            path: RouteConfig.CheckoutPage.template,
            element: <CheckoutView />,
          },
        ],
      },
    ],
    [],
  );
  return useRoutes(routes);
};

const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <>
    <QueryClientProvider client={QUERY_CLIENT}>
      <Global styles={globalStyles} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </>
);

export default App;
