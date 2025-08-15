import React from 'react';

// 1. Базовые типы ошибок
interface BaseError {
  message: string;
  code?: string;
  timestamp: string;
}

interface ValidationError extends BaseError {
  field: string;
  value: unknown;
  rule: string;
}

interface NetworkError extends BaseError {
  status: number;
  url: string;
  method: string;
}

interface DatabaseError extends BaseError {
  table: string;
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  constraint?: string;
}

// 2. Result типы
type Result<T, E = Error> = Success<T> | Failure<E>;

interface Success<T> {
  success: true;
  data: T;
}

interface Failure<E> {
  success: false;
  error: E;
}

// 3. Either типы
type Either<L, R> = Left<L> | Right<R>;

interface Left<L> {
  left: L;
  right?: never;
}

interface Right<R> {
  left?: never;
  right: R;
}

// 4. Option типы
type Option<T> = Some<T> | None;

interface Some<T> {
  some: T;
  none?: never;
}

interface None {
  some?: never;
  none: true;
}

// 5. Try типы
type Try<T> = Success<T> | Failure<Error>;

// 6. Кастомные классы ошибок
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationErrorClass extends AppError {
  constructor(
    message: string,
    public field: string,
    public value: unknown,
    public rule: string
  ) {
    super(message, 'VALIDATION_ERROR', { field, value, rule });
    this.name = 'ValidationError';
  }
}

class NetworkErrorClass extends AppError {
  constructor(
    message: string,
    public status: number,
    public url: string,
    public method: string
  ) {
    super(message, 'NETWORK_ERROR', { status, url, method });
    this.name = 'NetworkError';
  }
}

class DatabaseErrorClass extends AppError {
  constructor(
    message: string,
    public table: string,
    public operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE',
    public constraint?: string
  ) {
    super(message, 'DATABASE_ERROR', { table, operation, constraint });
    this.name = 'DatabaseError';
  }
}

// 7. Утилиты для работы с ошибками
function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

function isValidationError(error: unknown): error is ValidationErrorClass {
  return error instanceof ValidationErrorClass;
}

function isNetworkError(error: unknown): error is NetworkErrorClass {
  return error instanceof NetworkErrorClass;
}

function isDatabaseError(error: unknown): error is DatabaseErrorClass {
  return error instanceof DatabaseErrorClass;
}

// 8. Result утилиты
function success<T>(data: T): Success<T> {
  return { success: true, data };
}

function failure<E>(error: E): Failure<E> {
  return { success: false, error };
}

function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success;
}

function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return !result.success;
}

// 9. Either утилиты
function left<L, R>(value: L): Either<L, R> {
  return { left: value };
}

function right<L, R>(value: R): Either<L, R> {
  return { right: value };
}

function isLeft<L, R>(either: Either<L, R>): either is Left<L> {
  return 'left' in either;
}

function isRight<L, R>(either: Either<L, R>): either is Right<R> {
  return 'right' in either;
}

// 10. Option утилиты
function some<T>(value: T): Option<T> {
  return { some: value };
}

function none<T>(): Option<T> {
  return { none: true };
}

function isSome<T>(option: Option<T>): option is Some<T> {
  return 'some' in option;
}

function isNone<T>(option: Option<T>): option is None {
  return 'none' in option;
}

