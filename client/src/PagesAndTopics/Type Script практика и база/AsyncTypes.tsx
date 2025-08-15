import React from 'react';

// 1. Базовые Promise типы
type PromiseResult<T> = Promise<T>;
type PromiseRejection = Promise<never>;

// 2. Типизация async функций
async function fetchUser(id: number): Promise<{ id: number; name: string; email: string }> {
  // Симуляция API вызова
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
    }, 100);
  });
}

async function fetchUsers(ids: number[]): Promise<Array<{ id: number; name: string; email: string }>> {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises);
}

// 3. Promise с дженериками
class PromiseUtils {
  static delay<T>(value: T, ms: number): Promise<T> {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
  }

  static timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
      )
    ]);
  }

  static retry<T>(
    fn: () => Promise<T>, 
    attempts: number = 3, 
    delay: number = 1000
  ): Promise<T> {
    return fn().catch(error => {
      if (attempts <= 1) throw error;
      return PromiseUtils.delay(null, delay).then(() => 
        PromiseUtils.retry(fn, attempts - 1, delay)
      );
    });
  }
}

// 4. Типизация API ответов
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface ApiError {
  error: string;
  code: number;
  details?: unknown;
}

type ApiResult<T> = ApiResponse<T> | ApiError;

async function apiCall<T>(endpoint: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (!response.ok) {
      return {
        error: response.statusText,
        code: response.status,
        details: data
      };
    }
    
    return {
      data,
      status: response.status,
      message: response.statusText
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      code: 500,
      details: error
    };
  }
}

// 5. Async/Await с типизацией
class UserService {
  private users: Array<{ id: number; name: string; email: string }> = [];

  async createUser(userData: Omit<{ id: number; name: string; email: string }, 'id'>): Promise<{ id: number; name: string; email: string }> {
    const user = { id: Date.now(), ...userData };
    this.users.push(user);
    return user;
  }

  async getUser(id: number): Promise<{ id: number; name: string; email: string } | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async updateUser(id: number, updates: Partial<{ name: string; email: string }>): Promise<{ id: number; name: string; email: string } | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }
}

// 6. Типизация событий и колбэков
type AsyncCallback<T> = (value: T) => Promise<void>;
type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

interface AsyncEventEmitter<T extends Record<string, unknown[]>> {
  on<K extends keyof T>(event: K, handler: AsyncEventHandler<T[K]>): void;
  off<K extends keyof T>(event: K, handler: AsyncEventHandler<T[K]>): void;
  emit<K extends keyof T>(event: K, ...args: T[K]): Promise<void>;
}

class AsyncEventEmitterImpl<T extends Record<string, unknown[]>> implements AsyncEventEmitter<T> {
  private handlers: Map<keyof T, AsyncEventHandler<unknown>[]> = new Map();

  on<K extends keyof T>(event: K, handler: AsyncEventHandler<T[K]>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler as AsyncEventHandler<unknown>);
  }

  off<K extends keyof T>(event: K, handler: AsyncEventHandler<T[K]>): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler as AsyncEventHandler<unknown>);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  async emit<K extends keyof T>(event: K, ...args: T[K]): Promise<void> {
    const handlers = this.handlers.get(event);
    if (handlers) {
      await Promise.all(handlers.map(handler => handler(args)));
    }
  }
}

// 7. Типизация Web Workers
interface WorkerMessage<T = unknown> {
  type: string;
  data: T;
}

interface WorkerResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

class TypedWorker<TIn = unknown, TOut = unknown> {
  private worker: Worker;

  constructor(script: string) {
    this.worker = new Worker(script);
  }

  postMessage(message: WorkerMessage<TIn>): void {
    this.worker.postMessage(message);
  }

  onMessage(callback: (response: WorkerResponse<TOut>) => void): void {
    this.worker.onmessage = (event) => callback(event.data);
  }

  terminate(): void {
    this.worker.terminate();
  }
}

// 8. Типизация Service Workers
interface ServiceWorkerRegistration {
  scope: string;
  updateViaCache: 'all' | 'imports' | 'none';
  installing: ServiceWorker | null;
  waiting: ServiceWorker | null;
  active: ServiceWorker | null;
}

interface ServiceWorkerEvent extends Event {
  target: ServiceWorker;
}

type ServiceWorkerEventHandler = (event: ServiceWorkerEvent) => Promise<void>;

// 9. Типизация WebSockets
interface WebSocketMessage<T = unknown> {
  type: string;
  data: T;
  timestamp: number;
}

class TypedWebSocket<TIn = unknown, TOut = unknown> {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  send(message: WebSocketMessage<TIn>): void {
    this.socket.send(JSON.stringify(message));
  }

  onMessage(callback: (message: WebSocketMessage<TOut>) => void): void {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as WebSocketMessage<TOut>;
      callback(message);
    };
  }

  close(): void {
    this.socket.close();
  }
}

// 10. Типизация асинхронных итераторов
interface AsyncIterator<T> {
  next(): Promise<IteratorResult<T>>;
}

interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

class AsyncRange implements AsyncIterable<number> {
  constructor(private start: number, private end: number, private step: number = 1) {}

  async *[Symbol.asyncIterator](): AsyncIterator<number> {
    for (let i = this.start; i < this.end; i += this.step) {
      await PromiseUtils.delay(null, 100); // Симуляция асинхронности
      yield i;
    }
  }
}

// 11. Типизация асинхронных потоков
interface AsyncStream<T> {
  read(): Promise<T | null>;
  write(data: T): Promise<void>;
  close(): Promise<void>;
}

class AsyncArrayStream<T> implements AsyncStream<T> {
  private buffer: T[] = [];
  private readers: Array<(value: T | null) => void> = [];

