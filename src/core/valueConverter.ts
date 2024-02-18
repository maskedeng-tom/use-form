//////////////////////////////////////////////////////////////////////////////
// values state -> element value

const valueToElementValue = (elementType: string, value: unknown) => {
  if(elementType === 'number' || elementType === 'range'){
    if(value !== undefined && value !== null){
      return String(value);
    }
    return '';
  }
  //
  if(elementType === 'color'){
    return String(value || '#000000');
  }
  //
  if(elementType === 'file'){
    return undefined;
  }
  //
  if(value !== undefined && value !== null){
    return String(value);
  }
  //
  return '';
};

//////////////////////////////////////////////////////////////////////////////
// values state -> element value

const elementValueToState = (target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, oldValue: unknown) => {
  const value = target.value;
  //
  if(target instanceof HTMLInputElement){
    // checkbox
    if(target.type === 'checkbox'){
      // check exists data
      const old = oldValue ?? [];
      /* istanbul ignore next */
      if(!Array.isArray(old)){
        console.warn('invalid type expected string array but got', typeof oldValue);
        return;
      }
      const elements = document.getElementsByName(target.name);
      const result: string[] = [];
      for(let i = 0; i < elements.length; i++){
        const element = elements[i] as HTMLInputElement;
        if(element.checked){
          result.push(element.value);
        }
      }
      return result;
    }
    // number,range
    if(target.type === 'number' || target.type === 'range'){
      return target.valueAsNumber;
    }
    // file
    if(target.type === 'file'){
      return target.files;
    }
  }
  if(target instanceof HTMLSelectElement){
    // select
    if(target.multiple){
      const options = target.options;
      const selected: string[] = [];
      for(let i = 0; i < options.length; i++){
        const option = options[i];
        if(option.selected){
          selected.push(option.value);
        }
      }
      return selected;
    }
  }
  return value;
};

////////////////////////////////////////////////////////////////////////////////

export { valueToElementValue, elementValueToState };