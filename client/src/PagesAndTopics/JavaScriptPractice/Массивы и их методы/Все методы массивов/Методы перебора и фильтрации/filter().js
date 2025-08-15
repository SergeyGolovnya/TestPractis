/**
 * Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, 
 * задаваемую в передаваемой функции.
 * 
 * Синтаксис:
 * array.filter(callback[, thisArg])
 * 
 * Параметры:
 * callback - функция, выполняемая для каждого элемента массива
 * thisArg - необязательное значение, используемое как this при выполнении callback
 * 
 * callback принимает 3 аргумента:
 * 1. element - текущий обрабатываемый элемент
 * 2. index - индекс текущего элемента
 * 3. array - исходный массив
 */

// // Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции 

// // Пример 1: Фильтрация чисел больше 10
// const numbers = [5, 12, 8, 130, 44];
// const filteredNumbers = numbers.filter(num => num > 10);
// console.log(filteredNumbers); // [12, 130, 44]

// // Пример 2: Фильтрация объектов по условию
// const users = [
//     { name: 'Иван', age: 25 },
//     { name: 'Мария', age: 17 },
//     { name: 'Петр', age: 30 },
//     { name: 'Анна', age: 16 }
// ];
// const adults = users.filter(user => user.age >= 18);
// console.log(adults); // [{ name: 'Иван', age: 25 }, { name: 'Петр', age: 30 }]

// // Пример 3: Фильтрация строк по длине
// const words = ['список', 'код', 'программирование', 'тест', 'массив'];
// const longWords = words.filter(word => word.length > 4);
// console.log(longWords); // ['список', 'программирование', 'массив']

// // Пример 4: Фильтрация с использованием индекса
// const array = [1, 2, 3, 4, 5];
// const evenIndexed = array.filter((num, index) => index % 2 === 0);
// console.log(evenIndexed); // [1, 3, 5]

// // Пример 5: Фильтрация с использованием thisArg
// const fruits = ['яблоко', 'банан', 'апельсин'];
// const filterFunction = function(item) {
//     return item.length > this.minLength;
// };
// const longFruits = fruits.filter(filterFunction, { minLength: 6 });
// console.log(longFruits); // ['апельсин'] 

/*
Задача:
У вас есть массив объектов:
[
    { name: 'Иван', age: 25, city: 'Москва', salary: 50000 },
    { name: 'Мария', age: 17, city: 'Санкт-Петербург', salary: 30000 },
    { name: 'Петр', age: 30, city: 'Москва', salary: 80000 },
    { name: 'Анна', age: 16, city: 'Казань', salary: 25000 },
    { name: 'Алексей', age: 35, city: 'Москва', salary: 120000 }
]

1. Создайте новый массив, содержащий только совершеннолетних (age >= 18)
2. Создайте новый массив, содержащий только жителей Москвы
3. Создайте новый массив, содержащий только тех, у кого зарплата больше 50000
4. Выведите в консоль:
   - Исходный массив
   - Массив совершеннолетних
   - Массив жителей Москвы
   - Массив высокооплачиваемых сотрудников
*/

// Ваше решение:
// const example = [
//     { name: 'Иван', age: 25, city: 'Москва', salary: 50000 },
//     { name: 'Мария', age: 17, city: 'Санкт-Петербург', salary: 30000 },
//     { name: 'Петр', age: 30, city: 'Москва', salary: 80000 },
//     { name: 'Анна', age: 16, city: 'Казань', salary: 25000 },
//     { name: 'Алексей', age: 35, city: 'Москва', salary: 120000 }
// ]

// const onlyMan = example.filter(obj=> obj.age >= 18)
// console.log(onlyMan)

// const onlyMoscow = example.filter(obj => obj.city === 'Москва')
// console.log(onlyMoscow)

// const onlyRich = example.filter(obj => obj.salary >= 50000)
// console.log(onlyRich)

// console.log(example) // не мутировался после всех манипуляций


const example = [
        { name: 'Иван', age: 25, city: 'Москва', salary: 50000 },
        { name: 'Мария', age: 17, city: 'Санкт-Петербург', salary: 30000 },
        { name: 'Петр', age: 30, city: 'Москва', salary: 80000 },
        { name: 'Анна', age: 16, city: 'Казань', salary: 25000 },
        { name: 'Алексей', age: 35, city: 'Москва', salary: 120000 }
    ]

const filteObj = example.filter(obj => obj.age >= 30)
filteObj.map(obj => console.log(`Имя клиента: ${obj.name}
    Возраст: ${obj.age}`))
