////////////////////////////////////////////////////////////////////////////////

const ValidityState = {
  badInput: 'bad-input',
  customError: 'custom-error',
  patternMismatch: 'pattern-mismatch',
  rangeOverflow: 'range-overflow',
  rangeUnderflow: 'range-underflow',
  stepMismatch: 'step-mismatch',
  tooLong: 'too-long',
  tooShort: 'too-short',
  typeMismatch: 'type-mismatch',
  valueMissing: 'value-missing',
  //
  validateFunctionError: 'validate-function-error',
  checkedOverflow: 'checked-overflow',
  checkedUnderflow: 'checked-underflow',
  selectedOverflow: 'selected-overflow',
  selectedUnderflow: 'selected-underflow',
};

////////////////////////////////////////////////////////////////////////////////

const getValidityStateText = (target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {

  /* istanbul ignore next */
  if(target.validity.badInput)return ValidityState.badInput;
  /* istanbul ignore next */
  if(target.validity.customError)return ValidityState.customError;

  if(target.validity.patternMismatch)return ValidityState.patternMismatch;
  if(target.validity.rangeOverflow)return ValidityState.rangeOverflow;
  if(target.validity.rangeUnderflow)return ValidityState.rangeUnderflow;
  if(target.validity.stepMismatch)return ValidityState.stepMismatch;

  /* istanbul ignore next */
  if(target.validity.tooLong)return ValidityState.tooLong;
  /* istanbul ignore next */
  if(target.validity.tooShort)return ValidityState.tooShort;

  if(target.validity.typeMismatch)return ValidityState.typeMismatch;
  if(target.validity.valueMissing)return ValidityState.valueMissing;

  /* istanbul ignore next */
  return undefined;
};

////////////////////////////////////////////////////////////////////////////////

export { ValidityState, getValidityStateText };
