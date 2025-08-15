import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const saveValue = useRef <T | undefined>(undefined)

  useEffect(() => {
    saveValue.current = value
  },[value])

  return saveValue.current
}

