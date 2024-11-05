import { css } from '@emotion/react';
import { Country, State } from 'country-state-city';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import LockIcon from '@Assets/icons/lock.svg?react';
import AmexIcon from '@Assets/icons/payment-providers/amex.svg?react';
import DinersClubIcon from '@Assets/icons/payment-providers/diners-club.svg?react';
import MasterCardIcon from '@Assets/icons/payment-providers/mastercard.svg?react';
import VisaIcon from '@Assets/icons/payment-providers/visa.svg?react';
import { Breakpoint, ColorPalette, fontWeight } from '@Config/style';
import FormCardNumberInput from 'src/form/FormCardNumberInput';
import FormInput from 'src/form/FormInput';
import FormRadioInput from 'src/form/FormRadioInput';
import FormSelectInput from 'src/form/FormSelectInput';
import { PaymentProvider } from 'src/services/checkout';
import { typography } from 'src/utils/style';
import { formatExpirationDate, formatSecurityCode } from 'src/utils/util';
import { emailRule, minLengthRule, requiredRule, validateRules } from 'src/utils/validation';

export type CheckoutInfoFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postal_code: string;
  credit_card: boolean;
  card_number: string;
  card_expiration: string;
  card_security_code: string;
  name_on_card: string;
};

type CheckoutInfoProps = {
  paymentProviders: PaymentProvider[];
};

const iconMap = {
  MasterCard: <MasterCardIcon width="36" height="24" />,
  Amex: <AmexIcon width="36" height="24" />,
  DinersClub: <DinersClubIcon width="36" height="24" />,
  Visa: <VisaIcon width="36" height="24" />,
};