  async read(): Promise<T | null> {
    if (this.buffer.length > 0) {
      return this.buffer.shift() || null;
    }
    
    return new Promise(resolve => {
      this.readers.push(resolve);
    });
  }

  async write(data: T): Promise<void> {
    if (this.readers.length > 0) {
      const reader = this.readers.shift()!;
      reader(data);
    } else {
      this.buffer.push(data);
    }
  }

  async close(): Promise<void> {
    this.readers.forEach(reader => reader(null));
    this.readers = [];
  }
}

// 12. Практические примеры
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
}

class BlogService {
  private users: User[] = [];
  private posts: Post[] = [];

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const user: User = { id: Date.now(), ...userData };
    this.users.push(user);
    return user;
  }

  async createPost(postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const post: Post = { 
      id: Date.now(), 
      ...postData, 
      createdAt: new Date() 
    };
    this.posts.push(post);
    return post;
  }

  async getUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] } | null> {
    const user = this.users.find(u => u.id === userId);
    if (!user) return null;

    const posts = this.posts.filter(p => p.userId === userId);
    return { user, posts };
  }

  async searchPosts(query: string): Promise<Post[]> {
    // Симуляция асинхронного поиска
    await PromiseUtils.delay(null, 200);
    
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// 13. Демонстрационные функции
const demonstrateAsyncTypes = async () => {
  console.log('=== ДЕМОНСТРАЦИЯ АСИНХРОННЫХ ТИПОВ ===');

  // Базовые async функции
  const user = await fetchUser(1);
  console.log('Fetched user:', user);

  const users = await fetchUsers([1, 2, 3]);
  console.log('Fetched users:', users);

  // Promise утилиты
  const delayedValue = await PromiseUtils.delay('Hello', 1000);
  console.log('Delayed value:', delayedValue);

  // User Service
  const userService = new UserService();
  const newUser = await userService.createUser({
    name: 'Иван',
    email: 'ivan@example.com'
  });
  console.log('Created user:', newUser);

  const foundUser = await userService.getUser(newUser.id);
  console.log('Found user:', foundUser);

  // Async Event Emitter
  type AppEvents = {
    'user:created': [User];
    'user:updated': [User];
    'user:deleted': [number];
  };

  const emitter = new AsyncEventEmitterImpl<AppEvents>();
  
  emitter.on('user:created', async (user) => {
    console.log('User created event:', user.name);
  });

  await emitter.emit('user:created', newUser);

  // Async Iterator
  const asyncRange = new AsyncRange(1, 5);
  console.log('Async range:');
  for await (const num of asyncRange) {
    console.log(num);
  }

  // Blog Service
  const blogService = new BlogService();
  
  const author = await blogService.createUser({
    name: 'Автор',
    email: 'author@example.com'
  });

  const post = await blogService.createPost({
    userId: author.id,
    title: 'Мой первый пост',
    content: 'Содержание поста...'
  });

  const userWithPosts = await blogService.getUserWithPosts(author.id);
  console.log('User with posts:', userWithPosts);

  const searchResults = await blogService.searchPosts('первый');
  console.log('Search results:', searchResults);

  console.log('Async Types демонстрация завершена');
};

const AsyncTypesPractice: React.FC = () => {
  console.log('=== АСИНХРОННЫЕ ТИПЫ TYPESCRIPT ===');
  demonstrateAsyncTypes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика асинхронных типов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые Promise типы</h2>
          <p className="mb-2">Promise&lt;T&gt;, Promise&lt;never&gt;</p>
          <p className="text-sm text-gray-600">type PromiseResult&lt;T&gt; = Promise&lt;T&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Async/Await типизация</h2>
          <p className="mb-2">async function возвращает Promise</p>
          <p className="text-sm text-gray-600">async function fetchUser(id: number): Promise&lt;User&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Promise утилиты</h2>
          <p className="mb-2">delay, timeout, retry с типизацией</p>
          <p className="text-sm text-gray-600">static delay&lt;T&gt;(value: T, ms: number): Promise&lt;T&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. API типизация</h2>
          <p className="mb-2">ApiResponse&lt;T&gt;, ApiError, ApiResult&lt;T&gt;</p>
          <p className="text-sm text-gray-600">type ApiResult&lt;T&gt; = ApiResponse&lt;T&gt; | ApiError;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Асинхронные события</h2>
          <p className="mb-2">AsyncEventEmitter, AsyncEventHandler</p>
          <p className="text-sm text-gray-600">type AsyncEventHandler&lt;T&gt; = (event: T) => Promise&lt;void&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Web Workers</h2>
          <p className="mb-2">TypedWorker&lt;TIn, TOut&gt;</p>
          <p className="text-sm text-gray-600">class TypedWorker&lt;TIn, TOut&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. WebSockets</h2>
          <p className="mb-2">TypedWebSocket&lt;TIn, TOut&gt;</p>
          <p className="text-sm text-gray-600">class TypedWebSocket&lt;TIn, TOut&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Асинхронные итераторы</h2>
          <p className="mb-2">AsyncIterator&lt;T&gt;, AsyncIterable&lt;T&gt;</p>
          <p className="text-sm text-gray-600">interface AsyncIterable&lt;T&gt;</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Promise&lt;T&gt; для типизации асинхронных операций</li>
          <li>async функции всегда возвращают Promise</li>
          <li>await работает только внутри async функций</li>
          <li>Типизация API ответов с union типами</li>
          <li>Асинхронные события и колбэки</li>
          <li>Web Workers и WebSockets с типизацией</li>
          <li>Асинхронные итераторы для потоков данных</li>
        </ul>
      </div>
    </div>
  );
};

export default AsyncTypesPractice; 