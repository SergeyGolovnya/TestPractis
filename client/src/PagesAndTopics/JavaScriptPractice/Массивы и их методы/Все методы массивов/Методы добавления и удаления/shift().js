/**
 * Метод shift() удаляет первый элемент из массива и возвращает его значение
 * 
 * Синтаксис:
 * array.shift()
 * 
 * Возвращаемое значение:
 * - Удаленный элемент массива
 * - undefined, если массив пуст
 * 
 * Особенности:
 * - Мутирует исходный массив
 * - Уменьшает длину массива на 1
 * - Сдвигает все элементы влево - перестраивает индекс массива (не эффективно на больших массивах)
 */

// // Метод shift() удаляет первый элемент из массива и возвращает его значение 

// //1. Массивы с числами
// const numbers = [1, 2, 3, 4, 5]; // удалить первый элемент
// numbers.shift();
// console.log(numbers); // [2, 3, 4, 5] - мутирует массив
// console.log(numbers.shift()); // 2 - возвращает удаленный элемент

// //2. Массивы с строками
// const names = ['John', 'Jane', 'Jim', 'Jill']; // удалить первый элемент
// names.shift();
// console.log(names); // ['Jane', 'Jim', 'Jill'] - мутирует массив
// console.log(names.shift()); // 'Jane' - возвращает удаленный элемент

// //3. Массивы с объектами
// const users = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//     { id: 3, name: 'Jim' },
//     { id: 4, name: 'Jill' },
// ];
// users.shift();
// console.log(users); // [{ id: 2, name: 'Jane' }, { id: 3, name: 'Jim' }, { id: 4, name: 'Jill' }] - мутирует массив
// console.log(users.shift()); // { id: 2, name: 'Jane' } - возвращает удаленный элемент

// //4. Массивы с массивами
// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
// ];
// matrix.shift();
// console.log(matrix); // [[4, 5, 6], [7, 8, 9]] - мутирует массив
// console.log(matrix.shift()); // [4, 5, 6] - возвращает удаленный элемент

// //5. Массивы с функциями
// const functions = [
//     () => { console.log('Hello'); },
//     () => { console.log('World'); },
// ];
// functions.shift();
// console.log(functions); // [() => { console.log('World'); }] - мутирует массив
// console.log(functions.shift()); // () => { console.log('World'); } - возвращает удаленный элемент

// //6. Массивы с символами
// const symbols = ['a', 'b', 'c', 'd', 'e'];
// symbols.shift();
// console.log(symbols); // ['b', 'c', 'd', 'e'] - мутирует массив
// console.log(symbols.shift()); // 'b' - возвращает удаленный элемент 


/*
Задача:
У вас есть массив: [10, 20, 30, 40, 50]
1. Используя метод shift(), удалите первый элемент массива
2. Сохраните удаленный элемент в переменную firstElement
3. Выведите в консоль:
   - Исходный массив
   - Удаленный элемент
   - Массив после удаления
   - Длину массива до и после удаления
*/

// Ваше решение:

// const example = [10, 20, 30, 40, 50];
// console.log(example.length) // Длинна до удаления 5
// console.log(example) // Исходнй массив [ 10, 20, 30, 40, 50 ]
// let deleteElement = example.shift()
// console.log(example) // Массив поле удаления [ 20, 30, 40, 50 ]
// console.log(deleteElement) // Удаленный элемент
// console.log(example.length) // Длинная после удалния 4


const example = [10, 20, 30, 40, 50];
console.log(example.shift())
console.log(example)
