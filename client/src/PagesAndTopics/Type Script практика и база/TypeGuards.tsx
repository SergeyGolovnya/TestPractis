import React from 'react';

// 1. Type Guards с typeof
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

// 2. Type Guards с instanceof
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}

class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}
}

function isUser(value: unknown): value is User {
  return value instanceof User;
}

function isProduct(value: unknown): value is Product {
  return value instanceof Product;
}

// 3. Type Guards с in operator
interface Dog {
  bark(): void;
  breed: string;
}

interface Cat {
  meow(): void;
  color: string;
}

function isDog(value: unknown): value is Dog {
  return value !== null && typeof value === 'object' && 'bark' in value;
}

function isCat(value: unknown): value is Cat {
  return value !== null && typeof value === 'object' && 'meow' in value;
}

// 4. Custom Type Guards
interface Admin {
  id: number;
  name: string;
  role: 'admin';
  permissions: string[];
}

interface RegularUser {
  id: number;
  name: string;
  role: 'user';
  email: string;
}

type UserType = Admin | RegularUser;

function isAdmin(user: UserType): user is Admin {
  return user.role === 'admin';
}

function isRegularUser(user: UserType): user is RegularUser {
  return user.role === 'user';
}

// 5. Type Guards с discriminated unions
interface LoadingState {
  status: 'loading';
}

interface SuccessState<T> {
  status: 'success';
  data: T;
}

interface ErrorState {
  status: 'error';
  error: string;
}

type ApiState<T> = LoadingState | SuccessState<T> | ErrorState;

function isLoading<T>(state: ApiState<T>): state is LoadingState {
  return state.status === 'loading';
}

function isSuccess<T>(state: ApiState<T>): state is SuccessState<T> {
  return state.status === 'success';
}

function isError<T>(state: ApiState<T>): state is ErrorState {
  return state.status === 'error';
}

// 6. Type Guards для массивов
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

function isUserArray(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(item => item instanceof User);
}

// 7. Type Guards для объектов
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'data' in value &&
    'status' in value &&
    'message' in value &&
    typeof (value as any).status === 'number'
  );
}

// 8. Type Guards с дженериками
function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

function isRecord<K extends string, V>(
  value: unknown,
  keyGuard: (key: unknown) => key is K,
  valueGuard: (val: unknown) => val is V
): value is Record<K, V> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.entries(value).every(([key, val]) => keyGuard(key) && valueGuard(val))
  );
}

// 9. Type Guards для примитивов
function isPrimitive(value: unknown): value is string | number | boolean | null | undefined {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

// 10. Type Guards для функций
function isAsyncFunction(value: unknown): value is (...args: unknown[]) => Promise<unknown> {
  return typeof value === 'function' && value.constructor.name === 'AsyncFunction';
}

function isSyncFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function' && value.constructor.name === 'Function';
}

// 11. Type Guards для DOM элементов
function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

function isHTMLInputElement(value: unknown): value is HTMLInputElement {
  return value instanceof HTMLInputElement;
}

function isHTMLButtonElement(value: unknown): value is HTMLButtonElement {
  return value instanceof HTMLButtonElement;
}

// 12. Практические примеры
interface FormData {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

interface ValidationError {
  field: string;
  message: string;
}

type ValidationResult = FormData | ValidationError[];

function isValidFormData(value: ValidationResult): value is FormData {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'name' in value &&
    'email' in value &&
    'age' in value &&
    'preferences' in value
  );
}

function isValidationErrors(value: ValidationResult): value is ValidationError[] {
  return Array.isArray(value) && value.every(item => 
    typeof item === 'object' && 
    item !== null && 
    'field' in item && 
    'message' in item
  );
}

// 13. Type Guards для API ответов
interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: string;
  code: number;
}

type ApiResult<T> = SuccessResponse<T> | ErrorResponse;

function isSuccessResponse<T>(response: ApiResult<T>): response is SuccessResponse<T> {
  return response.success === true;
}

function isErrorResponse<T>(response: ApiResult<T>): response is ErrorResponse {
  return response.success === false;
}

// 14. Type Guards для событий
interface ClickEvent {
  type: 'click';
  x: number;
  y: number;
}

interface KeyEvent {
  type: 'keydown' | 'keyup';
  key: string;
  code: string;
}

type AppEvent = ClickEvent | KeyEvent;

function isClickEvent(event: AppEvent): event is ClickEvent {
  return event.type === 'click';
}

function isKeyEvent(event: AppEvent): event is KeyEvent {
  return event.type === 'keydown' || event.type === 'keyup';
}

