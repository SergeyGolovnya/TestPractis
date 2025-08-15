import { useState, useCallback } from "react"

export function useToggle(init = false): [boolean, () => void] {
    const [on, setOn] = useState(init)

    const toggle = useCallback(() => setOn(prev => !prev),[])

    return [on, toggle]
}