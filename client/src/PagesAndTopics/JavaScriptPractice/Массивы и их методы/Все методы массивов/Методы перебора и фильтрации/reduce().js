// /**
//  * Метод reduce() применяет функцию reducer к каждому элементу массива (слева направо),
//  * возвращая одно результирующее значение.
//  * 
//  * Синтаксис:
//  * array.reduce(callback[, initialValue])
//  * 
//  * Параметры:
//  * callback - функция, выполняемая для каждого элемента массива
//  * initialValue - необязательное начальное значение
//  * 
//  * callback принимает 4 аргумента:
//  * 1. accumulator - аккумулятор, накапливающий результаты
//  * 2. currentValue - текущий обрабатываемый элемент
//  * 3. currentIndex - индекс текущего элемента
//  * 4. array - исходный массив
//  */

// Пример 1: Сумма всех элементов массива
const numbers = [x=> x + 1, x=> x + 2];
const sum = numbers.reduce((acc, curr) => acc + curr(1), 0);
console.log(sum); // 15

// // Пример 2: Поиск максимального значения
// const max = numbers.reduce((acc, curr) => Math.max(acc, curr));
// console.log(max); // 5

// // Пример 3: Подсчет количества каждого элемента
// const fruits = ['яблоко', 'банан', 'яблоко', 'апельсин', 'банан'];
// const count = fruits.reduce((acc, curr) => {
//     acc[curr] = (acc[curr] || 0) + 1;
//     return acc;
// }, {});
// console.log(count); // { яблоко: 2, банан: 2, апельсин: 1 }

// // Пример 4: Преобразование массива в объект
// const users = [
//     { id: 1, name: 'Иван' },
//     { id: 2, name: 'Петр' },
//     { id: 3, name: 'Анна' }
// ];
// const usersById = users.reduce((acc, curr) => {
//     acc[curr.id] = curr;
//     return acc;
// }, {});
// console.log(usersById);
// // {
// //   1: { id: 1, name: 'Иван' },
// //   2: { id: 2, name: 'Петр' },
// //   3: { id: 3, name: 'Анна' }
// // }

// // Пример 5: Вычисление среднего значения
// const grades = [85, 90, 78, 92, 88];
// const average = grades.reduce((acc, curr, index, array) => {
//     acc += curr;
//     if (index === array.length - 1) {
//         return acc / array.length;
//     }
//     return acc;
// }, 0);
// console.log(average); // 86.6

// // Пример 6: Сглаживание массива массивов
// const nestedArrays = [[1, 2], [3, 4], [5, 6]];
// const flattened = nestedArrays.reduce((acc, curr) => acc.concat(curr), []);
// console.log(flattened); // [1, 2, 3, 4, 5, 6]

// // Пример 7: Создание цепочки промисов
// const promises = [1, 2, 3].map(n => Promise.resolve(n));
// const chain = promises.reduce((acc, curr) => {
//     return acc.then(result => {
//         console.log(result);
//         return curr;
//     });
// }, Promise.resolve(0));
// // Выведет: 0, 1, 2, 3

/*
Задача: Анализ продаж интернет-магазина

У вас есть массив объектов с информацией о продажах:
[
    { product: 'Телефон', price: 50000, quantity: 2, category: 'Электроника', date: '2024-01-15' },
    { product: 'Ноутбук', price: 120000, quantity: 1, category: 'Электроника', date: '2024-01-15' },
    { product: 'Книга', price: 1000, quantity: 5, category: 'Книги', date: '2024-01-16' },
    { product: 'Наушники', price: 8000, quantity: 3, category: 'Электроника', date: '2024-01-16' },
    { product: 'Ручка', price: 100, quantity: 10, category: 'Канцтовары', date: '2024-01-17' }
]

Используя reduce(), создайте:
1. Объект с общей суммой продаж по каждой категории
2. Объект с самым дорогим товаром в каждой категории
3. Объект со средней ценой товара в каждой категории
4. Объект с количеством проданных товаров по датам
5. Объект с общей выручкой по датам

Примечание: Для каждого пункта используйте отдельный reduce()
*/

// Ваше решение:



// // Пример 1: Сумма всех элементов массива
// const numbers = [1, 2, 3, 4, 5];
// const sum = numbers.reduce((acc, item) => acc + item, 10)
// console.log(sum)