import React from 'react';

// 1. Базовые дженерики
function identity<T>(arg: T): T {
  return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function lastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// 2. Дженерики с ограничениями (constraints)
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Длина: ${arg.length}`);
  return arg;
}

interface HasId {
  id: number | string;
}

function findById<T extends HasId>(items: T[], id: T['id']): T | undefined {
  return items.find(item => item.id === id);
}

// 3. Дженерики с несколькими параметрами
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// 4. Дженерики с default типами
interface DefaultConfig {
  timeout: number;
  retries: number;
}

function createApiClient<T = unknown, U = DefaultConfig>(
  endpoint: string,
  config?: U
): {
  get: () => Promise<T>;
  post: (data: unknown) => Promise<T>;
  config: U;
} {
  return {
    get: async () => {
      // Симуляция API вызова
      return {} as T;
    },
    post: async (data) => {
      // Симуляция API вызова
      return {} as T;
    },
    config: config as U
  };
}

// 5. Дженерики в классах
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 6. Дженерики в интерфейсах
interface Repository<T> {
  find(id: string | number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<boolean>;
}

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// 7. Дженерики с условными типами
type NonNullable<T> = T extends null | undefined ? never : T;

type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;

type InstanceType<T> = T extends new (...args: unknown[]) => infer R ? R : never;

// 8. Дженерики с mapped types
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

// 9. Дженерики с keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

// 10. Дженерики с условными типами
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;
type IsBoolean<T> = T extends boolean ? true : false;

type ExtractString<T> = T extends string ? T : never;
type ExtractNumber<T> = T extends number ? T : never;

// 11. Практические примеры
class EventEmitter<T extends Record<string, unknown[]>> {
  private events: Map<keyof T, Array<(...args: unknown[]) => void>> = new Map();

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(listener as (...args: unknown[]) => void);
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const listeners = this.events.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener as (...args: unknown[]) => void);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
}

// 12. Дженерики для React компонентов
interface GenericComponentProps<T> {
  data: T;
  render: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
}

function GenericComponent<T>({ data, render, onItemClick }: GenericComponentProps<T>) {
  return (
    <div onClick={() => onItemClick?.(data)}>
      {render(data)}
    </div>
  );
}

// Демонстрационные функции
const demonstrateGenerics = () => {
  // Базовые дженерики
  const num = identity(42);
  const str = identity('hello');
  const arr = identity([1, 2, 3]);

  console.log('Базовые дженерики:', { num, str, arr });

  // Дженерики с ограничениями
  const stringLength = logLength('hello world');
  const arrayLength = logLength([1, 2, 3, 4, 5]);

  const users: User[] = [
    { id: 1, name: 'Иван', email: 'ivan@example.com' },
    { id: 2, name: 'Мария', email: 'maria@example.com' }
  ];

  const foundUser = findById(users, 1);
  console.log('Найденный пользователь:', foundUser);

  // Дженерики с несколькими параметрами
  const pairResult = pair('hello', 42);
  const merged = merge({ name: 'Иван' }, { age: 25 });

  console.log('Пара и слияние:', { pairResult, merged });

  // Дженерики в классах
  const numberStack = new Stack<number>();
  numberStack.push(1);
  numberStack.push(2);
  numberStack.push(3);

  const stringQueue = new Queue<string>();
  stringQueue.enqueue('первый');
  stringQueue.enqueue('второй');
  stringQueue.enqueue('третий');

  console.log('Стек и очередь:', {
    stackSize: numberStack.size(),
    stackPeek: numberStack.peek(),
    queueSize: stringQueue.size(),
    queueFront: stringQueue.front()
  });

  // Дженерики с keyof
  const user: User = { id: 1, name: 'Иван', email: 'ivan@example.com' };
  const userName = getProperty(user, 'name');
  setProperty(user, 'age', 25);

  console.log('Свойства объекта:', { userName, user });

  // EventEmitter
  type AppEvents = {
    'user:created': [User];
    'user:updated': [User];
    'user:deleted': [number];
  };

  const emitter = new EventEmitter<AppEvents>();
  emitter.on('user:created', (user) => {
    console.log('Пользователь создан:', user.name);
  });

  emitter.emit('user:created', { id: 1, name: 'Новый пользователь', email: 'new@example.com' });
};

const GenericsPractice: React.FC = () => {
  console.log('=== ДЖЕНЕРИКИ TYPESCRIPT ===');
  demonstrateGenerics();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика дженериков TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые дженерики</h2>
          <p className="mb-2">Переиспользуемые типы с параметрами</p>
          <p className="text-sm text-gray-600">function identity&lt;T&gt;(arg: T): T</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Ограничения (constraints)</h2>
          <p className="mb-2">Ограничение типов с помощью extends</p>
          <p className="text-sm text-gray-600">function logLength&lt;T extends Lengthwise&gt;(arg: T)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Множественные параметры</h2>
          <p className="mb-2">Несколько типовых параметров</p>
          <p className="text-sm text-gray-600">function pair&lt;T, U&gt;(first: T, second: U)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Default типы</h2>
          <p className="mb-2">Значения по умолчанию для типов</p>
          <p className="text-sm text-gray-600">function createApiClient&lt;T = unknown&gt;()</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Дженерики в классах</h2>
          <p className="mb-2">Классы с типовыми параметрами</p>
          <p className="text-sm text-gray-600">class Stack&lt;T&gt; {`{ private items: T[]; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Условные типы</h2>
          <p className="mb-2">Типы, зависящие от условий</p>
          <p className="text-sm text-gray-600">type NonNullable&lt;T&gt; = T extends null | undefined ? never : T</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Дженерики позволяют создавать переиспользуемые типы</li>
          <li>Ограничения (constraints) обеспечивают безопасность типов</li>
          <li>Можно использовать несколько типовых параметров</li>
          <li>Default типы упрощают использование</li>
          <li>Дженерики работают с классами, интерфейсами и функциями</li>
          <li>Условные типы позволяют создавать сложную логику типов</li>
        </ul>
      </div>
    </div>
  );
};

export default GenericsPractice; 