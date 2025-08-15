/**
 * Метод Object.create() создает новый объект с указанным прототипом и свойствами
 * 
 * Синтаксис:
 * Object.create(proto, [propertiesObject])
 * 
 * Параметры:
 * proto - объект, который должен быть прототипом создаваемого объекта
 * propertiesObject - необязательный объект, чьи перечисляемые свойства определяют свойства создаваемого объекта
 * 
 * Возвращаемое значение:
 * Новый объект с указанным прототипом и свойствами
 */

// Пример 1: Создание простого объекта
const person = {
    sayHello() {
        console.log(`Привет, меня зовут ${this.name}`);
    }
};

const ivan = Object.create(person);
ivan.name = 'Иван';
ivan.sayHello(); // 'Привет, меня зовут Иван'

// Пример 2: Создание объекта с дополнительными свойствами
const animal = {
    makeSound() {
        console.log(this.sound);
    }
};

const dog = Object.create(animal, {
    name: { value: 'Бобик' },
    sound: { value: 'Гав!' }
});
dog.makeSound(); // 'Гав!'

// Пример 3: Создание объекта с геттерами и сеттерами
const user = Object.create({}, {
    name: {
        get() { return this._name; },
        set(value) { this._name = value.toUpperCase(); }
    }
});

user.name = 'петр';
console.log(user.name); // 'ПЕТР'

// Пример 4: Создание объекта с неизменяемыми свойствами
const config = Object.create({}, {
    apiKey: {
        value: 'secret123',
        writable: false,
        enumerable: true
    }
});

// config.apiKey = 'newKey'; // TypeError: Cannot assign to read only property 'apiKey'

// Пример 5: Создание цепочки прототипов
const base = {
    init() {
        console.log('Инициализация базового объекта');
    }
};

const derived = Object.create(base, {
    name: { value: 'Производный объект' }
});

const final = Object.create(derived);
final.init(); // 'Инициализация базового объекта'

/*
Задача на работу с Object.create():
Создайте систему управления библиотекой с использованием Object.create()

1. Создайте базовый объект Book с методами:
   - getInfo() - возвращает информацию о книге
   - isAvailable() - проверяет доступность книги
   - borrow() - метод для взятия книги
   - return() - метод для возврата книги

2. Создайте объект Library с методами:
   - addBook() - добавляет книгу в библиотеку
   - findBook() - ищет книгу по названию
   - listAvailableBooks() - выводит список доступных книг

3. Создайте объект Reader с методами:
   - borrowBook() - взять книгу
   - returnBook() - вернуть книгу
   - listBorrowedBooks() - показать список взятых книг

4. Реализуйте следующую функциональность:
   - Создайте несколько книг с разными свойствами
   - Добавьте книги в библиотеку
   - Создайте читателя
   - Продемонстрируйте процесс взятия и возврата книг
   - Покажите работу с прототипами и наследованием

Требования:
- Используйте Object.create() для создания всех объектов
- Реализуйте правильную цепочку прототипов
- Добавьте необходимые свойства с помощью дескрипторов
- Обеспечьте правильную работу this в методах
*/

// Ваше решение: 