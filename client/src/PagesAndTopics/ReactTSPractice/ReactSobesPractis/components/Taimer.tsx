import {useState, useEffect} from 'react'
import { StyleContainer } from '../styles/styles'

export const Taimer = () => {
  const [time, setTime] = useState<number>(0)

  useEffect(()=>{
    // Вкладываем в константу функцию интервала чтобы был доступ к ссылке этой функции
    const interval = setInterval(() => {
      setTime(clouserTime => clouserTime + 1)
    }, 1000);

    return () => clearInterval(interval) // очищаем функцию при размонтировани чтобы процесс интервала не продолжался в фоновом режиме
  }, [])

  return (
    <StyleContainer>
      Таймер: {time}
    </StyleContainer>
  )
}
