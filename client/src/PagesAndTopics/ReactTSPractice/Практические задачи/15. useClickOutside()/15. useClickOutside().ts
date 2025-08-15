import {useRef, useEffect} from 'react'

export function useClickOutside(callback: () => void) {
  // Создаем ref для отслеживания DOM-элемента
  const ref = useRef<HTMLDivElement>(null)

  // Добавляем слушатель на клик вне элемента
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Проверяем, что клик был вне элемента
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    // Добавляем слушатель на клик вне элемента
    document.addEventListener('click', handleClick)
    // Возвращаем функцию для удаления слушателя
    return () => document.removeEventListener('click', handleClick)
  }, [callback])
  // Возвращаем ref для отслеживания DOM-элемента
  return ref
}


