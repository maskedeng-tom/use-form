////////////////////////////////////////////////////////////////////////////////

const setElementChecked = (target: HTMLInputElement, value: unknown) => {
  const type = target.type;
  const checkedValue = target.value;
  if(type === 'checkbox'){
    // checkbox
    if(!value){
      target.checked = false;
    }else if(Array.isArray(value)){
      target.checked = (value.indexOf(checkedValue) >= 0);
    }else{
      target.checked = false;
      return false;
    }
  }else if(type === 'radio'){
    // radio
    target.checked = (String(value) === String(checkedValue));
  }
  return true;
};

////////////////////////////////////////////////////////////////////////////////

export { setElementChecked };