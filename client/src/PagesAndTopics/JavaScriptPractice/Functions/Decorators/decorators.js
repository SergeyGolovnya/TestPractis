// Декораторы - это функции, которые принимают другую функцию и возвращают новую функцию с дополнительным поведением.

// Декораторы используются для:
// 1. Добавления функциональности к существующим функциям
// 2. Логирования
// 3. Кеширования
// 4. Авторизации
// 5. Валидации

// Пример декоратора, который измеряет время выполнения функции
// function measureTime(fn) {
//     return function(...args) {
//         const start = performance.now();
//         const result = fn.apply(this, args);
//         const end = performance.now();
//         console.log(`Время выполнения: ${end - start}мс`);
//         return result;
//     };
// }

// // Пример использования декоратора
// const slowFunction = () => {
//     console.log('Старт функции');
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log('Конец функции');
//     return 'Результат';
// };

// const measuredSlowFunction = measureTime(slowFunction);
// const measuredSlowFunction2 = measureTime(slowFunction);
// const measuredSlowFunction3 = measureTime(slowFunction);
// measuredSlowFunction();
// measuredSlowFunction2();
// measuredSlowFunction3();

// Базовый синтаксис декоратора

function decorator(fn) {
    let arr = ['Яблоко', 'Апельсин']

    return function(...args) {
        const result = fn.apply(this, args)
        arr.push(result)
        return arr
    }
}

const decoratedFunction1 = decorator((a, b) => a + b);
console.log('Результат:', decoratedFunction1(1, 1))
console.log('Результат:', decoratedFunction1(2, 3))
console.log('Результат:', decoratedFunction1(10, 5))
