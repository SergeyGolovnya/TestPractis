import React from 'react';

// 1. Базовые type assertions
function demonstrateBasicAssertions() {
  // as синтаксис
  const someValue: unknown = 'Hello World';
  const stringValue = someValue as string;
  console.log('String value:', stringValue.toUpperCase());

  // <> синтаксис (не рекомендуется в JSX)
  const numberValue = <number>someValue;
  console.log('Number value:', numberValue);

  // Утверждение к union типу
  const value: string | number = '42';
  const numericValue = value as number;
  console.log('Numeric value:', numericValue);
}

// 2. Type assertions с объектами
interface User {
  id: number;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
  role: 'admin';
}

function demonstrateObjectAssertions() {
  const userData = {
    id: 1,
    name: 'Иван',
    email: 'ivan@example.com',
    permissions: ['read', 'write', 'delete'],
    role: 'admin'
  };

  // Утверждение к интерфейсу
  const user = userData as User;
  console.log('User:', user.name);

  // Утверждение к расширенному интерфейсу
  const admin = userData as AdminUser;
  console.log('Admin permissions:', admin.permissions);

  // Утверждение к unknown и обратно
  const unknownData: unknown = userData;
  const typedUser = unknownData as User;
  console.log('Typed user:', typedUser.email);
}

// 3. Type assertions с массивами
function demonstrateArrayAssertions() {
  const mixedArray: unknown[] = [1, 'hello', true, { id: 1 }];

  // Утверждение к массиву чисел
  const numbers = mixedArray as number[];
  console.log('Numbers array:', numbers);

  // Утверждение к массиву строк
  const strings = mixedArray as string[];
  console.log('Strings array:', strings);

  // Утверждение к массиву объектов
  const objects = mixedArray as Array<{ id: number }>;
  console.log('Objects array:', objects);

  // Утверждение к tuple
  const tuple = mixedArray as [number, string, boolean, { id: number }];
  console.log('Tuple:', tuple);
}

// 4. Type assertions с функциями
function demonstrateFunctionAssertions() {
  // Утверждение типа функции
  const unknownFunction: unknown = (a: number, b: number) => a + b;
  const addFunction = unknownFunction as (a: number, b: number) => number;
  console.log('Add function result:', addFunction(5, 3));

  // Утверждение к async функции
  const asyncFunction = unknownFunction as (a: number, b: number) => Promise<number>;
  console.log('Async function type:', typeof asyncFunction);

  // Утверждение к callback функции
  type Callback<T> = (value: T) => void;
  const callback = unknownFunction as Callback<number>;
  console.log('Callback type:', typeof callback);
}

// 5. Type assertions с дженериками
function demonstrateGenericAssertions() {
  // Утверждение к дженерик типу
  const data: unknown = [1, 2, 3, 4, 5];
  const numberArray = data as Array<number>;
  console.log('Number array sum:', numberArray.reduce((a, b) => a + b, 0));

  // Утверждение к Record типу
  const objectData: unknown = { name: 'John', age: 30 };
  const userRecord = objectData as Record<string, string | number>;
  console.log('User record:', userRecord);

  // Утверждение к Promise типу
  const promiseData: unknown = Promise.resolve('Hello');
  const stringPromise = promiseData as Promise<string>;
  console.log('String promise type:', typeof stringPromise);
}

// 6. Type assertions с union типами
function demonstrateUnionAssertions() {
  type StringOrNumber = string | number;
  type BooleanOrNull = boolean | null;

  const value1: unknown = 'Hello';
  const value2: unknown = 42;
  const value3: unknown = true;

  // Утверждение к union типу
  const stringOrNumber1 = value1 as StringOrNumber;
  const stringOrNumber2 = value2 as StringOrNumber;
  const booleanOrNull = value3 as BooleanOrNull;

  console.log('String or number 1:', stringOrNumber1);
  console.log('String or number 2:', stringOrNumber2);
  console.log('Boolean or null:', booleanOrNull);
}

// 7. Type assertions с const assertions
function demonstrateConstAssertions() {
  // Обычное утверждение
  const colors = ['red', 'green', 'blue'] as string[];
  console.log('Colors array type:', typeof colors);

  // Const assertion
  const constColors = ['red', 'green', 'blue'] as const;
  console.log('Const colors type:', typeof constColors);

  // Утверждение к readonly массиву
  const readonlyColors = ['red', 'green', 'blue'] as readonly string[];
  console.log('Readonly colors type:', typeof readonlyColors);
}

