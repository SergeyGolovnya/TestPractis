import React from 'react';

// 1. Базовые типы API
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

interface ApiError {
  error: string;
  code: number;
  details?: unknown;
  timestamp: string;
}

type ApiResult<T> = ApiResponse<T> | ApiError;

// 2. HTTP методы и статусы
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type HttpStatus = 
  | 200 | 201 | 204
  | 400 | 401 | 403 | 404 | 409 | 422
  | 500 | 502 | 503;

// 3. Типизация fetch
interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

interface FetchResponse<T> {
  data: T;
  status: HttpStatus;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

// 4. Типизация axios (симуляция)
interface AxiosRequestConfig {
  method?: HttpMethod;
  url: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}

interface AxiosResponse<T> {
  data: T;
  status: HttpStatus;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

interface AxiosError<T = unknown> {
  message: string;
  code?: string;
  config: AxiosRequestConfig;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
}

// 5. API клиент с типизацией
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<FetchResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    const controller = new AbortController();
    const timeoutId = options.timeout 
      ? setTimeout(() => controller.abort(), options.timeout)
      : null;

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      const data = await response.json();

      return {
        data,
        status: response.status as HttpStatus,
        statusText: response.statusText,
        headers: response.headers,
        ok: response.ok
      };
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<FetchResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body: data });
  }

  async delete<T>(endpoint: string): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data });
  }
}

// 6. Типизация API endpoints
type ApiEndpoint = 
  | '/users'
  | '/users/:id'
  | '/posts'
  | '/posts/:id'
  | '/comments'
  | '/comments/:id';

type ApiEndpointWithParams<T extends string> = T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? `${Start}${string}/${Rest}`
  : T extends `${infer Start}:${infer Param}`
  ? `${Start}${string}`
  : T;

// 7. Типизация API моделей
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

// 8. Типизация API запросов
interface CreateUserRequest {
  name: string;
  email: string;
  avatar?: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

interface CreatePostRequest {
  title: string;
  content: string;
  published?: boolean;
}

interface UpdatePostRequest {
  title?: string;
  content?: string;
  published?: boolean;
}

interface CreateCommentRequest {
  content: string;
  postId: number;
}

// 9. Типизация API ответов
interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

interface UserResponse {
  user: User;
}

interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

interface PostResponse {
  post: Post;
}

interface CommentsResponse {
  comments: Comment[];
  total: number;
  page: number;
  limit: number;
}

// 10. Типизация API сервисов
class UserApiService {
  constructor(private client: ApiClient) {}

  async getUsers(params?: { page?: number; limit?: number }): Promise<UsersResponse> {
    const response = await this.client.get<UsersResponse>('/users', params);
    return response.data;
  }

  async getUser(id: number): Promise<UserResponse> {
    const response = await this.client.get<UserResponse>(`/users/${id}`);
    return response.data;
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const response = await this.client.post<UserResponse>('/users', data);
    return response.data;
  }

  async updateUser(id: number, data: UpdateUserRequest): Promise<UserResponse> {
    const response = await this.client.put<UserResponse>(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.client.delete(`/users/${id}`);
  }
}

class PostApiService {
  constructor(private client: ApiClient) {}

  async getPosts(params?: { page?: number; limit?: number; authorId?: number }): Promise<PostsResponse> {
    const response = await this.client.get<PostsResponse>('/posts', params);
    return response.data;
  }

  async getPost(id: number): Promise<PostResponse> {
    const response = await this.client.get<PostResponse>(`/posts/${id}`);
    return response.data;
  }

  async createPost(data: CreatePostRequest): Promise<PostResponse> {
    const response = await this.client.post<PostResponse>('/posts', data);
    return response.data;
  }

  async updatePost(id: number, data: UpdatePostRequest): Promise<PostResponse> {
    const response = await this.client.put<PostResponse>(`/posts/${id}`, data);
    return response.data;
  }

