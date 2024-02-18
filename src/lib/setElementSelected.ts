////////////////////////////////////////////////////////////////////////////////

const setElementSelected = (target: HTMLSelectElement, value: unknown) => {
  const options = target.options;
  for(let i = 0; i < options.length; i++){
    const option = options[i];
    if(target.multiple && Array.isArray(value)){
      const selected = (value.indexOf(option.value) !== -1);
      option.selected = selected;
    }else{
      const selected = (value === option.value);
      option.selected = selected;
    }
  }
};

////////////////////////////////////////////////////////////////////////////////

export { setElementSelected };