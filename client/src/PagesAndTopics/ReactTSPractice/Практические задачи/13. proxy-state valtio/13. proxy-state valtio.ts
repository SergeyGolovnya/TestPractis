import { useRef, useState, useEffect } from 'react'
const callbackKey = Symbol('')
export function proxy<T extends object>(initialValue: T): T {
  Reflect.set(initialValue, callbackKey, {})
  return new Proxy(initialValue, {
    set: function(target, key, value) {
      if (Reflect.get(target, key) !== value) {       
        Reflect.set(target, key, value)
        const callbackObject = Reflect.get(target, callbackKey)
        Object.getOwnPropertySymbols(callbackObject).forEach(fnKey => callbackObject[fnKey](key))
      }
      return true
    }
  })
}
export function useSnapshot<T extends object>(proxy: T & {[callbackKey]:Record<symbol, (key: symbol | string) => void >}): T {
  // your code here
  const [, forceUpdate] = useState(false)
  const fnKey = useRef(Symbol(''))
  const watchList = useRef<(symbol|string)[]>([])
  proxy[callbackKey][fnKey.current] = (key) => watchList.current.includes(key) && forceUpdate(pre => !pre)
  useEffect(() => {   
    return () => {
      delete proxy[callbackKey][fnKey.current]
    }
  }, [proxy])
  watchList.current = []
  return new Proxy(proxy, {
    get: function(target, key) {
      watchList.current.push(key)
      return Reflect.get(target, key)
    }
  })
}