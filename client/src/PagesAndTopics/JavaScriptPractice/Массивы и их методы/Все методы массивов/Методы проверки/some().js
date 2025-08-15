// /**
//  * Метод some() проверяет, удовлетворяет ли хотя бы один элемент массива условию,
//  * заданному в передаваемой функции. Возвращает true, если хотя бы один элемент
//  * удовлетворяет условию, иначе false.
//  * 
//  * Синтаксис:
//  * array.some(callback[, thisArg])
//  * 
//  * Параметры:
//  * callback - функция, выполняемая для каждого элемента массива
//  * thisArg - необязательное значение, используемое как this при выполнении callback
//  * 
//  * callback принимает 3 аргумента:
//  * 1. element - текущий обрабатываемый элемент
//  * 2. index - индекс текущего элемента
//  * 3. array - исходный массив
//  */

// // Пример 1: Проверка наличия четных чисел
// const numbers = [1, 3, 5, 7, 8, 9];
// const hasEven = numbers.some(num => num % 2 === 0);
// console.log(hasEven); // true

// // Пример 2: Проверка наличия пользователя с определенным именем
// const users = [
//     { id: 1, name: 'Иван' },
//     { id: 2, name: 'Петр' },
//     { id: 3, name: 'Анна' }
// ];
// const hasUser = users.some(user => user.name === 'Петр');
// console.log(hasUser); // true

// // Пример 3: Проверка наличия элемента с определенным индексом
// const fruits = ['яблоко', 'банан', 'апельсин'];
// const hasFruit = fruits.some((fruit, index) => index === 1);
// console.log(hasFruit); // true

// // Пример 4: Проверка наличия товара, удовлетворяющего сложному условию
// const products = [
//     { name: 'Телефон', price: 1000, inStock: true },
//     { name: 'Ноутбук', price: 2000, inStock: false },
//     { name: 'Планшет', price: 500, inStock: true }
// ];
// const hasAvailableProduct = products.some(product => 
//     product.price < 1500 && product.inStock
// );
// console.log(hasAvailableProduct); // true

// // Пример 5: Использование thisArg
// const checker = {
//     minPrice: 800,
//     checkProduct(product) {
//         return product.price >= this.minPrice;
//     }
// };
// const hasExpensiveProduct = products.some(checker.checkProduct, checker);
// console.log(hasExpensiveProduct); // true

/*
Задача на практику метода some():
У вас есть массив студентов с информацией об их успеваемости:
[
    { name: 'Анна', grades: [4, 5, 3, 5, 4], attendance: 0.85 },
    { name: 'Иван', grades: [3, 4, 4, 3, 5], attendance: 0.92 },
    { name: 'Мария', grades: [5, 5, 4, 5, 5], attendance: 0.78 },
    { name: 'Петр', grades: [3, 3, 4, 3, 4], attendance: 0.95 },
    { name: 'Елена', grades: [4, 4, 5, 4, 4], attendance: 0.88 }
]

1. Проверьте, есть ли хотя бы один студент:
   - С посещаемостью выше 90%
   - С хотя бы одной оценкой 5
   - С средним баллом выше 4.5
   - С посещаемостью ниже 80% И хотя бы одной оценкой 3

2. Создайте объект-проверщик с методами:
   - hasExcellentStudent() - проверяет наличие студента со всеми оценками 5
   - hasProblemStudent() - проверяет наличие студента с посещаемостью ниже 75% И хотя бы двумя оценками 3
   
3. Используя созданный объект-проверщик и метод some(), проверьте наличие:
   - Отличников
   - Проблемных студентов

4. Создайте функцию, которая принимает массив студентов и объект с критериями проверки, и возвращает true, если хотя бы один студент удовлетворяет ВСЕМ критериям из объекта.
*/

// Ваше решение:
