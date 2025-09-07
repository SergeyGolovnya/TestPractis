// ЗАДАЧА: Реализовать функцию throttle без аргументов
// 
// Throttle ограничивает частоту вызовов функции до одного раза в delay миллисекунд.
//
// Что должно происходить:
// 1. Принимает функцию func и задержку delay
// 2. Возвращает новую функцию
// 3. Если новая функция вызывается во время задержки - она игнорируется
// 4. Исходная функция выполняется не чаще одного раза в delay миллисекунд

function throttle(func, delay) {
    let timeId;

    return function () {
        if(!timeId) {
            func()
            timeId = setTimeout(() => {
                timeId = null
            } ,delay) 
        }
        return
    }
}

// Пример использования
function sayHello() {
    console.log('Привет!');
}

const throttledHello = throttle(sayHello, 1000); // Запускаем эту функцию

throttledHello(); // Выводит "Привет!" сразу
throttledHello(); // Игнорируется
throttledHello(); // Игнорируется
throttledHello(); // Игнорируется


