/**
 * Конструктор (constructor) - это специальный метод класса, который вызывается при создании нового экземпляра.
 * 
 * Синтаксис:
 * constructor(parameters) {
 *     // инициализация свойств
 * }
 * 
 * Особенности:
 * - Вызывается автоматически при создании объекта с new
 * - Может принимать параметры
 * - Используется для инициализации свойств объекта
 * - Может быть только один конструктор в классе
 */

// Пример 1: Базовый конструктор
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }

// const person = new Person('Иван', 25);
// console.log(person.name); // 'Иван'
// console.log(person.age); // 25

// Пример 2: Конструктор с значениями по умолчанию
// class Car {
//     constructor(brand, model, year = 2024) {
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//         this.isRunning = false;
//     }
// }

// const car1 = new Car('BMW', 'X5');
// const car2 = new Car('Audi', 'A4', 2023);
// console.log(car1.year); // 2024
// console.log(car2.year); // 2023

// Пример 3: Конструктор с вычислениями
// class Rectangle {
//     constructor(width, height) {
//         this.width = width;
//         this.height = height;
//         this.area = width * height;
//         this.perimeter = 2 * (width + height);
//     }
// }

// const rect = new Rectangle(5, 10);
// console.log(rect.area); // 50
// console.log(rect.perimeter); // 30

// Пример 4: Конструктор с проверками
// class BankAccount {
//     constructor(initialBalance = 0) {
//         if (initialBalance < 0) {
//             throw new Error('Начальный баланс не может быть отрицательным');
//         }
//         this.balance = initialBalance;
//         this.accountNumber = this.generateAccountNumber();
//     }
    
//     generateAccountNumber() {
//         return Math.floor(Math.random() * 1000000);
//     }
// }

// const account = new BankAccount(1000);
// console.log(account.balance); // 1000
// console.log(account.accountNumber); // случайное число

// Пример 5: Конструктор с объектом параметров
// class User {
//     constructor({ name, email, age = 18, isActive = true }) {
//         this.name = name;
//         this.email = email;
//         this.age = age;
//         this.isActive = isActive;
//         this.createdAt = new Date();
//     }
// }

// const user = new User({
//     name: 'Мария',
//     email: 'maria@example.com',
//     age: 25
// });
// console.log(user.name); // 'Мария'
// console.log(user.isActive); // true

/*
Задача:
Создайте класс Product со следующими требованиями:
1. Конструктор должен принимать name, price, category
2. Добавьте свойство id, которое генерируется автоматически
3. Добавьте свойство inStock со значением true по умолчанию
4. Добавьте свойство createdAt с текущей датой
5. Добавьте проверку, что price не может быть отрицательным
6. Создайте несколько экземпляров класса и выведите их в консоль
*/

// Ваше решение:

// class Product {
//     constructor(name, price, category) {
//         if (price < 0) {
//             throw new Error('Цена не может быть отрицательной');
//         }
        
//         this.name = name;
//         this.price = price;
//         this.category = category;
//         this.id = this.generateId();
//         this.inStock = true;
//         this.createdAt = new Date();
//     }
    
//     generateId() {
//         return Math.random().toString(36).substr(2, 9);
//     }
// }

// const product1 = new Product('Телефон', 50000, 'Электроника');
// const product2 = new Product('Книга', 1500, 'Литература');
// const product3 = new Product('Кофе', 300, 'Продукты');

// console.log(product1);
// console.log(product2);
// console.log(product3); 