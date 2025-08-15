import React from 'react';

// 1. Базовые экспорты
export const PI = 3.14159;
export const E = 2.71828;

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// 2. Default экспорты
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    return a / b;
  }
}

// 3. Именованные экспорты
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned'
}

// 4. Re-экспорты
export { Calculator as MathCalculator } from './Calculator';
export * from './types';
export { default as UserService } from './UserService';

// 5. Namespace
export namespace MathUtils {
  export const PI = 3.14159;
  export const E = 2.71828;

  export function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  export function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  export namespace Geometry {
    export function circleArea(radius: number): number {
      return PI * radius * radius;
    }

    export function rectangleArea(width: number, height: number): number {
      return width * height;
    }
  }
}

// 6. Модули с дженериками
export interface Repository<T> {
  find(id: string | number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<boolean>;
}

export class BaseRepository<T> implements Repository<T> {
  protected items: T[] = [];

  async find(id: string | number): Promise<T | null> {
    return this.items.find((item: any) => item.id === id) || null;
  }

  async findAll(): Promise<T[]> {
    return [...this.items];
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const item = { id: Date.now(), ...data } as T;
    this.items.push(item);
    return item;
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    const index = this.items.findIndex((item: any) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }

  async delete(id: string | number): Promise<boolean> {
    const index = this.items.findIndex((item: any) => item.id === id);
    if (index === -1) return false;
    
    this.items.splice(index, 1);
    return true;
  }
}

// 7. Модули с константами
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  COMMENTS: '/api/comments'
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const;

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

// 8. Модули с типами
export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];
export type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];

export interface ApiResponse<T> {
  data: T;
  status: StatusCode;
  message: string;
}

export interface ApiError {
  error: string;
  code: StatusCode;
  details?: unknown;
}

// 9. Модули с утилитами
export function createApiClient(baseUrl: string) {
  return {
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
      const response = await fetch(`${baseUrl}${endpoint}`);
      const data = await response.json();
      return {
        data,
        status: response.status as StatusCode,
        message: response.statusText
      };
    },

    async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return {
        data,
        status: response.status as StatusCode,
        message: response.statusText
      };
    }
  };
}

// 10. Модули с событиями
export type EventHandler<T = Event> = (event: T) => void;

export interface EventEmitter<T extends Record<string, unknown[]>> {
  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void;
  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void;
  emit<K extends keyof T>(event: K, ...args: T[K]): void;
}

export class BaseEventEmitter<T extends Record<string, unknown[]>> implements EventEmitter<T> {
  private handlers: Map<keyof T, EventHandler<unknown>[]> = new Map();

  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler as EventHandler<unknown>);
  }

  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler as EventHandler<unknown>);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(args));
    }
  }
}

// 11. Модули с конфигурацией
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

export const defaultConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  debug: false
};

export function createConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...defaultConfig, ...overrides };
}

// 12. Модули с валидацией
export interface ValidationRule<T> {
  validate(value: T): boolean;
  message: string;
}

export class StringValidation {
  static required(): ValidationRule<string> {
    return {
      validate: (value: string) => value.trim().length > 0,
      message: 'Field is required'
    };
  }

  static minLength(min: number): ValidationRule<string> {
    return {
      validate: (value: string) => value.length >= min,
      message: `Minimum length is ${min} characters`
    };
  }

  static email(): ValidationRule<string> {
    return {
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format'
    };
  }
}

export class NumberValidation {
  static min(min: number): ValidationRule<number> {
    return {
      validate: (value: number) => value >= min,
      message: `Value must be at least ${min}`
    };
  }

  static max(max: number): ValidationRule<number> {
    return {
      validate: (value: number) => value <= max,
      message: `Value must be at most ${max}`
    };
  }
}

// 13. Демонстрационные функции
const demonstrateModules = () => {
  console.log('=== ДЕМОНСТРАЦИЯ МОДУЛЕЙ ===');

  // Базовые экспорты
  console.log('PI:', PI);
  console.log('E:', E);
  console.log('add(5, 3):', add(5, 3));
  console.log('multiply(4, 6):', multiply(4, 6));

  // Default экспорты
  const calc = new Calculator();
  console.log('Calculator add:', calc.add(10, 5));
  console.log('Calculator multiply:', calc.multiply(4, 7));

  // Namespace
  console.log('MathUtils.PI:', MathUtils.PI);
  console.log('MathUtils.factorial(5):', MathUtils.factorial(5));
  console.log('MathUtils.fibonacci(10):', MathUtils.fibonacci(10));
  console.log('MathUtils.Geometry.circleArea(5):', MathUtils.Geometry.circleArea(5));

  // Константы
  console.log('API_ENDPOINTS:', API_ENDPOINTS);
  console.log('HTTP_METHODS:', HTTP_METHODS);
  console.log('STATUS_CODES:', STATUS_CODES);

  // Утилиты
  const apiClient = createApiClient('https://api.example.com');
  console.log('API Client created:', apiClient);

  // Конфигурация
  const config = createConfig({ debug: true, timeout: 10000 });
  console.log('App config:', config);

  // Валидация
  const emailRule = StringValidation.email();
  const minLengthRule = StringValidation.minLength(5);
  const ageRule = NumberValidation.min(18);

  console.log('Email validation:', emailRule.validate('test@example.com'));
  console.log('Min length validation:', minLengthRule.validate('hello'));
  console.log('Age validation:', ageRule.validate(25));

  console.log('Modules демонстрация завершена');
};

const ModulesPractice: React.FC = () => {
  console.log('=== МОДУЛИ TYPESCRIPT ===');
  demonstrateModules();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика модулей TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые экспорты</h2>
          <p className="mb-2">export const, export function</p>
          <p className="text-sm text-gray-600">export const PI = 3.14159;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Default экспорты</h2>
          <p className="mb-2">export default class/function</p>
          <p className="text-sm text-gray-600">export default class Calculator</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Именованные экспорты</h2>
          <p className="mb-2">export interface, export type, export enum</p>
          <p className="text-sm text-gray-600">export interface User {`{ id: number; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Re-экспорты</h2>
          <p className="mb-2">export { ... } from './module'</p>
          <p className="text-sm text-gray-600">export { Calculator as MathCalculator } from './Calculator';</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Namespace</h2>
          <p className="mb-2">export namespace для группировки</p>
          <p className="text-sm text-gray-600">export namespace MathUtils {`{ export const PI = 3.14159; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Модули с дженериками</h2>
          <p className="mb-2">export interface Repository&lt;T&gt;</p>
          <p className="text-sm text-gray-600">export class BaseRepository&lt;T&gt; implements Repository&lt;T&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Константы и типы</h2>
          <p className="mb-2">export const, export type</p>
          <p className="text-sm text-gray-600">export const API_ENDPOINTS = { ... } as const;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Утилиты и конфигурация</h2>
          <p className="mb-2">Функции-утилиты и конфигурация</p>
          <p className="text-sm text-gray-600">export function createApiClient(baseUrl: string)</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Модули позволяют организовать код в отдельные файлы</li>
          <li>export для экспорта функций, классов, интерфейсов</li>
          <li>export default для основного экспорта модуля</li>
          <li>import для импорта из других модулей</li>
          <li>Namespace для группировки связанного кода</li>
          <li>Re-экспорты для создания публичного API</li>
          <li>Модули поддерживают дженерики и типы</li>
        </ul>
      </div>
    </div>
  );
};

export default ModulesPractice; 