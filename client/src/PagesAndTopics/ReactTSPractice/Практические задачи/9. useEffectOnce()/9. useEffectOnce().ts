import { EffectCallback, useEffect } from 'react'

export function useEffectOnce(effect: EffectCallback) {
    useEffect(()=> {
        const cleanup = effect()
        return cleanup
    }, [])
}