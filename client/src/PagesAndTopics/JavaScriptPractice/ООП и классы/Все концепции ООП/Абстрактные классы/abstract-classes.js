/**
 * Абстрактные классы - классы, которые не предназначены для создания экземпляров напрямую.
 * В JavaScript нет встроенной поддержки абстрактных классов, но их можно имитировать.
 * 
 * Особенности:
 * - Содержат абстрактные методы, которые должны быть реализованы в дочерних классах
 * - Нельзя создать экземпляр абстрактного класса
 * - Служат как шаблон для других классов
 * - Могут содержать как абстрактные, так и конкретные методы
 */

// Пример 1: Базовый абстрактный класс
// class AbstractAnimal {
//     constructor(name) {
//         if (this.constructor === AbstractAnimal) {
//             throw new Error('Нельзя создать экземпляр абстрактного класса');
//         }
//         this.name = name;
//     }
    
//     // Абстрактный метод - должен быть реализован в дочерних классах
//     makeSound() {
//         throw new Error('Метод makeSound() должен быть реализован');
//     }
    
//     // Абстрактный метод
//     move() {
//         throw new Error('Метод move() должен быть реализован');
//     }
    
//     // Конкретный метод - общий для всех животных
//     sleep() {
//         return `${this.name} спит`;
//     }
    
//     // Конкретный метод
//     eat(food) {
//         return `${this.name} ест ${food}`;
//     }
    
//     // Абстрактный геттер
//     get habitat() {
//         throw new Error('Геттер habitat должен быть реализован');
//     }
    
//     // Конкретный метод с использованием абстрактного
//     getInfo() {
//         return `${this.name} живет в ${this.habitat}, издает звук: ${this.makeSound()}`;
//     }
// }

// class Dog extends AbstractAnimal {
//     constructor(name, breed) {
//         super(name);
//         this.breed = breed;
//     }
    
//     makeSound() {
//         return 'Гав!';
//     }
    
//     move() {
//         return `${this.name} бегает на четырех лапах`;
//     }
    
//     get habitat() {
//         return 'доме человека';
//     }
    
//     fetch() {
//         return `${this.name} приносит мячик`;
//     }
// }

// class Bird extends AbstractAnimal {
//     constructor(name, wingspan) {
//         super(name);
//         this.wingspan = wingspan;
//     }
    
//     makeSound() {
//         return 'Чик-чирик!';
//     }
    
//     move() {
//         return `${this.name} летает`;
//     }
    
//     get habitat() {
//         return 'небе';
//     }
    
//     fly() {
//         return `${this.name} летит с размахом крыльев ${this.wingspan} см`;
//     }
// }

// const dog = new Dog('Рекс', 'Овчарка');
// const bird = new Bird('Воробей', 20);
// console.log(dog.getInfo());
// console.log(bird.getInfo());
// console.log(dog.fetch());
// console.log(bird.fly());

// Пример 2: Абстрактный класс для фигур
// class AbstractShape {
//     constructor(color) {
//         if (this.constructor === AbstractShape) {
//             throw new Error('Нельзя создать экземпляр абстрактного класса');
//         }
//         this.color = color;
//     }
    
//     // Абстрактные методы
//     getArea() {
//         throw new Error('Метод getArea() должен быть реализован');
//     }
    
//     getPerimeter() {
//         throw new Error('Метод getPerimeter() должен быть реализован');
//     }
    
//     // Конкретные методы
//     getColor() {
//         return this.color;
//     }
    
//     setColor(color) {
//         this.color = color;
//     }
    
//     // Абстрактный метод для проверки валидности
//     isValid() {
//         throw new Error('Метод isValid() должен быть реализован');
//     }
    
//     // Конкретный метод, использующий абстрактные
//     getInfo() {
//         if (!this.isValid()) {
//             throw new Error('Фигура невалидна');
//         }
//         return {
//             type: this.constructor.name,
//             color: this.color,
//             area: this.getArea(),
//             perimeter: this.getPerimeter()
//         };
//     }
// }

// class Circle extends AbstractShape {
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
    
//     isValid() {
//         return this.radius > 0;
//     }
    
//     getDiameter() {
//         return 2 * this.radius;
//     }
// }

// class Rectangle extends AbstractShape {
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
    
//     isValid() {
//         return this.width > 0 && this.height > 0;
//     }
    
//     isSquare() {
//         return this.width === this.height;
//     }
// }

// const circle = new Circle('красный', 5);
// const rectangle = new Rectangle('синий', 4, 6);
// console.log(circle.getInfo());
// console.log(rectangle.getInfo());

