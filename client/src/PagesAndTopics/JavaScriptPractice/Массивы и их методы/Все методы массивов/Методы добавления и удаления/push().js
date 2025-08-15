/**
 * Синтаксис:
 * arr.push(element1[, ...[, elementN]])
 * 
 * Параметры:
 * element1, ..., elementN - элементы, которые нужно добавить в конец массива
 * 
 * Возвращаемое значение:
 * Новую длину массива после добавления элементов
 * 
 * Описание:
 * Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива
 */

// Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива

// //1. Массивы с числами
// const numbers = [1, 2, 3, 4];
// numbers.push(5);
// console.log(numbers); // [1, 2, 3, 4, 5] - мутирует массив
// console.log(numbers.push(6, 7)); // 7 - возвращает новую длину массива

// //2. Массивы со строками
// const names = ['John', 'Jane', 'Jim'];
// names.push('Jill');
// console.log(names); // ['John', 'Jane', 'Jim', 'Jill'] - мутирует массив
// console.log(names.push('Jack', 'Jill')); // 6 - возвращает новую длину массива

// //3. Массивы с объектами
// const users = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//     { id: 3, name: 'Jim' }
// ];
// users.push({ id: 4, name: 'Jill' });
// console.log(users); // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Jim' }, { id: 4, name: 'Jill' }]
// console.log(users.push({ id: 5, name: 'Jack' })); // 5 - возвращает новую длину массива

// //4. Массивы с массивами
// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6]
// ];
// matrix.push([7, 8, 9]);
// console.log(matrix); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// console.log(matrix.push([10, 11, 12])); // 4 - возвращает новую длину массива

// //5. Массивы с функциями
// const functions = [
//     () => { console.log('Hello'); }
// ];
// functions.push(() => { console.log('World'); });
// console.log(functions); // [() => { console.log('Hello'); }, () => { console.log('World'); }]
// console.log(functions.push(() => { console.log('!'); })); // 3 - возвращает новую длину массива

// //6. Массивы с символами
// const symbols = ['a', 'b', 'c'];
// symbols.push('d');
// console.log(symbols); // ['a', 'b', 'c', 'd']
// console.log(symbols.push('e', 'f')); // 6 - возвращает новую длину массива

/*
Задача:
У вас есть массив чисел: [1, 2, 3, 4, 5]
1. Используя метод push(), добавьте в конец массива числа 6 и 7
2. Сохраните новую длину массива в переменную newLength
3. Выведите в консоль:
   - Исходный массив
   - Новую длину массива
   - Массив после добавления элементов
*/

// // Ваше решение:
// const example = [1, 2, 3, 4, 5]
// const example2 = [1, 2, 3, 4, 5]
// console.log(`Исходный массив: ${example}`)
// let newLength = example.push(6,7)
// let newLength2 = example2.push([6,7])
// console.log(`Новая длина массива: ${newLength}`)
// console.log(`Массив после добавления элементов: ${example}`) // Массив после добавления элементов: 1,2,3,4,5,6,7
// console.log(example) // [ 1, 2, 3, 4, 5, 6, 7 ]
// console.log(`Массив после добавления элементов: ${example2}`) // Массив после добавления элементов: 1,2,3,4,5,6,7
// console.log(example2) // [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
// // Разница вложений элементов в массив (одним масивом или каждый объект) пример нужно получить везде число 7 на вывод
// console.log(example[6]) // Выведет 7
// console.log(example2[6]) // Выведет undefined - потому что структура массива [ 1, 2, 3, 4, 5, [ 6, 7 ] ] а не [ 1, 2, 3, 4, 5, 6, 7 ]
// console.log(example2[5]) // [ 6, 7 ]
// console.log(example2[5][1]) // 7

/*
Задача на вложенные массивы:
У вас есть массив: [1, 2, 3]
1. Добавьте в конец массива число 4
2. Добавьте в конец массива массив [5, 6]
3. Добавьте в конец массива объект { name: 'John', age: 25 }
4. Выведите в консоль:
   - Исходный массив
   - Массив после всех добавлений
   - Попробуйте получить доступ к:
     * числу 4
     * числу 6 из вложенного массива
     * значению age из объекта
*/

// Ваше решение:

// const example = [1,2,3];
// console.log(`Исходный массив: ${example}`) // Исходный массив: 1,2,3
// example.push(4)
// example.push([5, 6])
// example.push({ name: 'John', age: 25 })
// console.log(`Массив после всех добавлений:`, example) // Массив после всех добавлений: [ 1, 2, 3, 4, [ 5, 6 ], { name: 'John', age: 25 } ]
// console.log(example[3]) // 4
// console.log(example[4][1]) // 6
// console.log(example[5].age) // 25


// const example = [2,3,4,4,3,2,1,4,6,7,8]
// console.log(example.push(122,'vasa'))
// console.log(example)