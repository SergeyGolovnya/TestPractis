/**
 * Метод Object.entries() возвращает массив пар [ключ, значение] перечисляемых свойств объекта
 * 
 * Синтаксис:
 * Object.entries(obj)
 * 
 * Параметры:
 * obj - объект, чьи перечисляемые свойства будут возвращены в виде пар [ключ, значение]
 * 
 * Возвращаемое значение:
 * Массив пар [ключ, значение] перечисляемых свойств объекта
 */

// Пример 1: Получение пар ключ-значение
const person = {
    name: 'Иван',
    age: 30,
    city: 'Москва'
};
const entries = Object.entries(person);
console.log(entries); // [['name', 'Иван'], ['age', 30], ['city', 'Москва']]

// Пример 2: Преобразование объекта в Map
const map = new Map(Object.entries(person));
console.log(map.get('name')); // 'Иван'

// Пример 3: Итерация по парам ключ-значение
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Пример 4: Фильтрация пар по значению
const scores = {
    math: 90,
    physics: 85,
    chemistry: 88
};
const highScores = Object.entries(scores)
    .filter(([_, score]) => score >= 88)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
console.log(highScores); // { math: 90, chemistry: 88 }

// Пример 5: Создание нового объекта с преобразованными значениями
const doubledScores = Object.entries(scores)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value * 2 }), {});
console.log(doubledScores); // { math: 180, physics: 170, chemistry: 176 }

/*
Задача на работу с Object.entries():
У вас есть объект с информацией о магазине:
const store = {
    name: 'ТехноМаркет',
    address: {
        city: 'Москва',
        street: 'Ленина',
        building: 15
    },
    departments: {
        electronics: {
            manager: 'Иван Петров',
            employees: 5,
            sales: 150000
        },
        clothing: {
            manager: 'Мария Иванова',
            employees: 3,
            sales: 80000
        },
        groceries: {
            manager: 'Алексей Сидоров',
            employees: 4,
            sales: 120000
        }
    },
    workingHours: {
        monday: '9:00-21:00',
        tuesday: '9:00-21:00',
        wednesday: '9:00-21:00',
        thursday: '9:00-21:00',
        friday: '9:00-22:00',
        saturday: '10:00-22:00',
        sunday: '10:00-20:00'
    }
}

1. Используя Object.entries():
   - Создайте массив строк с информацией о каждом отделе в формате "Отдел: [название], Менеджер: [имя], Продажи: [сумма]"
   - Найдите отдел с наибольшими продажами
   - Создайте объект, где ключи - это дни недели, а значения - количество часов работы (в формате числа)
   - Создайте массив объектов с информацией о каждом отделе, где для каждого сотрудника будет добавлено поле efficiency (эффективность = продажи / количество сотрудников)

2. Создайте функцию getDepartmentInfo, которая принимает название отдела и возвращает объект с информацией о нем в формате:
   {
       name: 'название отдела',
       manager: 'имя менеджера',
       employees: количество сотрудников,
       sales: сумма продаж,
       efficiency: эффективность
   }

3. Создайте функцию getWorkingHoursByDay, которая принимает день недели и возвращает объект с информацией о рабочих часах в формате:
   {
       day: 'день недели',
       hours: 'часы работы',
       isWeekend: true/false
   }
*/

// Ваше решение: 