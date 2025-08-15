import React from 'react';

// 1. Базовые интерфейсы
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Опциональное свойство
  readonly createdAt: Date; // Только для чтения
}

// 2. Интерфейсы с методами
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// 3. Интерфейсы с индексами
interface StringArray {
  [index: number]: string;
}

interface Dictionary {
  [key: string]: number;
}

// 4. Наследование интерфейсов
interface Animal {
  name: string;
  species: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

interface Cat extends Animal {
  color: string;
  purr(): void;
}

// 5. Множественное наследование
interface Flyable {
  fly(): void;
  maxAltitude: number;
}

interface Swimmable {
  swim(): void;
  maxDepth: number;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

// 6. Интерфейсы с дженериками
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 7. Интерфейсы функций
interface SearchFunction {
  (query: string, filters?: Record<string, unknown>): Promise<unknown[]>;
}

interface EventHandler<T = Event> {
  (event: T): void;
}

// 8. Интерфейсы с условными типами
interface ConditionalProps<T> {
  data: T;
  render: T extends string ? (value: string) => React.ReactNode : (value: T) => React.ReactNode;
}

// 9. Интерфейсы с mapped types
interface UserPermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
  admin: boolean;
}

type OptionalPermissions = {
  [K in keyof UserPermissions]?: UserPermissions[K];
};

type ReadonlyPermissions = {
  readonly [K in keyof UserPermissions]: UserPermissions[K];
};

// 10. Интерфейсы с utility types
interface ComplexUser {
  id: number;
  name: string;
  email: string;
  profile: {
    avatar: string;
    bio: string;
    preferences: Record<string, unknown>;
  };
  settings: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

// Создаем типы на основе интерфейса
type PartialUser = Partial<ComplexUser>;
type RequiredUser = Required<ComplexUser>;
type PickUser = Pick<ComplexUser, 'id' | 'name' | 'email'>;
type OmitUser = Omit<ComplexUser, 'profile' | 'settings'>;

// 11. Практические примеры
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  metadata?: Record<string, unknown>;
}

interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface ShoppingCart {
  items: CartItem[];
  total: number;
  currency: string;
  addItem(product: Product, quantity?: number): void;
  removeItem(productId: string): void;
  clear(): void;
  getTotal(): number;
}

// 12. Интерфейсы для React компонентов
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
}

// Демонстрационные функции
const demonstrateInterfaces = () => {
  // Базовый интерфейс
  const user: User = {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    age: 25,
    createdAt: new Date()
  };

  // Интерфейс с методами
  const calculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
  };

  // Интерфейс с индексами
  const colors: StringArray = ['red', 'green', 'blue'];
  const scores: Dictionary = { 'Иван': 95, 'Мария': 87, 'Петр': 92 };

  // Наследование
  const dog: Dog = {
    name: 'Бобик',
    species: 'Собака',
    breed: 'Лабрадор',
    makeSound: () => console.log('Гав!'),
    bark: () => console.log('Гав-гав!')
  };

  // Дженерики
  const userResponse: ApiResponse<User> = {
    data: user,
    status: 200,
    message: 'Success',
    timestamp: new Date()
  };

  console.log('Демонстрация интерфейсов:', {
    user,
    calculator: calculator.add(5, 3),
    colors,
    scores,
    dog,
    userResponse
  });
};

const InterfacesPractice: React.FC = () => {
  console.log('=== ИНТЕРФЕЙСЫ TYPESCRIPT ===');
  demonstrateInterfaces();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика интерфейсов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые интерфейсы</h2>
          <p className="mb-2">Определение структуры объектов</p>
          <p className="text-sm text-gray-600">interface User {`{ id: number; name: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Опциональные свойства</h2>
          <p className="mb-2">Свойства, которые могут отсутствовать</p>
          <p className="text-sm text-gray-600">age?: number</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Readonly свойства</h2>
          <p className="mb-2">Свойства только для чтения</p>
          <p className="text-sm text-gray-600">readonly createdAt: Date</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Наследование интерфейсов</h2>
          <p className="mb-2">extends для расширения интерфейсов</p>
          <p className="text-sm text-gray-600">interface Dog extends Animal {`{ breed: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Интерфейсы с дженериками</h2>
          <p className="mb-2">Переиспользуемые типы</p>
          <p className="text-sm text-gray-600">interface ApiResponse&lt;T&gt; {`{ data: T; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Интерфейсы функций</h2>
          <p className="mb-2">Типизация функций</p>
          <p className="text-sm text-gray-600">interface SearchFunction {`{ (query: string): Promise<unknown[]>; }`}</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Интерфейсы определяют контракт для объектов</li>
          <li>Поддерживают наследование и множественное наследование</li>
          <li>Могут содержать опциональные и readonly свойства</li>
          <li>Работают с дженериками для переиспользования</li>
          <li>Могут описывать функции и их сигнатуры</li>
          <li>Поддерживают индексы для динамических свойств</li>
        </ul>
      </div>
    </div>
  );
};

export default InterfacesPractice; 