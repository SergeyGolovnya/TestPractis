import {useState} from 'react'
import { StyleContainer } from '../styles/styles'

export const ConditionalRendering = () => {
    const [ isOn, setIsOn ] = useState(true)

  return (
    <StyleContainer>
        <button onClick={() => setIsOn (!isOn)}>
            {isOn ? 'Скрыть' : 'Открыть'}</button> {/* Добавляем кнопку с условием */}
        <div>{isOn ? <p> 'Привет, мир!' </p> : ''}</div>
    </StyleContainer>
  )
}
