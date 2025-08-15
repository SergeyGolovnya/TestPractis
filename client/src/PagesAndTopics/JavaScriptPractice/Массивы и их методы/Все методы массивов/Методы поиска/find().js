// /**
//  * Метод find() возвращает значение первого элемента в массиве, 
//  * которое удовлетворяет условию в переданной функции.
//  * Если элемент не найден, возвращается undefined.
//  * 
//  * Синтаксис:
//  * array.find(callback[, thisArg])
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

// // Пример 1: Поиск первого четного числа
// const numbers = [1, 3, 5, 8, 9, 10];
// const firstEven = numbers.find(num => num % 2 === 0);
// console.log(firstEven); // 8

// // Пример 2: Поиск объекта по свойству
// const users = [
//     { id: 1, name: 'Иван' },
//     { id: 2, name: 'Петр' },
//     { id: 3, name: 'Анна' }
// ];
// const user = users.find(user => user.name === 'Петр');
// console.log(user); // { id: 2, name: 'Петр' }

// // Пример 3: Поиск элемента с использованием индекса
// const fruits = ['яблоко', 'банан', 'апельсин'];
// const fruit = fruits.find((fruit, index) => index === 1);
// console.log(fruit); // 'банан'

// // Пример 4: Поиск элемента, удовлетворяющего сложному условию
// const products = [
//     { name: 'Телефон', price: 1000, inStock: true },
//     { name: 'Ноутбук', price: 2000, inStock: false },
//     { name: 'Планшет', price: 500, inStock: true }
// ];
// const availableProduct = products.find(product => 
//     product.price < 1500 && product.inStock
// );
// console.log(availableProduct); // { name: 'Телефон', price: 1000, inStock: true }

// // Пример 5: Поиск с использованием thisArg
// const finder = {
//     minPrice: 800,
//     findProduct(product) {
//         return product.price >= this.minPrice;
//     }
// };
// const expensiveProduct = products.find(finder.findProduct, finder);
// console.log(expensiveProduct); // { name: 'Телефон', price: 1000, inStock: true }

// У вас есть массив сотрудников компании:
const employees = [
    { id: 1, name: 'Анна', department: 'IT', experience: 5, skills: ['JavaScript', 'React', 'Node.js'] },
    { id: 2, name: 'Иван', department: 'HR', experience: 3, skills: ['Recruitment', 'Communication'] },
    { id: 3, name: 'Мария', department: 'IT', experience: 7, skills: ['Python', 'Django', 'SQL'] },
    { id: 4, name: 'Алексей', department: 'Marketing', experience: 4, skills: ['SEO', 'Content'] },
    { id: 5, name: 'Елена', department: 'IT', experience: 2, skills: ['JavaScript', 'Vue.js'] }
];

// Задания:
// 1. Найдите первого сотрудника из IT-отдела с опытом работы более 3 лет
// 2. Найдите сотрудника, который знает JavaScript
// 3. Найдите сотрудника с самым большим опытом работы
// 4. Найдите сотрудника, который работает в HR и имеет опыт более 2 лет

const firstMan = employees.find((obj, index, arr) => obj.experience > 3 && index !== 0 && obj.experience > arr[0].experience);
console.log(firstMan);