// 8. Type assertions с intersection типами
function demonstrateIntersectionAssertions() {
  interface HasId {
    id: number;
  }

  interface HasName {
    name: string;
  }

  interface HasEmail {
    email: string;
  }

  type User = HasId & HasName & HasEmail;

  const partialData = {
    id: 1,
    name: 'Иван'
  };

  // Утверждение к intersection типу
  const user = partialData as User;
  console.log('User with intersection type:', user);
}

// 9. Type assertions с conditional типами
function demonstrateConditionalAssertions() {
  type IsString<T> = T extends string ? true : false;
  type IsNumber<T> = T extends number ? true : false;

  const stringValue: unknown = 'Hello';
  const numberValue: unknown = 42;

  // Утверждение с conditional типами
  const isString = (stringValue as string) extends string ? true : false;
  const isNumber = (numberValue as number) extends number ? true : false;

  console.log('Is string:', isString);
  console.log('Is number:', isNumber);
}

// 10. Type assertions с mapped типами
function demonstrateMappedAssertions() {
  interface OriginalUser {
    id: number;
    name: string;
    email: string;
  }

  type OptionalUser = {
    [K in keyof OriginalUser]?: OriginalUser[K];
  };

  type ReadonlyUser = {
    readonly [K in keyof OriginalUser]: OriginalUser[K];
  };

  const userData = {
    id: 1,
    name: 'Иван',
    email: 'ivan@example.com'
  };

  // Утверждение к mapped типам
  const optionalUser = userData as OptionalUser;
  const readonlyUser = userData as ReadonlyUser;

  console.log('Optional user:', optionalUser);
  console.log('Readonly user:', readonlyUser);
}

// 11. Type assertions с utility типами
function demonstrateUtilityAssertions() {
  interface ComplexUser {
    id: number;
    name: string;
    email: string;
    profile: {
      avatar: string;
      bio: string;
    };
    settings: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  }

  const userData = {
    id: 1,
    name: 'Иван',
    email: 'ivan@example.com',
    profile: {
      avatar: 'avatar.jpg',
      bio: 'Software developer'
    },
    settings: {
      theme: 'dark' as const,
      notifications: true
    }
  };

  // Утверждение к utility типам
  const partialUser = userData as Partial<ComplexUser>;
  const readonlyUser = userData as Readonly<ComplexUser>;
  const pickedUser = userData as Pick<ComplexUser, 'id' | 'name'>;
  const omittedUser = userData as Omit<ComplexUser, 'profile' | 'settings'>;

  console.log('Partial user:', partialUser);
  console.log('Readonly user:', readonlyUser);
  console.log('Picked user:', pickedUser);
  console.log('Omitted user:', omittedUser);
}

// 12. Type assertions с API ответами
function demonstrateApiAssertions() {
  interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }

  const apiData: unknown = {
    data: {
      id: 1,
      name: 'Иван',
      email: 'ivan@example.com'
    },
    status: 200,
    message: 'Success'
  };

  // Утверждение к API ответу
  const userResponse = apiData as ApiResponse<User>;
  console.log('User response:', userResponse.data.name);

  // Утверждение к массиву пользователей
  const usersData: unknown = {
    data: [
      { id: 1, name: 'Иван', email: 'ivan@example.com' },
      { id: 2, name: 'Мария', email: 'maria@example.com' }
    ],
    status: 200,
    message: 'Success'
  };

  const usersResponse = usersData as ApiResponse<User[]>;
  console.log('Users response:', usersResponse.data.length);
}

// 13. Type assertions с событиями
function demonstrateEventAssertions() {
  // Утверждение к DOM событиям
  const event: unknown = new Event('click');
  const clickEvent = event as MouseEvent;
  console.log('Click event type:', typeof clickEvent);

  // Утверждение к React событиям
  const reactEvent: unknown = { target: { value: 'Hello' } };
  const changeEvent = reactEvent as React.ChangeEvent<HTMLInputElement>;
  console.log('Change event value:', changeEvent.target.value);

  // Утверждение к кастомным событиям
  interface CustomEvent {
    type: 'user:created' | 'user:updated' | 'user:deleted';
    payload: { id: number; name: string };
  }

  const customEventData: unknown = {
    type: 'user:created',
    payload: { id: 1, name: 'Иван' }
  };

  const customEvent = customEventData as CustomEvent;
  console.log('Custom event:', customEvent.type, customEvent.payload);
}