// 11. Try утилиты
function tryCatch<T>(fn: () => T): Try<T> {
  try {
    return success(fn());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
}

async function tryAsync<T>(fn: () => Promise<T>): Promise<Try<T>> {
  try {
    return success(await fn());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
}

// 12. Валидация с типизацией
interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

class Validator<T> {
  private rules: Array<{ field: keyof T; rule: ValidationRule<T[keyof T]> }> = [];

  addRule<K extends keyof T>(field: K, rule: ValidationRule<T[K]>): this {
    this.rules.push({ field, rule } as any);
    return this;
  }

  validate(data: T): Result<T, ValidationErrorClass[]> {
    const errors: ValidationErrorClass[] = [];

    for (const { field, rule } of this.rules) {
      const value = data[field];
      if (!rule.validate(value)) {
        errors.push(new ValidationErrorClass(
          rule.message,
          String(field),
          value,
          rule.message
        ));
      }
    }

    return errors.length > 0 ? failure(errors) : success(data);
  }
}

// 13. API с обработкой ошибок
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function apiCall<T>(url: string, options?: RequestInit): Promise<Result<ApiResponse<T>, NetworkErrorClass>> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new NetworkErrorClass(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        url,
        options?.method || 'GET'
      );
    }

    const data = await response.json();
    return success({
      data,
      status: response.status,
      message: response.statusText
    });
  } catch (error) {
    if (error instanceof NetworkErrorClass) {
      return failure(error);
    }
    
    return failure(new NetworkErrorClass(
      error instanceof Error ? error.message : 'Unknown error',
      0,
      url,
      options?.method || 'GET'
    ));
  }
}

// 14. База данных с обработкой ошибок
interface DatabaseOperation<T> {
  table: string;
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  data?: T;
  where?: Record<string, unknown>;
}

async function databaseCall<T>(op: DatabaseOperation<T>): Promise<Result<T[], DatabaseErrorClass>> {
  try {
    // Симуляция операции с базой данных
    if (Math.random() > 0.8) {
      throw new DatabaseErrorClass(
        'Constraint violation',
        op.table,
        op.operation,
        'unique_constraint'
      );
    }

    // Симуляция успешного результата
    const result = [] as T[];
    return success(result);
  } catch (error) {
    if (error instanceof DatabaseErrorClass) {
      return failure(error);
    }
    
    return failure(new DatabaseErrorClass(
      error instanceof Error ? error.message : 'Unknown database error',
      op.table,
      op.operation
    ));
  }
}

// 15. Практические примеры
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
}

// Валидация пользователя
const userValidator = new Validator<CreateUserRequest>()
  .addRule('name', {
    validate: (value) => value.trim().length >= 2,
    message: 'Name must be at least 2 characters long'
  })
  .addRule('email', {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Invalid email format'
  })
  .addRule('age', {
    validate: (value) => value >= 18 && value <= 100,
    message: 'Age must be between 18 and 100'
  });

// Функция создания пользователя
async function createUser(userData: CreateUserRequest): Promise<Result<User, AppError>> {
  // Валидация
  const validationResult = userValidator.validate(userData);
  if (isFailure(validationResult)) {
    return failure(validationResult.error[0]);
  }

  // API вызов
  const apiResult = await apiCall<User>('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (isFailure(apiResult)) {
    return failure(apiResult.error);
  }

  return success(apiResult.data.data);
}

