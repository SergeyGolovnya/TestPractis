/**
 * Геттеры и сеттеры - специальные методы для доступа к свойствам объекта.
 * 
 * Синтаксис:
 * get propertyName() { return value; }
 * set propertyName(value) { /* логика установки *\/ }
 * 
 * Особенности:
 * - Вызываются как обычные свойства (без скобок)
 * - Позволяют контролировать доступ к данным
 * - Могут содержать валидацию и дополнительную логику
 * - Могут вычислять значения на лету
 * - Могут быть только для чтения (только геттер)
 */

// Пример 1: Базовые геттеры и сеттеры
// class Person {
//     constructor(firstName, lastName, age) {
//         this._firstName = firstName;
//         this._lastName = lastName;
//         this._age = age;
//     }
    
//     get firstName() {
//         return this._firstName;
//     }
    
//     set firstName(value) {
//         if (typeof value === 'string' && value.trim().length > 0) {
//             this._firstName = value.trim();
//         } else {
//             throw new Error('Имя должно быть непустой строкой');
//         }
//     }
    
//     get lastName() {
//         return this._lastName;
//     }
    
//     set lastName(value) {
//         if (typeof value === 'string' && value.trim().length > 0) {
//             this._lastName = value.trim();
//         } else {
//             throw new Error('Фамилия должна быть непустой строкой');
//         }
//     }
    
//     get age() {
//         return this._age;
//     }
    
//     set age(value) {
//         if (typeof value === 'number' && value >= 0 && value <= 150) {
//             this._age = value;
//         } else {
//             throw new Error('Возраст должен быть числом от 0 до 150');
//         }
//     }
    
//     get fullName() {
//         return `${this._firstName} ${this._lastName}`;
//     }
    
//     get isAdult() {
//         return this._age >= 18;
//     }
// }

// const person = new Person('Иван', 'Петров', 25);
// console.log(person.fullName); // Иван Петров
// console.log(person.isAdult); // true
// person.firstName = 'Петр';
// console.log(person.fullName); // Петр Петров

// Пример 2: Геттеры и сеттеры с вычислениями
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
    
//     get perimeter() {
//         return 2 * (this._width + this._height);
//     }
    
//     get isSquare() {
//         return this._width === this._height;
//     }
    
//     get diagonal() {
//         return Math.sqrt(this._width ** 2 + this._height ** 2);
//     }
// }

// const rect = new Rectangle(5, 10);
// console.log(rect.area); // 50
// console.log(rect.perimeter); // 30
// console.log(rect.isSquare); // false
// console.log(rect.diagonal); // 11.18...
// rect.width = 8;
// console.log(rect.area); // 80

// Пример 3: Геттеры и сеттеры с валидацией
// class BankAccount {
//     constructor(initialBalance = 0) {
//         this._balance = initialBalance;
//         this._transactions = [];
//     }
    
//     get balance() {
//         return this._balance;
//     }
    
//     set balance(value) {
//         throw new Error('Баланс нельзя изменять напрямую. Используйте deposit() или withdraw()');
//     }
    
//     get transactions() {
//         return [...this._transactions]; // возвращаем копию массива
//     }
    
//     set transactions(value) {
//         throw new Error('Транзакции нельзя изменять напрямую');
//     }
    
//     get lastTransaction() {
//         return this._transactions.length > 0 ? this._transactions[this._transactions.length - 1] : null;
//     }
    
//     get totalDeposits() {
//         return this._transactions
//             .filter(t => t.type === 'deposit')
//             .reduce((sum, t) => sum + t.amount, 0);
//     }
    
//     get totalWithdrawals() {
//         return this._transactions
//             .filter(t => t.type === 'withdraw')
//             .reduce((sum, t) => sum + t.amount, 0);
//     }
    
//     deposit(amount) {
//         if (amount > 0) {
//             this._balance += amount;
//             this._transactions.push({
//                 type: 'deposit',
//                 amount,
//                 date: new Date()
//             });
//             return `Внесено ${amount}. Баланс: ${this._balance}`;
//         }
//         throw new Error('Сумма депозита должна быть положительной');
//     }
    
//     withdraw(amount) {
//         if (amount > 0 && amount <= this._balance) {
//             this._balance -= amount;
//             this._transactions.push({
//                 type: 'withdraw',
//                 amount,
//                 date: new Date()
//             });
//             return `Снято ${amount}. Баланс: ${this._balance}`;
//         }
//         throw new Error('Недостаточно средств или неверная сумма');
//     }
// }

