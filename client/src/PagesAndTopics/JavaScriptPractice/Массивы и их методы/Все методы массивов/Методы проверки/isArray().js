// // Метод Array.isArray() определяет, является ли переданное значение массивом 

// /**
//  * Метод Array.isArray() возвращает true, если переданное значение является массивом,
//  * и false в противном случае.
//  * 
//  * Синтаксис:
//  * Array.isArray(value)
//  * 
//  * Параметры:
//  * value - значение, которое нужно проверить
//  */

// // Пример 1: Проверка массива
// const arr = [1, 2, 3];
// console.log(Array.isArray(arr)); // true

// // Пример 2: Проверка других типов данных
// console.log(Array.isArray([])); // true
// console.log(Array.isArray([1, 2, 3])); // true
// console.log(Array.isArray(new Array())); // true
// console.log(Array.isArray({})); // false
// console.log(Array.isArray(null)); // false
// console.log(Array.isArray(undefined)); // false
// console.log(Array.isArray(17)); // false
// console.log(Array.isArray('Array')); // false
// console.log(Array.isArray(true)); // false
// console.log(Array.isArray(false)); // false

// // Пример 3: Проверка в условном операторе
// const value = [1, 2, 3];
// if (Array.isArray(value)) {
//     console.log('Это массив!');
// } else {
//     console.log('Это не массив!');
// }

// // Пример 4: Проверка вложенных массивов
// const nestedArray = [1, [2, 3], [4, [5, 6]]];
// console.log(Array.isArray(nestedArray)); // true
// console.log(Array.isArray(nestedArray[1])); // true
// console.log(Array.isArray(nestedArray[2][1])); // true 

/*
Задача на проверку типов данных:
У вас есть следующие данные:
const data = [
    [1, 2, 3],
    { name: 'John', age: 25 },
    'Hello World',
    42,
    [4, 5, 6],
    null,
    undefined,
    true,
    [7, 8, 9],
    { city: 'Moscow', country: 'Russia' }
];

1. Используя Array.isArray(), проверьте каждый элемент массива data и создайте:
   - Массив, содержащий только элементы, которые являются массивами
   - Массив, содержащий только элементы, которые НЕ являются массивами
   
2. Создайте функцию checkArrayType, которая:
   - Принимает массив в качестве параметра
   - Проверяет каждый элемент массива на тип данных
   - Возвращает объект со статистикой в формате:
     {
       arrays: количество массивов,
       objects: количество объектов,
       primitives: количество примитивов
     }

3. Примените функцию checkArrayType к массиву data и выведите результат в консоль
*/

// Ваше решение: 