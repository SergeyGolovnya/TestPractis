/**
 * Приватные поля (Private Fields) - поля класса, доступные только внутри класса.
 * 
 * Синтаксис:
 * #fieldName = value;
 * 
 * Особенности:
 * - Начинаются с символа #
 * - Недоступны извне класса
 * - Не наследуются
 * - Должны быть объявлены в начале класса
 * - Доступны только внутри методов класса
 */

// Пример 1: Базовые приватные поля
// class BankAccount {
//     #balance = 0;
//     #accountNumber;
    
//     constructor(initialBalance = 0) {
//         this.#balance = initialBalance;
//         this.#accountNumber = this.#generateAccountNumber();
//     }
    
//     #generateAccountNumber() {
//         return Math.floor(Math.random() * 1000000);
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
    
//     getAccountNumber() {
//         return this.#accountNumber;
//     }
// }

// const account = new BankAccount(1000);
// console.log(account.getBalance()); // 1000
// console.log(account.getAccountNumber()); // случайное число
// // console.log(account.#balance); // Ошибка! Приватное поле недоступно

// Пример 2: Приватные поля с геттерами и сеттерами
// class User {
//     #email;
//     #password;
//     #isActive = true;
    
//     constructor(email, password) {
//         this.#email = email;
//         this.#password = this.#hashPassword(password);
//     }
    
//     #hashPassword(password) {
//         // Простое хеширование для примера
//         return password.split('').reverse().join('');
//     }
    
//     #validateEmail(email) {
//         return email.includes('@');
//     }
    
//     get email() {
//         return this.#email;
//     }
    
//     set email(newEmail) {
//         if (this.#validateEmail(newEmail)) {
//             this.#email = newEmail;
//         } else {
//             throw new Error('Неверный формат email');
//         }
//     }
    
//     checkPassword(password) {
//         return this.#password === this.#hashPassword(password);
//     }
    
//     deactivate() {
//         this.#isActive = false;
//     }
    
//     isActive() {
//         return this.#isActive;
//     }
// }

// const user = new User('test@example.com', 'password123');
// console.log(user.email); // test@example.com
// user.email = 'new@example.com';
// console.log(user.checkPassword('password123')); // true
// console.log(user.isActive()); // true

// Пример 3: Приватные поля с массивами и объектами
// class ShoppingCart {
//     #items = [];
//     #discount = 0;
    
//     addItem(name, price, quantity = 1) {
//         const existingItem = this.#items.find(item => item.name === name);
        
//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             this.#items.push({ name, price, quantity });
//         }
//     }
    
//     removeItem(name) {
//         const index = this.#items.findIndex(item => item.name === name);
//         if (index !== -1) {
//             this.#items.splice(index, 1);
//             return true;
//         }
//         return false;
//     }
    
//     #calculateSubtotal() {
//         return this.#items.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);
//     }
    
//     #calculateDiscount() {
//         const subtotal = this.#calculateSubtotal();
//         return subtotal * this.#discount;
//     }
    
//     getTotal() {
//         const subtotal = this.#calculateSubtotal();
//         const discount = this.#calculateDiscount();
//         return subtotal - discount;
//     }
    
//     setDiscount(percentage) {
//         if (percentage >= 0 && percentage <= 100) {
//             this.#discount = percentage / 100;
//         } else {
//             throw new Error('Скидка должна быть от 0 до 100%');
//         }
//     }
    
//     getItems() {
//         return [...this.#items]; // возвращаем копию массива
//     }
    
//     clear() {
//         this.#items = [];
//         this.#discount = 0;
//     }
// }

// const cart = new ShoppingCart();
// cart.addItem('Хлеб', 50, 2);
// cart.addItem('Молоко', 80);
// cart.setDiscount(10); // 10% скидка
// console.log(cart.getTotal()); // 162 (180 - 18)
// console.log(cart.getItems());

// Пример 4: Приватные поля с методами
// class Temperature {
//     #celsius;
//     #unit = 'C';
    
//     constructor(value, unit = 'C') {
//         this.#unit = unit.toUpperCase();
//         this.#celsius = this.#convertToCelsius(value, this.#unit);
//     }
    
//     #convertToCelsius(value, unit) {
//         switch (unit) {
//             case 'C':
//                 return value;
//             case 'F':
//                 return (value - 32) * 5/9;
//             case 'K':
//                 return value - 273.15;
//             default:
//                 throw new Error('Неподдерживаемая единица измерения');
//         }
//     }
    
//     #convertFromCelsius(value, unit) {
//         switch (unit) {
//             case 'C':
//                 return value;
//             case 'F':
//                 return (value * 9/5) + 32;
//             case 'K':
//                 return value + 273.15;
//             default:
//                 throw new Error('Неподдерживаемая единица измерения');
//         }
//     }
    
//     getCelsius() {
//         return this.#celsius;
//     }
    
//     getFahrenheit() {
//         return this.#convertFromCelsius(this.#celsius, 'F');
//     }
    