// Пример 3: Абстрактный класс для баз данных
// class AbstractDatabase {
//     constructor() {
//         if (this.constructor === AbstractDatabase) {
//             throw new Error('Нельзя создать экземпляр абстрактного класса');
//         }
//         this.isConnected = false;
//     }
    
//     // Абстрактные методы
//     connect() {
//         throw new Error('Метод connect() должен быть реализован');
//     }
    
//     disconnect() {
//         throw new Error('Метод disconnect() должен быть реализован');
//     }
    
//     query(sql) {
//         throw new Error('Метод query() должен быть реализован');
//     }
    
//     // Конкретные методы
//     isConnected() {
//         return this.isConnected;
//     }
    
//     // Абстрактный метод для валидации запроса
//     validateQuery(query) {
//         throw new Error('Метод validateQuery() должен быть реализован');
//     }
    
//     // Конкретный метод, использующий абстрактные
//     executeQuery(query) {
//         if (!this.isConnected) {
//             throw new Error('Нет подключения к базе данных');
//         }
        
//         if (!this.validateQuery(query)) {
//             throw new Error('Некорректный запрос');
//         }
        
//         return this.query(query);
//     }
    
//     getStatus() {
//         return {
//             connected: this.isConnected,
//             type: this.constructor.name
//         };
//     }
// }

// class MySQLDatabase extends AbstractDatabase {
//     constructor(host, port) {
//         super();
//         this.host = host;
//         this.port = port;
//     }
    
//     connect() {
//         this.isConnected = true;
//         return `Подключение к MySQL на ${this.host}:${this.port} установлено`;
//     }
    
//     disconnect() {
//         this.isConnected = false;
//         return 'Отключено от MySQL';
//     }
    
//     query(sql) {
//         return `Выполнен MySQL запрос: ${sql}`;
//     }
    
//     validateQuery(query) {
//         const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP'];
//         return sqlKeywords.some(keyword => query.toUpperCase().includes(keyword));
//     }
    
//     getStatus() {
//         return {
//             ...super.getStatus(),
//             host: this.host,
//             port: this.port
//         };
//     }
// }

// class MongoDBDatabase extends AbstractDatabase {
//     constructor(connectionString) {
//         super();
//         this.connectionString = connectionString;
//     }
    
//     connect() {
//         this.isConnected = true;
//         return `Подключение к MongoDB по строке: ${this.connectionString}`;
//     }
    
//     disconnect() {
//         this.isConnected = false;
//         return 'Отключено от MongoDB';
//     }
    
//     query(query) {
//         return `Выполнен MongoDB запрос: ${JSON.stringify(query)}`;
//     }
    
//     validateQuery(query) {
//         return typeof query === 'object' && query !== null;
//     }
    
//     getStatus() {
//         return {
//             ...super.getStatus(),
//             connectionString: this.connectionString
//         };
//     }
// }

// const mysql = new MySQLDatabase('localhost', 3306);
// const mongo = new MongoDBDatabase('mongodb://localhost:27017');
// console.log(mysql.connect());
// console.log(mysql.executeQuery('SELECT * FROM users'));
// console.log(mongo.connect());
// console.log(mongo.executeQuery({ find: 'users', filter: { age: { $gt: 18 } } }));

// Пример 4: Абстрактный класс для платежных систем
// class AbstractPaymentProcessor {
//     constructor() {
//         if (this.constructor === AbstractPaymentProcessor) {
//             throw new Error('Нельзя создать экземпляр абстрактного класса');
//         }
//         this.transactions = [];
//     }
    
//     // Абстрактные методы
//     processPayment(amount, currency) {
//         throw new Error('Метод processPayment() должен быть реализован');
//     }
    
//     validatePayment(amount, currency) {
//         throw new Error('Метод validatePayment() должен быть реализован');
//     }
    
//     // Конкретные методы
//     addTransaction(transaction) {
//         this.transactions.push({
//             ...transaction,
//             id: this.generateTransactionId(),
//             timestamp: new Date()
//         });
//     }
    
//     generateTransactionId() {
//         return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     }
    
//     getTransactionHistory() {
//         return this.transactions;
//     }
    
//     // Абстрактный метод для получения комиссии
//     getFee(amount) {
//         throw new Error('Метод getFee() должен быть реализован');
//     }
    
//     // Конкретный метод, использующий абстрактные
//     executePayment(amount, currency) {
//         if (!this.validatePayment(amount, currency)) {
//             throw new Error('Платеж не прошел валидацию');
//         }
        
//         const fee = this.getFee(amount);
//         const totalAmount = amount + fee;
        
