/**
 * Типовые задачи на Event Loop для собеседований
 * 
 * В этом файле собраны различные примеры задач, которые часто встречаются
 * на собеседованиях по JavaScript и проверяют понимание Event Loop
 */

/*
Задача 1: Базовый порядок выполнения
Что выведет этот код и почему?

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

Ответ: 1, 4, 3, 2
Объяснение:
1. Сначала выполняется синхронный код (1, 4)
2. Затем микрозадачи (Promise) - 3
3. В конце макрозадачи (setTimeout) - 2
*/

/*
Задача 2: Вложенные промисы
Что выведет этот код и почему?

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve()
    .then(() => {
        console.log('3');
        return Promise.resolve().then(() => console.log('4'));
    })
    .then(() => console.log('5'));
console.log('6');

Ответ: 1, 6, 3, 4, 5, 2
Объяснение:
1. Синхронный код (1, 6)
2. Первый then (3)
3. Вложенный промис (4)
4. Второй then (5)
5. setTimeout (2)
*/

/*
Задача 3: Комбинация таймеров
Что выведет этот код и почему?

setTimeout(() => console.log('1'), 0);
setTimeout(() => console.log('2'), 1000);
setTimeout(() => console.log('3'), 0);
Promise.resolve().then(() => console.log('4'));
console.log('5');

Ответ: 5, 4, 1, 3, 2
Объяснение:
1. Синхронный код (5)
2. Микрозадачи (4)
3. Таймеры с нулевой задержкой (1, 3)
4. Таймер с задержкой 1 секунда (2)
*/

/*
Задача 4: Асинхронные функции
Что выведет этот код и почему?

async function first() {
    console.log('1');
    await Promise.resolve();
    console.log('2');
}

async function second() {
    console.log('3');
    await Promise.resolve();
    console.log('4');
}

console.log('5');
first();
second();
console.log('6');

Ответ: 5, 1, 3, 6, 2, 4
Объяснение:
1. Синхронный код (5)
2. Вызов first() - синхронная часть (1)
3. Вызов second() - синхронная часть (3)
4. Синхронный код (6)
5. Асинхронная часть first() (2)
6. Асинхронная часть second() (4)
*/

/*
Задача 5: Сложная комбинация
Что выведет этот код и почему?

console.log('1');

setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
});

console.log('6');

Ответ: 1, 6, 4, 2, 3, 5
Объяснение:
1. Синхронный код (1, 6)
2. Первый промис (4)
3. Первый setTimeout (2)
4. Микрозадача внутри setTimeout (3)
5. Второй setTimeout (5)
*/

/*
Задача 6: Рекурсивные промисы
Что выведет этот код и почему?

function recursivePromise(n) {
    if (n <= 0) return;
    
    Promise.resolve().then(() => {
        console.log(n);
        recursivePromise(n - 1);
    });
}

console.log('start');
recursivePromise(3);
console.log('end');

Ответ: start, end, 3, 2, 1
Объяснение:
1. Синхронный код (start, end)
2. Рекурсивные промисы выполняются в обратном порядке
   из-за стека вызовов (3, 2, 1)
*/

/*
Задача 7: Ошибки в промисах
Что выведет этот код и почему?

console.log('1');

Promise.resolve()
    .then(() => {
        console.log('2');
        throw new Error('Ошибка');
    })
    .then(() => console.log('3'))
    .catch(() => console.log('4'))
    .then(() => console.log('5'));

console.log('6');

Ответ: 1, 6, 2, 4, 5
Объяснение:
1. Синхронный код (1, 6)
2. Первый then (2)
3. Ошибка пропускает второй then
4. Выполняется catch (4)
5. Выполняется последний then (5)
*/

/*
Задача 8: Приоритеты и блокировка
Что выведет этот код и почему?

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => {
    console.log('3');
    const start = Date.now();
    while (Date.now() - start < 1000) {
        // Блокирующая операция
    }
    console.log('4');
});

console.log('5');

Ответ: 1, 5, 3, 4, 2
Объяснение:
1. Синхронный код (1, 5)
2. Промис (3)
3. Блокирующая операция (1 секунда)
4. Продолжение промиса (4)
5. setTimeout (2)
*/

// Ваше решение: 