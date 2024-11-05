import { css } from '@emotion/react';
import React from 'react';

import { ColorPalette } from '@Config/style';
import { FormControllerProps, Option } from 'src/utils/form';
import { typography } from 'src/utils/style';
import { noop } from 'src/utils/util';

type FormRadioInputProps<T> = {
  options: { label: string; value: T }[];
  onChange?: (selectedOption: Option<T>) => void;
} & FormControllerProps<T | undefined>;

const FormRadioInput = <T extends string | boolean>({ options, field, onChange = noop }: FormRadioInputProps<T>) => {
  return (
    <div>
      <div>
        {options.map((option) => {
          const isSelected = option.value === field.value;
          return (
            <label key={String(option.value)} css={styles.label({ isSelected })}>
              <input
                type="radio"
                name={field.name}
                value={String(option.value)}
                onChange={() => {
                  field.onChange(option.value);
                  onChange(option);
                }}
                css={styles.input}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FormRadioInput;

const styles = {
  label: ({ isSelected }: { isSelected: boolean }) => {
    return css`
      ${typography.smallBodyRegular};
      cursor: pointer;
      white-space: nowrap;
      color: ${ColorPalette.coalBlack};
      margin-right: 16px;

      :before {
        content: '';
        display: inline-block;
        margin-left: 5px;
        margin-right: 16px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${ColorPalette.white};
        box-shadow:
          0 0 0 4px ${ColorPalette.white},
          0 0 0 6px ${ColorPalette.gray};

        ${isSelected &&
        css`
          background: ${ColorPalette.blue};
          box-shadow:
            0 0 0 4px ${ColorPalette.white},
            0 0 0 6px ${ColorPalette.blue};
        `}
      }
    `;
  },
  input: css`
    display: none;
  `,
};
