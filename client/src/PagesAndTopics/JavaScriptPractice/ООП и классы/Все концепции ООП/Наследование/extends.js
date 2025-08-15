/**
 * Наследование (extends) - механизм, позволяющий создавать новый класс на основе существующего.
 * 
 * Синтаксис:
 * class ChildClass extends ParentClass {
 *     constructor() {
 *         super(); // вызов конструктора родителя
 *     }
 * }
 * 
 * Особенности:
 * - Дочерний класс наследует все свойства и методы родителя
 * - Может переопределять методы родителя
 * - Может добавлять новые свойства и методы
 * - super() должен быть вызван в конструкторе дочернего класса
 */

// Пример 1: Базовое наследование
// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
    
//     speak() {
//         return `${this.name} издает звук`;
//     }
    
//     move() {
//         return `${this.name} двигается`;
//     }
// }

// class Dog extends Animal {
//     constructor(name, breed) {
//         super(name); // вызов конструктора родителя
//         this.breed = breed;
//     }
    
//     speak() {
//         return `${this.name} лает: Гав!`;
//     }
    
//     fetch() {
//         return `${this.name} приносит мячик`;
//     }
// }

// const dog = new Dog('Рекс', 'Овчарка');
// console.log(dog.speak()); // Рекс лает: Гав!
// console.log(dog.move()); // Рекс двигается
// console.log(dog.fetch()); // Рекс приносит мячик

// Пример 2: Наследование с дополнительными параметрами
// class Vehicle {
//     constructor(brand, model, year) {
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//         this.isRunning = false;
//     }
    
//     start() {
//         this.isRunning = true;
//         return `${this.brand} ${this.model} запущен`;
//     }
    
//     stop() {
//         this.isRunning = false;
//         return `${this.brand} ${this.model} остановлен`;
//     }
    
//     getInfo() {
//         return `${this.brand} ${this.model} (${this.year})`;
//     }
// }

// class Car extends Vehicle {
//     constructor(brand, model, year, doors) {
//         super(brand, model, year);
//         this.doors = doors;
//     }
    
//     openTrunk() {
//         return `${this.brand} ${this.model}: багажник открыт`;
//     }
    
//     getInfo() {
//         return `${super.getInfo()} - ${this.doors} дверей`;
//     }
// }

// class Motorcycle extends Vehicle {
//     constructor(brand, model, year, engineSize) {
//         super(brand, model, year);
//         this.engineSize = engineSize;
//     }
    
//     wheelie() {
//         return `${this.brand} ${this.model} делает вилли!`;
//     }
    
//     getInfo() {
//         return `${super.getInfo()} - ${this.engineSize}cc`;
//     }
// }

// const car = new Car('BMW', 'X5', 2023, 5);
// const motorcycle = new Motorcycle('Harley', 'Davidson', 2022, 1200);
// console.log(car.getInfo()); // BMW X5 (2023) - 5 дверей
// console.log(motorcycle.getInfo()); // Harley Davidson (2022) - 1200cc

// Пример 3: Многоуровневое наследование
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
    
//     introduce() {
//         return `Привет! Меня зовут ${this.name} и мне ${this.age} лет.`;
//     }
    
//     work() {
//         return `${this.name} работает`;
//     }
// }

// class Employee extends Person {
//     constructor(name, age, position, salary) {
//         super(name, age);
//         this.position = position;
//         this.salary = salary;
//     }
    
//     work() {
//         return `${this.name} работает на должности ${this.position}`;
//     }
    
//     getSalary() {
//         return `${this.name} получает ${this.salary} рублей`;
//     }
// }

// class Manager extends Employee {
//     constructor(name, age, position, salary, department) {
//         super(name, age, position, salary);
//         this.department = department;
//         this.subordinates = [];
//     }
    
//     addSubordinate(employee) {
//         this.subordinates.push(employee);
//         return `${employee.name} добавлен в команду ${this.name}`;
//     }
    
//     getTeamSize() {
//         return this.subordinates.length;
//     }
    
//     work() {
//         return `${this.name} управляет отделом ${this.department}`;
//     }
// }

// const manager = new Manager('Анна', 35, 'Руководитель', 100000, 'IT');
// const employee = new Employee('Иван', 28, 'Разработчик', 80000);
// manager.addSubordinate(employee);
// console.log(manager.work()); // Анна управляет отделом IT
// console.log(manager.getTeamSize()); // 1

// Пример 4: Переопределение методов с super
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
    
//     getBalance() {
//         return this.balance;
//     }
// }

// class SavingsAccount extends BankAccount {
//     constructor(initialBalance = 0, interestRate = 0.05) {
//         super(initialBalance);
//         this.interestRate = interestRate;
//     }
    
//     addInterest() {
//         const interest = this.balance * this.interestRate;
//         this.balance += interest;
//         return `Начислены проценты: ${interest}. Новый баланс: ${this.balance}`;
//     }
    