// const account = new BankAccount(1000);
// account.deposit(500);
// account.withdraw(200);
// console.log(account.balance); // 1300
// console.log(account.totalDeposits); // 1500
// console.log(account.totalWithdrawals); // 200
// console.log(account.lastTransaction);

// Пример 4: Геттеры и сеттеры с преобразованием данных
// class Temperature {
//     constructor(celsius) {
//         this._celsius = celsius;
//     }
    
//     get celsius() {
//         return this._celsius;
//     }
    
//     set celsius(value) {
//         this._celsius = value;
//     }
    
//     get fahrenheit() {
//         return (this._celsius * 9/5) + 32;
//     }
    
//     set fahrenheit(value) {
//         this._celsius = (value - 32) * 5/9;
//     }
    
//     get kelvin() {
//         return this._celsius + 273.15;
//     }
    
//     set kelvin(value) {
//         this._celsius = value - 273.15;
//     }
    
//     get description() {
//         if (this._celsius < 0) return 'Холодно';
//         if (this._celsius < 20) return 'Прохладно';
//         if (this._celsius < 30) return 'Тепло';
//         return 'Жарко';
//     }
    
//     get isFreezing() {
//         return this._celsius <= 0;
//     }
    
//     get isBoiling() {
//         return this._celsius >= 100;
//     }
// }

// const temp = new Temperature(25);
// console.log(temp.fahrenheit); // 77
// console.log(temp.kelvin); // 298.15
// console.log(temp.description); // Тепло
// temp.fahrenheit = 32;
// console.log(temp.celsius); // 0
// console.log(temp.isFreezing); // true

// Пример 5: Геттеры и сеттеры с кэшированием
// class Product {
//     constructor(name, price, category) {
//         this._name = name;
//         this._price = price;
//         this._category = category;
//         this._discount = 0;
//         this._cachedPrice = null; // кэш для цены со скидкой
//     }
    
//     get name() {
//         return this._name;
//     }
    
//     set name(value) {
//         if (typeof value === 'string' && value.trim().length > 0) {
//             this._name = value.trim();
//         } else {
//             throw new Error('Название должно быть непустой строкой');
//         }
//     }
    
//     get price() {
//         return this._price;
//     }
    
//     set price(value) {
//         if (typeof value === 'number' && value >= 0) {
//             this._price = value;
//             this._cachedPrice = null; // сбрасываем кэш
//         } else {
//             throw new Error('Цена должна быть неотрицательным числом');
//         }
//     }
    
//     get discount() {
//         return this._discount;
//     }
    
//     set discount(value) {
//         if (typeof value === 'number' && value >= 0 && value <= 100) {
//             this._discount = value;
//             this._cachedPrice = null; // сбрасываем кэш
//         } else {
//             throw new Error('Скидка должна быть от 0 до 100%');
//         }
//     }
    
//     get finalPrice() {
//         if (this._cachedPrice === null) {
//             this._cachedPrice = this._price * (1 - this._discount / 100);
//         }
//         return this._cachedPrice;
//     }
    
//     get savings() {
//         return this._price - this.finalPrice;
//     }
    
//     get category() {
//         return this._category;
//     }
    
//     set category(value) {
//         const validCategories = ['electronics', 'clothing', 'books', 'food'];
//         if (validCategories.includes(value.toLowerCase())) {
//             this._category = value.toLowerCase();
//         } else {
//             throw new Error('Недопустимая категория');
//         }
//     }
    
//     get info() {
//         return {
//             name: this._name,
//             originalPrice: this._price,
//             discount: this._discount,
//             finalPrice: this.finalPrice,
//             savings: this.savings,
//             category: this._category
//         };
//     }
// }

// const product = new Product('Телефон', 50000, 'electronics');
// product.discount = 15;
// console.log(product.finalPrice); // 42500
// console.log(product.savings); // 7500
// console.log(product.info);

