// ============ Простой пример замыкания ============

// Замыкание - это способность функции запоминать свое лексическое окружение
// даже после того, как функция выполнена

// function createCounter() {
//     // Приватная переменная, доступная только внутри замыкания
//     let count = 0;
    
//     // Возвращаем функцию, которая имеет доступ к count
//     return function() {
//         return ++count; // Увеличиваем и возвращаем значение счетчика
//     };
// }

// // Пример использования:
// const counter1 = createCounter();
// console.log(counter1()); // 1
// console.log(counter1()); // 2

// const counter2 = createCounter();
// console.log(counter2()); // 1 (у каждого счетчика своя переменная count)

// Разбор областей видимости:
// 1. Глобальная область видимости:
//    - Доступна функция createCounter и переменные counter1, counter2

// 2. Область видимости функции createCounter:
//    - Доступна приватная переменная count

// 3. Область видимости возвращаемой функции:
//    - Доступна переменная count через замыкание
//    - Доступны все глобальные переменные

// Важно: каждый вызов createCounter создает новое независимое
// замыкание со своей собственной переменной count

// ================== Задача на замыкание ==================
/*
Задача: Секретное сообщение

Реализуйте функцию createSecretMessage, которая принимает строку message и строку password, и возвращает функцию. Эта возвращённая функция при каждом вызове должна возвращать строку message, но только если ей передан правильный пароль. Если пароль неверный — возвращать строку "Доступ запрещён".

Пример использования:
const secret = createSecretMessage('Секретное слово', '1234');
console.log(secret('1234')); // 'Секретное слово'
console.log(secret('0000')); // 'Доступ запрещён'

Требования:
- Используйте замыкание для хранения сообщения и пароля.
- Не используйте глобальные переменные.
*/

/* function createSecretMessage (message,password) {
    const messageError = 'Доступ запрещён'
    return function (truePassword) {
        if (password === truePassword) {
            return message
        } else {
            return messageError
        }
    }
}

const secret = createSecretMessage ('Валентин семенов', '1234')
console.log(secret('1232'))
console.log(secret('12322'))
console.log(secret('123322'))
console.log(secret('1234')) */


// ================== Задача на замыкание ==================
/*
Задача: Счётчик с ограничением времени

Реализуйте функцию createTimedCounter, которая принимает число seconds. Она должна возвращать функцию-счётчик, которую можно вызывать сколько угодно раз, но только в течение seconds секунд с момента создания. После истечения времени функция всегда возвращает строку "Время вышло".

Пример использования:
const counter = createTimedCounter(3);
console.log(counter()); // 1
console.log(counter()); // 2
// ...через 4 секунды
console.log(counter()); // 'Время вышло'

Требования:
- Используйте замыкание для хранения времени создания и текущего значения счётчика.
- Не используйте глобальные переменные.
*/

/* function createTimedCounter (seconds) {
    const start = Date.now();
    let count = 0;

    return function () {
        const now = Date.now();
        const elapsed = (now - start) / 1000
        if (elapsed < seconds) {
            count ++
            return count
        }else {
            return 'Время вышло'
        }
    }
}

const counter = createTimedCounter(3)
console.log(counter())
setTimeout(() => (console.log(counter())), 1000)
setTimeout(() => (console.log(counter())), 2000)
setTimeout(() => (console.log(counter())), 3000)
setTimeout(() => (console.log(counter())), 4000) */

// ================== Задача на замыкание ==================
/*
Задача: История вызовов

Реализуйте функцию createHistory, которая возвращает функцию. Эта функция при каждом вызове принимает значение и добавляет его в историю. Если вызвать её без аргументов, она должна возвращать массив всех переданных ранее значений (в порядке добавления).

Пример использования:
const history = createHistory();
history('a');
history('b');
history('c');
console.log(history()); // ['a', 'b', 'c']
history('d');
console.log(history()); // ['a', 'b', 'c', 'd']

Требования:
- Используйте замыкание для хранения истории значений.
- Не используйте глобальные переменные.
*/

/* function createHistory () {
    const history = []

    return function (argument) {
        if (!argument) {
            return history
        }
        history.push(argument)
    }
}

const history = createHistory();
history('a');
history('b');
history('c');
history('цввфc');
console.log(history()); // ['a', 'b', 'c']
history('d');
console.log(history()); // ['a', 'b', 'c', 'd'] */

// ================== Задача на замыкание ==================
/*
Задача: Фильтр уникальных значений

Реализуйте функцию createUniqueFilter, которая возвращает функцию. Эта функция при каждом вызове принимает значение и возвращает true, если это значение встречается впервые, и false — если такое значение уже было передано ранее.

Пример использования:
const isUnique = createUniqueFilter();
console.log(isUnique(1)); // true
console.log(isUnique(2)); // true
console.log(isUnique(1)); // false
console.log(isUnique(3)); // true
console.log(isUnique(2)); // false

Требования:
- Используйте замыкание для хранения всех ранее переданных значений.
- Не используйте глобальные переменные.
*/

/* function createUniqueFilter () {
    const unic = []
    return function (number) {
        if (unic.includes(number)) {
            return false
        }else{
            unic.push(number)
            return true
        }
    }
}

const isUnique = createUniqueFilter();
console.log(isUnique(1)); // true
console.log(isUnique(2)); // true
console.log(isUnique(1)); // false
console.log(isUnique(3)); // true
console.log(isUnique(2)); // false */
/* 
function createUniqueFilter() {
    const unic = new Set();
    return function (value) {
        if (unic.has(value)) {
            return false;
        } else {
            unic.add(value);
            return true;
        }
    }
}

const isUnique = createUniqueFilter();
console.log(isUnique(1)); // true
console.log(isUnique(2)); // true
console.log(isUnique(1)); // false
console.log(isUnique(3)); // true
console.log(isUnique(2)); // false */

// ================== Задача на замыкание ==================
/*
Задача: Хранилище последних N значений

Реализуйте функцию createLastNStorage, которая принимает число n и возвращает функцию. Эта функция при каждом вызове принимает значение и добавляет его в хранилище. Если вызвать её без аргументов, она должна возвращать массив последних n переданных значений (в порядке добавления, от старых к новым). Если значений больше n — самые старые удаляются.

Пример использования:
const last3 = createLastNStorage(3);
last3('a');
last3('b');
last3('c');
console.log(last3()); // ['a', 'b', 'c']
last3('d');
console.log(last3()); // ['b', 'c', 'd']
last3('e');
console.log(last3()); // ['c', 'd', 'e']

Требования:
- Используйте замыкание для хранения значений и параметра n.
- Не используйте глобальные переменные.
*/

function createLastNStorage (lastNumber) {
    const history = []
    return function (textArgument) {
        if (!textArgument) {
            return history.slice() // создаем копию
        }else{
            history.push(textArgument)
            while (history.length > lastNumber) {
                   history.shift()
            }
        }
    }
}

const last3 = createLastNStorage(3);
last3('a');
last3('b');
last3('c');
console.log(last3()); // ['a', 'b', 'c']
last3('d');
console.log(last3()); // ['b', 'c', 'd']
last3('e');
console.log(last3()); // ['c', 'd', 'e']


