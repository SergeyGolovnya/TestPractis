import React from 'react';

// 1. Ambient declarations (глобальные объявления)
declare global {
  // Глобальные переменные
  const APP_VERSION: string;
  const API_BASE_URL: string;
  const IS_DEVELOPMENT: boolean;

  // Глобальные функции
  function log(message: string, level?: 'info' | 'warn' | 'error'): void;
  function formatDate(date: Date, format?: string): string;
  function generateId(): string;

  // Глобальные интерфейсы
  interface Window {
    analytics: {
      track(event: string, data?: Record<string, unknown>): void;
      identify(userId: string, traits?: Record<string, unknown>): void;
    };
    store: {
      getState(): unknown;
      dispatch(action: unknown): void;
    };
  }

  // Глобальные типы
  type GlobalConfig = {
    apiUrl: string;
    timeout: number;
    retries: number;
  };

  // Глобальные модули
  namespace GlobalUtils {
    function debounce<T extends (...args: unknown[]) => unknown>(
      func: T,
      wait: number
    ): T;
    
    function throttle<T extends (...args: unknown[]) => unknown>(
      func: T,
      limit: number
    ): T;
  }
}

// 2. Module declarations (объявления модулей)
declare module 'external-library' {
  export interface ExternalConfig {
    apiKey: string;
    endpoint: string;
    timeout?: number;
  }

  export class ExternalClient {
    constructor(config: ExternalConfig);
    request<T>(path: string): Promise<T>;
    post<T>(path: string, data: unknown): Promise<T>;
  }

  export function createClient(config: ExternalConfig): ExternalClient;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: unknown;
  export default content;
}

// 3. Namespace declarations (объявления пространств имен)
declare namespace API {
  interface Response<T> {
    data: T;
    status: number;
    message: string;
  }

  interface Error {
    error: string;
    code: number;
    details?: unknown;
  }

  type Result<T> = Response<T> | Error;

  namespace Endpoints {
    const USERS: '/api/users';
    const POSTS: '/api/posts';
    const COMMENTS: '/api/comments';
  }

  namespace Methods {
    const GET: 'GET';
    const POST: 'POST';
    const PUT: 'PUT';
    const DELETE: 'DELETE';
  }
}

declare namespace Utils {
  function formatCurrency(amount: number, currency?: string): string;
  function formatDate(date: Date, locale?: string): string;
  function validateEmail(email: string): boolean;
  function generateUUID(): string;
}

// 4. Interface merging (слияние интерфейсов)
interface User {
  id: number;
  name: string;
  email: string;
}

// Расширение интерфейса в другом файле
declare module './user' {
  interface User {
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }
}

// 5. Function overloading declarations
declare function processData(data: string): string;
declare function processData(data: number): number;
declare function processData(data: boolean): boolean;
declare function processData(data: unknown): unknown;

// 6. Class declarations
declare class DatabaseConnection {
  private constructor();
  static getInstance(): DatabaseConnection;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: unknown[]): Promise<T[]>;
}

declare class CacheManager {
  constructor(maxSize?: number);
  set<T>(key: string, value: T, ttl?: number): void;
  get<T>(key: string): T | null;
  delete(key: string): boolean;
  clear(): void;
}

// 7. Enum declarations
declare enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

declare enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

// 8. Type declarations
declare type ApiEndpoint = '/api/users' | '/api/posts' | '/api/comments';
declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
declare type Theme = 'light' | 'dark' | 'auto';

declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

declare type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 9. Conditional type declarations
declare type IsString<T> = T extends string ? true : false;
declare type IsNumber<T> = T extends number ? true : false;
declare type IsBoolean<T> = T extends boolean ? true : false;

declare type ExtractString<T> = T extends string ? T : never;
declare type ExtractNumber<T> = T extends number ? T : never;
declare type ExtractBoolean<T> = T extends boolean ? T : never;

// 10. Mapped type declarations
declare type Optional<T> = {
  [P in keyof T]?: T[P];
};

declare type Required<T> = {
  [P in keyof T]-?: T[P];
};

declare type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

declare type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 11. Utility type declarations
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
declare type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
declare type InstanceType<T> = T extends new (...args: unknown[]) => infer R ? R : never;

// 12. React-specific declarations
declare namespace React {
  interface CSSProperties {
    [key: string]: string | number | undefined;
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Добавление кастомных атрибутов
    'data-testid'?: string;
    'data-cy'?: string;
  }
}

