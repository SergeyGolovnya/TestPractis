import { useEffect, useRef } from 'react'

export function useIsFirstRender(): boolean {
    const myRender = useRef(true)

    useEffect (() => {
        myRender.current = false
    },[])

    return myRender.current
  }
  
  // if you want to try your code on the right panel
  // remember to export App() component like below
  
  // export function App() {
  //   return <div>your app</div>
  // }
  
  
  