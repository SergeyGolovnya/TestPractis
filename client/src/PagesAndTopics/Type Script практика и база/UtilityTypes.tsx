import React from 'react';

// 1. Partial<T> - делает все свойства опциональными
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  profile: {
    avatar: string;
    bio: string;
  };
}

type PartialUser = Partial<User>;

// 2. Required<T> - делает все свойства обязательными
type RequiredUser = Required<User>;

// 3. Readonly<T> - делает все свойства только для чтения
type ReadonlyUser = Readonly<User>;

// 4. Pick<T, K> - выбирает только указанные свойства
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// 5. Omit<T, K> - исключает указанные свойства
type UserWithoutId = Omit<User, 'id'>;
type UserWithoutProfile = Omit<User, 'profile'>;

// 6. Record<K, T> - создает объект с ключами K и значениями T
type UserRoles = Record<string, 'admin' | 'user' | 'moderator'>;
type ApiEndpoints = Record<'users' | 'posts' | 'comments', string>;

// 7. Exclude<T, U> - исключает типы из union
type NonNullableString = Exclude<string | null | undefined, null | undefined>;
type NonStringTypes = Exclude<string | number | boolean, string>;

// 8. Extract<T, U> - извлекает типы из union
type StringTypes = Extract<string | number | boolean, string>;
type NumberTypes = Extract<string | number | boolean, number>;

// 9. ReturnType<T> - получает тип возвращаемого значения функции
function fetchUser(id: number): Promise<User> {
  return Promise.resolve({} as User);
}

type FetchUserReturn = ReturnType<typeof fetchUser>;

// 10. Parameters<T> - получает типы параметров функции
type FetchUserParams = Parameters<typeof fetchUser>;

// 11. InstanceType<T> - получает тип экземпляра класса
class UserService {
  constructor(private apiUrl: string) {}
  
  async getUser(id: number): Promise<User> {
    return {} as User;
  }
}

type UserServiceInstance = InstanceType<typeof UserService>;

// 12. ConstructorParameters<T> - получает типы параметров конструктора
type UserServiceConstructorParams = ConstructorParameters<typeof UserService>;

// 13. ThisType<T> - указывает тип this в функции
interface ApiContext {
  baseUrl: string;
  token: string;
}

function apiCall(this: ApiContext, endpoint: string) {
  return `${this.baseUrl}/${endpoint}`;
}

// 14. NonNullable<T> - исключает null и undefined
type NonNullableUser = NonNullable<User | null | undefined>;

// 15. Uppercase<T>, Lowercase<T>, Capitalize<T>, Uncapitalize<T>
type UppercaseString = Uppercase<'hello world'>; // "HELLO WORLD"
type LowercaseString = Lowercase<'HELLO WORLD'>; // "hello world"
type CapitalizedString = Capitalize<'hello world'>; // "Hello world"
type UncapitalizedString = Uncapitalize<'Hello World'>; // "hello world"

// 16. Awaited<T> - получает тип из Promise
type UserFromPromise = Awaited<Promise<User>>;

// 17. Deep utility types (рекурсивные)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 18. Conditional utility types
type IsArray<T> = T extends Array<unknown> ? true : false;
type IsFunction<T> = T extends Function ? true : false;
type IsObject<T> = T extends object ? true : false;

// 19. Mapped utility types
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// 20. Практические примеры
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

// Создание форм
type ProductForm = Partial<Product>;
type ProductUpdate = Pick<Product, 'name' | 'price' | 'category'>;
type ProductCreate = Omit<Product, 'id'>;

// API типы
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type ProductResponse = ApiResponse<Product>;
type ProductsResponse = ApiResponse<Product[]>;

// Event handlers
type ProductEventHandlers = {
  onCreate: (product: ProductCreate) => void;
  onUpdate: (id: string, product: Partial<Product>) => void;
  onDelete: (id: string) => void;
  onSelect: (product: Product) => void;
};

// State management
type ProductState = {
  items: Product[];
  selectedItem: Product | null;
  loading: boolean;
  error: string | null;
  filters: Partial<Pick<Product, 'category' | 'price'>>;
};

