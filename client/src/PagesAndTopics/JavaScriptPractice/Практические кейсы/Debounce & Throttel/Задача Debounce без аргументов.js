// ЗАДАЧА: Реализовать функцию debounce
// 
// Debounce откладывает выполнение функции до тех пор, 
// пока не пройдет время delay с момента последнего вызова
//
// Что должно происходить:
// 1. Принимает функцию func и задержку delay
// 2. Возвращает новую функцию
// 3. Если новая функция вызывается повторно - таймер сбрасывается
// 4. Исходная функция выполняется только после паузы в delay миллисекунд

function debounce(func, delay) {
    let timeoutId // id таймера
    return function () {
        clearTimeout(timeoutId) // очищаем таймер
        timeoutId = setTimeout(() => func(), delay) // устанавливаем новый таймер + вызываем функцию
    }
}

// Пример использования
function sayHello() {
    console.log('Привет!');
}

const debouncedHello = debounce(sayHello, 100); // Запускаем эту функцию

debouncedHello(); // ничего не выводит сразу
debouncedHello(); // ничего не выводит сразу  
debouncedHello(); // через 1 секунду: "Привет!"