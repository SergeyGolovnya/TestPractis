/**
 * Полиморфизм - способность объектов с одинаковым интерфейсом иметь различную реализацию.
 * 
 * Переопределение методов (Method Overriding) - замена реализации метода в дочернем классе.
 * 
 * Особенности:
 * - Метод в дочернем классе имеет то же имя и сигнатуру
 * - Может использовать super() для вызова метода родителя
 * - Позволяет изменять поведение без изменения интерфейса
 */

// Пример 1: Базовое переопределение методов
// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
    
//     makeSound() {
//         return `${this.name} издает звук`;
//     }
    
//     move() {
//         return `${this.name} двигается`;
//     }
    
//     getInfo() {
//         return `Животное: ${this.name}`;
//     }
// }

// class Dog extends Animal {
//     constructor(name, breed) {
//         super(name);
//         this.breed = breed;
//     }
    
//     makeSound() {
//         return `${this.name} лает: Гав!`;
//     }
    
//     move() {
//         return `${this.name} бегает на четырех лапах`;
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, порода: ${this.breed}`;
//     }
// }

// class Cat extends Animal {
//     constructor(name, color) {
//         super(name);
//         this.color = color;
//     }
    
//     makeSound() {
//         return `${this.name} мяукает: Мяу!`;
//     }
    
//     move() {
//         return `${this.name} грациозно ходит`;
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, цвет: ${this.color}`;
//     }
// }

// const dog = new Dog('Рекс', 'Овчарка');
// const cat = new Cat('Мурка', 'Рыжий');
// console.log(dog.makeSound()); // Рекс лает: Гав!
// console.log(cat.makeSound()); // Мурка мяукает: Мяу!
// console.log(dog.getInfo()); // Животное: Рекс, порода: Овчарка

// Пример 2: Переопределение с дополнительной логикой
// class Shape {
//     constructor(color) {
//         this.color = color;
//     }
    
//     getArea() {
//         return 0;
//     }
    
//     getPerimeter() {
//         return 0;
//     }
    
//     getInfo() {
//         return `Фигура цвета ${this.color}`;
//     }
    
//     describe() {
//         return `${this.getInfo()}, площадь: ${this.getArea()}, периметр: ${this.getPerimeter()}`;
//     }
// }

// class Circle extends Shape {
//     constructor(color, radius) {
//         super(color);
//         this.radius = radius;
//     }
    
//     getArea() {
//         return Math.PI * this.radius ** 2;
//     }
    
//     getPerimeter() {
//         return 2 * Math.PI * this.radius;
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, круг с радиусом ${this.radius}`;
//     }
// }

// class Rectangle extends Shape {
//     constructor(color, width, height) {
//         super(color);
//         this.width = width;
//         this.height = height;
//     }
    
//     getArea() {
//         return this.width * this.height;
//     }
    
//     getPerimeter() {
//         return 2 * (this.width + this.height);
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, прямоугольник ${this.width}x${this.height}`;
//     }
// }

// const circle = new Circle('красный', 5);
// const rectangle = new Rectangle('синий', 4, 6);
// console.log(circle.describe());
// console.log(rectangle.describe());

// Пример 3: Переопределение с условной логикой
// class BankAccount {
//     constructor(initialBalance = 0) {
//         this.balance = initialBalance;
//     }
    
//     deposit(amount) {
//         if (amount > 0) {
//             this.balance += amount;
//             return `Внесено ${amount}. Баланс: ${this.balance}`;
//         }
//         return 'Сумма должна быть положительной';
//     }
    
//     withdraw(amount) {
//         if (amount > 0 && amount <= this.balance) {
//             this.balance -= amount;
//             return `Снято ${amount}. Баланс: ${this.balance}`;
//         }
//         return 'Недостаточно средств или неверная сумма';
//     }
    
//     getAccountType() {
//         return 'Обычный';
//     }
    
//     getInfo() {
//         return `${this.getAccountType()} счет. Баланс: ${this.balance}`;
//     }
// }

// class SavingsAccount extends BankAccount {
//     constructor(initialBalance = 0, interestRate = 0.05) {
//         super(initialBalance);
//         this.interestRate = interestRate;
//     }
    
//     withdraw(amount) {
//         const minBalance = 1000;
//         if (this.balance - amount < minBalance) {
//             return `Нельзя снять ${amount}. Минимальный баланс: ${minBalance}`;
//         }
//         return super.withdraw(amount);
//     }
    
//     addInterest() {
//         const interest = this.balance * this.interestRate;
//         this.balance += interest;
//         return `Начислены проценты: ${interest.toFixed(2)}`;
//     }
    
