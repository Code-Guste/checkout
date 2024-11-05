import { Validate } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import { isDefined } from './types';

export const validateRules = <T>(...validators: Array<Validate<T, unknown> | undefined>) => {
  return {
    validate: (value: T, formValues: unknown) => {
      const failedRule = validators.filter(isDefined).find((item) => item(value, formValues) !== undefined);
      return failedRule ? failedRule(value, formValues) : undefined;
    },
  };
};

export const requiredRule = (): Validate<unknown, unknown> => {
  return (value) => {
    return isDefined(value) && value !== '' ? undefined : '';
  };
};

export const emailRule = (): Validate<string, unknown> => {
  return (value: string) => {
    return isEmail(value) ? undefined : 'Incorrect email format';
  };
};

export const minLengthRule = (minLenght: number): Validate<string | null, unknown> => {
  return (value) => {
    if (!value) {
      return undefined;
    }
    return value.length < minLenght ? 'Incorrect amount of symbols' : undefined;
  };
};