//     getKelvin() {
//         return this.#convertFromCelsius(this.#celsius, 'K');
//     }
    
//     setTemperature(value, unit = 'C') {
//         this.#celsius = this.#convertToCelsius(value, unit.toUpperCase());
//         this.#unit = unit.toUpperCase();
//     }
    
//     getDescription() {
//         if (this.#celsius < 0) return 'Холодно';
//         if (this.#celsius < 20) return 'Прохладно';
//         if (this.#celsius < 30) return 'Тепло';
//         return 'Жарко';
//     }
// }

// const temp = new Temperature(25, 'C');
// console.log(temp.getFahrenheit()); // 77
// console.log(temp.getKelvin()); // 298.15
// temp.setTemperature(32, 'F');
// console.log(temp.getCelsius()); // 0

// Пример 5: Приватные поля с наследованием
// class Animal {
//     #name;
//     #age;
    
//     constructor(name, age) {
//         this.#name = name;
//         this.#age = age;
//     }
    
//     getName() {
//         return this.#name;
//     }
    
//     getAge() {
//         return this.#age;
//     }
    
//     #getAgeInHumanYears() {
//         return this.#age * 7; // примерный коэффициент
//     }
    
//     getInfo() {
//         return `${this.#name}, возраст: ${this.#age} лет (${this.#getAgeInHumanYears()} в человеческих годах)`;
//     }
// }

// class Dog extends Animal {
//     #breed;
    
//     constructor(name, age, breed) {
//         super(name, age);
//         this.#breed = breed;
//     }
    
//     getBreed() {
//         return this.#breed;
//     }
    
//     getInfo() {
//         return `${super.getInfo()}, порода: ${this.#breed}`;
//     }
// }

// const dog = new Dog('Рекс', 5, 'Овчарка');
// console.log(dog.getName()); // Рекс
// console.log(dog.getBreed()); // Овчарка
// console.log(dog.getInfo()); // Рекс, возраст: 5 лет (35 в человеческих годах), порода: Овчарка

/*
Задача:
Создайте класс Library с приватными полями и методами:

1. Приватные поля:
   - #books (массив книг)
   - #maxBooks (максимальное количество книг)
   - #isOpen (статус библиотеки)

2. Приватные методы:
   - #generateBookId() - генерирует уникальный ID для книги
   - #validateBook(book) - проверяет корректность данных книги
   - #findBookIndex(title) - находит индекс книги по названию

3. Публичные методы:
   - addBook(title, author, year) - добавляет книгу
   - removeBook(title) - удаляет книгу
   - findBook(title) - находит книгу
   - getBooks() - возвращает список книг
   - open() / close() - открывает/закрывает библиотеку
   - getStatus() - возвращает статус библиотеки

Каждая книга должна иметь: id, title, author, year, isAvailable (по умолчанию true)
*/

// Ваше решение:

// class Library {
//     #books = [];
//     #maxBooks = 1000;
//     #isOpen = false;
    
//     #generateBookId() {
//         return Date.now().toString(36) + Math.random().toString(36).substr(2);
//     }
    
//     #validateBook(book) {
//         return book.title && 
//                book.author && 
//                book.year && 
//                book.year > 0 && 
//                book.year <= new Date().getFullYear();
//     }
    
//     #findBookIndex(title) {
//         return this.#books.findIndex(book => book.title === title);
//     }
    
//     addBook(title, author, year) {
//         if (!this.#isOpen) {
//             throw new Error('Библиотека закрыта');
//         }
        
//         if (this.#books.length >= this.#maxBooks) {
//             throw new Error('Библиотека переполнена');
//         }
        
//         const book = {
//             id: this.#generateBookId(),
//             title,
//             author,
//             year,
//             isAvailable: true
//         };
        
//         if (!this.#validateBook(book)) {
//             throw new Error('Некорректные данные книги');
//         }
        
//         this.#books.push(book);
//         return book;
//     }
    
//     removeBook(title) {
//         if (!this.#isOpen) {
//             throw new Error('Библиотека закрыта');
//         }
        
//         const index = this.#findBookIndex(title);
//         if (index !== -1) {
//             this.#books.splice(index, 1);
//             return true;
//         }
//         return false;
//     }
    
//     findBook(title) {
//         return this.#books.find(book => book.title === title);
//     }
    
//     getBooks() {
//         return [...this.#books];
//     }
    
//     open() {
//         this.#isOpen = true;
//         return 'Библиотека открыта';
//     }
    
//     close() {
//         this.#isOpen = false;
//         return 'Библиотека закрыта';
//     }
    
//     getStatus() {
//         return {
//             isOpen: this.#isOpen,
//             totalBooks: this.#books.length,
//             maxBooks: this.#maxBooks
//         };
//     }
// }

// const library = new Library();
// library.open();
// library.addBook('Война и мир', 'Лев Толстой', 1869);
// library.addBook('Анна Каренина', 'Лев Толстой', 1877);
// console.log(library.getStatus());
// console.log(library.findBook('Война и мир')); 