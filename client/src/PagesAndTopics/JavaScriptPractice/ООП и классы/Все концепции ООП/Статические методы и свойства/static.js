/**
 * Статические методы и свойства принадлежат самому классу, а не его экземплярам.
 * 
 * Синтаксис:
 * static propertyName = value;
 * static methodName() { }
 * 
 * Особенности:
 * - Вызываются через имя класса, а не через экземпляр
 * - Не имеют доступа к this
 * - Не могут обращаться к нестатическим свойствам и методам
 * - Наследуются дочерними классами
 * - Часто используются для утилитарных функций
 */

// Пример 1: Базовые статические методы
// class MathUtils {
//     static PI = 3.14159;
//     static E = 2.71828;
    
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
    
//     static getRandomNumber(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }
// }

// console.log(MathUtils.PI); // 3.14159
// console.log(MathUtils.add(5, 3)); // 8
// console.log(MathUtils.factorial(5)); // 120
// console.log(MathUtils.isPrime(17)); // true
// console.log(MathUtils.getRandomNumber(1, 100)); // случайное число

// Пример 2: Статические методы с валидацией
// class StringUtils {
//     static isEmpty(str) {
//         return !str || str.trim().length === 0;
//     }
    
//     static isEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
    
//     static isPhoneNumber(phone) {
//         const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
//         return phoneRegex.test(phone);
//     }
    
//     static capitalize(str) {
//         if (this.isEmpty(str)) return str;
//         return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//     }
    
//     static reverse(str) {
//         return str.split('').reverse().join('');
//     }
    
//     static countWords(str) {
//         if (this.isEmpty(str)) return 0;
//         return str.trim().split(/\s+/).length;
//     }
    
//     static truncate(str, maxLength, suffix = '...') {
//         if (str.length <= maxLength) return str;
//         return str.substring(0, maxLength - suffix.length) + suffix;
//     }
// }

// console.log(StringUtils.isEmpty('')); // true
// console.log(StringUtils.isEmail('test@example.com')); // true
// console.log(StringUtils.capitalize('hello world')); // Hello world
// console.log(StringUtils.countWords('Hello world test')); // 3
// console.log(StringUtils.truncate('Very long text here', 10)); // Very long...

// Пример 3: Статические методы для работы с данными
// class ArrayUtils {
//     static shuffle(array) {
//         const shuffled = [...array];
//         for (let i = shuffled.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//         }
//         return shuffled;
//     }
    
//     static unique(array) {
//         return [...new Set(array)];
//     }
    
//     static chunk(array, size) {
//         const chunks = [];
//         for (let i = 0; i < array.length; i += size) {
//             chunks.push(array.slice(i, i + size));
//         }
//         return chunks;
//     }
    
//     static flatten(array) {
//         return array.reduce((flat, item) => {
//             return flat.concat(Array.isArray(item) ? this.flatten(item) : item);
//         }, []);
//     }
    
//     static groupBy(array, key) {
//         return array.reduce((groups, item) => {
//             const group = item[key];
//             groups[group] = groups[group] || [];
//             groups[group].push(item);
//             return groups;
//         }, {});
//     }
    
//     static sortBy(array, key, order = 'asc') {
//         return [...array].sort((a, b) => {
//             const aVal = a[key];
//             const bVal = b[key];
//             if (order === 'asc') {
//                 return aVal > bVal ? 1 : -1;
//             } else {
//                 return aVal < bVal ? 1 : -1;
//             }
//         });
//     }
// }

// const numbers = [1, 2, 3, 4, 5];
// const users = [
//     { name: 'Иван', age: 25, city: 'Москва' },
//     { name: 'Мария', age: 30, city: 'СПб' },
//     { name: 'Петр', age: 22, city: 'Москва' }
// ];

// console.log(ArrayUtils.shuffle(numbers));
// console.log(ArrayUtils.chunk(numbers, 2));
// console.log(ArrayUtils.groupBy(users, 'city'));
// console.log(ArrayUtils.sortBy(users, 'age', 'desc'));

