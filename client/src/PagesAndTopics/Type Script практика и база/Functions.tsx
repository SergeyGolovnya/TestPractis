import React from 'react';

// 1. Базовая типизация функций
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => {
  return a * b;
};

// 2. Функции с опциональными параметрами
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Привет, ${name}!`;
}

// 3. Функции с параметрами по умолчанию
function createUser(name: string, age: number = 18, email: string = ''): object {
  return { name, age, email };
}

// 4. Функции с rest параметрами
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

function formatString(template: string, ...values: string[]): string {
  return template.replace(/\{(\d+)\}/g, (_, index) => values[parseInt(index)] || '');
}

// 5. Функции с union типами
function processValue(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value.toString();
  } else {
    return value ? 'true' : 'false';
  }
}

// 6. Функции с дженериками
function identity<T>(arg: T): T {
  return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// 7. Перегрузки функций (function overloads)
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  throw new Error('Несовместимые типы');
}

// 8. Callback функции
type Callback<T> = (value: T) => void;
type AsyncCallback<T> = (value: T) => Promise<void>;

function forEach<T>(arr: T[], callback: Callback<T>): void {
  arr.forEach(callback);
}

function map<T, U>(arr: T[], transform: (item: T) => U): U[] {
  return arr.map(transform);
}

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

// 9. Функции высшего порядка
type Predicate<T> = (item: T) => boolean;
type Transformer<T, U> = (item: T) => U;

function createFilter<T>(predicate: Predicate<T>) {
  return (arr: T[]): T[] => arr.filter(predicate);
}

function createMapper<T, U>(transform: Transformer<T, U>) {
  return (arr: T[]): U[] => arr.map(transform);
}

// 10. Функции с this контекстом
interface Calculator {
  value: number;
  add(n: number): void;
  multiply(n: number): void;
  getValue(): number;
}

function createCalculator(initialValue: number = 0): Calculator {
  return {
    value: initialValue,
    add(n: number): void {
      this.value += n;
    },
    multiply(n: number): void {
      this.value *= n;
    },
    getValue(): number {
      return this.value;
    }
  };
}

// 11. Асинхронные функции
async function fetchUser(id: number): Promise<{ id: number; name: string; email: string }> {
  // Симуляция API вызова
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
    }, 100);
  });
}

async function fetchUsers(ids: number[]): Promise<Array<{ id: number; name: string; email: string }>> {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises);
}

// 12. Функции с условными типами
type IsFunction<T> = T extends Function ? true : false;
type FunctionReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;
type FunctionParams<T> = T extends (...args: infer P) => unknown ? P : never;

// 13. Функции с декораторами (симуляция)
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: unknown[]) {
    console.log(`Вызов метода ${propertyKey} с аргументами:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Результат метода ${propertyKey}:`, result);
    return result;
  };
  
  return descriptor;
}

// 14. Функции с currying
type CurriedFunction<T extends unknown[], R> = 
  T extends [infer First, ...infer Rest]
    ? Rest extends []
      ? (arg: First) => R
      : (arg: First) => CurriedFunction<Rest, R>
    : never;

function curry<T extends unknown[], R>(fn: (...args: T) => R): CurriedFunction<T, R> {
  return ((...args: unknown[]) => {
    if (args.length >= fn.length) {
      return fn(...(args as T));
    }
    return curry(fn.bind(null, ...args));
  }) as CurriedFunction<T, R>;
}

// 15. Практические примеры
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface UserFilters {
  name?: string;
  age?: number;
  email?: string;
}

// API функции
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(endpoint, options);
  const data = await response.json();
  return {
    data,
    status: response.status,
    message: response.statusText
  };
}

// Функции для работы с пользователями
function createUserValidator() {
  return (user: Partial<User>): user is User => {
    return !!(user.id && user.name && user.email && user.age);
  };
}

function createUserSorter(field: keyof User, direction: 'asc' | 'desc' = 'asc') {
  return (a: User, b: User): number => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  };
}

function createUserFilter(filters: UserFilters) {
  return (user: User): boolean => {
    if (filters.name && !user.name.includes(filters.name)) return false;
    if (filters.age && user.age !== filters.age) return false;
    if (filters.email && !user.email.includes(filters.email)) return false;
    return true;
  };
}

// Демонстрационные функции
const demonstrateFunctions = () => {
  // Базовые функции
  console.log('add(5, 3):', add(5, 3));
  console.log('multiply(4, 6):', multiply(4, 6));
  
  // Опциональные параметры
  console.log('greet("Иван"):', greet('Иван'));
  console.log('greet("Иван", "Добрый день"):', greet('Иван', 'Добрый день'));
  
  // Rest параметры
  console.log('sum(1, 2, 3, 4, 5):', sum(1, 2, 3, 4, 5));
  console.log('formatString:',
    formatString('Привет, {0}! Тебе {1} лет.', 'Иван', '25')
  );
  
  // Union типы
  console.log('processValue("hello"):', processValue('hello'));
  console.log('processValue(42):', processValue(42));
  console.log('processValue(true):', processValue(true));
  
  // Дженерики
  console.log('identity("hello"):', identity('hello'));
  console.log('firstElement([1, 2, 3]):', firstElement([1, 2, 3]));
  console.log('merge:', merge({ name: 'Иван' }, { age: 25 }));
  
  // Перегрузки
  console.log('combine("hello", "world"):', combine('hello', 'world'));
  console.log('combine(5, 3):', combine(5, 3));
  
  // Callbacks
  const numbers = [1, 2, 3, 4, 5];
  const doubled = map(numbers, n => n * 2);
  const evens = filter(numbers, n => n % 2 === 0);
  
  console.log('doubled:', doubled);
  console.log('evens:', evens);
  
  // Функции высшего порядка
  const isEven = createFilter((n: number) => n % 2 === 0);
  const double = createMapper((n: number) => n * 2);
  
  console.log('isEven([1,2,3,4,5]):', isEven([1, 2, 3, 4, 5]));
  console.log('double([1,2,3,4,5]):', double([1, 2, 3, 4, 5]));
  
  // Calculator
  const calc = createCalculator(10);
  calc.add(5);
  calc.multiply(2);
  console.log('Calculator value:', calc.getValue());
  
  // Асинхронные функции
  fetchUser(1).then(user => {
    console.log('Fetched user:', user);
  });
  
  // Практические примеры
  const users: User[] = [
    { id: 1, name: 'Иван', email: 'ivan@example.com', age: 25 },
    { id: 2, name: 'Мария', email: 'maria@example.com', age: 30 },
    { id: 3, name: 'Петр', email: 'peter@example.com', age: 25 }
  ];
  
  const nameSorter = createUserSorter('name', 'asc');
  const ageFilter = createUserFilter({ age: 25 });
  
  const sortedUsers = [...users].sort(nameSorter);
  const filteredUsers = users.filter(ageFilter);
  
  console.log('Sorted users:', sortedUsers);
  console.log('Filtered users (age 25):', filteredUsers);
};

const FunctionsPractice: React.FC = () => {
  console.log('=== ТИПИЗАЦИЯ ФУНКЦИЙ TYPESCRIPT ===');
  demonstrateFunctions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика типизации функций TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовая типизация</h2>
          <p className="mb-2">Типизация параметров и возвращаемых значений</p>
          <p className="text-sm text-gray-600">function add(a: number, b: number): number</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Опциональные параметры</h2>
          <p className="mb-2">Параметры, которые могут отсутствовать</p>
          <p className="text-sm text-gray-600">function greet(name: string, greeting?: string)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Rest параметры</h2>
          <p className="mb-2">Переменное количество аргументов</p>
          <p className="text-sm text-gray-600">function sum(...numbers: number[]): number</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Перегрузки функций</h2>
          <p className="mb-2">Несколько сигнатур для одной функции</p>
          <p className="text-sm text-gray-600">function combine(a: string, b: string): string;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Callback функции</h2>
          <p className="mb-2">Типизация функций обратного вызова</p>
          <p className="text-sm text-gray-600">type Callback&lt;T&gt; = (value: T) => void;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Функции высшего порядка</h2>
          <p className="mb-2">Функции, возвращающие функции</p>
          <p className="text-sm text-gray-600">function createFilter&lt;T&gt;(predicate: Predicate&lt;T&gt;)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Асинхронные функции</h2>
          <p className="mb-2">Типизация async/await функций</p>
          <p className="text-sm text-gray-600">async function fetchUser(id: number): Promise&lt;User&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Currying</h2>
          <p className="mb-2">Частичное применение функций</p>
          <p className="text-sm text-gray-600">function curry&lt;T, R&gt;(fn: (...args: T) => R)</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Всегда типизируйте параметры и возвращаемые значения</li>
          <li>Используйте опциональные параметры для гибкости</li>
          <li>Rest параметры для переменного количества аргументов</li>
          <li>Перегрузки для разных сигнатур функции</li>
          <li>Дженерики для переиспользуемых функций</li>
          <li>Callback типы для функций обратного вызова</li>
          <li>Promise типы для асинхронных функций</li>
        </ul>
      </div>
    </div>
  );
};

export default FunctionsPractice; 