//     getAccountType() {
//         return 'Сберегательный';
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, процентная ставка: ${this.interestRate * 100}%`;
//     }
// }

// class CheckingAccount extends BankAccount {
//     constructor(initialBalance = 0, monthlyFee = 10) {
//         super(initialBalance);
//         this.monthlyFee = monthlyFee;
//     }
    
//     withdraw(amount) {
//         const fee = 2; // комиссия за снятие
//         const totalWithdrawal = amount + fee;
//         
//         if (totalWithdrawal <= this.balance) {
//             this.balance -= totalWithdrawal;
//             return `Снято ${amount} + комиссия ${fee}. Баланс: ${this.balance}`;
//         }
//         return 'Недостаточно средств для снятия с учетом комиссии';
//     }
    
//     chargeMonthlyFee() {
//         this.balance -= this.monthlyFee;
//         return `Списана месячная комиссия: ${this.monthlyFee}`;
//     }
    
//     getAccountType() {
//         return 'Расчетный';
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, месячная комиссия: ${this.monthlyFee}`;
//     }
// }

// const savings = new SavingsAccount(5000, 0.06);
// const checking = new CheckingAccount(3000, 15);
// console.log(savings.withdraw(1000));
// console.log(checking.withdraw(100));
// console.log(savings.getInfo());
// console.log(checking.getInfo());

// Пример 4: Переопределение с разными типами возвращаемых значений
// class Employee {
//     constructor(name, salary) {
//         this.name = name;
//         this.salary = salary;
//     }
    
//     calculateBonus() {
//         return this.salary * 0.1; // 10% от зарплаты
//     }
    
//     getPerformance() {
//         return 'Средняя';
//     }
    
//     getReport() {
//         return {
//             name: this.name,
//             salary: this.salary,
//             bonus: this.calculateBonus(),
//             performance: this.getPerformance()
//         };
//     }
// }

// class Manager extends Employee {
//     constructor(name, salary, teamSize) {
//         super(name, salary);
//         this.teamSize = teamSize;
//     }
    
//     calculateBonus() {
//         const baseBonus = super.calculateBonus();
//         const teamBonus = this.teamSize * 100; // бонус за каждого подчиненного
//         return baseBonus + teamBonus;
//     }
    
//     getPerformance() {
//         return this.teamSize > 5 ? 'Отличная' : 'Хорошая';
//     }
    
//     getReport() {
//         const baseReport = super.getReport();
//         return {
//             ...baseReport,
//             teamSize: this.teamSize,
//             role: 'Менеджер'
//         };
//     }
// }

// class Developer extends Employee {
//     constructor(name, salary, skills) {
//         super(name, salary);
//         this.skills = skills;
//     }
    
//     calculateBonus() {
//         const baseBonus = super.calculateBonus();
//         const skillBonus = this.skills.length * 50; // бонус за каждый навык
//         return baseBonus + skillBonus;
//     }
    
//     getPerformance() {
//         return this.skills.length > 3 ? 'Отличная' : 'Хорошая';
//     }
    
//     getReport() {
//         const baseReport = super.getReport();
//         return {
//             ...baseReport,
//             skills: this.skills,
//             role: 'Разработчик'
//         };
//     }
// }

// const manager = new Manager('Анна', 100000, 8);
// const developer = new Developer('Иван', 80000, ['JavaScript', 'React', 'Node.js']);
// console.log(manager.getReport());
// console.log(developer.getReport());

// Пример 5: Переопределение с обработкой ошибок
// class Database {
//     constructor() {
//         this.isConnected = false;
//     }
    
//     connect() {
//         this.isConnected = true;
//         return 'Подключение к базе данных установлено';
//     }
    
//     disconnect() {
//         this.isConnected = false;
//         return 'Отключено от базы данных';
//     }
    
//     query(sql) {
//         if (!this.isConnected) {
//             throw new Error('Нет подключения к базе данных');
//         }
//         return `Выполнен запрос: ${sql}`;
//     }
    
//     getStatus() {
//         return {
//             connected: this.isConnected,
//             type: 'Базовая база данных'
//         };
//     }
// }

// class MySQLDatabase extends Database {
//     constructor(host, port) {
//         super();
//         this.host = host;
//         this.port = port;
//     }
    
//     connect() {
//         super.connect();
//         return `Подключение к MySQL на ${this.host}:${this.port} установлено`;
//     }
    
