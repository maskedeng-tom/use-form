import { useState, useCallback, useMemo } from 'react';

////////////////////////////////////////////////////////////////////////////////

const useKvsState = <X extends {[key: string]: V}, V = unknown>(defaultValue?: X): [
  X,
  (<K>(key: K, value: V) => void)
] => {
  //
  const [state, setState] = useState<X>(defaultValue ?? {} as X);
  //
  const setDataState = useCallback(<K>(
    key: K,
    value: V
  ): void => {
    if(state[String(key)] !== value){
      setState((prev) => {
        if(value === undefined){
          const result = {...prev};
          delete result[String(key)];
          return result;
        }
        return {...prev, [String(key)]: value};
      });
    }
  }, [state]);
  //
  return useMemo(() => [state, setDataState], [state, setDataState]);
  //
};

////////////////////////////////////////////////////////////////////////////////

export { useKvsState };
