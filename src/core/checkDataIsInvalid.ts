import { HandlerOption } from './handlerOption';
import { ValidityState, getValidityStateText } from './validityState';

////////////////////////////////////////////////////////////////////////////////

const checkDataIsInvalid = (target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, option: HandlerOption, value: unknown) => {

  // browser validation
  let validityState: string | undefined = undefined;
  if(!target.validity.valid){
    validityState = getValidityStateText(target);
    if(validityState !== undefined){
      return validityState;
    }
  }

  // select multiple
  if(target instanceof HTMLSelectElement && target.multiple){
    const options = target.options;
    let numSelected = 0;
    for(let i = 0; i < options.length; i++){
      const option = options[i];
      if(option.selected){
        ++numSelected;
      }
    }
    if(option.required && numSelected === 0){
      return ValidityState.valueMissing;
    }
    if(option.minSelected !== undefined && numSelected < option.minSelected){
      return ValidityState.selectedUnderflow;
    }
    if(option.maxSelected !== undefined && numSelected > option.maxSelected){
      return ValidityState.selectedOverflow;
    }
    return;
  }

  // checkbox
  if(target.type === 'checkbox'){
    // checkbox checked count
    const elements = document.getElementsByName(target.name);
    let numChecked = 0;
    for(let i = 0; i < elements.length; i++){
      const element = elements[i] as HTMLInputElement;
      if(element.checked){
        ++numChecked;
      }
    }
    if(option.required && numChecked === 0){
      return ValidityState.valueMissing;
    }
    if(option.minChecked !== undefined && numChecked < option.minChecked){
      return ValidityState.checkedUnderflow;
    }
    if(option.maxChecked !== undefined && numChecked > option.maxChecked){
      return ValidityState.checkedOverflow;
    }
    return;
  }

  // radio
  if(target.type === 'radio'){
    if(option.required){
      // radio is checked
      const elements = document.getElementsByName(target.name);
      let checked = false;
      for(let i = 0; i < elements.length; i++){
        const element = elements[i] as HTMLInputElement;
        if(element.checked){
          checked = true;
          break;
        }
      }
      if(!checked){
        return ValidityState.valueMissing;
      }
    }
    return;
  }

  // tooShort, tooLong
  if(option.minLength !== undefined && target.value.length < option.minLength){
    return ValidityState.tooShort;
  }
  if(option.maxLength !== undefined && target.value.length > option.maxLength){
    return ValidityState.tooLong;
  }

  if(target.type === 'range'){
    if(option.required && (value === undefined || value === null)){
      return ValidityState.valueMissing;
    }
    if(option.min !== undefined && Number(value) < Number(option.min)){
      return ValidityState.rangeUnderflow;
    }
    if(option.max !== undefined && Number(value) > Number(option.max)){
      return ValidityState.rangeOverflow;
    }
  }
  if(target.type === 'color'){
    if(option.required && !value){
      return ValidityState.valueMissing;
    }
  }

  if(option.validate){
    const validateResult = option.validate(target.value);
    if(validateResult === true){
      //
    }else if(validateResult === false){
      validityState = ValidityState.validateFunctionError;
    }else{
      validityState = validateResult;
    }
  }

  return validityState;

};

////////////////////////////////////////////////////////////////////////////////

export { checkDataIsInvalid };
