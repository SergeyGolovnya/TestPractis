/**
 * Event Loop - механизм, который позволяет JavaScript выполнять асинхронные операции
 * 
 * Основные компоненты:
 * 1. Call Stack - стек вызовов
 * 2. Callback Queue - очередь обратных вызовов
 * 3. Microtask Queue - очередь микрозадач
 * 4. Web APIs - браузерные API
 */

// Пример 1: Базовый Event Loop
console.log('1. Начало');

setTimeout(() => {
    console.log('2. setTimeout');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise');
});

console.log('4. Конец');

// Результат:
// 1. Начало
// 4. Конец
// 3. Promise
// 2. setTimeout

// Пример 2: Приоритеты выполнения
console.log('1. Синхронный код');

setTimeout(() => {
    console.log('2. setTimeout 1');
}, 0);

setTimeout(() => {
    console.log('3. setTimeout 2');
}, 0);

Promise.resolve().then(() => {
    console.log('4. Promise 1');
});

Promise.resolve().then(() => {
    console.log('5. Promise 2');
});

console.log('6. Синхронный код');

// Пример 3: Вложенные таймеры
setTimeout(() => {
    console.log('1. Первый setTimeout');
    
    setTimeout(() => {
        console.log('2. Вложенный setTimeout');
    }, 0);
    
    Promise.resolve().then(() => {
        console.log('3. Promise внутри setTimeout');
    });
}, 0);

// Пример 4: Микрозадачи и макрозадачи
console.log('1. Синхронный код');

setTimeout(() => {
    console.log('2. Макрозадача 1');
    
    Promise.resolve().then(() => {
        console.log('3. Микрозадача внутри макрозадачи');
    });
}, 0);

Promise.resolve().then(() => {
    console.log('4. Микрозадача 1');
    
    setTimeout(() => {
        console.log('5. Макрозадача внутри микрозадачи');
    }, 0);
});

// Пример 5: Длительные операции
console.log('1. Начало');

setTimeout(() => {
    console.log('2. setTimeout');
}, 0);

const start = Date.now();
while (Date.now() - start < 1000) {
    // Блокирующая операция
}

console.log('3. После блокирующей операции');

Promise.resolve().then(() => {
    console.log('4. Promise');
});

/*
Задача на Event Loop:
Используя API https://jsonplaceholder.typicode.com/, создайте систему обработки данных с учетом приоритетов Event Loop.

1. Создайте функцию fetchUserData, которая:
   - Делает запрос к /users/1
   - Возвращает промис с данными пользователя
   - Обрабатывает возможные ошибки

2. Создайте функцию fetchUserPosts, которая:
   - Делает запрос к /posts?userId=1
   - Возвращает промис с постами пользователя
   - Обрабатывает возможные ошибки

3. Реализуйте следующую последовательность операций:
   - Выведите в консоль "Начало работы"
   - Запустите fetchUserData
   - Создайте setTimeout с задержкой 0мс, который выведет "Таймер 1"
   - Создайте Promise.resolve().then(), который выведет "Промис 1"
   - В then() после fetchUserData запустите fetchUserPosts
   - Создайте еще один setTimeout с задержкой 0мс, который выведет "Таймер 2"
   - Создайте Promise.resolve().then(), который выведет "Промис 2"
   - Выведите в консоль "Конец работы"

4. Добавьте обработку ошибок:
   - Если fetchUserData завершится с ошибкой, выведите "Ошибка получения данных пользователя"
   - Если fetchUserPosts завершится с ошибкой, выведите "Ошибка получения постов"

5. Проанализируйте порядок вывода в консоль и объясните, почему сообщения появляются именно в таком порядке

Подсказка: Обратите внимание на:
- Приоритет выполнения микрозадач (Promise) над макрозадачами (setTimeout)
- Порядок выполнения вложенных асинхронных операций
- Влияние ошибок на выполнение цепочки промисов
*/

// Ваше решение: 




