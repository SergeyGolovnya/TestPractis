// /**
//  * Метод findIndex() возвращает индекс первого элемента в массиве, 
//  * который удовлетворяет условию в переданной функции.
//  * Если элемент не найден, возвращается -1.
//  * 
//  * Синтаксис:
//  * array.findIndex(callback[, thisArg])
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

// // Пример 1: Поиск индекса первого четного числа
// const numbers = [1, 3, 5, 8, 9, 10];
// const firstEvenIndex = numbers.findIndex(num => num % 2 === 0);
// console.log(firstEvenIndex); // 3 (индекс числа 8)

// // Пример 2: Поиск индекса объекта по свойству
// const users = [
//     { id: 1, name: 'Иван' },
//     { id: 2, name: 'Петр' },
//     { id: 3, name: 'Анна' }
// ];
// const userIndex = users.findIndex(user => user.name === 'Петр');
// console.log(userIndex); // 1

// // Пример 3: Поиск индекса элемента, которого нет в массиве
// const fruits = ['яблоко', 'банан', 'апельсин'];
// const notFoundIndex = fruits.findIndex(fruit => fruit === 'груша');
// console.log(notFoundIndex); // -1

// // Пример 4: Поиск индекса элемента с использованием индекса в callback
// const numbers2 = [1, 2, 3, 4, 5];
// const index2 = numbers2.findIndex((num, index) => num === index);
// console.log(index2); // 0 (число 1 находится на индексе 0)

// // Пример 5: Поиск индекса элемента с использованием thisArg
// const finder = {
//     minPrice: 800,
//     findProduct(product) {
//         return product.price >= this.minPrice;
//     }
// };
// const products = [
//     { name: 'Телефон', price: 1000, inStock: true },
//     { name: 'Ноутбук', price: 2000, inStock: false },
//     { name: 'Планшет', price: 500, inStock: true }
// ];
// const expensiveProductIndex = products.findIndex(finder.findProduct, finder);
// console.log(expensiveProductIndex); // 0 (индекс телефона с ценой 1000)

// Практическая задача:
// У вас есть массив студентов с их оценками и посещаемостью.
// Необходимо найти:
// 1. Индекс первого студента, у которого средний балл выше 4.5
// 2. Индекс первого студента, который пропустил более 3 занятий
// 3. Индекс первого студента, у которого есть хотя бы одна оценка 5

const students = [
    { name: 'Анна', grades: [4, 5, 4, 5], absences: 2 },
    { name: 'Иван', grades: [3, 4, 5, 4], absences: 4 },
    { name: 'Мария', grades: [5, 5, 5, 5], absences: 1 },
    { name: 'Петр', grades: [4, 3, 4, 4], absences: 5 },
    { name: 'Елена', grades: [5, 4, 5, 4], absences: 0 }
];

// Ваше решение:
