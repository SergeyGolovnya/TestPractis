// Задача 1: Создание базового класса
/*
Создайте класс Person с свойствами name, age и методом introduce().
Создайте экземпляр класса и вызовите метод introduce().
*/

// Решение:
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
    
//     introduce() {
//         return `Привет! Меня зовут ${this.name} и мне ${this.age} лет.`;
//     }
// }

// const person = new Person('Иван', 25);
// console.log(person.introduce());

// Задача 2: Наследование классов
/*
Создайте класс Student, который наследует от Person.
Добавьте свойство grade и метод study().
*/

// Решение:
// class Student extends Person {
//     constructor(name, age, grade) {
//         super(name, age);
//         this.grade = grade;
//     }
    
//     study() {
//         return `${this.name} учится в ${this.grade} классе.`;
//     }
// }

// const student = new Student('Мария', 16, 10);
// console.log(student.introduce());
// console.log(student.study());

// Задача 3: Инкапсуляция с приватными свойствами
/*
Создайте класс BankAccount с приватным свойством balance.
Добавьте методы deposit() и withdraw().
*/

// Решение:
// class BankAccount {
//     #balance = 0;
    
//     constructor(initialBalance = 0) {
//         this.#balance = initialBalance;
//     }
    
//     deposit(amount) {
//         if (amount > 0) {
//             this.#balance += amount;
//             return `Внесено ${amount}. Баланс: ${this.#balance}`;
//         }
//         return 'Сумма должна быть положительной';
//     }
    
//     withdraw(amount) {
//         if (amount > 0 && amount <= this.#balance) {
//             this.#balance -= amount;
//             return `Снято ${amount}. Баланс: ${this.#balance}`;
//         }
//         return 'Недостаточно средств или неверная сумма';
//     }
    
//     getBalance() {
//         return this.#balance;
//     }
// }

// const account = new BankAccount(1000);
// console.log(account.deposit(500));
// console.log(account.withdraw(200));

// Задача 4: Статические методы
/*
Создайте класс MathUtils со статическими методами для математических операций.
*/

// Решение:
// class MathUtils {
//     static add(a, b) {
//         return a + b;
//     }
    
//     static multiply(a, b) {
//         return a * b;
//     }
    
//     static factorial(n) {
//         if (n <= 1) return 1;
//         return n * MathUtils.factorial(n - 1);
//     }
    
//     static isPrime(num) {
//         if (num <= 1) return false;
//         for (let i = 2; i <= Math.sqrt(num); i++) {
//             if (num % i === 0) return false;
//         }
//         return true;
//     }
// }

// console.log(MathUtils.add(5, 3));
// console.log(MathUtils.factorial(5));
// console.log(MathUtils.isPrime(17));

// Задача 5: Геттеры и сеттеры
/*
Создайте класс Rectangle с геттерами и сеттерами для width и height.
Добавьте геттер для площади.
*/

// Решение:
// class Rectangle {
//     constructor(width, height) {
//         this._width = width;
//         this._height = height;
//     }
    
//     get width() {
//         return this._width;
//     }
    
//     set width(value) {
//         if (value > 0) {
//             this._width = value;
//         } else {
//             throw new Error('Ширина должна быть положительной');
//         }
//     }
    
//     get height() {
//         return this._height;
//     }
    
//     set height(value) {
//         if (value > 0) {
//             this._height = value;
//         } else {
//             throw new Error('Высота должна быть положительной');
//         }
//     }
    
//     get area() {
//         return this._width * this._height;
//     }
// }

// const rect = new Rectangle(5, 10);
// console.log(rect.area);
// rect.width = 8;
// console.log(rect.area);

// Задача 6: Полиморфизм
/*
Создайте базовый класс Shape и классы Circle, Square, которые наследуют от него.
Реализуйте метод area() в каждом классе.
*/

// Решение:
// class Shape {
//     area() {
//         throw new Error('Метод area() должен быть переопределен');
//     }
// }

// class Circle extends Shape {
//     constructor(radius) {
//         super();
//         this.radius = radius;
//     }
    
