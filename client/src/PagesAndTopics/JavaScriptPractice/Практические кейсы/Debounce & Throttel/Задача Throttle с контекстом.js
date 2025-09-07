// ЗАДАЧА: Реализовать функцию throttle с сохранением контекста (this)
// 
// Проблема: При вызове функции через setTimeout контекст (this) может потеряться
// Решение: Нужно явно сохранить контекст и передать его в исходную функцию
//
// Что должно происходить:
// 1. Принимает функцию func и задержку delay
// 2. Возвращает новую функцию, которая сохраняет контекст
// 3. Исходная функция вызывается с правильным контекстом (this)

// Создаем throttled функцию
function throttle(func, delay) {
    let timeId
    return function(...args) {
        let context = this
        if(!timeId) {
            func.call(context, ...args);
            timeId = setTimeout(() =>
                timeId = null
            , delay)
        }
    }
}

// Пример использования:
const user = {
    name: 'Анна',
    greet() {
        console.log(`Привет от ${this.name}!`);
    }
};

const throttledGreet = throttle(user.greet, 1000);
throttledGreet.call(user); // Привет от Анна!