const CheckoutInfo = ({ paymentProviders }: CheckoutInfoProps) => {
  const form = useForm<CheckoutInfoFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      city: '',
      country: '',
      state: '',
      postal_code: '',
      credit_card: true,
      card_number: '',
      card_expiration: '',
      card_security_code: '',
      name_on_card: '',
    },
  });

  const onSubmit = (formValues: CheckoutInfoFormValues) => {
    localStorage.setItem('checkoutFormValues', JSON.stringify(formValues));
    alert(`Form values saved to localStorage: ${JSON.stringify(formValues, null, 2)}`);
  };

  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  const countryValue = form.watch('country');

  const states = countryValue
    ? State.getStatesOfCountry(countryValue).map((state) => ({
        label: state.name,
        value: state.isoCode,
      }))
    : [];

  return (
    <section>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div css={styles.backgroundContainer} />
        <div css={styles.formSectionsContainer}>
          <div css={styles.formSectionWrapper}>
            <h2 css={styles.heading}>Contact</h2>
            <Controller
              name="email"
              control={form.control}
              rules={validateRules(requiredRule(), emailRule())}
              render={(controllerProps) => <FormInput {...controllerProps} label="Email Address" />}
            />
          </div>
          <div css={styles.formSectionWrapper}>
            <h2 css={styles.heading}>Delivery</h2>
            <Controller
              name="first_name"
              control={form.control}
              rules={validateRules(requiredRule())}
              render={(controllerProps) => <FormInput {...controllerProps} label="First Name" />}
            />
            <Controller
              name="last_name"
              control={form.control}
              rules={validateRules(requiredRule())}
              render={(controllerProps) => <FormInput {...controllerProps} label="Last Name" />}
            />

            <Controller
              name="address"
              control={form.control}
              rules={validateRules(requiredRule())}
              render={(controllerProps) => <FormInput {...controllerProps} label="Address" />}
            />
            <div css={styles.addressLineWrapper}>
              <div css={styles.city}>
                <Controller
                  name="city"
                  control={form.control}
                  rules={validateRules(requiredRule())}
                  render={(controllerProps) => <FormInput {...controllerProps} label="City" />}
                />
              </div>
              <div css={styles.state}>
                <Controller
                  name="state"
                  control={form.control}
                  render={(controllerProps) => (
                    <FormSelectInput
                      disabled={!states.length}
                      {...controllerProps}
                      label="State / Province"
                      options={states}
                    />
                  )}
                />
              </div>

              <div css={styles.postalCode}>
                <Controller
                  name="postal_code"
                  control={form.control}
                  rules={validateRules(requiredRule())}
                  render={(controllerProps) => <FormInput {...controllerProps} label="ZIP / Postal Code" />}
                />
              </div>
            </div>

            <Controller
              name="country"
              control={form.control}
              rules={validateRules(requiredRule())}
              render={(controllerProps) => <FormSelectInput {...controllerProps} label="Country" options={countries} />}
            />
          </div>
          <div>
            <div css={styles.formSectionWrapper}>
              <div>
                <h2 css={styles.heading}>Payment</h2>
                <p css={styles.paymentInfo}>All transactions are secure and encrypted</p>
              </div>
              <div css={styles.paymentWrapper}>
                <div css={styles.paymentTypeWrapper}>
                  <Controller
                    name="credit_card"
                    control={form.control}
                    rules={validateRules(requiredRule())}
                    render={(controllerProps) => (
                      <FormRadioInput {...controllerProps} options={[{ label: 'Credit Card', value: true }]} />
                    )}
                  />
                  <div css={styles.providers}>
                    {paymentProviders.map((provider) => (
                      <div key={provider.id}>{iconMap[provider.icon]}</div>
                    ))}
                  </div>
                </div>
                <Controller
                  name="card_number"
                  control={form.control}
                  rules={validateRules(requiredRule())}
                  render={(controllerProps) => <FormCardNumberInput {...controllerProps} label="Card number" />}
                />
                <div css={styles.cardExpirationAndCodeWrapper}>
                  <Controller
                    name="card_expiration"
                    control={form.control}
                    rules={validateRules(requiredRule(), minLengthRule(4))}
                    render={(controllerProps) => (
                      <FormInput {...controllerProps} label="Expiration (MM/YY)" formatValue={formatExpirationDate} />
                    )}
                  />
                  <Controller
                    name="card_security_code"
                    control={form.control}
                    rules={validateRules(requiredRule(), minLengthRule(3))}
                    render={(controllerProps) => (
                      <FormInput {...controllerProps} label="Security code" formatValue={formatSecurityCode} />
                    )}
                  />
                </div>
                <Controller
                  name="name_on_card"
                  control={form.control}
                  rules={validateRules(requiredRule())}
                  render={(controllerProps) => <FormInput {...controllerProps} label="Name on card" />}
                />
              </div>
              <button type="submit" css={styles.button}>
                Complete Order
              </button>
              <div css={styles.bottomTextWrapper}>
                <LockIcon />
                <p>All transactions are secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutInfo;

const styles = {
  backgroundContainer: css`
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: transparent;
    ${Breakpoint.mobile} {
      background-color: ${ColorPalette.gray_300};
    }
  `,
  formSectionsContainer: css`
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: relative;
    padding-bottom: 24px;
    ${Breakpoint.mobile} {
      padding-bottom: 0;
    }
  `,
  formSectionWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${ColorPalette.white};
    ${Breakpoint.mobile} {
      padding: 16px;
      border-block: 1px solid ${ColorPalette.gray_100};
    }
  `,
  button: css`
    font-family: 'Poppins';
    letter-spacing: 1.2px;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    background-color: ${ColorPalette.green};
    color: ${ColorPalette.white};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    font-weight: ${fontWeight.bold};
    box-shadow: 0px 4px 10px 0px ${ColorPalette.darkBrown};
    ${Breakpoint.mobile} {
      padding: 10px 0;
      font-size: 14px;
    }
  `,
  addressLineWrapper: css`
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'city state postal_code';
    ${Breakpoint.mobile} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'city city'
        'state postal_code';
    }
  `,
  city: css`
    grid-area: city;
  `,
  state: css`
    grid-area: state;
  `,
  postalCode: css`
    grid-area: postal_code;
  `,
  paymentInfo: css`
    ${typography.extraSmallBodyRegular};
    padding-top: 8px;
  `,
  paymentTypeWrapper: css`
    display: flex;
    justify-content: space-between;
    height: 56px;
    background-color: ${ColorPalette.blue_500};
    align-items: center;
    padding: 0 16px;
    border: 1px solid ${ColorPalette.blue};
    border-radius: 4px 4px 0 0;
  `,
  paymentWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: ${ColorPalette.gray_200};
    padding: 12px;
    border: 1px solid ${ColorPalette.gray_100};
    border-radius: 0 0 4px 4px;
  `,
  cardExpirationAndCodeWrapper: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  `,
  providers: css`
    display: flex;
    gap: 3px;
    height: 24px;
  `,
  heading: css`
    ${typography.heading2}
  `,
  bottomTextWrapper: css`
    display: grid;
    grid-template-columns: 24px auto;
    justify-content: center;
    ${typography.smallBodyRegular};
  `,
};
