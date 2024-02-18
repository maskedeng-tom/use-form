import React, { useMemo, useState, useCallback } from 'react';
import { useNestedState } from '../hooks/useNestedState';
import { useKvsState } from '../hooks/useKvsState';
import { getNested } from '../lib/nested';
import { setElementChecked } from '../lib/setElementChecked';
import { setElementSelected } from '../lib/setElementSelected';
import { LabelOption } from '../lib/labelOption';
import { isSameValue } from '../lib/isSameValue';
import { ExtString } from '../lib/ExtString';
import {
  HandlerOption,
  margeHandlerOption
} from './handlerOption';
import { valueToElementValue, elementValueToState } from './valueConverter';
import { checkDataIsInvalid } from './checkDataIsInvalid';
import { ValidityState } from './validityState';

////////////////////////////////////////////////////////////////////////////////

type UseFormOptions<T> = {
  [key in keyof T]: HandlerOption | UseFormOptions<T>
} | {
  [key: ExtString]: HandlerOption | UseFormOptions<T>
};

type UseFormParams<T> = {
  dataAttributes?: {
    required?: string | null;
    disabled?: string | null;
    readonly?: string | null;
    isChanged?: string | null;
    isBlurred?: string | null;
    isInvalid?: string | null;
  },
  defaultValues?: T;
  options?: UseFormOptions<T>;
  validate?: (v: T) => string | boolean;
};

type SubmitHandler<T> = (v: T) => void;

////////////////////////////////////////////////////////////////////////////////

type DataValue = true | undefined;
type DataType<V = DataValue> = {[key: string]: V};

////////////////////////////////////////////////////////////////////////////////

