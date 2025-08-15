import React from 'react';

// 1. Базовые классы
class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public makeSound(): void {
    console.log('Some sound');
  }

  public getInfo(): string {
    return `${this.name}, ${this.age} years old`;
  }
}

// 2. Наследование
class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public makeSound(): void {
    console.log('Woof!');
  }

  public getBreed(): string {
    return this.breed;
  }

  public getInfo(): string {
    return `${super.getInfo()}, breed: ${this.breed}`;
  }
}

class Cat extends Animal {
  private color: string;

  constructor(name: string, age: number, color: string) {
    super(name, age);
    this.color = color;
  }

  public makeSound(): void {
    console.log('Meow!');
  }

  public getColor(): string {
    return this.color;
  }

  public getInfo(): string {
    return `${super.getInfo()}, color: ${this.color}`;
  }
}

// 3. Абстрактные классы
abstract class Vehicle {
  protected brand: string;
  protected model: string;
  protected year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  abstract startEngine(): void;
  abstract stopEngine(): void;

  public getInfo(): string {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}

class Car extends Vehicle {
  private fuelType: string;

  constructor(brand: string, model: string, year: number, fuelType: string) {
    super(brand, model, year);
    this.fuelType = fuelType;
  }

  public startEngine(): void {
    console.log('Car engine started');
  }

  public stopEngine(): void {
    console.log('Car engine stopped');
  }

  public getFuelType(): string {
    return this.fuelType;
  }
}

class Motorcycle extends Vehicle {
  private engineSize: number;

  constructor(brand: string, model: string, year: number, engineSize: number) {
    super(brand, model, year);
    this.engineSize = engineSize;
  }

  public startEngine(): void {
    console.log('Motorcycle engine started');
  }

  public stopEngine(): void {
    console.log('Motorcycle engine stopped');
  }

  public getEngineSize(): number {
    return this.engineSize;
  }
}

// 4. Интерфейсы с классами
interface Flyable {
  fly(): void;
  getMaxAltitude(): number;
}

interface Swimmable {
  swim(): void;
  getMaxDepth(): number;
}

class Duck extends Animal implements Flyable, Swimmable {
  private maxAltitude: number;
  private maxDepth: number;

  constructor(name: string, age: number, maxAltitude: number, maxDepth: number) {
    super(name, age);
    this.maxAltitude = maxAltitude;
    this.maxDepth = maxDepth;
  }

  public makeSound(): void {
    console.log('Quack!');
  }

  public fly(): void {
    console.log('Duck is flying');
  }

  public swim(): void {
    console.log('Duck is swimming');
  }

  public getMaxAltitude(): number {
    return this.maxAltitude;
  }

  public getMaxDepth(): number {
    return this.maxDepth;
  }
}

// 5. Дженерики в классах
class Stack<T> {
  private items: T[] = [];

  public push(item: T): void {
    this.items.push(item);
  }

  public pop(): T | undefined {
    return this.items.pop();
  }

  public peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public size(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }
}

class Queue<T> {
  private items: T[] = [];

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public front(): T | undefined {
    return this.items[0];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public size(): number {
    return this.items.length;
  }
}

// 6. Статические методы и свойства
class MathUtils {
  public static PI: number = 3.14159;
  public static E: number = 2.71828;

  public static add(a: number, b: number): number {
    return a + b;
  }

  public static multiply(a: number, b: number): number {
    return a * b;
  }

  public static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * MathUtils.factorial(n - 1);
  }
}

// 7. Синглтоны
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;

  private constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  public static getInstance(connectionString?: string): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(connectionString || 'default');
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    console.log(`Connecting to database: ${this.connectionString}`);
  }

  public disconnect(): void {
    console.log('Disconnecting from database');
  }
}

// 8. Декораторы (симуляция)
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: unknown[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
  
  return descriptor;
}

function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

// 9. Классы с декораторами
class Calculator {
  private result: number = 0;

  @log
  public add(a: number, b: number): number {
    this.result = a + b;
    return this.result;
  }

  @log
  public multiply(a: number, b: number): number {
    this.result = a * b;
    return this.result;
  }

  @readonly
  public getResult(): number {
    return this.result;
  }
}

// 10. Классы с интерфейсами и дженериками
interface Repository<T> {
  find(id: string | number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<boolean>;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  async find(id: string | number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: Date.now(),
      ...data
    };
    this.users.push(user);
    return user;
  }

  async update(id: string | number, data: Partial<User>): Promise<User> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async delete(id: string | number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }
}

// 11. Практические примеры
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// Event Emitter класс
class EventEmitter<T extends Record<string, unknown[]>> {
  private events: Map<keyof T, Array<(...args: unknown[]) => void>> = new Map();

