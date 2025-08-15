/**
 * Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
 * 
 * Синтаксис:
 * array.map(callback[, thisArg])
 * 
 * Параметры:
 * callback - функция, выполняемая для каждого элемента массива
 * thisArg - необязательное значение, используемое в качестве this при вызове callback
 * 
 * callback принимает 3 аргумента:
 * 1. currentValue - текущий обрабатываемый элемент массива
 * 2. index - индекс текущего элемента
 * 3. array - массив, по которому осуществляется проход
 * 
 * Возвращаемое значение:
 * Новый массив, каждый элемент которого является результатом выполнения callback функции
 */

// // Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива 



// // Пример 1: Умножение каждого элемента массива на 2
// const numbers = [1, 2, 3, 4, 5];
// const doubledNumbers = numbers.map(num => num * 2);
// console.log(doubledNumbers); // [2, 4, 6, 8, 10]

// // Пример 2: Преобразование массива объектов
// const users = [
//     { name: 'Иван', age: 25 },
//     { name: 'Мария', age: 30 },
//     { name: 'Петр', age: 35 }
// ];
// const userNames = users.map(user => user.name);
// console.log(userNames); // ['Иван', 'Мария', 'Петр']

// // Пример 3: Использование индекса элемента
// const fruits = ['яблоко', 'банан', 'апельсин'];
// const indexedFruits = fruits.map((fruit, index) => `${index + 1}. ${fruit}`);
// console.log(indexedFruits); // ['1. яблоко', '2. банан', '3. апельсин']

// // Пример 4: Преобразование строк в числа
// const stringNumbers = ['1', '2', '3', '4'];
// const actualNumbers = stringNumbers.map(Number);
// console.log(actualNumbers); // [1, 2, 3, 4]

// // Пример 5: Создание HTML-элементов
// const items = ['Дом', 'Машина', 'Книга'];
// const htmlList = items.map(item => `<li>${item}</li>`).join('');
// console.log(htmlList); // '<li>Дом</li><li>Машина</li><li>Книга</li>'

// // Пример 6: Работа с вложенными массивами
// const matrix = [
//     [1, 2],
//     [3, 4],
//     [5, 6]
// ];
// const flattened = matrix.map(row => row.reduce((a, b) => a + b));
// console.log(flattened); // [3, 7, 11] 

/*
Задача:
У вас есть массив объектов с информацией о сотрудниках:
[
    { name: 'Иван', age: 25, city: 'Москва', salary: 50000, experience: 3 },
    { name: 'Мария', age: 30, city: 'Санкт-Петербург', salary: 75000, experience: 5 },
    { name: 'Петр', age: 35, city: 'Москва', salary: 100000, experience: 8 },
    { name: 'Анна', age: 28, city: 'Казань', salary: 60000, experience: 4 },
    { name: 'Алексей', age: 32, city: 'Москва', salary: 90000, experience: 6 }
]

1. Используя map(), создайте:
   - Массив строк с информацией о сотрудниках в формате "Имя (Возраст лет) - Город"
   - Массив объектов с информацией о зарплате после повышения (каждые 2 года опыта дают +10% к зарплате)
   - Массив объектов с информацией о квалификации (если опыт > 5 лет - "Старший", если > 3 лет - "Средний", иначе - "Младший")
2. Создайте массив объектов, где для каждого сотрудника будет добавлено поле bonus (премия = зарплата * (опыт / 10))
*/

// Ваше решение:

// const info = [
//     { name: 'Иван', age: 25, city: 'Москва', salary: 50000, experience: 3 },
//     { name: 'Мария', age: 30, city: 'Санкт-Петербург', salary: 75000, experience: 5 },
//     { name: 'Петр', age: 35, city: 'Москва', salary: 100000, experience: 8 },
//     { name: 'Анна', age: 28, city: 'Казань', salary: 60000, experience: 4 },
//     { name: 'Алексей', age: 32, city: 'Москва', salary: 90000, experience: 6 }
// ]

// const list = info.map(obj => `${obj.name} (${obj.age} лет) - ${obj.city}`)
// console.log(list)

// // Неправильно - вернёт undefined obj => {...}
// const wrongList = info.map(obj => {
//     info: `${obj.name} (${obj.age} лет) - ${obj.city}`
// })
// console.log('Неправильный вариант:', wrongList) // [ undefined, undefined, unde...

// // Правильно - вернёт массив объектов obj => ({...})
// const correctList = info.map(obj => ({
//     info: `${obj.name} (${obj.age} лет) - ${obj.city}`
// }))
// console.log('Правильный вариант:', correctList) // [ { info: 'Иван (25 лет) - Москва' },{...}]

//    - Массив объектов с информацией о зарплате после повышения (каждые 2 года опыта дают +10% к зарплате)
// const newSalary = info.map(obj => ({
//     name: obj.name,
//     oldSalary: obj.salary,
//     newSalary: obj.salary + (obj.salary * 0.1) * Math.floor(obj.experience / 2),
//     // newSalary2: obj.salary * (1 + 0.1 * Math.floor(obj.experience/2)) // компактный рассчет
// }))
// console.log(newSalary)

// // - Массив объектов с информацией о квалификации (если опыт > 5 лет - "Старший", если > 3 лет - "Средний", иначе - "Младший")

// const qualificationList = info.map(obj => ({
//     name: obj.name,
//     experience: obj.experience,
//     qualification:  obj.experience > 5 && 'Старший' || obj.experience > 3 && 'Средний' || 'Младший',
//     // qualification2: obj.experience > 5 ? 'Старший' : obj.experience > 3 ? 'Средний' : 'Младший' // тоже самое с тернарным оператором
// }))
// console.log(qualificationList)

// // 2. Создайте массив объектов, где для каждого сотрудника будет добавлено поле bonus (премия = зарплата * (опыт / 10))

// const bonusList = info.map(obj => ({
//     ...obj,
//     bonus: obj.salary * (obj.experience / 10),
// }))
// console.log(bonusList)

const info = [
    { name: 'Иван', age: 25, city: 'Москва', salary: 50000, experience: 3 },
    { name: 'Мария', age: 30, city: 'Санкт-Петербург', salary: 75000, experience: 5 },
    { name: 'Петр', age: 35, city: 'Москва', salary: 100000, experience: 8 },
    { name: 'Анна', age: 28, city: 'Казань', salary: 60000, experience: 4 },
    { name: 'Алексей', age: 32, city: 'Москва', salary: 90000, experience: 6 }
]

const newArr = info.map(obj => (
    {
        ...obj,
        df: 3000 * obj.salary
    }
))

console.log(newArr) //  добавил