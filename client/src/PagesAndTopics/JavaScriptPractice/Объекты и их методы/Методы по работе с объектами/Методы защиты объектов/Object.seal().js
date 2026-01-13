/**
 * Метод Object.seal() запечатывает объект, предотвращая добавление новых свойств и делая все существующие свойства неконфигурируемыми
 * 
 * Синтаксис:
 * Object.seal(obj)
 * 
 * Параметры:
 * obj - объект, который нужно запечатать
 * 
 * Возвращаемое значение:
 * Запечатанный объект
 */

/* // Пример 1: Запечатывание простого объекта
const person = {
    name: 'Иван',
    age: 30
};
Object.seal(person);

// person.newProp = 'value'; // TypeError: Cannot add property newProp
person.name = 'Петр'; // Работает, так как можно изменять значения
console.log(person); // { name: 'Петр', age: 30 }

// Пример 2: Проверка запечатанного объекта
const config = {
    apiKey: 'secret123',
    endpoint: 'api.example.com'
};
Object.seal(config);

console.log(Object.isSealed(config)); // true
console.log(Object.isExtensible(config)); // false

// Пример 3: Запечатывание вложенных объектов (поверхностное запечатывание)
const user = {
    name: 'Анна',
    address: {
        city: 'Москва',
        street: 'Ленина'
    }
};
Object.seal(user);

// user.newProp = 'value'; // TypeError
user.address.city = 'Санкт-Петербург'; // Работает, так как address не запечатан
user.address.newProp = 'value'; // Работает, так как address не запечатан

// Пример 4: Запечатывание массива
const numbers = [1, 2, 3];
Object.seal(numbers);

// numbers.push(4); // TypeError: Cannot add property 3
numbers[0] = 10; // Работает, так как можно изменять значения
console.log(numbers); // [10, 2, 3]

// Пример 5: Сравнение с Object.freeze()
const frozen = Object.freeze({ x: 1 });
const sealed = Object.seal({ x: 1 });

// frozen.x = 2; // TypeError: Cannot assign to read only property 'x'
sealed.x = 2; // Работает
console.log(sealed.x); // 2 */

/*
Задача на работу с Object.seal():
У вас есть объект с информацией о проекте:
const project = {
    name: 'Веб-приложение',
    budget: 100000,
    team: {
        lead: 'Иван',
        developers: ['Анна', 'Петр', 'Мария']
    },
    status: 'В разработке',
    deadlines: ['2024-03-01', '2024-04-15', '2024-05-30']
}

1. Запечатайте объект project с помощью Object.seal()
2. Попробуйте:
   - Изменить значение свойства name
   - Добавить новое свойство client
   - Удалить свойство status
   - Изменить значение в объекте team
   - Добавить нового разработчика в массив developers
   - Изменить дату в массиве deadlines
3. Проверьте:
   - Является ли объект запечатанным (Object.isSealed())
   - Можно ли расширить объект (Object.isExtensible())
4. Создайте функцию createSealedProject, которая принимает объект с информацией о проекте и возвращает его запечатанную копию
5. Создайте функцию createDeepSealedProject, которая создает полностью запечатанную копию объекта (включая вложенные объекты и массивы)
*/

// Ваше решение: 

const project = {
    name: 'Веб-приложение',
    budget: 100000,
    team: {
        lead: 'Иван',
        developers: ['Анна', 'Петр', 'Мария']
    },
    status: 'В разработке',
    deadlines: ['2024-03-01', '2024-04-15', '2024-05-30']
}


Object.seal(project)

project.name = 'Другое приложение'; // + изменилось
// project.client = 'Сергей'; // Cannot add property client, object is not extensible
// delete project.status; // TypeError: Cannot delete property 'status' of #<Object>
project.team.lead = 'Вася'; // + изменилось
project.team.developers.push('Спанч Боб'); // + изменилось
project.deadlines[0] = '2024-02-03'; // + изменилось

console.log(Object.isSealed(project)); // true
console.log(Object.isExtensible(project)) // false


// Дргуой подход

const project2 = {
    name: 'Приложение 2'
}

// Создаем универсальную функцию чтобы использовать потом obj.createSealedProject()
Object.prototype.createSealedProject = function() {
    return Object.seal(this)
}

project2.createSealedProject()

console.log(Object.isSealed(project2))