// 13. Third-party library declarations
declare module 'lodash' {
  export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    options?: { leading?: boolean; trailing?: boolean }
  ): T;

  export function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    options?: { leading?: boolean; trailing?: boolean }
  ): T;

  export function cloneDeep<T>(value: T): T;
  export function merge<T>(object: T, ...sources: unknown[]): T;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
  }

  export interface AxiosResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig;
  }

  export interface AxiosError<T = unknown> {
    message: string;
    code?: string;
    config: AxiosRequestConfig;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
  }

  export function create(config?: AxiosRequestConfig): AxiosInstance;
  export function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  export function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

// 14. Environment-specific declarations
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    REDIS_URL?: string;
  }

  interface Process {
    env: ProcessEnv;
  }
}

// 15. Browser-specific declarations
declare interface Navigator {
  share?: (data: {
    title?: string;
    text?: string;
    url?: string;
  }) => Promise<void>;
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: unknown;
  __REACT_DEVTOOLS_GLOBAL_HOOK__?: unknown;
}

// 16. Демонстрационные функции
const demonstrateDeclarationFiles = () => {
  console.log('=== ДЕМОНСТРАЦИЯ DECLARATION FILES ===');

  // Глобальные объявления
  console.log('Global declarations available');
  console.log('APP_VERSION:', typeof APP_VERSION);
  console.log('API_BASE_URL:', typeof API_BASE_URL);
  console.log('IS_DEVELOPMENT:', typeof IS_DEVELOPMENT);

  // Глобальные функции
  log('Test message', 'info');
  console.log('Formatted date:', formatDate(new Date()));
  console.log('Generated ID:', generateId());

  // Window объект
  if (window.analytics) {
    window.analytics.track('page_view', { page: '/home' });
  }

  // Namespace
  console.log('API Endpoints:', API.Endpoints);
  console.log('API Methods:', API.Methods);

  // Utils namespace
  console.log('Utils available:', typeof Utils.formatCurrency);
  console.log('Email validation:', Utils.validateEmail('test@example.com'));

  // Enum
  console.log('User roles:', UserRole);
  console.log('HTTP statuses:', HttpStatus);

  // Type examples
  const endpoint: ApiEndpoint = '/api/users';
  const method: HttpMethod = 'GET';
  const theme: Theme = 'dark';

  console.log('Type examples:', { endpoint, method, theme });

  // Utility types
  type PartialUser = Optional<User>;
  type RequiredUser = Required<User>;
  type ReadonlyUser = Readonly<User>;

  console.log('Utility types defined');

  // Conditional types
  type StringCheck = IsString<string>;
  type NumberCheck = IsNumber<number>;
  type BooleanCheck = IsBoolean<boolean>;

  console.log('Conditional types:', { StringCheck, NumberCheck, BooleanCheck });

  console.log('Declaration Files демонстрация завершена');
};

const DeclarationFilesPractice: React.FC = () => {
  console.log('=== DECLARATION FILES TYPESCRIPT ===');
  demonstrateDeclarationFiles();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика Declaration Files TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Ambient declarations</h2>
          <p className="mb-2">declare global для глобальных объявлений</p>
          <p className="text-sm text-gray-600">declare global {`{ const APP_VERSION: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Module declarations</h2>
          <p className="mb-2">declare module для внешних библиотек</p>
          <p className="text-sm text-gray-600">declare module 'external-library' {`{ export interface Config }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Namespace declarations</h2>
          <p className="mb-2">declare namespace для группировки</p>
          <p className="text-sm text-gray-600">declare namespace API {`{ interface Response<T> }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Interface merging</h2>
          <p className="mb-2">Расширение интерфейсов в разных файлах</p>
          <p className="text-sm text-gray-600">declare module './user' {`{ interface User { avatar?: string; } }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Function overloading</h2>
          <p className="mb-2">declare function для перегрузки</p>
          <p className="text-sm text-gray-600">declare function processData(data: string): string;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Class declarations</h2>
          <p className="mb-2">declare class для внешних классов</p>
          <p className="text-sm text-gray-600">declare class DatabaseConnection {`{ static getInstance(): DatabaseConnection; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Type declarations</h2>
          <p className="mb-2">declare type для глобальных типов</p>
          <p className="text-sm text-gray-600">declare type ApiEndpoint = '/api/users' | '/api/posts';</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. React declarations</h2>
          <p className="mb-2">Расширение React типов</p>
          <p className="text-sm text-gray-600">declare namespace React {`{ interface CSSProperties }`}</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Ambient declarations для глобальных типов</li>
          <li>Module declarations для внешних библиотек</li>
          <li>Namespace declarations для группировки</li>
          <li>Interface merging для расширения типов</li>
          <li>Function overloading для множественных сигнатур</li>
          <li>Class declarations для внешних классов</li>
          <li>Type declarations для глобальных типов</li>
        </ul>
      </div>
    </div>
  );
};

export default DeclarationFilesPractice; 