const useFormCore = <T,>(params?: UseFormParams<T>) => {

  //////////////////////////////////////////////////////////////////////////////
  // unique id

  const uid = useMemo(() => {
    return (new Date).getTime().toString(36);
  }, []);

  //////////////////////////////////////////////////////////////////////////////
  // element attributes state

  // value
  const [values, getValue, setValue, setValues] = useNestedState<T, unknown>((params?.defaultValues ?? {}) as T);

  // required
  const [_required, getRequired, setRequired] = useNestedState<{[key: string]: boolean | undefined}, boolean | undefined>();

  // id
  const [_id, getId, setId] = useNestedState<{[key: string]: string}, string>();

  // type
  const [types, setType] = useKvsState<{[key: string]: string}>({});

  // validate error
  const [validateError, setValidateError] = useState<boolean | string>(false);

  //////////////////////////////////////////////////////////////////////////////
  // data- attributes state

  // data required
  const [dataRequired, setDataRequired] = useKvsState<DataType>();

  // data disabled
  const [dataDisabled, setDataDisabled] = useKvsState<DataType>();

  // data readonly
  const [dataReadonly, setDataReadonly] = useKvsState<DataType>();

  // data id invalid
  const [dataIsInvalid, setDataIsInvalid] = useKvsState<DataType<string | undefined>>({});

  // data id changed
  const [dataIsChanged, setDataIsChanged] = useKvsState<DataType>();

  // data blur
  const [dataIsBlurred, setDataIsBlurred] = useKvsState<DataType<true>>();

  //////////////////////////////////////////////////////////////////////////////
  // submit

  const submitHandler = useCallback((submit: (v: T) => void) => {
    return (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      submit(values);
    };
  }, [values]);

  //////////////////////////////////////////////////////////////////////////////
  // create for html id

  const createIdForHtml = useCallback((key: (keyof T) | ExtString) => {
    return `${String(key).split('.').join('-')}-${uid}`;
  }, [uid]);

  //////////////////////////////////////////////////////////////////////////////
  // data- attributes

  const getDataAttributes = useCallback((key: (keyof T) | ExtString) => {
    const getAttributeValue = (data: unknown) => {
      return (typeof data === 'string')? data:( data?'':undefined);
    };
    const result: {[key: string]: string | undefined} = {};
    if(params?.dataAttributes?.disabled !== null){
      result[params?.dataAttributes?.disabled ?? 'data-disabled'] = getAttributeValue(dataDisabled[String(key)]);
    }
    if(params?.dataAttributes?.readonly !== null){
      result[params?.dataAttributes?.readonly ?? 'data-readonly'] = getAttributeValue(dataReadonly[String(key)]);
    }
    if(params?.dataAttributes?.required !== null){
      result[params?.dataAttributes?.required ?? 'data-required'] = getAttributeValue(dataRequired[String(key)]);
    }
    if(params?.dataAttributes?.isChanged !== null){
      result[params?.dataAttributes?.isChanged ?? 'data-is-changed'] = getAttributeValue(dataIsChanged[String(key)]);
    }
    if(params?.dataAttributes?.isBlurred !== null){
      result[params?.dataAttributes?.isBlurred ?? 'data-is-blurred'] = getAttributeValue(dataIsBlurred[String(key)]);
    }
    if(params?.dataAttributes?.isInvalid !== null){
      result[params?.dataAttributes?.isInvalid ?? 'data-is-invalid'] = getAttributeValue(dataIsInvalid[String(key)]);
    }
    return result;
  }, [dataDisabled, dataIsBlurred, dataIsChanged, dataIsInvalid, dataReadonly, dataRequired, params?.dataAttributes?.disabled, params?.dataAttributes?.isBlurred, params?.dataAttributes?.isChanged, params?.dataAttributes?.isInvalid, params?.dataAttributes?.readonly, params?.dataAttributes?.required]);

  //////////////////////////////////////////////////////////////////////////////
  // ref callback

  const refCallback = useCallback((target: HTMLElement | null, key: string, option: HandlerOption) => {
    if(!target){
      return;
    }

    // store user defined ref
    if(option.ref){
      option.ref.current = target;
    }

    // check target element type
    /* istanbul ignore next */
    if(!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement) && !(target instanceof HTMLTextAreaElement)){
      console.warn('invalid element type', key, 'expected input or select or textarea but got', target?.tagName);
      return;
    }

    // set element type
    if(target instanceof HTMLInputElement){
      setType(key, target.type);
    }

    // set value
    if(target instanceof HTMLInputElement && (target.type === 'checkbox' || target.type === 'radio')){
      setElementChecked(target, getValue(key));
      const elements = document.getElementsByName(target.name);
      if(elements[0] === target){
        // only first element
        setDataIsInvalid(key, checkDataIsInvalid(target, option, getValue(key)));
      }
    }else{
      if(target instanceof HTMLSelectElement){
        setElementSelected(target, getValue(key));
      }
      setId(key, createIdForHtml(key));
      setRequired(key, option.required);
      setDataIsInvalid(key, checkDataIsInvalid(target, option, getValue(key)));
    }

    // global validate
    if(params?.validate){
      const validateResult = params.validate(values);
      if(validateResult === true){
        setValidateError(false);
      }else if(validateResult === false){
        setValidateError(ValidityState.validateFunctionError);
      }else{
        setValidateError(validateResult);
      }
    }

  }, [createIdForHtml, getValue, params, setDataIsInvalid, setId, setRequired, setType, values]);

  //////////////////////////////////////////////////////////////////////////////
  // input,textarea,select element handler

  const handler = useCallback((key: (keyof T) | ExtString, handlerOption?: HandlerOption) => {
    //
    const option = margeHandlerOption(handlerOption, getNested(params?.options, key));

    // set data- attributes
    if(option.required !== undefined){
      setDataRequired(key, option.required? true : undefined);
    }
    if(option.disabled !== undefined){
      setDataDisabled(key, option.disabled? true : undefined);
    }
    if(option.readonly !== undefined){
      setDataReadonly(key, option.readonly? true : undefined);
    }
    //
    const changed = isSameValue(getValue(key), getNested(params?.defaultValues, key))?undefined:true;
    setDataIsChanged(key, changed);

    return {
      ref: (target: HTMLElement | null) => refCallback(target, String(key), option),
      id: getId(key),
      name: String(key).split('.').join('-'),
      value: valueToElementValue(types[String(key)], getValue(key)),
      //
      required: getRequired(key)? true : undefined,
      pattern: option.pattern instanceof RegExp? option.pattern.source: option.pattern,
      maxLength: option.maxLength,
      minLength: option.minLength,
      max: option.max,
      min: option.min,
      step: option.step,
      //
      disabled: option.disabled,
      readOnly: option.readonly,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(key, elementValueToState(e.target, getValue(key)));
      },
      onBlur: (_e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDataIsBlurred(key, true);
      },
      ...getDataAttributes(key),
    };
    //
  }, [params?.options, params?.defaultValues, getValue, setDataIsChanged, getId, types, getRequired, getDataAttributes, setDataRequired, setDataDisabled, setDataReadonly, refCallback, setValue, setDataIsBlurred]);

  //////////////////////////////////////////////////////////////////////////////
  // label element handler

  const label = useCallback((key: (keyof T) | ExtString, labelOption?: LabelOption): {
    [key: string]: unknown
  } => {
    return {
      ref: labelOption?.ref,
      htmlFor: getId(key),
      //
      ...getDataAttributes(key),
    };
  }, [getDataAttributes, getId]);

  //////////////////////////////////////////////////////////////////////////////
  // reset

  const reset = useCallback((newDefaultValue?: T) => {
    setValues(newDefaultValue ?? params?.defaultValues ?? {} as T);
    for(const key in types){
      const type = types[key];
      if(type === 'file'){
        const target = document.getElementById(getId(key)) as HTMLInputElement;
        if(target){
          target.value = '';
        }
      }
      setDataIsBlurred(key, undefined);
    }
  }, [getId, params?.defaultValues, setDataIsBlurred, setValues, types]);

  //////////////////////////////////////////////////////////////////////////////
  // return

  return {
    values,
    setValues,
    //
    submitHandler,
    //
    handler,
    label,
    reset,
    //
    validateError,
    //
    invalid: dataIsInvalid,
    isInvalid: (validateError? true: false) || Object.keys(dataIsInvalid).length > 0,
    changed: dataIsChanged,
    isChanged: Object.keys(dataIsChanged).length > 0,
    blurred: dataIsBlurred,
    isBlurred: Object.keys(dataIsBlurred).length > 0,
    //
    // private
    uid,
    createIdForHtml,
  };
};

////////////////////////////////////////////////////////////////////////////////

export {
  useFormCore,
  SubmitHandler,
  UseFormParams,
  UseFormOptions,
  HandlerOption,
  LabelOption
};