//         const result = this.processPayment(totalAmount, currency);
//         this.addTransaction({
//             amount,
//             currency,
//             fee,
//             totalAmount,
//             status: 'success'
//         });
        
//         return result;
//     }
    
//     getTotalProcessed() {
//         return this.transactions.reduce((total, txn) => total + txn.amount, 0);
//     }
    
//     getTotalFees() {
//         return this.transactions.reduce((total, txn) => total + txn.fee, 0);
//     }
// }

// class CreditCardProcessor extends AbstractPaymentProcessor {
//     constructor(merchantId) {
//         super();
//         this.merchantId = merchantId;
//     }
    
//     processPayment(amount, currency) {
//         return `Обработан платеж по карте: ${amount} ${currency}`;
//     }
    
//     validatePayment(amount, currency) {
//         return amount > 0 && ['USD', 'EUR', 'RUB'].includes(currency);
//     }
    
//     getFee(amount) {
//         return amount * 0.029 + 0.30; // 2.9% + $0.30
//     }
    
//     getStatus() {
//         return {
//             type: 'Credit Card',
//             merchantId: this.merchantId,
//             totalProcessed: this.getTotalProcessed(),
//             totalFees: this.getTotalFees()
//         };
//     }
// }

// class PayPalProcessor extends AbstractPaymentProcessor {
//     constructor(email) {
//         super();
//         this.email = email;
//     }
    
//     processPayment(amount, currency) {
//         return `Обработан PayPal платеж: ${amount} ${currency}`;
//     }
    
//     validatePayment(amount, currency) {
//         return amount > 0 && ['USD', 'EUR'].includes(currency);
//     }
    
//     getFee(amount) {
//         return amount * 0.0249 + 0.35; // 2.49% + $0.35
//     }
    
//     getStatus() {
//         return {
//             type: 'PayPal',
//             email: this.email,
//             totalProcessed: this.getTotalProcessed(),
//             totalFees: this.getTotalFees()
//         };
//     }
// }

// const creditCard = new CreditCardProcessor('MERCH_123');
// const paypal = new PayPalProcessor('merchant@example.com');
// console.log(creditCard.executePayment(100, 'USD'));
// console.log(paypal.executePayment(50, 'EUR'));
// console.log(creditCard.getStatus());
// console.log(paypal.getStatus());

/*
Задача:
Создайте абстрактный класс AbstractVehicle и его наследников:

1. AbstractVehicle с абстрактными методами:
   - start() - запуск транспортного средства
   - stop() - остановка транспортного средства
   - getFuelConsumption() - расход топлива
   - getMaxSpeed() - максимальная скорость
   - validateFuel(fuelType) - проверка типа топлива

2. Конкретные методы:
   - refuel(fuelType, amount) - заправка
   - getInfo() - информация о транспортном средстве
   - isRunning() - проверка, работает ли двигатель

3. Классы-наследники:
   - Car (бензин, дизель, электричество)
   - Motorcycle (бензин)
   - ElectricCar (только электричество)

Создайте экземпляры всех классов и продемонстрируйте их работу.
*/

// Ваше решение:

// class AbstractVehicle {
//     constructor(brand, model, year) {
//         if (this.constructor === AbstractVehicle) {
//             throw new Error('Нельзя создать экземпляр абстрактного класса');
//         }
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//         this.isRunning = false;
//         this.fuelLevel = 0;
//     }
    
//     // Абстрактные методы
//     start() {
//         throw new Error('Метод start() должен быть реализован');
//     }
    
//     stop() {
//         throw new Error('Метод stop() должен быть реализован');
//     }
    
//     getFuelConsumption() {
//         throw new Error('Метод getFuelConsumption() должен быть реализован');
//     }
    
//     getMaxSpeed() {
//         throw new Error('Метод getMaxSpeed() должен быть реализован');
//     }
    
//     validateFuel(fuelType) {
//         throw new Error('Метод validateFuel() должен быть реализован');
//     }
    
//     // Конкретные методы
//     refuel(fuelType, amount) {
//         if (!this.validateFuel(fuelType)) {
//             throw new Error(`Неподходящий тип топлива: ${fuelType}`);
//         }
        
//         if (amount <= 0) {
//             throw new Error('Количество топлива должно быть положительным');
//         }
        
//         this.fuelLevel += amount;
//         return `Заправлено ${amount} литров ${fuelType}. Уровень топлива: ${this.fuelLevel}`;
//     }
    
//     isRunning() {
//         return this.isRunning;
//     }
    
