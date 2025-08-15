import { useRef, useCallback, useState, Ref, useEffect } from 'react';

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
    const [isHovered, setIsHovered] = useState(false);
    const nodeRef = useRef<T | null>(null);

    
    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const ref = useCallback((node: T | null) => {
        // Снимаем обработчики со старого элемента
        if (nodeRef.current) {
            nodeRef.current.removeEventListener('mouseenter', handleMouseEnter);
            nodeRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
        // Навешиваем обработчики на новый элемент
        if (node) {
            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMouseLeave);
        }
        nodeRef.current = node;
    }, [handleMouseEnter, handleMouseLeave]);

    useEffect(() => {
        // Очистка при размонтировании
        return () => {
            if (nodeRef.current) {
                nodeRef.current.removeEventListener('mouseenter', handleMouseEnter);
                nodeRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [handleMouseEnter, handleMouseLeave]);

    return [ref, isHovered];
}