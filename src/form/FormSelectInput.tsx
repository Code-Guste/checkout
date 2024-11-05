import { css } from '@emotion/react';
import { dequal } from 'dequal';
import { useCombobox } from 'downshift';
import { useState } from 'react';

import ChevronDownIcon from '@Assets/icons/arrow.svg?react';
import { ColorPalette } from '@Config/style';
import { FormControllerProps, Option } from 'src/utils/form';
import { typography } from 'src/utils/style';

export type SelectInputProps<T> = {
  options: Option<T>[];
  clearable?: boolean;
  isLoadingOptions?: boolean;
  label: string;
  onChange?: () => void;
  disabled?: boolean;
} & FormControllerProps<T | null>;

const SelectInput = <T,>({ options, field, fieldState, label, disabled }: SelectInputProps<T>) => {
  const selectedItem = options.find((option) => dequal(option.value, field.value)) || null;

  const [inputValue, setInputValue] = useState(selectedItem?.label ?? '');

  const [isFocused, setIsFocused] = useState(false);

  const isLabelFloated = isFocused || !!field.value;

  const { isOpen, getInputProps, getMenuProps, getItemProps, toggleMenu } = useCombobox({
    items: options,
    inputValue,
    selectedItem,
    itemToString: (item) => {
      return item?.label || '';
    },
    onSelectedItemChange: (item) => {
      if (item.selectedItem) {
        field.onChange(item.selectedItem.value);
        setInputValue(item.selectedItem.label);
      }
    },
  });

  return (
    <div css={styles.container}>
      <label css={styles.label(!!inputValue)}>{label}</label>
      <div css={styles.inputContainer(!!fieldState.error, !!disabled)}>
        <input
          disabled={disabled}
          readOnly
          {...getInputProps({
            onKeyDown: (event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            },
          })}
          css={styles.input(isLabelFloated)}
          onFocus={() => setIsFocused(true)}
        />
        <div
          css={styles.iconContainer(isOpen)}
          onClick={() => {
            if (!disabled) {
              toggleMenu();
            }
          }}
        >
          <ChevronDownIcon />
        </div>
      </div>
      <div {...getMenuProps()}>
        {isOpen && (
          <ul css={styles.menu}>
            {options.map((item, index) => (
              <li
                key={index}
                {...getItemProps({
                  index,
                  item,
                })}
                css={styles.menuItem}
              >
                {item.label || '-'}
              </li>
            ))}
            {options.length === 0 && (
              <li css={styles.emptyItem}>
                <span>empty</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectInput;

const styles = {
  container: css`
    position: relative;
    width: 100%;
  `,
  label: (isLabelFloated: boolean) => css`
    ${typography.smallBodyRegular};
    background: white;
    position: absolute;
    left: 12px;
    top: ${isLabelFloated ? '8px' : '50%'};
    transform: translateY(${isLabelFloated ? '0' : '-50%'});
    transition: all 0.2s ease;
    font-size: ${isLabelFloated ? '12px' : '14px'};
    pointer-events: none;
    z-index: 2;
  `,
  inputContainer: (hasError: boolean, disabled: boolean) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    position: relative;
    border: 1px solid ${hasError ? ColorPalette.red : ColorPalette.gray_100};
    background-color: white;
    height: 52px;
    border-radius: 4px;
    padding-right: 10px;
    ${disabled &&
    css`
      opacity: 0.5;
      z-index: 2;
    `};
  `,
  input: (isLabelFloated: boolean) => css`
    cursor: pointer;
    width: 100%;
    padding-top: ${isLabelFloated ? '20px' : '17px'};
    padding-left: 12px;
    border: none;
    outline: none;
    background-color: ${ColorPalette.white};
    color: ${isLabelFloated ? 'black' : `${ColorPalette.gray}`};
  `,
  iconContainer: (isOpen: boolean) => css`
    display: flex;
    align-items: center;
    transform: ${isOpen ? 'rotate(180deg)' : 'none'};
    transition: transform 0.2s ease;
    cursor: pointer;
  `,
  menu: css`
    position: absolute;
    padding: 0;
    margin: 0;
    width: 100%;
    background-color: white;
    border-radius: 0 0 4px 4px;
    z-index: 10;
    overflow: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
  `,
  menuItem: css`
    ${typography.smallBodyRegular};
    border-bottom: 1px solid ${ColorPalette.gray_100};
    width: 100%;
    padding: 15px 10px;
    cursor: pointer;
    &:hover {
      background-color: ${ColorPalette.gray_300};
    }
    color: ${ColorPalette.gray};
  `,
  emptyItem: css`
    padding: 8px;
    ${typography.smallBodyRegular};
  `,
  errorMessage: css`
    ${typography.extraSmallBodyRegular}
    color: ${ColorPalette.red}
  `,
};