//     withdraw(amount) {
//         // Проверяем, что после снятия остается минимальный баланс
//         const minBalance = 1000;
//         if (this.balance - amount < minBalance) {
//             return `Нельзя снять ${amount}. Минимальный баланс: ${minBalance}`;
//         }
//         return super.withdraw(amount); // используем метод родителя
//     }
    
//     getInfo() {
//         return `Сберегательный счет. Баланс: ${this.balance}, Процентная ставка: ${this.interestRate * 100}%`;
//     }
// }

// const savings = new SavingsAccount(5000, 0.06);
// console.log(savings.getInfo());
// console.log(savings.addInterest());
// console.log(savings.withdraw(1000));

// Пример 5: Наследование с проверкой типов
// class Shape {
//     constructor(color) {
//         this.color = color;
//     }
    
//     getArea() {
//         throw new Error('Метод getArea() должен быть переопределен');
//     }
    
//     getPerimeter() {
//         throw new Error('Метод getPerimeter() должен быть переопределен');
//     }
    
//     getInfo() {
//         return `Фигура цвета ${this.color}`;
//     }
// }

// class Circle extends Shape {
//     constructor(color, radius) {
//         super(color);
//         if (radius <= 0) {
//             throw new Error('Радиус должен быть положительным');
//         }
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
//         if (width <= 0 || height <= 0) {
//             throw new Error('Ширина и высота должны быть положительными');
//         }
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
// console.log(circle.getInfo());
// console.log(`Площадь круга: ${circle.getArea().toFixed(2)}`);
// console.log(rectangle.getInfo());
// console.log(`Площадь прямоугольника: ${rectangle.getArea()}`);

/*
Задача:
Создайте иерархию классов для системы образования:

1. Базовый класс Person с свойствами name, age и методами introduce(), getAge()
2. Класс Student, наследующий от Person, с дополнительными свойствами grade, subjects и методами study(), getGrade()
3. Класс Teacher, наследующий от Person, с дополнительными свойствами subject, experience и методами teach(), getExperience()
4. Класс School, который содержит массивы students и teachers с методами:
   - addStudent(student)
   - addTeacher(teacher)
   - getStudentsByGrade(grade)
   - getTeachersBySubject(subject)
   - getAverageGrade()
   - getTotalPeople()

Создайте экземпляры классов и продемонстрируйте их работу.
*/

// Ваше решение:

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
    
//     introduce() {
//         return `Привет! Меня зовут ${this.name} и мне ${this.age} лет.`;
//     }
    
//     getAge() {
//         return this.age;
//     }
// }

// class Student extends Person {
//     constructor(name, age, grade) {
//         super(name, age);
//         this.grade = grade;
//         this.subjects = [];
//     }
    
//     study() {
//         return `${this.name} учится в ${this.grade} классе.`;
//     }
    
//     getGrade() {
//         return this.grade;
//     }
    
//     addSubject(subject) {
//         this.subjects.push(subject);
//     }
// }

// class Teacher extends Person {
//     constructor(name, age, subject, experience) {
//         super(name, age);
//         this.subject = subject;
//         this.experience = experience;
//     }
    
//     teach() {
//         return `${this.name} преподает ${this.subject}.`;
//     }
    
//     getExperience() {
//         return this.experience;
//     }
// }

// class School {
//     constructor() {
//         this.students = [];
//         this.teachers = [];
//     }
    
//     addStudent(student) {
//         this.students.push(student);
//     }
    
//     addTeacher(teacher) {
//         this.teachers.push(teacher);
//     }
    
//     getStudentsByGrade(grade) {
//         return this.students.filter(student => student.grade === grade);
//     }
    
//     getTeachersBySubject(subject) {
//         return this.teachers.filter(teacher => teacher.subject === subject);
//     }
    
//     getAverageGrade() {
//         if (this.students.length === 0) return 0;
//         const totalGrade = this.students.reduce((sum, student) => sum + student.grade, 0);
//         return totalGrade / this.students.length;
//     }
    
//     getTotalPeople() {
//         return this.students.length + this.teachers.length;
//     }
// }

// // Создание экземпляров
// const student1 = new Student('Иван', 15, 9);
// const student2 = new Student('Мария', 16, 10);
// const teacher1 = new Teacher('Анна', 35, 'Математика', 10);
// const teacher2 = new Teacher('Петр', 40, 'Физика', 15);

// const school = new School();
// school.addStudent(student1);
// school.addStudent(student2);
// school.addTeacher(teacher1);
// school.addTeacher(teacher2);

// console.log(student1.study());
// console.log(teacher1.teach());
// console.log(school.getStudentsByGrade(9));
// console.log(school.getAverageGrade());
// console.log(school.getTotalPeople()); 