/*
Задача:
Создайте класс Student с геттерами и сеттерами:

1. Свойства:
   - name (имя студента)
   - grades (массив оценок)
   - attendance (массив дат посещения)

2. Геттеры:
   - averageGrade (средняя оценка)
   - highestGrade (максимальная оценка)
   - lowestGrade (минимальная оценка)
   - attendanceRate (процент посещаемости)
   - isPassing (проходит ли студент, если средняя оценка >= 4.0)
   - gradeCount (количество оценок)
   - attendanceCount (количество посещений)

3. Сеттеры:
   - name (с валидацией)
   - grades (только для чтения, добавлять через addGrade)
   - attendance (только для чтения, добавлять через markAttendance)

4. Методы:
   - addGrade(grade) - добавляет оценку
   - markAttendance(date) - отмечает посещение
   - getReport() - возвращает отчет о студенте

Создайте экземпляр класса и продемонстрируйте работу всех геттеров и сеттеров.
*/

// Ваше решение:

// class Student {
//     constructor(name) {
//         this._name = name;
//         this._grades = [];
//         this._attendance = [];
//     }
    
//     get name() {
//         return this._name;
//     }
    
//     set name(value) {
//         if (typeof value === 'string' && value.trim().length >= 2) {
//             this._name = value.trim();
//         } else {
//             throw new Error('Имя должно быть строкой длиной не менее 2 символов');
//         }
//     }
    
//     get grades() {
//         return [...this._grades]; // возвращаем копию массива
//     }
    
//     set grades(value) {
//         throw new Error('Оценки нельзя изменять напрямую. Используйте addGrade()');
//     }
    
//     get attendance() {
//         return [...this._attendance]; // возвращаем копию массива
//     }
    
//     set attendance(value) {
//         throw new Error('Посещаемость нельзя изменять напрямую. Используйте markAttendance()');
//     }
    
//     get averageGrade() {
//         if (this._grades.length === 0) return 0;
//         const sum = this._grades.reduce((acc, grade) => acc + grade, 0);
//         return sum / this._grades.length;
//     }
    
//     get highestGrade() {
//         if (this._grades.length === 0) return null;
//         return Math.max(...this._grades);
//     }
    
//     get lowestGrade() {
//         if (this._grades.length === 0) return null;
//         return Math.min(...this._grades);
//     }
    
//     get attendanceRate() {
//         if (this._attendance.length === 0) return 0;
//         // Предполагаем, что курс длится 30 дней
//         const totalDays = 30;
//         return (this._attendance.length / totalDays) * 100;
//     }
    
//     get isPassing() {
//         return this.averageGrade >= 4.0;
//     }
    
//     get gradeCount() {
//         return this._grades.length;
//     }
    
//     get attendanceCount() {
//         return this._attendance.length;
//     }
    
//     addGrade(grade) {
//         if (typeof grade === 'number' && grade >= 1 && grade <= 5) {
//             this._grades.push(grade);
//         } else {
//             throw new Error('Оценка должна быть числом от 1 до 5');
//         }
//     }
    
//     markAttendance(date) {
//         if (date instanceof Date) {
//             this._attendance.push(date);
//         } else {
//             throw new Error('Дата должна быть объектом Date');
//         }
//     }
    
//     getReport() {
//         return {
//             name: this._name,
//             averageGrade: this.averageGrade.toFixed(2),
//             highestGrade: this.highestGrade,
//             lowestGrade: this.lowestGrade,
//             attendanceRate: this.attendanceRate.toFixed(1) + '%',
//             isPassing: this.isPassing,
//             gradeCount: this.gradeCount,
//             attendanceCount: this.attendanceCount,
//             grades: this.grades,
//             attendance: this.attendance.map(date => date.toLocaleDateString())
//         };
//     }
// }

// // Демонстрация работы
// const student = new Student('Иван Петров');
// student.addGrade(5);
// student.addGrade(4);
// student.addGrade(5);
// student.addGrade(3);
// student.addGrade(5);
// 
// student.markAttendance(new Date('2024-01-15'));
// student.markAttendance(new Date('2024-01-16'));
// student.markAttendance(new Date('2024-01-17'));
// student.markAttendance(new Date('2024-01-18'));
// student.markAttendance(new Date('2024-01-19'));
// 
// console.log(student.averageGrade); // 4.4
// console.log(student.highestGrade); // 5
// console.log(student.lowestGrade); // 3
// console.log(student.attendanceRate); // 16.67%
// console.log(student.isPassing); // true
// console.log(student.gradeCount); // 5
// console.log(student.attendanceCount); // 5
// 
// console.log(student.getReport());
// 
// // Попытка изменить защищенные свойства
// try {
//     student.grades = [1, 2, 3]; // Ошибка
// } catch (error) {
//     console.error(error.message);
// } 