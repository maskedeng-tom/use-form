////////////////////////////////////////////////////////////////////////////////

const getNested = <T, R = T>(source: T, key: unknown): R => {
  const keys = String(key).split('.');
  let v = source as {[key:string]: unknown};
  for(const k of keys){
    v = v?.[k] as {[key:string]: unknown};
  }
  return v as R;
};

////////////////////////////////////////////////////////////////////////////////

const setNested = <T,>(values: T, key: unknown, value: unknown): void => {
  if(!key || typeof values !== 'object'){
    return;
  }
  const keys = String(key).split('.');
  /* istanbul ignore next */
  if(keys.length === 0){
    return;
  }
  let valuesObject = values as {[key:string]: unknown};
  for(let i = 0; i < keys.length - 1; i++){
    const k = keys[i];
    valuesObject[k] = valuesObject[k] ?? {};
    valuesObject = valuesObject[k] as {[key:string]: unknown};
  }
  valuesObject[keys[keys.length - 1]] = value;
};

////////////////////////////////////////////////////////////////////////////////

export { getNested, setNested };