// Демонстрационные функции
const demonstrateUtilityTypes = () => {
  // Partial
  const partialUser: PartialUser = {
    name: 'Иван',
    // id, email, age, profile - опциональны
  };

  // Pick
  const basicInfo: UserBasicInfo = {
    id: 1,
    name: 'Иван',
    email: 'ivan@example.com'
  };

  // Omit
  const userWithoutId: UserWithoutId = {
    name: 'Иван',
    email: 'ivan@example.com',
    age: 25,
    profile: {
      avatar: 'avatar.jpg',
      bio: 'Разработчик'
    }
  };

  // Record
  const userRoles: UserRoles = {
    'ivan': 'admin',
    'maria': 'user',
    'peter': 'moderator'
  };

  const apiEndpoints: ApiEndpoints = {
    users: '/api/users',
    posts: '/api/posts',
    comments: '/api/comments'
  };

  // Exclude/Extract
  const nonNullableString: NonNullableString = 'hello'; // только string
  const stringTypes: StringTypes = 'hello'; // только string

  // Deep utility types
  const deepPartialUser: DeepPartial<User> = {
    name: 'Иван',
    profile: {
      avatar: 'avatar.jpg'
      // bio - опционально
    }
    // остальные свойства опциональны
  };

  console.log('Utility Types демонстрация:', {
    partialUser,
    basicInfo,
    userWithoutId,
    userRoles,
    apiEndpoints,
    nonNullableString,
    stringTypes,
    deepPartialUser
  });
};

const UtilityTypesPractice: React.FC = () => {
  console.log('=== UTILITY TYPES TYPESCRIPT ===');
  demonstrateUtilityTypes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика Utility Types TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Partial&lt;T&gt;</h2>
          <p className="mb-2">Делает все свойства опциональными</p>
          <p className="text-sm text-gray-600">type PartialUser = Partial&lt;User&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Required&lt;T&gt;</h2>
          <p className="mb-2">Делает все свойства обязательными</p>
          <p className="text-sm text-gray-600">type RequiredUser = Required&lt;User&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Readonly&lt;T&gt;</h2>
          <p className="mb-2">Делает все свойства только для чтения</p>
          <p className="text-sm text-gray-600">type ReadonlyUser = Readonly&lt;User&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Pick&lt;T, K&gt;</h2>
          <p className="mb-2">Выбирает только указанные свойства</p>
          <p className="text-sm text-gray-600">type UserBasicInfo = Pick&lt;User, 'id' | 'name' | 'email'&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Omit&lt;T, K&gt;</h2>
          <p className="mb-2">Исключает указанные свойства</p>
          <p className="text-sm text-gray-600">type UserWithoutId = Omit&lt;User, 'id'&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Record&lt;K, T&gt;</h2>
          <p className="mb-2">Создает объект с ключами K и значениями T</p>
          <p className="text-sm text-gray-600">type UserRoles = Record&lt;string, 'admin' | 'user'&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Exclude&lt;T, U&gt; / Extract&lt;T, U&gt;</h2>
          <p className="mb-2">Исключает/извлекает типы из union</p>
          <p className="text-sm text-gray-600">type NonNullableString = Exclude&lt;string | null, null&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. ReturnType&lt;T&gt; / Parameters&lt;T&gt;</h2>
          <p className="mb-2">Получает тип возвращаемого значения/параметров функции</p>
          <p className="text-sm text-gray-600">type FetchUserReturn = ReturnType&lt;typeof fetchUser&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">9. Deep Utility Types</h2>
          <p className="mb-2">Рекурсивные utility types для вложенных объектов</p>
          <p className="text-sm text-gray-600">type DeepPartial&lt;T&gt; = {`{ [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]; }`}</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Utility types позволяют трансформировать существующие типы</li>
          <li>Partial, Required, Readonly - базовые трансформации</li>
          <li>Pick и Omit - выбор и исключение свойств</li>
          <li>Record - создание объектов с определенной структурой</li>
          <li>Exclude и Extract - работа с union типами</li>
          <li>ReturnType и Parameters - работа с функциями</li>
          <li>Deep utility types для работы с вложенными объектами</li>
        </ul>
      </div>
    </div>
  );
};

export default UtilityTypesPractice; 