// Пример 4: Статические методы для работы с датами
// class DateUtils {
//     static now() {
//         return new Date();
//     }
    
//     static format(date, format = 'YYYY-MM-DD') {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         const seconds = String(date.getSeconds()).padStart(2, '0');
        
//         return format
//             .replace('YYYY', year)
//             .replace('MM', month)
//             .replace('DD', day)
//             .replace('HH', hours)
//             .replace('mm', minutes)
//             .replace('ss', seconds);
//     }
    
//     static addDays(date, days) {
//         const result = new Date(date);
//         result.setDate(result.getDate() + days);
//         return result;
//     }
    
//     static addMonths(date, months) {
//         const result = new Date(date);
//         result.setMonth(result.getMonth() + months);
//         return result;
//     }
    
//     static isWeekend(date) {
//         const day = date.getDay();
//         return day === 0 || day === 6;
//     }
    
//     static isToday(date) {
//         const today = new Date();
//         return date.toDateString() === today.toDateString();
//     }
    
//     static getDaysBetween(date1, date2) {
//         const oneDay = 24 * 60 * 60 * 1000;
//         return Math.round(Math.abs((date1 - date2) / oneDay));
//     }
    
//     static getAge(birthDate) {
//         const today = new Date();
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();
        
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
        
//         return age;
//     }
// }

// const today = DateUtils.now();
// console.log(DateUtils.format(today, 'YYYY-MM-DD HH:mm:ss'));
// console.log(DateUtils.isWeekend(today));
// console.log(DateUtils.addDays(today, 7));
// console.log(DateUtils.getAge(new Date('1990-05-15')));

// Пример 5: Статические методы в иерархии классов
// class Vehicle {
//     static count = 0;
//     static types = ['car', 'motorcycle', 'bicycle'];
    
//     constructor(type, brand) {
//         this.type = type;
//         this.brand = brand;
//         this.id = Vehicle.generateId();
//         Vehicle.count++;
//     }
    
//     static generateId() {
//         return `V${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     }
    
//     static isValidType(type) {
//         return this.types.includes(type);
//     }
    
//     static getCount() {
//         return this.count;
//     }
    
//     static createVehicle(type, brand) {
//         if (!this.isValidType(type)) {
//             throw new Error(`Неизвестный тип транспорта: ${type}`);
//         }
//         return new Vehicle(type, brand);
//     }
    
//     static getVehiclesByType(vehicles, type) {
//         return vehicles.filter(vehicle => vehicle.type === type);
//     }
    
//     static getTotalVehicles() {
//         return this.count;
//     }
// }

// class Car extends Vehicle {
//     static count = 0;
//     static fuelTypes = ['gasoline', 'diesel', 'electric'];
    
//     constructor(brand, model, fuelType) {
//         super('car', brand);
//         this.model = model;
//         this.fuelType = fuelType;
//         Car.count++;
//     }
    
//     static isValidFuelType(fuelType) {
//         return this.fuelTypes.includes(fuelType);
//     }
    
//     static getCarCount() {
//         return this.count;
//     }
    
//     static createCar(brand, model, fuelType) {
//         if (!this.isValidFuelType(fuelType)) {
//             throw new Error(`Неизвестный тип топлива: ${fuelType}`);
//         }
//         return new Car(brand, model, fuelType);
//     }
// }

// const car1 = Car.createCar('BMW', 'X5', 'gasoline');
// const car2 = Car.createCar('Tesla', 'Model 3', 'electric');
// const vehicle1 = Vehicle.createVehicle('motorcycle', 'Harley');

// console.log(Vehicle.getTotalVehicles()); // 3
// console.log(Car.getCarCount()); // 2
// console.log(Vehicle.isValidType('car')); // true
// console.log(Car.isValidFuelType('hydrogen')); // false

