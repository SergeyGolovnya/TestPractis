
import { Ref, useRef, useCallback, useState, useEffect } from 'react'

export function useFocus<T extends HTMLElement>(): [Ref<T>, boolean] {
    const [isFocused, setIsFocused] = useState(false)
    
    const nodeRef = useRef<T | null>(null)

    const handleFocusedOn = useCallback(() => setIsFocused(true),[])
    const handleFocusedOff = useCallback(() => setIsFocused(false),[])

    const ref = useCallback((node: T | null) => {
        if (nodeRef.current){
            nodeRef.current.removeEventListener('focusin', handleFocusedOn)
            nodeRef.current.removeEventListener('focusout', handleFocusedOff)
        }
        if (node) {
            node.addEventListener('focusin', handleFocusedOn)
            node.addEventListener('focusout', handleFocusedOff)
        }
        nodeRef.current = node
    },[handleFocusedOn, handleFocusedOff])

    useEffect(() => {
        return () => {
            if (nodeRef.current){
            nodeRef.current.removeEventListener('focusin', handleFocusedOn)
            nodeRef.current.removeEventListener('focusout', handleFocusedOff)
        }
        }
    },[handleFocusedOn, handleFocusedOff])

    return [ref, isFocused]
}


