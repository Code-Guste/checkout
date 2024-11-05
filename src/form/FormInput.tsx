import { css } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import React, { useState } from 'react';

import { ColorPalette } from '@Config/style';
import { FormControllerProps } from 'src/utils/form';
import { typography } from 'src/utils/style';

export type InputProps = {
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  idPrefix?: string;
  onChange?: () => void;
  onBlur?: () => void;
  label: string;
  pattern?: string;
  type?: string;
  formatValue?: (value: string) => string;
} & FormControllerProps<string | undefined>;

const Input = ({
  field,
  fieldState,
  inputMode = 'text',
  idPrefix,
  label,
  pattern,
  formatValue = (value) => value,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isLabelFloated = isFocused || !!field.value;

  return (
    <div css={styles.container}>
      <label css={styles.label(isLabelFloated)}>{label}</label>
      <input
        {...rest}
        pattern={pattern}
        id={field.name}
        value={field.value || ''}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={(e) => {
          const formattedValue = formatValue(e.target.value);
          field.onChange(formattedValue);
        }}
        inputMode={inputMode}
        css={styles.input(!!fieldState.error)}
      />
      {fieldState.error && <span css={styles.errorMessage}>{fieldState.error.message}</span>}
    </div>
  );
};

export default Input;

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
    color: ${ColorPalette.red}
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