/*
Задача:
Создайте класс UserManager со статическими методами и свойствами:

1. Статические свойства:
   - users (массив всех пользователей)
   - nextId (следующий доступный ID)
   - roles (доступные роли: 'admin', 'user', 'moderator')

2. Статические методы:
   - createUser(name, email, role) - создает нового пользователя
   - findUserById(id) - находит пользователя по ID
   - findUserByEmail(email) - находит пользователя по email
   - getUsersByRole(role) - возвращает всех пользователей с определенной ролью
   - deleteUser(id) - удаляет пользователя
   - updateUser(id, updates) - обновляет данные пользователя
   - validateEmail(email) - проверяет корректность email
   - validateRole(role) - проверяет корректность роли
   - getTotalUsers() - возвращает общее количество пользователей
   - getUsersCountByRole() - возвращает количество пользователей по ролям

3. Класс User с методами:
   - getInfo() - возвращает информацию о пользователе
   - update(updates) - обновляет данные пользователя

Создайте несколько пользователей и продемонстрируйте работу статических методов.
*/

// Ваше решение:

// class UserManager {
//     static users = [];
//     static nextId = 1;
//     static roles = ['admin', 'user', 'moderator'];
    
//     static createUser(name, email, role = 'user') {
//         if (!this.validateEmail(email)) {
//             throw new Error('Некорректный email');
//         }
        
//         if (!this.validateRole(role)) {
//             throw new Error('Некорректная роль');
//         }
        
//         if (this.findUserByEmail(email)) {
//             throw new Error('Пользователь с таким email уже существует');
//         }
        
//         const user = new User(this.nextId++, name, email, role);
//         this.users.push(user);
//         return user;
//     }
    
//     static findUserById(id) {
//         return this.users.find(user => user.id === id);
//     }
    
//     static findUserByEmail(email) {
//         return this.users.find(user => user.email === email);
//     }
    
//     static getUsersByRole(role) {
//         return this.users.filter(user => user.role === role);
//     }
    
//     static deleteUser(id) {
//         const index = this.users.findIndex(user => user.id === id);
//         if (index !== -1) {
//             this.users.splice(index, 1);
//             return true;
//         }
//         return false;
//     }
    
//     static updateUser(id, updates) {
//         const user = this.findUserById(id);
//         if (user) {
//             user.update(updates);
//             return true;
//         }
//         return false;
//     }
    
//     static validateEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
    
//     static validateRole(role) {
//         return this.roles.includes(role);
//     }
    
//     static getTotalUsers() {
//         return this.users.length;
//     }
    
//     static getUsersCountByRole() {
//         const counts = {};
//         this.roles.forEach(role => {
//             counts[role] = this.getUsersByRole(role).length;
//         });
//         return counts;
//     }
// }

// class User {
//     constructor(id, name, email, role) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.role = role;
//         this.createdAt = new Date();
//     }
    
//     getInfo() {
//         return {
//             id: this.id,
//             name: this.name,
//             email: this.email,
//             role: this.role,
//             createdAt: this.createdAt
//         };
//     }
    
//     update(updates) {
//         if (updates.name) this.name = updates.name;
//         if (updates.email) {
//             if (!UserManager.validateEmail(updates.email)) {
//                 throw new Error('Некорректный email');
//             }
//             this.email = updates.email;
//         }
//         if (updates.role) {
//             if (!UserManager.validateRole(updates.role)) {
//                 throw new Error('Некорректная роль');
//             }
//             this.role = updates.role;
//         }
//     }
// }

// // Демонстрация работы
// try {
//     const user1 = UserManager.createUser('Иван', 'ivan@example.com', 'admin');
//     const user2 = UserManager.createUser('Мария', 'maria@example.com', 'user');
//     const user3 = UserManager.createUser('Петр', 'petr@example.com', 'moderator');
    
//     console.log(UserManager.getTotalUsers()); // 3
//     console.log(UserManager.getUsersCountByRole()); // { admin: 1, user: 1, moderator: 1 }
//     console.log(UserManager.findUserByEmail('ivan@example.com').getInfo());
    
//     UserManager.updateUser(1, { name: 'Иван Петров', role: 'user' });
//     console.log(UserManager.findUserById(1).getInfo());
    
//     UserManager.deleteUser(2);
//     console.log(UserManager.getTotalUsers()); // 2
// } catch (error) {
//     console.error('Ошибка:', error.message);
// } 