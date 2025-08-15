import React from 'react';

// 1. Intersection Types (пересечение типов)
interface HasId {
  id: string | number;
}

interface HasName {
  name: string;
}

interface HasEmail {
  email: string;
}

type User = HasId & HasName & HasEmail;

// 2. Discriminated Unions (различаемые объединения)
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

// 3. Conditional Types (условные типы)
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;
type IsBoolean<T> = T extends boolean ? true : false;

type ExtractString<T> = T extends string ? T : never;
type ExtractNumber<T> = T extends number ? T : never;
type ExtractBoolean<T> = T extends boolean ? T : never;

// 4. Mapped Types с условными типами
type ConditionalMapped<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
};

type StringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// 5. Template Literal Types (шаблонные литеральные типы)
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ApiEndpoint = `/api/${string}`;
type FullEndpoint = `${HttpMethod} ${ApiEndpoint}`;

type EmailLocale = 'ru' | 'en';
type EmailType = 'welcome' | 'reset' | 'notification';
type EmailTemplate = `${EmailType}_${EmailLocale}`;

// 6. Recursive Types (рекурсивные типы)
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

// 7. Branded Types (брендированные типы)
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, 'UserId'>;
type ProductId = Brand<string, 'ProductId'>;
type OrderId = Brand<string, 'OrderId'>;

// 8. Nominal Types (номинальные типы)
type Nominal<T, K> = T & { readonly __nominal: K };

type USD = Nominal<number, 'USD'>;
type EUR = Nominal<number, 'EUR'>;
type RUB = Nominal<number, 'RUB'>;

// 9. Utility Types с продвинутой логикой
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 10. Conditional Types с infer
type ArrayElement<T> = T extends Array<infer U> ? U : never;
type PromiseType<T> = T extends Promise<infer U> ? U : never;
type FunctionReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;
type FunctionParams<T> = T extends (...args: infer P) => unknown ? P : never;

// 11. Distributive Conditional Types
type ToArray<T> = T extends unknown ? T[] : never;
type ToUnion<T> = T extends unknown ? T : never;

// 12. Non-distributive Conditional Types
type ToArrayNonDistributive<T> = [T] extends [unknown] ? T[] : never;

// 13. Mapped Types с модификаторами
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Setters<T> = {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

type EventHandlers<T> = {
  [P in keyof T as `on${Capitalize<string & P>}`]: (event: T[P]) => void;
};

// 14. Conditional Types с never
type NonNullable<T> = T extends null | undefined ? never : T;
type NonFunction<T> = T extends Function ? never : T;
type NonArray<T> = T extends Array<unknown> ? never : T;

// 15. Advanced Utility Types
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type ReadonlyKeys<T> = {
  [K in keyof T]-?: {} extends { -readonly [P in K]: T[K] } ? never : K;
}[keyof T];

// 16. Практические примеры
interface Product {
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
  variants: {
    color: string;
    size: string;
    stock: number;
  }[];
}

// Создание форм с продвинутыми типами
type ProductForm = DeepPartial<Product>;
type ProductUpdate = Pick<Product, 'name' | 'price' | 'category'>;
type ProductCreate = Omit<Product, 'id'>;

// API типы с discriminated unions
type ProductResponse = ApiState<Product>;
type ProductsResponse = ApiState<Product[]>;

// Event handlers с template literal types
type ProductEvents = {
  click: MouseEvent;
  change: ChangeEvent;
  submit: FormEvent;
};

type ProductEventHandlers = EventHandlers<ProductEvents>;

// State management с продвинутыми типами
type ProductState = {
  items: Product[];
  selectedItem: Product | null;
  loading: boolean;
  error: string | null;
  filters: Partial<Pick<Product, 'category' | 'price'>>;
};

// Демонстрационные функции
const demonstrateAdvancedTypes = () => {
  // Intersection Types
  const user: User = {
    id: 'user_123',
    name: 'Иван',
    email: 'ivan@example.com'
  };

  // Discriminated Unions
  const loadingState: ApiState<Product> = { status: 'loading' };
  const successState: ApiState<Product> = {
    status: 'success',
    data: {
      id: 'product_1',
      name: 'Товар',
      price: 100,
      category: 'Электроника',
      tags: ['новый', 'популярный'],
      metadata: { brand: 'Brand', model: 'Model', year: 2023 },
      variants: [{ color: 'черный', size: 'M', stock: 10 }]
    }
  };
  const errorState: ApiState<Product> = {
    status: 'error',
    error: 'Не удалось загрузить товар'
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
  const userId: UserId = 'user_123' as UserId;
  const productId: ProductId = 'product_456' as ProductId;

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

  // Mapped Types с модификаторами
  type ProductGetters = Getters<Product>;
  type ProductSetters = Setters<Product>;

  console.log('Advanced Types демонстрация:', {
    user,
    loadingState,
    successState,
    errorState,
    isString,
    isNumber,
    isBoolean,
    userId,
    productId,
    usdAmount,
    eurAmount,
    endpoint,
    emailTemplate,
    deepPartialProduct
  });
};

const AdvancedTypesPractice: React.FC = () => {
  console.log('=== ПРОДВИНУТЫЕ ТИПЫ TYPESCRIPT ===');
  demonstrateAdvancedTypes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика продвинутых типов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Intersection Types</h2>
          <p className="mb-2">Объединение нескольких типов</p>
          <p className="text-sm text-gray-600">type User = HasId & HasName & HasEmail;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Discriminated Unions</h2>
          <p className="mb-2">Union типы с общим свойством-дискриминатором</p>
          <p className="text-sm text-gray-600">type ApiState&lt;T&gt; = LoadingState | SuccessState&lt;T&gt; | ErrorState;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Conditional Types</h2>
          <p className="mb-2">Типы, зависящие от условий</p>
          <p className="text-sm text-gray-600">type IsString&lt;T&gt; = T extends string ? true : false;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Template Literal Types</h2>
          <p className="mb-2">Создание типов на основе строковых шаблонов</p>
          <p className="text-sm text-gray-600">type EmailTemplate = `${EmailType}_${EmailLocale}`;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Recursive Types</h2>
          <p className="mb-2">Типы, ссылающиеся на самих себя</p>
          <p className="text-sm text-gray-600">type TreeNode&lt;T&gt; = {`{ value: T; children: TreeNode<T>[]; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Branded Types</h2>
          <p className="mb-2">Создание уникальных типов с брендингом</p>
          <p className="text-sm text-gray-600">type UserId = Brand&lt;string, 'UserId'&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Conditional Types с infer</h2>
          <p className="mb-2">Извлечение типов из других типов</p>
          <p className="text-sm text-gray-600">type ArrayElement&lt;T&gt; = T extends Array&lt;infer U&gt; ? U : never;</p>
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
          <li>Intersection types объединяют несколько типов</li>
          <li>Discriminated unions обеспечивают безопасность типов</li>
          <li>Conditional types создают логику в типах</li>
          <li>Template literal types создают сложные строковые типы</li>
          <li>Recursive types работают с вложенными структурами</li>
          <li>Branded types обеспечивают уникальность типов</li>
          <li>Infer извлекает типы из других типов</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedTypesPractice; 