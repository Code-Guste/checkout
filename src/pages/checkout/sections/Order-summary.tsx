import { css } from '@emotion/react';
import { useState } from 'react';

import ArrowDownIcon from '@Assets/icons/arrow.svg?react';
import { Breakpoint, ColorPalette } from '@Config/style';
import useMediaQuery from '@Hooks/useMedia';
import { CheckoutData } from 'src/services/checkout';
import { styleUtils, typography } from 'src/utils/style';

type OrderSummaryProps = {
  orderData: CheckoutData;
};

const OrderSummary = ({ orderData }: OrderSummaryProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCheckoutItemsGroupExpanded, setIsCheckoutItemsGroupExpanded] = useState(false);

  return (
    <div css={styles.wrapper}>
      {isMobile && (
        <div css={styles.expandableSectionWrapper}>
          <button
            type="button"
            css={[styles.button, styleUtils.buttonReset]}
            onClick={() => setIsCheckoutItemsGroupExpanded((prev) => !prev)}
          >
            <p css={styles.overview}>Order Overview</p>
            <ArrowDownIcon css={styles.arrowIcon({ isActive: isCheckoutItemsGroupExpanded })} />
          </button>
          <div css={styles.price}> {`${orderData.totalCost}$`}</div>
        </div>
      )}
      <ul css={[styles.list, isMobile && !isCheckoutItemsGroupExpanded && styles.hiddenList]}>
        {orderData.items.map((item) => (
          <li key={item.itemId} css={styles.listItem}>
            <div css={styles.itemWrapper}>
              <div css={styles.itemNameAndPictureWrapper}>
                <img src={item.picture} alt={item.name} width={64} />
                <p>{item.name}</p>
              </div>
              <p css={styles.price}>{`${item.price}$`}</p>
            </div>
          </li>
        ))}
        <div css={styles.subtotalPriceWrapper}>
          <p>Subtotal</p>
          {`${orderData.subtotal}`}
        </div>
        <div css={styles.totalPriceWrapper}>
          <p>Total</p>
          {`${orderData.totalCost}$`}
        </div>
      </ul>
    </div>
  );
};

export default OrderSummary;

const styles = {
  wrapper: css`
    padding-left: 38px;
    ${Breakpoint.mobile} {
      padding: 0 16px;
    }
  `,
  expandableSectionWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
  `,
  button: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  list: css`
    ${styleUtils.ulReset};
    ${Breakpoint.mobile} {
      padding-bottom: 16px;
    }
  `,
  hiddenList: css`
    display: none;
  `,
  listItem: css`
    list-style-type: none;
    border-bottom: 1px solid ${ColorPalette.gray_100};
    padding-bottom: 16px;
  `,
  itemWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  itemNameAndPictureWrapper: css`
    display: grid;
    grid-template-columns: 64px auto;
    align-items: center;
    gap: 16px;
    ${typography.smallBodyBold};
  `,
  price: css`
    ${typography.smallBodyMedium};
  `,
  overview: css`
    ${typography.smallBodyRegular};
    color: ${ColorPalette.coalBlack};
  `,
  subtotalPriceWrapper: css`
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    ${typography.smallBodyRegular};
    color: ${ColorPalette.coalBlack};
    border-bottom: 1px solid ${ColorPalette.gray_100};
  `,
  totalPriceWrapper: css`
    display: flex;
    justify-content: space-between;
    ${typography.mediumTitle};
    padding-top: 16px;
    ${Breakpoint.mobile} {
      border-bottom: 1px solid ${ColorPalette.gray_100};
      padding-bottom: 16px;
    }
  `,
  arrowIcon: ({ isActive }: { isActive: boolean }) => css`
    transition: transform 0.3s ease-in-out 0ms;
    flex-shrink: 0;
    ${isActive &&
    css`
      transform: rotate(180deg);
    `}
  `,
};
