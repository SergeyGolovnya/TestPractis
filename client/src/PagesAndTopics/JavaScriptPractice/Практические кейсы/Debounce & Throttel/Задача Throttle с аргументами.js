// ЗАДАЧА: Реализовать функцию throttle с аргументами
// 
// Throttle ограничивает частоту вызовов функции до одного раза в delay миллисекунд.
//
// Что должно происходить:
// 1. Принимает функцию func и задержку delay
// 2. Возвращает новую функцию
// 3. Если новая функция вызывается во время задержки - она игнорируется
// 4. Исходная функция выполняется не чаще одного раза в delay миллисекунд, с последними аргументами

function throttle(func, delay) {
    let timeId
    return function (...args) {
        if(!timeId) {
            func(...args)
            timeId = setTimeout(() =>
                timeId = null,
            delay)
        }
    }
}

// Пример использования
function sayHello(greeting) {
    console.log(greeting);
}

const throttledHello = throttle(sayHello, 100); // Запускаем эту функцию

throttledHello('Привет 1'); // Выводит "Привет 1" сразу
throttledHello('Привет 2'); // Игнорируется
throttledHello('Привет 3'); // Игнорируется
