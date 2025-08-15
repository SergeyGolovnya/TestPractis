/**
 * Методы в классах - это функции, которые принадлежат экземплярам класса.
 * 
 * Синтаксис:
 * methodName(parameters) {
 *     // тело метода
 * }
 * 
 * Особенности:
 * - Имеют доступ к this (текущему экземпляру)
 * - Могут изменять свойства объекта
 * - Могут возвращать значения
 * - Могут принимать параметры
 */

// Пример 1: Базовые методы
// class Calculator {
//     constructor() {
//         this.result = 0;
//     }
    
//     add(number) {
//         this.result += number;
//         return this;
//     }
    
//     subtract(number) {
//         this.result -= number;
//         return this;
//     }
    
//     multiply(number) {
//         this.result *= number;
//         return this;
//     }
    
//     divide(number) {
//         if (number === 0) {
//             throw new Error('Деление на ноль невозможно');
//         }
//         this.result /= number;
//         return this;
//     }
    
//     getResult() {
//         return this.result;
//     }
    
//     clear() {
//         this.result = 0;
//         return this;
//     }
// }

// const calc = new Calculator();
// calc.add(10).multiply(2).subtract(5);
// console.log(calc.getResult()); // 15

// Пример 2: Методы с параметрами и возвращаемыми значениями
// class Book {
//     constructor(title, author, pages) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.isRead = false;
//     }
    
//     read() {
//         this.isRead = true;
//         return `${this.title} прочитана`;
//     }
    
//     getReadingTime(minutesPerPage = 2) {
//         return this.pages * minutesPerPage;
//     }
    
//     getInfo() {
//         const status = this.isRead ? 'прочитана' : 'не прочитана';
//         return `${this.title} (${this.author}) - ${status}`;
//     }
    
//     updatePages(newPages) {
//         if (newPages > 0) {
//             this.pages = newPages;
//             return true;
//         }
//         return false;
//     }
// }

// const book = new Book('Война и мир', 'Лев Толстой', 1225);
// console.log(book.getInfo()); // Война и мир (Лев Толстой) - не прочитана
// console.log(book.getReadingTime()); // 2450
// book.read();
// console.log(book.getInfo()); // Война и мир (Лев Толстой) - прочитана

// Пример 3: Методы с условной логикой
// class Temperature {
//     constructor(celsius) {
//         this.celsius = celsius;
//     }
    
//     toFahrenheit() {
//         return (this.celsius * 9/5) + 32;
//     }
    
//     toKelvin() {
//         return this.celsius + 273.15;
//     }
    
//     getDescription() {
//         if (this.celsius < 0) {
//             return 'Холодно';
//         } else if (this.celsius < 20) {
//             return 'Прохладно';
//         } else if (this.celsius < 30) {
//             return 'Тепло';
//         } else {
//             return 'Жарко';
//         }
//     }
    
//     isFreezing() {
//         return this.celsius <= 0;
//     }
    
//     isBoiling() {
//         return this.celsius >= 100;
//     }
// }

// const temp = new Temperature(25);
// console.log(temp.toFahrenheit()); // 77
// console.log(temp.getDescription()); // Тепло
// console.log(temp.isFreezing()); // false

// Пример 4: Методы с массивами и объектами
// class ShoppingCart {
//     constructor() {
//         this.items = [];
//     }
    
//     addItem(name, price, quantity = 1) {
//         const existingItem = this.items.find(item => item.name === name);
//         
//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             this.items.push({ name, price, quantity });
//         }
//     }
    
//     removeItem(name) {
//         const index = this.items.findIndex(item => item.name === name);
//         if (index !== -1) {
//             this.items.splice(index, 1);
//             return true;
//         }
//         return false;
//     }
    
//     getTotal() {
//         return this.items.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);
//     }
    
//     getItemCount() {
//         return this.items.reduce((count, item) => {
//             return count + item.quantity;
//         }, 0);
//     }
    
//     clear() {
//         this.items = [];
//     }
    
//     getItems() {
//         return [...this.items]; // возвращаем копию массива
//     }
// }

