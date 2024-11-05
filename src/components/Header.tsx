import { css } from '@emotion/react';
import React from 'react';

import ShoppingBagIcon from '@Assets/icons/shopping-bag.svg?react';
import LogoIpsum from '@Assets/images/logo-ipsum.svg?react';
import { Breakpoint, ColorPalette } from '@Config/style';

const Header = () => {
  return (
    <header css={styles.header}>
      <nav css={styles.nav}>
        <LogoIpsum css={styles.logo} />
        <ShoppingBagIcon css={styles.shoppingBag} />
      </nav>
    </header>
  );
};

export default Header;

const styles = {
  header: css`
    width: 100%;
    border-bottom: 1px solid ${ColorPalette.gray_100};
    padding: 16px 0;
    ${Breakpoint.mobile} {
      padding: 16px 0;
    }
  `,
  logo: css`
    width: 187px;
    height: 40px;
    ${Breakpoint.mobile} {
      width: 112px;
      height: 24px;
    }
  `,
  shoppingBag: css`
    width: 24px;
    height: 24px;
    ${Breakpoint.mobile} {
      width: 20px;
      height: 20px;
    }
  `,
  nav: css`
    max-width: 1040px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0 auto;
    ${Breakpoint.mobile} {
      padding: 0 16px;
    }
  `,
};
