import React from 'react';

// 1. Type Aliases (псевдонимы типов)
type UserId = string | number;
type UserRole = 'admin' | 'user' | 'moderator';
type UserStatus = 'active' | 'inactive' | 'banned';

type User = {
  id: UserId;
  name: string;
  role: UserRole;
  status: UserStatus;
  email: string;
};

// 2. Mapped Types (отображенные типы)
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 3. Conditional Types (условные типы)
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;
type IsBoolean<T> = T extends boolean ? true : false;

type ExtractString<T> = T extends string ? T : never;
type ExtractNumber<T> = T extends number ? T : never;
type ExtractBoolean<T> = T extends boolean ? T : never;

// 4. Infer в условных типах
type ArrayElement<T> = T extends Array<infer U> ? U : never;
type PromiseType<T> = T extends Promise<infer U> ? U : never;
type FunctionReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;
type FunctionParams<T> = T extends (...args: infer P) => unknown ? P : never;

// 5. Distributive Conditional Types
type ToArray<T> = T extends unknown ? T[] : never;
type ToUnion<T> = T extends unknown ? T : never;

// 6. Template Literal Types с type aliases
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ApiEndpoint = `/api/${string}`;
type FullEndpoint = `${HttpMethod} ${ApiEndpoint}`;

type EmailLocale = 'ru' | 'en';
type EmailType = 'welcome' | 'reset' | 'notification';
type EmailTemplate = `${EmailType}_${EmailLocale}`;

// 7. Utility Types с type aliases
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 8. Branded Types (брендированные типы)
type Brand<K, T> = K & { __brand: T };

type UserIdBrand = Brand<string, 'UserId'>;
type ProductIdBrand = Brand<string, 'ProductId'>;
type OrderIdBrand = Brand<string, 'OrderId'>;

// 9. Nominal Types (номинальные типы)
type Nominal<T, K> = T & { readonly __nominal: K };

type USD = Nominal<number, 'USD'>;
type EUR = Nominal<number, 'EUR'>;
type RUB = Nominal<number, 'RUB'>;

// 10. Const Assertions с type aliases
type Colors = readonly ['red', 'green', 'blue', 'yellow'];
type Numbers = readonly [1, 2, 3, 4, 5];

// 11. Recursive Types (рекурсивные типы)
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

type LinkedList<T> = {
  value: T;
  next: LinkedList<T> | null;
};

// 12. Intersection Types с type aliases
type HasId = { id: string | number };
type HasName = { name: string };
type HasEmail = { email: string };

type IdentifiableUser = HasId & HasName & HasEmail;

// 13. Union Types с type aliases
type Status = 'loading' | 'success' | 'error';
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; error: string };

type ApiState<T> = LoadingState | SuccessState<T> | ErrorState;

// 14. Mapped Types с модификаторами
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Setters<T> = {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

type EventHandlers<T> = {
  [P in keyof T as `on${Capitalize<string & P>}`]: (event: T[P]) => void;
};

// 15. Conditional Types с infer
type IsArray<T> = T extends Array<unknown> ? true : false;
type IsFunction<T> = T extends Function ? true : false;
type IsObject<T> = T extends object ? true : false;

type ArrayElementType<T> = T extends Array<infer U> ? U : never;
type FunctionReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

// 16. Практические примеры
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  metadata: {
    brand: string;
    model: string;
    year: number;
  };
};

// Создание форм
type ProductForm = DeepPartial<Product>;
type ProductUpdate = Pick<Product, 'name' | 'price' | 'category'>;
type ProductCreate = Omit<Product, 'id'>;

// API типы
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type ProductResponse = ApiResponse<Product>;
type ProductsResponse = ApiResponse<Product[]>;

// Event handlers
type ProductEvents = {
  click: MouseEvent;
  change: ChangeEvent;
  submit: FormEvent;
};

type ProductEventHandlers = EventHandlers<ProductEvents>;

// State management
type ProductState = {
  items: Product[];
  selectedItem: Product | null;
  loading: boolean;
  error: string | null;
  filters: Partial<Pick<Product, 'category' | 'price'>>;
};