  async deletePost(id: number): Promise<void> {
    await this.client.delete(`/posts/${id}`);
  }
}

// 11. Типизация хуков для API
function useApi<T>(url: string, options?: FetchOptions) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const client = new ApiClient('');
        const response = await client.get<T>(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [data, setData] = React.useState<TData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const mutate = React.useCallback(async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await mutationFn(variables);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  return { mutate, data, loading, error };
}

// 12. Типизация middleware
type ApiMiddleware = (
  request: Request,
  next: (request: Request) => Promise<Response>
) => Promise<Response>;

const authMiddleware: ApiMiddleware = async (request, next) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  return next(request);
};

const loggingMiddleware: ApiMiddleware = async (request, next) => {
  console.log(`API Request: ${request.method} ${request.url}`);
  const start = Date.now();
  
  const response = await next(request);
  
  const duration = Date.now() - start;
  console.log(`API Response: ${response.status} (${duration}ms)`);
  
  return response;
};

// 13. Демонстрационные функции
const demonstrateApiTypes = async () => {
  console.log('=== ДЕМОНСТРАЦИЯ API ТИПОВ ===');

  // Создание API клиента
  const apiClient = new ApiClient('https://api.example.com', {
    'X-API-Key': 'your-api-key'
  });

  // Создание сервисов
  const userService = new UserApiService(apiClient);
  const postService = new PostApiService(apiClient);

  // Примеры API вызовов
  try {
    // Получение пользователей
    const usersResponse = await userService.getUsers({ page: 1, limit: 10 });
    console.log('Users response:', usersResponse);

    // Создание пользователя
    const newUser = await userService.createUser({
      name: 'Иван Петров',
      email: 'ivan@example.com'
    });
    console.log('Created user:', newUser);

    // Получение постов
    const postsResponse = await postService.getPosts({ page: 1, limit: 5 });
    console.log('Posts response:', postsResponse);

    // Создание поста
    const newPost = await postService.createPost({
      title: 'Мой первый пост',
      content: 'Содержание поста...',
      published: true
    });
    console.log('Created post:', newPost);

  } catch (error) {
    console.error('API error:', error);
  }

  // Примеры типов
  const endpoint: ApiEndpoint = '/users/:id';
  const resolvedEndpoint: ApiEndpointWithParams<typeof endpoint> = '/users/123';

  console.log('Endpoint types:', { endpoint, resolvedEndpoint });

  // Примеры HTTP методов и статусов
  const method: HttpMethod = 'POST';
  const status: HttpStatus = 201;

  console.log('HTTP types:', { method, status });

  console.log('API Types демонстрация завершена');
};

const APITypesPractice: React.FC = () => {
  console.log('=== API ТИПЫ TYPESCRIPT ===');
  demonstrateApiTypes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика API типов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые типы API</h2>
          <p className="mb-2">ApiResponse&lt;T&gt;, ApiError, ApiResult&lt;T&gt;</p>
          <p className="text-sm text-gray-600">interface ApiResponse&lt;T&gt; {`{ data: T; status: number; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. HTTP методы и статусы</h2>
          <p className="mb-2">HttpMethod, HttpStatus</p>
          <p className="text-sm text-gray-600">type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Типизация fetch</h2>
          <p className="mb-2">FetchOptions, FetchResponse&lt;T&gt;</p>
          <p className="text-sm text-gray-600">interface FetchOptions extends RequestInit</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. API клиент</h2>
          <p className="mb-2">ApiClient с типизированными методами</p>
          <p className="text-sm text-gray-600">class ApiClient {`{ async get<T>(endpoint: string): Promise<FetchResponse<T>> }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. API endpoints</h2>
          <p className="mb-2">ApiEndpoint, ApiEndpointWithParams</p>
          <p className="text-sm text-gray-600">type ApiEndpoint = '/users' | '/users/:id';</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. API модели</h2>
          <p className="mb-2">User, Post, Comment интерфейсы</p>
          <p className="text-sm text-gray-600">interface User {`{ id: number; name: string; email: string; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. API сервисы</h2>
          <p className="mb-2">UserApiService, PostApiService</p>
          <p className="text-sm text-gray-600">class UserApiService {`{ async getUsers(): Promise<UsersResponse> }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. API хуки</h2>
          <p className="mb-2">useApi, useApiMutation</p>
          <p className="text-sm text-gray-600">function useApi&lt;T&gt;(url: string)</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>ApiResponse&lt;T&gt; для типизации успешных ответов</li>
          <li>ApiError для типизации ошибок</li>
          <li>HttpMethod и HttpStatus для HTTP операций</li>
          <li>ApiClient для централизованной работы с API</li>
          <li>API сервисы для организации кода</li>
          <li>Хуки для интеграции с React</li>
          <li>Middleware для перехвата запросов</li>
        </ul>
      </div>
    </div>
  );
};

export default APITypesPractice; 