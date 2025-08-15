/**
 * Метод Object.freeze() замораживает объект, делая его неизменяемым
 * 
 * Синтаксис:
 * Object.freeze(obj)
 * 
 * Параметры:
 * obj - объект, который нужно заморозить
 * 
 * Возвращаемое значение:
 * Замороженный объект
 */

// Пример 1: Заморозка простого объекта
const person = {
    name: 'Иван',
    age: 30
};
Object.freeze(person);

// person.name = 'Петр'; // TypeError: Cannot assign to read only property 'name'
// person.newProp = 'value'; // TypeError: Cannot add property newProp

// Пример 2: Проверка замороженного объекта
const config = {
    apiKey: 'secret123',
    endpoint: 'api.example.com'
};
Object.freeze(config);

console.log(Object.isFrozen(config)); // true
console.log(Object.isExtensible(config)); // false

// Пример 3: Заморозка вложенных объектов (поверхностная заморозка)
const user = {
    name: 'Анна',
    address: {
        city: 'Москва',
        street: 'Ленина'
    }
};
Object.freeze(user);

// user.name = 'Мария'; // TypeError
user.address.city = 'Санкт-Петербург'; // Работает, так как address не заморожен

// Пример 4: Заморозка массива
const numbers = [1, 2, 3];
Object.freeze(numbers);

// numbers.push(4); // TypeError: Cannot add property 3
// numbers[0] = 10; // TypeError: Cannot assign to read only property '0'

// Пример 5: Создание иммутабельного объекта
function createImmutableObject(obj) {
    return Object.freeze({...obj});
}

const settings = createImmutableObject({
    theme: 'dark',
    language: 'ru'
});

// settings.theme = 'light'; // TypeError
console.log(settings); // { theme: 'dark', language: 'ru' } 

/*
Задача на работу с Object.freeze():
У вас есть объект с информацией о книге:
const book = {
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    genres: ['роман', 'исторический'],
    publisher: {
        name: 'Русский вестник',
        location: 'Москва'
    },
    ratings: [4.5, 5, 4.8]
}

1. Заморозьте объект book с помощью Object.freeze()
2. Попробуйте изменить:
   - Значение свойства title
   - Добавить новое свойство pages
   - Изменить значение в массиве genres
   - Изменить значение в объекте publisher
   - Добавить новое значение в массив ratings
3. Проверьте:
   - Является ли объект замороженным (Object.isFrozen())
   - Можно ли расширить объект (Object.isExtensible())
4. Создайте функцию createFrozenBook, которая принимает объект с информацией о книге и возвращает его замороженную копию
5. Создайте функцию createDeepFrozenBook, которая создает полностью замороженную копию объекта (включая вложенные объекты и массивы)
*/

// Ваше решение: 