// 14. Type assertions с React компонентами
function demonstrateReactAssertions() {
  // Утверждение к React компоненту
  const Component: unknown = () => <div>Hello</div>;
  const ReactComponent = Component as React.ComponentType;
  console.log('React component type:', typeof ReactComponent);

  // Утверждение к React элементу
  const element: unknown = <div>Hello</div>;
  const ReactElement = element as React.ReactElement;
  console.log('React element type:', typeof ReactElement);

  // Утверждение к React node
  const node: unknown = 'Hello World';
  const ReactNode = node as React.ReactNode;
  console.log('React node type:', typeof ReactNode);
}

// 15. Демонстрационные функции
const demonstrateTypeAssertions = () => {
  console.log('=== ДЕМОНСТРАЦИЯ TYPE ASSERTIONS ===');

  // Базовые утверждения
  demonstrateBasicAssertions();

  // Утверждения с объектами
  demonstrateObjectAssertions();

  // Утверждения с массивами
  demonstrateArrayAssertions();

  // Утверждения с функциями
  demonstrateFunctionAssertions();

  // Утверждения с дженериками
  demonstrateGenericAssertions();

  // Утверждения с union типами
  demonstrateUnionAssertions();

  // Const assertions
  demonstrateConstAssertions();

  // Утверждения с intersection типами
  demonstrateIntersectionAssertions();

  // Утверждения с conditional типами
  demonstrateConditionalAssertions();

  // Утверждения с mapped типами
  demonstrateMappedAssertions();

  // Утверждения с utility типами
  demonstrateUtilityAssertions();

  // Утверждения с API ответами
  demonstrateApiAssertions();

  // Утверждения с событиями
  demonstrateEventAssertions();

  // Утверждения с React компонентами
  demonstrateReactAssertions();

  console.log('Type Assertions демонстрация завершена');
};

const TypeAssertionsPractice: React.FC = () => {
  console.log('=== TYPE ASSERTIONS TYPESCRIPT ===');
  demonstrateTypeAssertions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика Type Assertions TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые type assertions</h2>
          <p className="mb-2">as синтаксис, &lt;&gt; синтаксис</p>
          <p className="text-sm text-gray-600">const stringValue = someValue as string;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Type assertions с объектами</h2>
          <p className="mb-2">Утверждение к интерфейсам</p>
          <p className="text-sm text-gray-600">const user = userData as User;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Type assertions с массивами</h2>
          <p className="mb-2">Утверждение к массивам и tuple</p>
          <p className="text-sm text-gray-600">const numbers = mixedArray as number[];</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Type assertions с функциями</h2>
          <p className="mb-2">Утверждение типов функций</p>
          <p className="text-sm text-gray-600">const addFunction = unknownFunction as (a: number, b: number) => number;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Type assertions с дженериками</h2>
          <p className="mb-2">Утверждение к дженерик типам</p>
          <p className="text-sm text-gray-600">const numberArray = data as Array&lt;number&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Const assertions</h2>
          <p className="mb-2">as const для литеральных типов</p>
          <p className="text-sm text-gray-600">const constColors = ['red', 'green', 'blue'] as const;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Type assertions с utility типами</h2>
          <p className="mb-2">Partial, Readonly, Pick, Omit</p>
          <p className="text-sm text-gray-600">const partialUser = userData as Partial&lt;ComplexUser&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Type assertions с API</h2>
          <p className="mb-2">Утверждение API ответов</p>
          <p className="text-sm text-gray-600">const userResponse = apiData as ApiResponse&lt;User&gt;;</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>as синтаксис предпочтительнее &lt;&gt; в JSX</li>
          <li>Type assertions не проверяют типы во время выполнения</li>
          <li>Используйте с осторожностью, когда уверены в типе</li>
          <li>Полезны для работы с unknown типами</li>
          <li>Const assertions создают литеральные типы</li>
          <li>Можно комбинировать с utility типами</li>
          <li>Важны для интеграции с внешними API</li>
        </ul>
      </div>
    </div>
  );
};

export default TypeAssertionsPractice; 