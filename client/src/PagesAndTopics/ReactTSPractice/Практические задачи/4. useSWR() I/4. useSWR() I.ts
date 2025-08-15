import { useState, useEffect } from "react"

export function useSWR<T, E >(
    _key: string,
    fetcher: () => T | Promise<T>
  ):{
    data?: T
    error?: E
  } {

    let initialData: T | undefined = undefined;
    
    try {
      const result = fetcher();
      if (!(result && typeof (result as Promise<T>).then === 'function')) {
        initialData = result as T;
      }
    } catch {
      // ignore, error обработается в useEffect
    }

    const [data, setData] = useState<T | undefined>(initialData);
    const [error, setError] = useState<E | undefined>(undefined);

    useEffect(() => {
        let cancelled = false;

        const result = fetcher();

        if (result && typeof (result as Promise<T>).then === 'function') {
            (result as Promise<T>)
                .then(res => { if (!cancelled) setData(res); })
                .catch(err => { if (!cancelled) setError(err as E); });
        }

        return () => { cancelled = true }

    }, [_key, fetcher])
    
    return {data, error}
}