//     area() {
//         return Math.PI * this.radius ** 2;
//     }
// }

// class Square extends Shape {
//     constructor(side) {
//         super();
//         this.side = side;
//     }
    
//     area() {
//         return this.side ** 2;
//     }
// }

// const shapes = [new Circle(5), new Square(4)];
// shapes.forEach(shape => console.log(`Площадь: ${shape.area()}`));

// Задача 7: Абстрактный класс (имитация)
/*
Создайте класс Animal с абстрактным методом makeSound().
Создайте классы Dog и Cat, которые реализуют этот метод.
*/

// Решение:
// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
    
//     makeSound() {
//         throw new Error('Метод makeSound() должен быть реализован');
//     }
// }

// class Dog extends Animal {
//     makeSound() {
//         return `${this.name} говорит: Гав!`;
//     }
// }

// class Cat extends Animal {
//     makeSound() {
//         return `${this.name} говорит: Мяу!`;
//     }
// }

// const dog = new Dog('Рекс');
// const cat = new Cat('Мурка');
// console.log(dog.makeSound());
// console.log(cat.makeSound());

// Задача 8: Миксины
/*
Создайте миксин для добавления функциональности логирования к любому классу.
*/

// Решение:
// const LoggerMixin = (superclass) => class extends superclass {
//     log(message) {
//         console.log(`[${this.constructor.name}] ${message}`);
//     }
    
//     error(message) {
//         console.error(`[${this.constructor.name}] ERROR: ${message}`);
//     }
// };

// class User extends LoggerMixin(Object) {
//     constructor(name) {
//         super();
//         this.name = name;
//     }
    
//     greet() {
//         this.log(`Пользователь ${this.name} приветствует вас`);
//         return `Привет, ${this.name}!`;
//     }
// }

// const user = new User('Анна');
// user.greet();
// user.error('Что-то пошло не так');

// Задача 9: Синглтон
/*
Создайте класс DatabaseConnection, который реализует паттерн Singleton.
*/

// Решение:
// class DatabaseConnection {
//     static #instance = null;
//     #isConnected = false;
    
//     constructor() {
//         if (DatabaseConnection.#instance) {
//             return DatabaseConnection.#instance;
//         }
//         DatabaseConnection.#instance = this;
//     }
    
//     connect() {
//         if (!this.#isConnected) {
//             this.#isConnected = true;
//             console.log('Подключение к базе данных установлено');
//         } else {
//             console.log('Уже подключено к базе данных');
//         }
//     }
    
//     disconnect() {
//         if (this.#isConnected) {
//             this.#isConnected = false;
//             console.log('Отключено от базы данных');
//         }
//     }
    
//     static getInstance() {
//         if (!DatabaseConnection.#instance) {
//             DatabaseConnection.#instance = new DatabaseConnection();
//         }
//         return DatabaseConnection.#instance;
//     }
// }

// const db1 = DatabaseConnection.getInstance();
// const db2 = DatabaseConnection.getInstance();
// console.log(db1 === db2); // true
// db1.connect();
// db2.connect(); // Уже подключено

// Задача 10: Фабричный метод
/*
Создайте класс VehicleFactory с фабричным методом для создания разных типов транспорта.
*/

// Решение:
// class Vehicle {
//     constructor(type, model) {
//         this.type = type;
//         this.model = model;
//     }
    
//     start() {
//         return `${this.type} ${this.model} запущен`;
//     }
// }

// class VehicleFactory {
//     static createVehicle(type, model) {
//         switch (type.toLowerCase()) {
//             case 'car':
//                 return new Vehicle('Автомобиль', model);
//             case 'motorcycle':
//                 return new Vehicle('Мотоцикл', model);
//             case 'bicycle':
//                 return new Vehicle('Велосипед', model);
//             default:
//                 throw new Error(`Неизвестный тип транспорта: ${type}`);
//         }
//     }
// }

// const car = VehicleFactory.createVehicle('car', 'BMW X5');
// const motorcycle = VehicleFactory.createVehicle('motorcycle', 'Harley Davidson');
// console.log(car.start());
// console.log(motorcycle.start()); 