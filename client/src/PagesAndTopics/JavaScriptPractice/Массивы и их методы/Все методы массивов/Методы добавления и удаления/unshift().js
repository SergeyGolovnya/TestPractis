/**
 * Синтаксис:
 * arr.unshift(element1[, ...[, elementN]])
 * 
 * Параметры:
 * element1, ..., elementN - элементы, которые нужно добавить в начало массива
 * 
 * Возвращаемое значение:
 * Новая длина массива после добавления элементов
 * 
 * Описание:
 * Метод unshift() добавляет один или более элементов в начало массива и возвращает новую длину массива.
 * Этот метод изменяет исходный массив (мутирует его).
 */

// // Метод unshift() добавляет один или более элементов в начало массива и возвращает новую длину массива 

// //1. Массивы с числами
// const numbers = [1, 2, 3, 4, 5];
// numbers.unshift(0);
// console.log(numbers); // [0, 1, 2, 3, 4, 5] - мутирует массив
// console.log(numbers.unshift(-2, -1)); // 8 - возвращает новую длину массива
// console.log(numbers); // [-2, -1, 0, 1, 2, 3, 4, 5]

// //2. Массивы со строками
// const names = ['John', 'Jane', 'Jim'];
// names.unshift('Alice');
// console.log(names); // ['Alice', 'John', 'Jane', 'Jim'] - мутирует массив
// console.log(names.unshift('Bob', 'Charlie')); // 6 - возвращает новую длину массива
// console.log(names); // ['Bob', 'Charlie', 'Alice', 'John', 'Jane', 'Jim']

// //3. Массивы с объектами
// const users = [
//     { id: 2, name: 'Jane' },
//     { id: 3, name: 'Jim' }
// ];
// users.unshift({ id: 1, name: 'John' });
// console.log(users); // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Jim' }]
// console.log(users.unshift({ id: 0, name: 'Admin' })); // 4 - возвращает новую длину массива
// console.log(users); // [{ id: 0, name: 'Admin' }, { id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Jim' }]

// //4. Массивы с массивами
// const matrix = [
//     [4, 5, 6],
//     [7, 8, 9]
// ];
// matrix.unshift([1, 2, 3]);
// console.log(matrix); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// console.log(matrix.unshift([0, 0, 0])); // 4 - возвращает новую длину массива
// console.log(matrix); // [[0, 0, 0], [1, 2, 3], [4, 5, 6], [7, 8, 9]]

// //5. Массивы с функциями
// const functions = [
//     () => { console.log('World'); }
// ];
// functions.unshift(() => { console.log('Hello'); });
// console.log(functions); // [() => { console.log('Hello'); }, () => { console.log('World'); }]
// console.log(functions.unshift(() => { console.log('Start'); })); // 3 - возвращает новую длину массива
// console.log(functions); // [() => { console.log('Start'); }, () => { console.log('Hello'); }, () => { console.log('World'); }]

// //6. Массивы с символами
// const symbols = ['c', 'd', 'e'];
// symbols.unshift('b');
// console.log(symbols); // ['b', 'c', 'd', 'e']
// console.log(symbols.unshift('a')); // 5 - возвращает новую длину массива
// console.log(symbols); // ['a', 'b', 'c', 'd', 'e'] 

/*
Задача:
У вас есть массив: [3, 4, 5]
1. Используя метод unshift(), добавьте в начало массива числа 1 и 2
2. Сохраните новую длину массива в переменную newLength
3. Выведите в консоль:
   - Исходный массив
   - Новую длину массива
   - Массив после добавления элементов
   - Попробуйте добавить еще один элемент в начало и выведите результат
*/

// // Ваше решение: 
// const example = [3, 4, 5]; //Исходный массив
// console.log(example)
// const newLength = example.unshift(1,2)
// console.log(newLength) //   - Новую длину массива
// console.log(example) //    - Массив после добавления элементов
// example.unshift(9)
// console.log(example) //    - Попробуйте добавить еще один элемент в начало и выведите результат


const example = [3, 4, 5]
console.log(example.unshift(12,12,'3ef'))
console.log(example)

