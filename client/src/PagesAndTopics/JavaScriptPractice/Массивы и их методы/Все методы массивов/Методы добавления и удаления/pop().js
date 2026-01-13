// Метод pop(index) удаляет последний элемент из массива и возвращает его значение

/*
Синтаксис:
array.pop(index)

Параметры:
- Метод не принимает параметров

Возвращаемое значение:
- Удаленный элемент массива
- undefined, если массив пуст

Изменяет исходный массив: Да
*/

//1. Массивы с числами
const numbers = [1, 2, 3, 4, 5]; // удалить последний элемент
console.log(numbers.pop());
console.log(numbers.pop());
console.log(numbers.pop());

// //2. Массивы с строками
// const names = ['John', 'Jane', 'Jim', 'Jill']; // удалить последний элемент
// names.pop();
// console.log(names); // ['John', 'Jane', 'Jim'] - мутирует массив
// console.log(names.pop()); // 'Jill' - возвращает удаленный элемент

//3. Массивы с объектами
// const users = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//     { id: 3, name: 'Jim' },
//     { id: 4, name: 'Jill' },
// ];
// users.pop();
// console.log(users); // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Jim' }] - мутирует массив
// console.log(users.pop()); // { id: 4, name: 'Jill' } - возвращает удаленный элемент

// //4. Массивы с массивами
// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
// ];
// matrix.pop();
// console.log(matrix); // [[1, 2, 3], [4, 5, 6]] - мутирует массив
// console.log(matrix.pop()); // [7, 8, 9] - возвращает удаленный элемент

// //5. Массивы с функциями
// const functions = [
//     () => { console.log('Hello'); },
//     () => { console.log('World'); },
// ];
// functions.pop();
// console.log(functions); // [() => { console.log('Hello'); }] - мутирует массив  
// console.log(functions.pop()); // () => { console.log('World'); } - возвращает удаленный элемент

// //6. Массивы с символами
// const symbols = ['a', 'b', 'c', 'd', 'e'];
// symbols.pop();
// console.log(symbols); // ['a', 'b', 'c', 'd'] - мутирует массив
// console.log(symbols.pop()); // 'e' - возвращает удаленный элемент

/*
Задача:
У вас есть массив чисел example. 
1. Используя метод pop(), удалите последний элемент массива
2. Сохраните удаленный элемент в переменную lastNumber
3. Выведите в консоль:
   - Исходный массив
   - Удаленный элемент
   - Массив после удаления
*/