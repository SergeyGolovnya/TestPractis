// /**
//  * Метод includes() определяет, содержит ли массив определённый элемент,
//  * возвращая true или false соответственно.
//  * 
//  * Синтаксис:
//  * array.includes(searchElement[, fromIndex])
//  * 
//  * Параметры:
//  * searchElement - искомый элемент
//  * fromIndex - необязательный параметр, позиция в массиве, с которой начинать поиск
//  */

// // Пример 1: Базовое использование
// const fruits = ['яблоко', 'банан', 'апельсин'];
// console.log(fruits.includes('банан')); // true
// console.log(fruits.includes('груша')); // false

// // Пример 2: Поиск с указанием начального индекса
// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers.includes(3, 2)); // true (ищем 3 начиная с индекса 2)
// console.log(numbers.includes(3, 3)); // false (ищем 3 начиная с индекса 3)

// // Пример 3: Поиск в массиве объектов
// const users = [
//     { id: 1, name: 'Иван' },
//     { id: 2, name: 'Петр' }
// ];
// // includes() не работает с объектами напрямую
// console.log(users.includes({ id: 1, name: 'Иван' })); // false

// // Пример 4: Поиск в массиве с разными типами данных
// const mixed = [1, '2', true, null, undefined, NaN];
// console.log(mixed.includes(1)); // true
// console.log(mixed.includes('2')); // true
// console.log(mixed.includes(true)); // true
// console.log(mixed.includes(null)); // true
// console.log(mixed.includes(undefined)); // true
// console.log(mixed.includes(NaN)); // true

// // Пример 5: Поиск в пустом массиве
// const empty = [];
// console.log(empty.includes(1)); // false

// // Пример 6: Поиск с отрицательным индексом
// const letters = ['a', 'b', 'c', 'd'];
// console.log(letters.includes('c', -2)); // true (поиск начинается с предпоследнего элемента)

// /*
// Задача на вложенные массивы:
// У вас есть массив: [1, 2, 3]
// 1. Добавьте в конец массива число 4
// 2. Добавьте в конец массива массив [5, 6]
// 3. Добавьте в конец массива объект { name: 'John', age: 25 }
// 4. Выведите в консоль:
//    - Исходный массив
//    - Массив после всех добавлений
//    - Попробуйте получить доступ к:
//      * числу 4
//      * числу 6 из вложенного массива
//      * значению age из объекта
// */

// // Ваше решение:

