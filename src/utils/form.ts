import { FocusEvent } from 'react';
import { ControllerFieldState } from 'react-hook-form';

export type FormControllerProps<ValueType> = {
  field: {
    onChange: (value: ValueType) => void;
    onBlur: (e?: FocusEvent) => void;
    value: ValueType;
    name: string;
    error?: string;
  };
  fieldState: ControllerFieldState;
};

export type Option<T> = {
  label: string;
  value: T;
};