//     getInfo() {
//         return {
//             brand: this.brand,
//             model: this.model,
//             year: this.year,
//             isRunning: this.isRunning,
//             fuelLevel: this.fuelLevel,
//             maxSpeed: this.getMaxSpeed(),
//             fuelConsumption: this.getFuelConsumption()
//         };
//     }
// }

// class Car extends AbstractVehicle {
//     constructor(brand, model, year, engineType) {
//         super(brand, model, year);
//         this.engineType = engineType;
//         this.supportedFuels = ['gasoline', 'diesel', 'electric'];
//     }
    
//     start() {
//         if (this.fuelLevel <= 0) {
//             throw new Error('Нет топлива для запуска');
//         }
//         this.isRunning = true;
//         return `${this.brand} ${this.model} запущен`;
//     }
    
//     stop() {
//         this.isRunning = false;
//         return `${this.brand} ${this.model} остановлен`;
//     }
    
//     getFuelConsumption() {
//         switch (this.engineType) {
//             case 'gasoline': return '8.5 л/100км';
//             case 'diesel': return '6.2 л/100км';
//             case 'electric': return '15 кВтч/100км';
//             default: return 'Неизвестно';
//         }
//     }
    
//     getMaxSpeed() {
//         return 180; // км/ч
//     }
    
//     validateFuel(fuelType) {
//         return this.supportedFuels.includes(fuelType);
//     }
    
//     getInfo() {
//         return {
//             ...super.getInfo(),
//             engineType: this.engineType,
//             supportedFuels: this.supportedFuels
//         };
//     }
// }

// class Motorcycle extends AbstractVehicle {
//     constructor(brand, model, year) {
//         super(brand, model, year);
//         this.supportedFuels = ['gasoline'];
//     }
    
//     start() {
//         if (this.fuelLevel <= 0) {
//             throw new Error('Нет топлива для запуска');
//         }
//         this.isRunning = true;
//         return `${this.brand} ${this.model} заведен`;
//     }
    
//     stop() {
//         this.isRunning = false;
//         return `${this.brand} ${this.model} заглушен`;
//     }
    
//     getFuelConsumption() {
//         return '4.5 л/100км';
//     }
    
//     getMaxSpeed() {
//         return 200; // км/ч
//     }
    
//     validateFuel(fuelType) {
//         return this.supportedFuels.includes(fuelType);
//     }
    
//     wheelie() {
//         if (!this.isRunning) {
//             throw new Error('Мотоцикл должен быть заведен для выполнения трюка');
//         }
//         return `${this.brand} ${this.model} делает вилли!`;
//     }
// }

// class ElectricCar extends AbstractVehicle {
//     constructor(brand, model, year, batteryCapacity) {
//         super(brand, model, year);
//         this.batteryCapacity = batteryCapacity;
//         this.supportedFuels = ['electric'];
//     }
    
//     start() {
//         if (this.fuelLevel <= 0) {
//             throw new Error('Нет заряда для запуска');
//         }
//         this.isRunning = true;
//         return `${this.brand} ${this.model} запущен (бесшумно)`;
//     }
    
//     stop() {
//         this.isRunning = false;
//         return `${this.brand} ${this.model} остановлен`;
//     }
    
//     getFuelConsumption() {
//         return `${this.batteryCapacity / 4} кВтч/100км`;
//     }
    
//     getMaxSpeed() {
//         return 160; // км/ч
//     }
    
//     validateFuel(fuelType) {
//         return this.supportedFuels.includes(fuelType);
//     }
    
//     getRange() {
//         return this.fuelLevel * 4; // км на текущем заряде
//     }
    
//     getInfo() {
//         return {
//             ...super.getInfo(),
//             batteryCapacity: this.batteryCapacity,
//             range: this.getRange()
//         };
//     }
// }

// // Демонстрация работы
// try {
//     const car = new Car('BMW', 'X5', 2023, 'gasoline');
//     const motorcycle = new Motorcycle('Harley', 'Davidson', 2022);
//     const electricCar = new ElectricCar('Tesla', 'Model 3', 2023, 75);
    
//     car.refuel('gasoline', 50);
//     motorcycle.refuel('gasoline', 20);
//     electricCar.refuel('electric', 75);
    
//     console.log(car.start());
//     console.log(motorcycle.start());
//     console.log(electricCar.start());
    
//     console.log(car.getInfo());
//     console.log(motorcycle.getInfo());
//     console.log(electricCar.getInfo());
    
//     console.log(motorcycle.wheelie());
    
//     car.stop();
//     motorcycle.stop();
//     electricCar.stop();
// } catch (error) {
//     console.error('Ошибка:', error.message);
// } 