// Демонстрационные функции
const demonstrateTypes = () => {
  // Type Aliases
  const userId: UserId = 'user_123';
  const userRole: UserRole = 'admin';
  const user: User = {
    id: userId,
    name: 'Иван',
    role: userRole,
    status: 'active',
    email: 'ivan@example.com'
  };

  // Mapped Types
  const optionalUser: Optional<User> = {
    name: 'Иван'
    // остальные свойства опциональны
  };

  const readonlyUser: Readonly<User> = {
    id: 'user_123',
    name: 'Иван',
    role: 'user',
    status: 'active',
    email: 'ivan@example.com'
  };

  // Conditional Types
  const isString: IsString<string> = true;
  const isNumber: IsNumber<number> = true;
  const isBoolean: IsBoolean<boolean> = true;

  // Array Element Types
  const numbers: number[] = [1, 2, 3, 4, 5];
  type NumberType = ArrayElement<typeof numbers>; // number

  // Promise Types
  const userPromise: Promise<User> = Promise.resolve(user);
  type UserFromPromise = PromiseType<typeof userPromise>; // User

  // Branded Types
  const userIdBrand: UserIdBrand = 'user_123' as UserIdBrand;
  const productIdBrand: ProductIdBrand = 'product_456' as ProductIdBrand;

  // Nominal Types
  const usdAmount: USD = 100 as USD;
  const eurAmount: EUR = 85 as EUR;

  // Template Literal Types
  const endpoint: FullEndpoint = 'GET /api/users';
  const emailTemplate: EmailTemplate = 'welcome_ru';

  // Deep Utility Types
  const deepPartialProduct: DeepPartial<Product> = {
    name: 'Товар',
    metadata: {
      brand: 'Бренд'
      // model и year опциональны
    }
  };

  console.log('Type Aliases демонстрация:', {
    user,
    optionalUser,
    readonlyUser,
    isString,
    isNumber,
    isBoolean,
    userIdBrand,
    productIdBrand,
    usdAmount,
    eurAmount,
    endpoint,
    emailTemplate,
    deepPartialProduct
  });
};

const TypesPractice: React.FC = () => {
  console.log('=== TYPE ALIASES TYPESCRIPT ===');
  demonstrateTypes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика Type Aliases TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Type Aliases</h2>
          <p className="mb-2">Создание псевдонимов для типов</p>
          <p className="text-sm text-gray-600">type UserId = string | number;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Mapped Types</h2>
          <p className="mb-2">Трансформация типов с помощью отображений</p>
          <p className="text-sm text-gray-600">type Optional&lt;T&gt; = {`{ [P in keyof T]?: T[P]; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Conditional Types</h2>
          <p className="mb-2">Типы, зависящие от условий</p>
          <p className="text-sm text-gray-600">type IsString&lt;T&gt; = T extends string ? true : false;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Infer</h2>
          <p className="mb-2">Извлечение типов из других типов</p>
          <p className="text-sm text-gray-600">type ArrayElement&lt;T&gt; = T extends Array&lt;infer U&gt; ? U : never;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Template Literal Types</h2>
          <p className="mb-2">Создание типов на основе строковых шаблонов</p>
          <p className="text-sm text-gray-600">type EmailTemplate = `${EmailType}_${EmailLocale}`;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Branded Types</h2>
          <p className="mb-2">Создание уникальных типов с брендингом</p>
          <p className="text-sm text-gray-600">type UserIdBrand = Brand&lt;string, 'UserId'&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Recursive Types</h2>
          <p className="mb-2">Рекурсивные типы для сложных структур</p>
          <p className="text-sm text-gray-600">type TreeNode&lt;T&gt; = {`{ value: T; children: TreeNode<T>[]; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Mapped Types с модификаторами</h2>
          <p className="mb-2">Создание геттеров, сеттеров и обработчиков событий</p>
          <p className="text-sm text-gray-600">type Getters&lt;T&gt; = {`{ [P in keyof T as \`get${Capitalize<string & P>}\`]: () => T[P]; }`}</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Type aliases позволяют создавать переиспользуемые типы</li>
          <li>Mapped types трансформируют существующие типы</li>
          <li>Conditional types создают логику в типах</li>
          <li>Infer извлекает типы из других типов</li>
          <li>Template literal types создают сложные строковые типы</li>
          <li>Branded types обеспечивают уникальность типов</li>
          <li>Recursive types работают с вложенными структурами</li>
        </ul>
      </div>
    </div>
  );
};

export default TypesPractice; 