//     query(sql) {
//         if (!sql.toLowerCase().includes('select') && 
//             !sql.toLowerCase().includes('insert') && 
//             !sql.toLowerCase().includes('update') && 
//             !sql.toLowerCase().includes('delete')) {
//             throw new Error('Неподдерживаемый SQL запрос');
//         }
//         return super.query(sql);
//     }
    
//     getStatus() {
//         const baseStatus = super.getStatus();
//         return {
//             ...baseStatus,
//             type: 'MySQL',
//             host: this.host,
//             port: this.port
//         };
//     }
// }

// class MongoDBDatabase extends Database {
//     constructor(connectionString) {
//         super();
//         this.connectionString = connectionString;
//     }
    
//     connect() {
//         super.connect();
//         return `Подключение к MongoDB по строке: ${this.connectionString}`;
//     }
    
//     query(query) {
//         if (typeof query !== 'object') {
//             throw new Error('MongoDB запрос должен быть объектом');
//         }
//         return super.query(JSON.stringify(query));
//     }
    
//     getStatus() {
//         const baseStatus = super.getStatus();
//         return {
//             ...baseStatus,
//             type: 'MongoDB',
//             connectionString: this.connectionString
//         };
//     }
// }

// const mysql = new MySQLDatabase('localhost', 3306);
// const mongo = new MongoDBDatabase('mongodb://localhost:27017');
// console.log(mysql.connect());
// console.log(mysql.query('SELECT * FROM users'));
// console.log(mongo.connect());
// console.log(mongo.query({ find: 'users', filter: { age: { $gt: 18 } } }));

/*
Задача:
Создайте иерархию классов для системы доставки:

1. Базовый класс Delivery с методами:
   - calculateCost() - рассчитывает стоимость доставки
   - getDeliveryTime() - возвращает время доставки
   - getInfo() - возвращает информацию о доставке

2. Класс StandardDelivery, наследующий от Delivery:
   - Стоимость: 500 рублей
   - Время: 3-5 дней
   - Переопределяет все методы

3. Класс ExpressDelivery, наследующий от Delivery:
   - Стоимость: 1500 рублей
   - Время: 1-2 дня
   - Переопределяет все методы

4. Класс SameDayDelivery, наследующий от Delivery:
   - Стоимость: 3000 рублей
   - Время: в тот же день
   - Переопределяет все методы
   - Дополнительный метод isAvailable() - проверяет доступность

Создайте экземпляры всех классов и продемонстрируйте полиморфизм.
*/

// Ваше решение:

// class Delivery {
//     constructor(destination) {
//         this.destination = destination;
//     }
    
//     calculateCost() {
//         return 0;
//     }
    
//     getDeliveryTime() {
//         return 'Не определено';
//     }
    
//     getInfo() {
//         return `Доставка в ${this.destination}`;
//     }
// }

// class StandardDelivery extends Delivery {
//     constructor(destination) {
//         super(destination);
//     }
    
//     calculateCost() {
//         return 500;
//     }
    
//     getDeliveryTime() {
//         return '3-5 дней';
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, стандартная доставка за ${this.calculateCost()} рублей`;
//     }
// }

// class ExpressDelivery extends Delivery {
//     constructor(destination) {
//         super(destination);
//     }
    
//     calculateCost() {
//         return 1500;
//     }
    
//     getDeliveryTime() {
//         return '1-2 дня';
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, экспресс доставка за ${this.calculateCost()} рублей`;
//     }
// }

// class SameDayDelivery extends Delivery {
//     constructor(destination) {
//         super(destination);
//     }
    
//     calculateCost() {
//         return 3000;
//     }
    
//     getDeliveryTime() {
//         return 'В тот же день';
//     }
    
//     isAvailable() {
//         const hour = new Date().getHours();
//         return hour < 18; // доступно до 18:00
//     }
    
//     getInfo() {
//         const availability = this.isAvailable() ? 'доступна' : 'недоступна';
//         return `${super.getInfo()}, доставка в тот же день за ${this.calculateCost()} рублей (${availability})`;
//     }
// }

// // Демонстрация полиморфизма
// const deliveries = [
//     new StandardDelivery('Москва'),
//     new ExpressDelivery('Санкт-Петербург'),
//     new SameDayDelivery('Казань')
// ];

// deliveries.forEach(delivery => {
//     console.log(delivery.getInfo());
//     console.log(`Время доставки: ${delivery.getDeliveryTime()}`);
//     console.log(`Стоимость: ${delivery.calculateCost()} рублей`);
//     if (delivery instanceof SameDayDelivery) {
//         console.log(`Доступность: ${delivery.isAvailable() ? 'Да' : 'Нет'}`);
//     }
//     console.log('---');
// }); 