// const cart = new ShoppingCart();
// cart.addItem('Хлеб', 50, 2);
// cart.addItem('Молоко', 80);
// cart.addItem('Хлеб', 50, 1); // увеличит количество хлеба
// console.log(cart.getTotal()); // 230
// console.log(cart.getItemCount()); // 4

// Пример 5: Методы с обработкой ошибок
// class BankAccount {
//     constructor(initialBalance = 0) {
//         this.balance = initialBalance;
//         this.transactions = [];
//     }
    
//     deposit(amount) {
//         if (amount <= 0) {
//             throw new Error('Сумма депозита должна быть положительной');
//         }
        
//         this.balance += amount;
//         this.transactions.push({
//             type: 'deposit',
//             amount,
//             date: new Date()
//         });
        
//         return `Внесено ${amount}. Новый баланс: ${this.balance}`;
//     }
    
//     withdraw(amount) {
//         if (amount <= 0) {
//             throw new Error('Сумма снятия должна быть положительной');
//         }
        
//         if (amount > this.balance) {
//             throw new Error('Недостаточно средств');
//         }
        
//         this.balance -= amount;
//         this.transactions.push({
//             type: 'withdraw',
//             amount,
//             date: new Date()
//         });
        
//         return `Снято ${amount}. Новый баланс: ${this.balance}`;
//     }
    
//     getTransactionHistory() {
//         return this.transactions.map(t => 
//             `${t.type}: ${t.amount} (${t.date.toLocaleDateString()})`
//         );
//     }
    
//     getBalance() {
//         return this.balance;
//     }
// }

// const account = new BankAccount(1000);
// try {
//     console.log(account.deposit(500));
//     console.log(account.withdraw(200));
//     console.log(account.getTransactionHistory());
// } catch (error) {
//     console.error('Ошибка:', error.message);
// }

/*
Задача:
Создайте класс Library со следующими методами:
1. addBook(title, author, year) - добавляет книгу в библиотеку
2. removeBook(title) - удаляет книгу по названию
3. findBook(title) - находит книгу по названию
4. getBooksByAuthor(author) - возвращает все книги автора
5. getBooksByYear(year) - возвращает все книги за год
6. getTotalBooks() - возвращает общее количество книг
7. getBooksCount() - возвращает количество уникальных книг
8. clear() - очищает библиотеку

Каждая книга должна иметь свойства: title, author, year, id (автогенерируемый)
*/

// Ваше решение:

// class Library {
//     constructor() {
//         this.books = [];
//     }
    
//     addBook(title, author, year) {
//         const book = {
//             id: this.generateId(),
//             title,
//             author,
//             year
//         };
//         this.books.push(book);
//         return book;
//     }
    
//     removeBook(title) {
//         const index = this.books.findIndex(book => book.title === title);
//         if (index !== -1) {
//             this.books.splice(index, 1);
//             return true;
//         }
//         return false;
//     }
    
//     findBook(title) {
//         return this.books.find(book => book.title === title);
//     }
    
//     getBooksByAuthor(author) {
//         return this.books.filter(book => book.author === author);
//     }
    
//     getBooksByYear(year) {
//         return this.books.filter(book => book.year === year);
//     }
    
//     getTotalBooks() {
//         return this.books.length;
//     }
    
//     getBooksCount() {
//         const uniqueTitles = new Set(this.books.map(book => book.title));
//         return uniqueTitles.size;
//     }
    
//     clear() {
//         this.books = [];
//     }
    
//     generateId() {
//         return Math.random().toString(36).substr(2, 9);
//     }
// }

// const library = new Library();
// library.addBook('Война и мир', 'Лев Толстой', 1869);
// library.addBook('Анна Каренина', 'Лев Толстой', 1877);
// library.addBook('Преступление и наказание', 'Федор Достоевский', 1866);
// library.addBook('Война и мир', 'Лев Толстой', 1869); // дубликат

// console.log(library.getTotalBooks()); // 4
// console.log(library.getBooksCount()); // 3
// console.log(library.getBooksByAuthor('Лев Толстой')); // 3 книги 