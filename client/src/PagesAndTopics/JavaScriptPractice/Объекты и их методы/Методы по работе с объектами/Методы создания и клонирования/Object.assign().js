/**
 * Метод Object.assign() копирует значения всех перечисляемых свойств из одного или более исходных объектов в целевой объект
 * 
 * Синтаксис:
 * Object.assign(target, ...sources)
 * 
 * Параметры:
 * target - целевой объект
 * sources - один или более исходных объектов
 * 
 * Возвращаемое значение:
 * Целевой объект с скопированными свойствами
 */

// Пример 1: Простое копирование свойств
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 4, c: 5 }

// Пример 2: Клонирование объекта
const original = { name: 'Иван', age: 30 };
const clone = Object.assign({}, original);
console.log(clone); // { name: 'Иван', age: 30 }

// Пример 3: Объединение нескольких объектов
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
const merged = Object.assign({}, obj1, obj2, obj3);
console.log(merged); // { a: 1, b: 2, c: 3 }

// Пример 4: Создание объекта с дефолтными значениями
const defaults = { theme: 'dark', language: 'ru' };
const userSettings = { theme: 'light' };
const settings = Object.assign({}, defaults, userSettings);
console.log(settings); // { theme: 'light', language: 'ru' }

// Пример 5: Копирование с вложенными объектами (поверхностное копирование)
const user = {
    name: 'Петр',
    address: {
        city: 'Москва',
        street: 'Ленина'
    }
};
const userCopy = Object.assign({}, user);
userCopy.address.city = 'Санкт-Петербург';
console.log(user.address.city); // 'Санкт-Петербург' (изменения отразились на оригинале)

/*
Задача на работу с Object.assign():
У вас есть следующие объекты:

const defaultSettings = {
    theme: 'dark',
    language: 'ru',
    notifications: {
        email: true,
        push: true,
        sound: true
    },
    display: {
        fontSize: 14,
        colorScheme: 'auto'
    }
};

const userSettings = {
    theme: 'light',
    notifications: {
        email: false
    }
};

const additionalSettings = {
    display: {
        fontSize: 16
    },
    newFeature: true
};

1. Создайте копию defaultSettings с применением userSettings
2. Создайте новый объект, объединив все три объекта (defaultSettings, userSettings, additionalSettings)
3. Создайте функцию updateUserSettings, которая принимает объект с новыми настройками и возвращает обновленный объект настроек, сохраняя структуру defaultSettings
4. Проверьте, что происходит с вложенными объектами при использовании Object.assign()
5. Создайте функцию createDeepCopy, которая создает полную копию объекта с вложенными объектами (используя Object.assign() как часть решения)
*/

// Ваше решение: 