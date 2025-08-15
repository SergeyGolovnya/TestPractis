/**
 * Метод Object.values() возвращает массив значений перечисляемых свойств объекта
 * 
 * Синтаксис:
 * Object.values(obj)
 * 
 * Параметры:
 * obj - объект, чьи значения перечисляемых свойств будут возвращены
 * 
 * Возвращаемое значение:
 * Массив, содержащий значения перечисляемых свойств объекта
 */

// Пример 1: Получение значений простого объекта
const person = {
    name: 'Иван',
    age: 30,
    city: 'Москва'
};
const values = Object.values(person);
console.log(values); // ['Иван', 30, 'Москва']

// Пример 2: Суммирование числовых значений
const scores = {
    math: 90,
    physics: 85,
    chemistry: 88
};
const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
console.log(total); // 263

// Пример 3: Поиск максимального значения
const maxScore = Math.max(...Object.values(scores));
console.log(maxScore); // 90

// Пример 4: Фильтрация значений
const numbers = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
const evenNumbers = Object.values(numbers).filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// Пример 5: Проверка наличия определенного значения
const hasValue = Object.values(person).includes('Москва');
console.log(hasValue); // true 

/*
Задача на работу с Object.values():
У вас есть объект с информацией о магазине:
const store = {
    name: 'Электроника',
    address: 'ул. Ленина, 10',
    departments: {
        phones: {
            name: 'Телефоны',
            products: ['iPhone', 'Samsung', 'Xiaomi'],
            sales: 150000
        },
        laptops: {
            name: 'Ноутбуки',
            products: ['MacBook', 'Lenovo', 'Asus'],
            sales: 200000
        },
        accessories: {
            name: 'Аксессуары',
            products: ['Наушники', 'Чехлы', 'Зарядки'],
            sales: 50000
        }
    },
    employees: {
        manager: { name: 'Иван', age: 35, salary: 80000 },
        sales1: { name: 'Мария', age: 28, salary: 60000 },
        sales2: { name: 'Петр', age: 32, salary: 65000 }
    }
}

1. Используя Object.values(), получите:
   - Массив всех значений первого уровня объекта store
   - Массив всех значений из объекта departments
   - Массив всех значений из объекта employees

2. Создайте функции:
   - getTotalSales() - которая вернет общую сумму продаж по всем отделам
   - getEmployeeNames() - которая вернет массив имен всех сотрудников
   - getDepartmentProducts() - которая вернет массив всех продуктов из всех отделов
   - getHighValueDepartments() - которая вернет массив отделов с продажами больше 100000

3. Используя Object.values() и методы массивов:
   - Найдите отдел с максимальными продажами
   - Найдите сотрудника с максимальной зарплатой
   - Создайте массив объектов с информацией о каждом отделе в формате { name: 'Название', totalProducts: количество продуктов }
*/

// Ваше решение: 