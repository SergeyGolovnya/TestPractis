import {EffectCallback, DependencyList, useRef, useEffect} from 'react';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useRef(true)
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    return effect()
  }, deps)
}





