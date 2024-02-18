import { useState, useCallback, useMemo } from 'react';
import { getNested, setNested } from '../lib/nested';

////////////////////////////////////////////////////////////////////////////////

const useNestedState = <T, V = keyof T>(defaultValues?: T):[
  T,
  (key: unknown) => V,
  (key: unknown, value: V) => void,
  React.Dispatch<React.SetStateAction<T>>
] => {
  //
  const [values, setValues] = useState<T>(defaultValues ?? {} as T);

  const get = useCallback((key: unknown): V => {
    return getNested(values, key);
  }, [values]);

  const set = useCallback((key: unknown, value: V): void => {
    if(getNested<T, V>(values, key) !== value){
      setValues((prev) => {
        const result = {...prev};
        setNested(result, key, value);
        return result;
      });
    }
  }, [values, setValues]);
  //
  return useMemo(() => [values, get, set, setValues], [values, get, set, setValues]);
};

////////////////////////////////////////////////////////////////////////////////

export { useNestedState };