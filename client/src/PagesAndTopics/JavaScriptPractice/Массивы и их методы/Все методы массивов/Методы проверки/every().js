// /**
//  * Метод every() проверяет, удовлетворяют ли все элементы массива условию, 
//  * заданному в передаваемой функции.
//  * Возвращает true, если для всех элементов массива функция возвращает true.
//  * Если хотя бы один элемент не удовлетворяет условию, возвращается false.
//  * 
//  * Синтаксис:
//  * array.every(callback[, thisArg])
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

// // Пример 1: Проверка, все ли числа положительные
// const numbers = [1, 2, 3, 4, 5];
// const allPositive = numbers.every(num => num > 0);
// console.log(allPositive); // true

// // Пример 2: Проверка, все ли пользователи совершеннолетние
// const users = [
//     { name: 'Иван', age: 20 },
//     { name: 'Петр', age: 17 },
//     { name: 'Анна', age: 25 }
// ];
// const allAdults = users.every(user => user.age >= 18);
// console.log(allAdults); // false

// // Пример 3: Проверка длины строк в массиве
// const words = ['кот', 'собака', 'попугай'];
// const allShortWords = words.every(word => word.length <= 6);
// console.log(allShortWords); // true

// // Пример 4: Проверка наличия определенного свойства у всех объектов
// const products = [
//     { name: 'Телефон', price: 1000 },
//     { name: 'Ноутбук', price: 2000 },
//     { name: 'Планшет' }
// ];
// const allHavePrice = products.every(product => 'price' in product);
// console.log(allHavePrice); // false

// // Пример 5: Использование thisArg
// const checker = {
//     minLength: 3,
//     checkLength(str) {
//         return str.length >= this.minLength;
//     }
// };
// const strings = ['кот', 'собака', 'мышь'];
// const allLongEnough = strings.every(checker.checkLength, checker);
// console.log(allLongEnough); // true

/*
Задача на проверку данных:
У вас есть массив объектов с информацией о студентах:
[
    { name: 'Анна', grades: [4, 5, 5, 4], attendance: 0.95, hasScholarship: true },
    { name: 'Иван', grades: [3, 4, 5, 3], attendance: 0.85, hasScholarship: false },
    { name: 'Мария', grades: [5, 5, 5, 5], attendance: 0.98, hasScholarship: true },
    { name: 'Петр', grades: [4, 4, 4, 4], attendance: 0.92, hasScholarship: true },
    { name: 'Елена', grades: [3, 3, 4, 3], attendance: 0.75, hasScholarship: false }
]

Используя метод every(), проверьте:
1. Все ли студенты имеют средний балл выше 4.0
2. Все ли студенты с повышенной стипендией имеют посещаемость выше 90%
3. Все ли оценки у каждого студента выше или равны 3
4. Все ли студенты с посещаемостью выше 90% имеют повышенную стипендию
5. Все ли студенты имеют хотя бы одну оценку 5

Для каждой проверки выведите в консоль:
- Результат проверки (true/false)
- Список студентов, которые не соответствуют условию (если такие есть)
*/

// Ваше решение:

