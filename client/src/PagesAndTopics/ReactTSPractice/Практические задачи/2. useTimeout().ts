import { useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
        // Создаем ref для хранения callback при первом рендере
        const callbackRef = useRef(callback);

        // Обновляем значение рефа при изменнении значений
        callbackRef.current = callback

        // Используем useEffect для установки таймаута
        useEffect(() => {
        // Устанавливаем таймаут
        const timeoutId = setTimeout(() => callbackRef.current(), delay)
        // Очищаем таймаут при размонтировании компонента
        return () => clearTimeout(timeoutId)
        // Зависимость delay, чтобы таймаут перезапускался при его изменении
        },[delay])
}