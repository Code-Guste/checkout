import { css } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import React, { useState } from 'react';

import { ColorPalette } from '@Config/style';
import { FormControllerProps } from 'src/utils/form';
import { typography } from 'src/utils/style';

export type FormCardInputProps = {
  placeholder?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  idPrefix?: string;
  autoComplete?: string;
  onChange?: () => void;
  onBlur?: () => void;
  label: string;
  pattern?: string;
  type?: string;
} & FormControllerProps<string | undefined>;

const formatCardNumber = (value: string) => {
  return value.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const FormCardNumberInput = ({ field, label, fieldState, ...rest }: FormCardInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isLabelFloated = isFocused || !!field.value;

  return (
    <div css={styles.container}>
      <label css={styles.label(isLabelFloated)}>{label}</label>
      <input
        {...rest}
        id={field.name}
        value={field.value || ''}
        inputMode="numeric"
        maxLength={19}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, '');
          const formattedValue = formatCardNumber(numericValue);

          field.onChange(formattedValue);
        }}
        css={styles.input(!!fieldState.error)}
      />
      {fieldState.error && <span css={styles.errorMessage}>{fieldState.error.message}</span>}
    </div>
  );
};

export default FormCardNumberInput;

const styles = {
  input: (hasError: boolean) => css`
    width: 100%;
    height: 52px;
    border-radius: 4px;
    border: 1px solid ${hasError ? `${ColorPalette.red}` : `${ColorPalette.gray_100}`};
    padding-top: 17px;
    padding-left: 12px;
  `,
  container: css`
    position: relative;
    width: 100%;
  `,
  errorMessage: css`
    ${typography.extraSmallBodyRegular}
    color: ${ColorPalette.red};
  `,
  label: (isLabelFloated: boolean) => css`
    ${typography.smallBodyRegular};
    position: absolute;
    left: 12px;
    top: ${isLabelFloated ? '8px' : '50%'};
    transform: translateY(${isLabelFloated ? '0' : '-50%'});
    transition: all 0.2s ease;
    font-size: ${isLabelFloated ? '12px' : '14px'};
    pointer-events: none;
    z-index: 2;
  `,
};
