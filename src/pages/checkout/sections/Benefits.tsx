import { css } from '@emotion/react';

import CashBackIcon from '@Assets/icons/cash-back.svg?react';
import CustomerServiceIcon from '@Assets/icons/customer-service.svg?react';
import RatingIcon from '@Assets/icons/rating.svg?react';
import { Breakpoint, ColorPalette } from '@Config/style';
import { styleUtils, typography } from 'src/utils/style';

const benefitsData = [
  {
    icon: <CashBackIcon width="32" height="32" />,
    title: '90-Day Money Back Guarantee',
    text: 'We love our products and we’re confident you will too! If you’re not in love with your LogoIpsum product, our easy return and refund policy is designed to make things as easy as possible for you.',
  },
  {
    icon: <RatingIcon width="32" height="32" />,
    title: 'Over 75,000+ Happy Customers',
    text: 'Everyone that tries LogoIpsum says it’s a must-have. We invest a lot of love and care into making our products, so you can enjoy seeing results when using it.',
  },
  {
    icon: <CustomerServiceIcon width="32" height="32" />,
    title: 'Professional Customer Support',
    text: 'Our customer service works 24/7 for your satisfaction. Feel free to reach out to us anytime.',
  },
];

const Benefits = () => {
  return (
    <div css={styles.benefitsSection}>
      <h4 css={styles.benefitsTitle}>Why choose LogoIpsum</h4>
      <ul css={styles.list}>
        {benefitsData.map((benefit, index) => (
          <li css={styles.benefitItem} key={index}>
            <div>{benefit.icon}</div>
            <div>
              <h4 css={styles.benefitTitle}>{benefit.title}</h4>
              <p css={styles.benefitText}> {benefit.text} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;

const styles = {
  list: css`
    ${styleUtils.ulReset}
  `,
  benefitsSection: css`
    padding-top: 40px;
    padding-left: 38px;
    ${Breakpoint.mobile} {
      padding: 0 16px 30px 16px;
    }
  `,
  benefitsTitle: css`
    ${typography.smallBodyRegular};
    color: ${ColorPalette.coalBlack};
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    &::before,
    &::after {
      content: '';
      flex: 1;
      border-top: 1px solid ${ColorPalette.gray_100};
    }
    &::after {
      margin-left: 16px;
    }
    &::before {
      margin-right: 16px;
    }
  `,
  benefitItem: css`
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 16px;
    flex: 1;
    padding-bottom: 16px;
  `,
  benefitTitle: css`
    ${typography.extraSmallBodyBold}
    padding-bottom: 8px;
  `,
  benefitText: css`
    ${typography.extraSmallBodyRegular}
    color: ${ColorPalette.gray_50};
  `,
};
