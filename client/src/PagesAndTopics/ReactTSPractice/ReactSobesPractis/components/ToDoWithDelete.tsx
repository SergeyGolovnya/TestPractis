import { useState } from 'react'
import { StyleContainer } from '../styles/styles'


export const ToDoWithDelete = () => {
    const [arrFruits, setArrFruits] = useState<string[]>([
        "Яблоко", "Банан", "Груша"
    ])

    const offItem = (index:number) => {
        setArrFruits(arrFruits.filter((_, i) => i !== index))
    }

  return (
    <StyleContainer>
        <div>
            {arrFruits.map((fruit:string, index:number) => 
            <ul style={{display:'flex', gap:'20px', margin:'20px'}}>
                <li key={index}>{fruit}</li>
                <button onClick={() => offItem(index)}>Х</button>
            </ul>)}
        </div>
    </StyleContainer>
  )
}