  public on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(listener as (...args: unknown[]) => void);
  }

  public emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  public off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const listeners = this.events.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener as (...args: unknown[]) => void);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
}

// Демонстрационные функции
const demonstrateClasses = () => {
  // Базовые классы
  const dog = new Dog('Бобик', 3, 'Лабрадор');
  const cat = new Cat('Мурка', 2, 'Рыжий');

  console.log('Dog info:', dog.getInfo());
  console.log('Cat info:', cat.getInfo());

  dog.makeSound();
  cat.makeSound();

  // Абстрактные классы
  const car = new Car('Toyota', 'Camry', 2020, 'Gasoline');
  const motorcycle = new Motorcycle('Honda', 'CBR600RR', 2019, 600);

  console.log('Car info:', car.getInfo());
  console.log('Motorcycle info:', motorcycle.getInfo());

  car.startEngine();
  motorcycle.startEngine();

  // Интерфейсы
  const duck = new Duck('Кряква', 1, 1000, 10);
  duck.fly();
  duck.swim();
  console.log('Duck max altitude:', duck.getMaxAltitude());
  console.log('Duck max depth:', duck.getMaxDepth());

  // Дженерики
  const numberStack = new Stack<number>();
  numberStack.push(1);
  numberStack.push(2);
  numberStack.push(3);

  const stringQueue = new Queue<string>();
  stringQueue.enqueue('first');
  stringQueue.enqueue('second');
  stringQueue.enqueue('third');

  console.log('Stack peek:', numberStack.peek());
  console.log('Queue front:', stringQueue.front());

  // Статические методы
  console.log('MathUtils.PI:', MathUtils.PI);
  console.log('MathUtils.add(5, 3):', MathUtils.add(5, 3));
  console.log('MathUtils.factorial(5):', MathUtils.factorial(5));

  // Синглтон
  const db1 = DatabaseConnection.getInstance('connection1');
  const db2 = DatabaseConnection.getInstance('connection2');
  console.log('Same instance:', db1 === db2);

  // Калькулятор с декораторами
  const calc = new Calculator();
  calc.add(5, 3);
  calc.multiply(4, 6);
  console.log('Calculator result:', calc.getResult());

  // Event Emitter
  type AppEvents = {
    'user:created': [User];
    'user:updated': [User];
    'user:deleted': [number];
  };

  const emitter = new EventEmitter<AppEvents>();
  emitter.on('user:created', (user) => {
    console.log('User created:', user.name);
  });

  const newUser: User = { id: 1, name: 'Иван', email: 'ivan@example.com', age: 25 };
  emitter.emit('user:created', newUser);
};

const ClassesPractice: React.FC = () => {
  console.log('=== КЛАССЫ TYPESCRIPT ===');
  demonstrateClasses();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика классов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые классы</h2>
          <p className="mb-2">Создание классов с методами и свойствами</p>
          <p className="text-sm text-gray-600">class Animal {`{ protected name: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Наследование</h2>
          <p className="mb-2">extends для создания иерархии классов</p>
          <p className="text-sm text-gray-600">class Dog extends Animal {`{ private breed: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Абстрактные классы</h2>
          <p className="mb-2">Классы с абстрактными методами</p>
          <p className="text-sm text-gray-600">abstract class Vehicle {`{ abstract startEngine(): void; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Интерфейсы</h2>
          <p className="mb-2">Реализация интерфейсов в классах</p>
          <p className="text-sm text-gray-600">class Duck extends Animal implements Flyable, Swimmable</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Дженерики</h2>
          <p className="mb-2">Классы с типовыми параметрами</p>
          <p className="text-sm text-gray-600">class Stack&lt;T&gt; {`{ private items: T[]; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Статические методы</h2>
          <p className="mb-2">Методы и свойства класса</p>
          <p className="text-sm text-gray-600">class MathUtils {`{ public static add(a: number, b: number): number }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Синглтоны</h2>
          <p className="mb-2">Паттерн Singleton</p>
          <p className="text-sm text-gray-600">public static getInstance(): DatabaseConnection</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Декораторы</h2>
          <p className="mb-2">Метапрограммирование с декораторами</p>
          <p className="text-sm text-gray-600">@log public add(a: number, b: number): number</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Классы поддерживают наследование и полиморфизм</li>
          <li>Модификаторы доступа: public, private, protected</li>
          <li>Абстрактные классы для определения интерфейса</li>
          <li>Интерфейсы для множественного наследования</li>
          <li>Дженерики для переиспользуемых классов</li>
          <li>Статические методы и свойства принадлежат классу</li>
          <li>Декораторы для метапрограммирования</li>
        </ul>
      </div>
    </div>
  );
};

export default ClassesPractice; 