// 16. Демонстрационные функции
const demonstrateErrorHandling = async () => {
  console.log('=== ДЕМОНСТРАЦИЯ ОБРАБОТКИ ОШИБОК ===');

  // Result типы
  const successResult = success('Hello World');
  const failureResult = failure(new Error('Something went wrong'));

  console.log('Success result:', successResult);
  console.log('Failure result:', failureResult);
  console.log('Is success:', isSuccess(successResult));
  console.log('Is failure:', isFailure(failureResult));

  // Either типы
  const leftValue = left<string, number>('error');
  const rightValue = right<string, number>(42);

  console.log('Left value:', leftValue);
  console.log('Right value:', rightValue);
  console.log('Is left:', isLeft(leftValue));
  console.log('Is right:', isRight(rightValue));

  // Option типы
  const someValue = some('Hello');
  const noneValue = none<string>();

  console.log('Some value:', someValue);
  console.log('None value:', noneValue);
  console.log('Is some:', isSome(someValue));
  console.log('Is none:', isNone(noneValue));

  // Try утилиты
  const tryResult = tryCatch(() => {
    if (Math.random() > 0.5) {
      throw new Error('Random error');
    }
    return 'Success';
  });

  console.log('Try result:', tryResult);

  // Кастомные ошибки
  const validationError = new ValidationErrorClass(
    'Invalid email',
    'email',
    'invalid-email',
    'email_format'
  );

  const networkError = new NetworkErrorClass(
    'Not Found',
    404,
    '/api/users/999',
    'GET'
  );

  const databaseError = new DatabaseErrorClass(
    'Unique constraint violation',
    'users',
    'INSERT',
    'email_unique'
  );

  console.log('Validation error:', validationError);
  console.log('Network error:', networkError);
  console.log('Database error:', databaseError);

  // Проверка типов ошибок
  console.log('Is validation error:', isValidationError(validationError));
  console.log('Is network error:', isNetworkError(networkError));
  console.log('Is database error:', isDatabaseError(databaseError));

  // Валидация пользователя
  const userData: CreateUserRequest = {
    name: 'Иван',
    email: 'invalid-email',
    age: 15
  };

  const validationResult = userValidator.validate(userData);
  console.log('Validation result:', validationResult);

  // Создание пользователя
  const createResult = await createUser(userData);
  console.log('Create user result:', createResult);

  console.log('Error Handling демонстрация завершена');
};

const ErrorHandlingPractice: React.FC = () => {
  console.log('=== ОБРАБОТКА ОШИБОК TYPESCRIPT ===');
  demonstrateErrorHandling();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика обработки ошибок TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые типы ошибок</h2>
          <p className="mb-2">BaseError, ValidationError, NetworkError</p>
          <p className="text-sm text-gray-600">interface BaseError {`{ message: string; code?: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Result типы</h2>
          <p className="mb-2">Success&lt;T&gt;, Failure&lt;E&gt;, Result&lt;T, E&gt;</p>
          <p className="text-sm text-gray-600">type Result&lt;T, E&gt; = Success&lt;T&gt; | Failure&lt;E&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Either типы</h2>
          <p className="mb-2">Left&lt;L&gt;, Right&lt;R&gt;, Either&lt;L, R&gt;</p>
          <p className="text-sm text-gray-600">type Either&lt;L, R&gt; = Left&lt;L&gt; | Right&lt;R&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Option типы</h2>
          <p className="mb-2">Some&lt;T&gt;, None, Option&lt;T&gt;</p>
          <p className="text-sm text-gray-600">type Option&lt;T&gt; = Some&lt;T&gt; | None;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Кастомные классы ошибок</h2>
          <p className="mb-2">AppError, ValidationErrorClass, NetworkErrorClass</p>
          <p className="text-sm text-gray-600">class AppError extends Error {`{ constructor(message: string, code: string) }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Утилиты для работы с ошибками</h2>
          <p className="mb-2">isAppError, isValidationError, success, failure</p>
          <p className="text-sm text-gray-600">function isAppError(error: unknown): error is AppError</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Валидация с типизацией</h2>
          <p className="mb-2">Validator&lt;T&gt;, ValidationRule&lt;T&gt;</p>
          <p className="text-sm text-gray-600">class Validator&lt;T&gt; {`{ addRule<K extends keyof T>(field: K, rule: ValidationRule<T[K]>): this }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. API с обработкой ошибок</h2>
          <p className="mb-2">apiCall с Result типами</p>
          <p className="text-sm text-gray-600">async function apiCall&lt;T&gt;(url: string): Promise&lt;Result&lt;ApiResponse&lt;T&gt;, NetworkErrorClass&gt;&gt;</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Result типы для безопасной обработки ошибок</li>
          <li>Either типы для альтернативных результатов</li>
          <li>Option типы для опциональных значений</li>
          <li>Кастомные классы ошибок для специфичных ошибок</li>
          <li>Type guards для проверки типов ошибок</li>
          <li>Валидация с типизированными правилами</li>
          <li>API вызовы с обработкой ошибок</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorHandlingPractice; 