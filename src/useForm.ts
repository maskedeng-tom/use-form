import { useCallback } from 'react';
import {
  HandlerOption,
  //
  FormHandlerOption,
  //
  CheckboxHandlerOption,
  ColorHandlerOption,
  DateHandlerOption,
  DateTimeLocalHandlerOption,
  EmailHandlerOption,
  FileHandlerOption,
  MonthHandlerOption,
  NumberHandlerOption,
  PasswordHandlerOption,
  RadioHandlerOption,
  RangeHandlerOption,
  SearchHandlerOption,
  TelHandlerOption,
  TextHandlerOption,
  TimeHandlerOption,
  UrlHandlerOption,
  WeekHandlerOption,
  //
  TextAreaHandlerOption,
  SelectHandlerOption,
  SelectMultipleHandlerOption,
} from './core/handlerOption';
import { LabelOption } from './lib/labelOption';
import {
  useFormCore,
  UseFormParams,
  SubmitHandler,
  UseFormOptions
} from './core/useFormCore';
import { ExtString } from './lib/ExtString';

////////////////////////////////////////////////////////////////////////////////

const useForm = <T,>(params?: UseFormParams<T>) => {

  const core = useFormCore<T>(params);

  //////////////////////////////////////////////////////////////////////////////
  // form, submit

  const form = useCallback((submit?: SubmitHandler<T>, handlerOption?: FormHandlerOption) => {
    return {
      noValidate: (handlerOption?.noValidate !== false)?true:undefined,
      onSubmit: submit?
        core.submitHandler(submit)
        :
        /* istanbul ignore next */
        ((e: React.SyntheticEvent) => e?.preventDefault()),
    };
  }, [core]);

  const submit = useCallback((submit: (v: T) => void) => {
    core.submitHandler(submit)();
  }, [core]);

  //////////////////////////////////////////////////////////////////////////////
  // types

  // button

  const checkbox = useCallback((key: (keyof T) | ExtString, handlerOption?: CheckboxHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, value, pattern, maxLength, minLength, max, min, step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'checkbox',
      value: handlerOption?.value,
    };
  }, [core]);

  const color = useCallback((key: (keyof T) | ExtString, handlerOption?: ColorHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, max, min, step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'color',
    };
  }, [core]);

  const date = useCallback((key: (keyof T) | ExtString, handlerOption?: DateHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'date',
    };
  }, [core]);

  const dateTimeLocal = useCallback((key: (keyof T) | ExtString, handlerOption?: DateTimeLocalHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'datetime-local',
    };
  }, [core]);

  const email = useCallback((key: (keyof T) | ExtString, handlerOption?: EmailHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'email',
    };
  }, [core]);

  const file = useCallback((key: (keyof T) | ExtString, handlerOption?: FileHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, value, maxLength, minLength, min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'file',
    };
  }, [core]);

  // hidden
  // image

  const month = useCallback((key: (keyof T) | ExtString, handlerOption?: MonthHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'month',
    };
  }, [core]);

  const number = useCallback((key: (keyof T) | ExtString, handlerOption?: NumberHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'number',
    };
  }, [core]);

  const password = useCallback((key: (keyof T) | ExtString, handlerOption?: PasswordHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'password',
    };
  }, [core]);

  const radio = useCallback((key: (keyof T) | ExtString, handlerOption?: RadioHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, value, pattern, maxLength, minLength, max, min, step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'radio',
      value: handlerOption?.value,
    };
  }, [core]);

  const range = useCallback((key: (keyof T) | ExtString, handlerOption?: RangeHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'range',
    };
  }, [core]);

  const search = useCallback((key: (keyof T) | ExtString, handlerOption?: SearchHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'search',
    };
  }, [core]);

  const tel = useCallback((key: (keyof T) | ExtString, handlerOption?: TelHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'tel',
    };
  }, [core]);

  const text = useCallback((key: (keyof T) | ExtString, handlerOption?: TextHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'text',
    };
  }, [core]);

  const time = useCallback((key: (keyof T) | ExtString, handlerOption?: TimeHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'time',
    };
  }, [core]);

  const url = useCallback((key: (keyof T) | ExtString, handlerOption?: UrlHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'url',
    };
  }, [core]);

  const week = useCallback((key: (keyof T) | ExtString, handlerOption?: WeekHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {pattern, maxLength, minLength, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      type: 'week',
    };
  }, [core]);

  //////////////////////////////////////////////////////////////////////////////
  // select

  const textarea = useCallback((key: (keyof T) | ExtString, handlerOption?: TextAreaHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {min, max ,step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
    };
  }, [core]);

  const select = useCallback((key: (keyof T) | ExtString, handlerOption?: SelectHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, value, pattern, maxLength, minLength, max, min, step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
    };
  }, [core]);

  const selectMultiple = useCallback((key: (keyof T) | ExtString, handlerOption?: SelectMultipleHandlerOption) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, value, pattern, maxLength, minLength, max, min, step, ...result} = {...core.handler(key, handlerOption)};
    return {
      ...result,
      multiple: true,
    };
  }, [core]);

  //////////////////////////////////////////////////////////////////////////////
  // return

  return {
    ...core,
    //
    form,
    submit,
    //
    input: core.handler,
    //
    checkbox,
    color,
    date,
    dateTimeLocal,
    email,
    file,
    month,
    number,
    password,
    radio,
    range,
    search,
    tel,
    text,
    time,
    url,
    week,
    //
    select,
    selectMultiple,
    textarea,
    //
  };
};

////////////////////////////////////////////////////////////////////////////////

export {
  useForm,
  //
  SubmitHandler,
  //
  UseFormParams,
  UseFormOptions,
  //
  HandlerOption,
  LabelOption,
  FormHandlerOption,
  //
  CheckboxHandlerOption,
  ColorHandlerOption,
  DateHandlerOption,
  DateTimeLocalHandlerOption,
  EmailHandlerOption,
  FileHandlerOption,
  MonthHandlerOption,
  NumberHandlerOption,
  PasswordHandlerOption,
  RadioHandlerOption,
  RangeHandlerOption,
  SearchHandlerOption,
  TelHandlerOption,
  TextHandlerOption,
  TimeHandlerOption,
  UrlHandlerOption,
  WeekHandlerOption,
  //
  TextAreaHandlerOption,
  SelectHandlerOption,
  SelectMultipleHandlerOption,
};
