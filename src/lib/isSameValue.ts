////////////////////////////////////////////////////////////////////////////////

const isSameArray = (valueA: unknown, valueB: unknown): boolean => {
  //
  const a = valueA ?? [];
  const b = valueB ?? [];
  //
  if(Array.isArray(a) && Array.isArray(b)){
    if(a.length !== b.length){
      return false;
    }
    for(let i = 0; i < a.length; i++){
      if(b.indexOf(a[i]) < 0){
        return false;
      }
    }
    return true;
  }
  return false;
};

////////////////////////////////////////////////////////////////////////////////

const isSameValue = (valueA: unknown, valueB: unknown): boolean => {
  if(Array.isArray(valueA) || Array.isArray(valueB)){
    return isSameArray(valueA, valueB);
  }
  //
  const a = valueA ?? '';
  const b = valueB ?? '';
  //
  if(String(a) === String(b)){
    return true;
  }
  return false;
};

////////////////////////////////////////////////////////////////////////////////

export { isSameArray, isSameValue };