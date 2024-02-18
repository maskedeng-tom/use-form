import { HandlerOption, margeHandlerOption } from '../src/core/handlerOption';

describe('margeHandlerOption', () => {

  //////////////////////////////////////////////////////////////////////////////

  test('merges options correctly', () => {
    const option: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
      max: 100,
      min: 0,
      pattern: /\w{3,16}/,
      disabled: false,
      readonly: true,
      validate: (_v: string) => { return true; },
      //
      step: 2,
      maxChecked: 11,
      minChecked: 6,
    };

    const hooksOption: HandlerOption = {
      required: false,
      maxLength: 20,
      minLength: 3,
      max: 50,
      min: 10,
      pattern: /\d{3}/,
      disabled: true,
      readonly: false,
      validate: (_v: string) => { return false; },
      //
      step: 4,
      maxChecked: 2,
      minChecked: 4,
    };

    const mergedOption = margeHandlerOption(option, hooksOption);

    expect(mergedOption.required).toBe(option.required);
    expect(mergedOption.maxLength).toBe(option.maxLength);
    expect(mergedOption.minLength).toBe(option.minLength);
    expect(mergedOption.max).toBe(option.max);
    expect(mergedOption.min).toBe(option.min);
    expect(mergedOption.pattern).toBe(option.pattern);
    expect(mergedOption.disabled).toBe(option.disabled);
    expect(mergedOption.readonly).toBe(option.readonly);
    expect(mergedOption.validate).toBe(option.validate);
    expect(mergedOption.step).toBe(option.step);
    expect(mergedOption.maxChecked).toBe(option.maxChecked);
    expect(mergedOption.minChecked).toBe(option.minChecked);
  });

  //////////////////////////////////////////////////////////////////////////////

  test('merges options correctly 1', () => {
    const option: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
      max: 100,
      min: 0,
      pattern: /\w{3,16}/,
      disabled: false,
      readonly: true,
      validate: (_v: string) => { return true; },
    };

    const hooksOption: HandlerOption = {
    };

    const mergedOption = margeHandlerOption(option, hooksOption);

    expect(mergedOption.required).toBe(option.required);
    expect(mergedOption.maxLength).toBe(option.maxLength);
    expect(mergedOption.minLength).toBe(option.minLength);
    expect(mergedOption.max).toBe(option.max);
    expect(mergedOption.min).toBe(option.min);
    expect(mergedOption.pattern).toBe(option.pattern);
    expect(mergedOption.disabled).toBe(option.disabled);
    expect(mergedOption.readonly).toBe(option.readonly);
    expect(mergedOption.validate).toBe(option.validate);
  });

  test('merges options correctly 2', () => {
    const option: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
      max: 100,
      min: 0,
      pattern: /\w{3,16}/,
      disabled: false,
      readonly: true,
      validate: (_v: string) => { return true; },
    };

    const mergedOption = margeHandlerOption(option, undefined);

    expect(mergedOption.required).toBe(option.required);
    expect(mergedOption.maxLength).toBe(option.maxLength);
    expect(mergedOption.minLength).toBe(option.minLength);
    expect(mergedOption.max).toBe(option.max);
    expect(mergedOption.min).toBe(option.min);
    expect(mergedOption.pattern).toBe(option.pattern);
    expect(mergedOption.disabled).toBe(option.disabled);
    expect(mergedOption.readonly).toBe(option.readonly);
    expect(mergedOption.validate).toBe(option.validate);
  });

  //////////////////////////////////////////////////////////////////////////////

  test('merges options correctly 3', () => {
    const option: HandlerOption = {
    };

    const hooksOption: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
      max: 100,
      min: 0,
      pattern: /\w{3,16}/,
      disabled: false,
      readonly: true,
      validate: (_v: string) => { return true; },
    };

    const mergedOption = margeHandlerOption(option, hooksOption);

    expect(mergedOption.required).toBe(hooksOption.required);
    expect(mergedOption.maxLength).toBe(hooksOption.maxLength);
    expect(mergedOption.minLength).toBe(hooksOption.minLength);
    expect(mergedOption.max).toBe(hooksOption.max);
    expect(mergedOption.min).toBe(hooksOption.min);
    expect(mergedOption.pattern).toBe(hooksOption.pattern);
    expect(mergedOption.disabled).toBe(hooksOption.disabled);
    expect(mergedOption.readonly).toBe(hooksOption.readonly);
    expect(mergedOption.validate).toBe(hooksOption.validate);
  });

  test('merges options correctly 4', () => {

    const hooksOption: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
      max: 100,
      min: 0,
      pattern: /\w{3,16}/,
      disabled: false,
      readonly: true,
      validate: (_v: string) => { return true; },
    };

    const mergedOption = margeHandlerOption(undefined, hooksOption);

    expect(mergedOption.required).toBe(hooksOption.required);
    expect(mergedOption.maxLength).toBe(hooksOption.maxLength);
    expect(mergedOption.minLength).toBe(hooksOption.minLength);
    expect(mergedOption.max).toBe(hooksOption.max);
    expect(mergedOption.min).toBe(hooksOption.min);
    expect(mergedOption.pattern).toBe(hooksOption.pattern);
    expect(mergedOption.disabled).toBe(hooksOption.disabled);
    expect(mergedOption.readonly).toBe(hooksOption.readonly);
    expect(mergedOption.validate).toBe(hooksOption.validate);
  });

  //////////////////////////////////////////////////////////////////////////////

  test('handles undefined options 1', () => {

    const option: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
    };

    const hooksOption: HandlerOption = {
      max: 50,
      min: 10,
      pattern: /\d{3}/,
      disabled: true,
      readonly: false,
      validate: (_v: string) => { return false; },
    };

    const mergedOption = margeHandlerOption(option, hooksOption);

    expect(mergedOption.required).toBe(option.required);
    expect(mergedOption.maxLength).toBe(option.maxLength);
    expect(mergedOption.minLength).toBe(option.minLength);
    expect(mergedOption.max).toBe(hooksOption.max);
    expect(mergedOption.min).toBe(hooksOption.min);
    expect(mergedOption.pattern).toBe(hooksOption.pattern);
    expect(mergedOption.disabled).toBe(hooksOption.disabled);
    expect(mergedOption.readonly).toBe(hooksOption.readonly);
    expect(mergedOption.validate).toBe(hooksOption.validate);
  });

  test('handles undefined options 2', () => {

    const option: HandlerOption = {
      max: 50,
      min: 10,
      pattern: /\d{3}/,
      disabled: true,
      readonly: false,
      validate: (_v: string) => { return false; },
    };

    const hooksOption: HandlerOption = {
      required: true,
      maxLength: 10,
      minLength: 5,
    };

    const mergedOption = margeHandlerOption(option, hooksOption);

    expect(mergedOption.required).toBe(hooksOption.required);
    expect(mergedOption.maxLength).toBe(hooksOption.maxLength);
    expect(mergedOption.minLength).toBe(hooksOption.minLength);
    expect(mergedOption.max).toBe(option.max);
    expect(mergedOption.min).toBe(option.min);
    expect(mergedOption.pattern).toBe(option.pattern);
    expect(mergedOption.disabled).toBe(option.disabled);
    expect(mergedOption.readonly).toBe(option.readonly);
    expect(mergedOption.validate).toBe(option.validate);
  });

  //////////////////////////////////////////////////////////////////////////////

  test('handles undefined, undefined options', () => {

    const mergedOption = margeHandlerOption(undefined, undefined);

    expect(mergedOption.required).toBeUndefined();
    expect(mergedOption.maxLength).toBeUndefined();
    expect(mergedOption.minLength).toBeUndefined();
    expect(mergedOption.max).toBeUndefined();
    expect(mergedOption.min).toBeUndefined();
    expect(mergedOption.pattern).toBeUndefined();
    expect(mergedOption.disabled).toBeUndefined();
    expect(mergedOption.readonly).toBeUndefined();
    expect(mergedOption.validate).toBeUndefined();
  });
});