import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';

const Layout = () => {
  return (
    <div css={styles.root}>
      <Header />
      <div css={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

const styles = {
  root: css`
    min-height: '100%';
  `,
  content: css`
    width: 100%;
    margin: 0 auto;
  `,
};