// 15. Демонстрационные функции
const demonstrateTypeGuards = () => {
  // Type Guards с typeof
  const values = ['hello', 42, true, null, undefined, {}, []];

  values.forEach(value => {
    if (isString(value)) {
      console.log(`${value} is a string`);
    } else if (isNumber(value)) {
      console.log(`${value} is a number`);
    } else if (isBoolean(value)) {
      console.log(`${value} is a boolean`);
    } else if (isObject(value)) {
      console.log(`${value} is an object`);
    }
  });

  // Type Guards с instanceof
  const user = new User(1, 'Иван', 'ivan@example.com');
  const product = new Product('prod_1', 'Товар', 100);

  if (isUser(user)) {
    console.log('User:', user.name, user.email);
  }

  if (isProduct(product)) {
    console.log('Product:', product.name, product.price);
  }

  // Type Guards с discriminated unions
  const admin: Admin = { id: 1, name: 'Админ', role: 'admin', permissions: ['read', 'write'] };
  const regularUser: RegularUser = { id: 2, name: 'Пользователь', role: 'user', email: 'user@example.com' };

  if (isAdmin(admin)) {
    console.log('Admin permissions:', admin.permissions);
  }

  if (isRegularUser(regularUser)) {
    console.log('User email:', regularUser.email);
  }

  // Type Guards для API состояний
  const loadingState: ApiState<User> = { status: 'loading' };
  const successState: ApiState<User> = { status: 'success', data: user };
  const errorState: ApiState<User> = { status: 'error', error: 'Not found' };

  if (isLoading(loadingState)) {
    console.log('Loading...');
  }

  if (isSuccess(successState)) {
    console.log('Success:', successState.data.name);
  }

  if (isError(errorState)) {
    console.log('Error:', errorState.error);
  }

  // Type Guards для массивов
  const stringArray = ['hello', 'world'];
  const numberArray = [1, 2, 3, 4, 5];

  if (isStringArray(stringArray)) {
    console.log('String array:', stringArray.join(', '));
  }

  if (isNumberArray(numberArray)) {
    console.log('Number array sum:', numberArray.reduce((a, b) => a + b, 0));
  }

  // Type Guards для API результатов
  const successResponse: ApiResult<User> = { success: true, data: user };
  const errorResponse: ApiResult<User> = { success: false, error: 'User not found', code: 404 };

  if (isSuccessResponse(successResponse)) {
    console.log('API Success:', successResponse.data.name);
  }

  if (isErrorResponse(errorResponse)) {
    console.log('API Error:', errorResponse.error, errorResponse.code);
  }

  console.log('Type Guards демонстрация завершена');
};

const TypeGuardsPractice: React.FC = () => {
  console.log('=== TYPE GUARDS TYPESCRIPT ===');
  demonstrateTypeGuards();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика Type Guards TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Type Guards с typeof</h2>
          <p className="mb-2">Проверка примитивных типов</p>
          <p className="text-sm text-gray-600">function isString(value: unknown): value is string</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Type Guards с instanceof</h2>
          <p className="mb-2">Проверка экземпляров классов</p>
          <p className="text-sm text-gray-600">function isUser(value: unknown): value is User</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Type Guards с in operator</h2>
          <p className="mb-2">Проверка наличия свойств</p>
          <p className="text-sm text-gray-600">function isDog(value: unknown): value is Dog</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Custom Type Guards</h2>
          <p className="mb-2">Создание собственных type guards</p>
          <p className="text-sm text-gray-600">function isAdmin(user: UserType): user is Admin</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Discriminated Unions</h2>
          <p className="mb-2">Type guards для discriminated unions</p>
          <p className="text-sm text-gray-600">function isLoading&lt;T&gt;(state: ApiState&lt;T&gt;): state is LoadingState</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Type Guards для массивов</h2>
          <p className="mb-2">Проверка типов массивов</p>
          <p className="text-sm text-gray-600">function isStringArray(value: unknown): value is string[]</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Type Guards с дженериками</h2>
          <p className="mb-2">Переиспользуемые type guards</p>
          <p className="text-sm text-gray-600">function isArrayOf&lt;T&gt;(value: unknown, guard: (item: unknown) => item is T)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Практические примеры</h2>
          <p className="mb-2">Применение в реальных сценариях</p>
          <p className="text-sm text-gray-600">Валидация форм, API ответы, события</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Type guards сужают типы во время выполнения</li>
          <li>typeof для примитивных типов</li>
          <li>instanceof для экземпляров классов</li>
          <li>in operator для проверки свойств</li>
          <li>Custom type guards для сложной логики</li>
          <li>Discriminated unions с type guards</li>
          <li>Дженерики для переиспользуемых guards</li>
        </ul>
      </div>
    </div>
  );
};

export default TypeGuardsPractice; 