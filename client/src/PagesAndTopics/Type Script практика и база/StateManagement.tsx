import React from 'react';

// 1. Типизация Redux
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: string;
}

interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
}

// Redux State
interface RootState {
  users: UsersState;
  posts: PostsState;
  auth: AuthState;
  ui: UIState;
}

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  selectedPost: Post | null;
  filters: {
    authorId?: number;
    published?: boolean;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Redux Actions
type UsersAction = 
  | { type: 'users/fetchStart' }
  | { type: 'users/fetchSuccess'; payload: User[] }
  | { type: 'users/fetchError'; payload: string }
  | { type: 'users/selectUser'; payload: User | null }
  | { type: 'users/createUser'; payload: User }
  | { type: 'users/updateUser'; payload: User }
  | { type: 'users/deleteUser'; payload: number };

type PostsAction = 
  | { type: 'posts/fetchStart' }
  | { type: 'posts/fetchSuccess'; payload: Post[] }
  | { type: 'posts/fetchError'; payload: string }
  | { type: 'posts/selectPost'; payload: Post | null }
  | { type: 'posts/createPost'; payload: Post }
  | { type: 'posts/updatePost'; payload: Post }
  | { type: 'posts/deletePost'; payload: number }
  | { type: 'posts/setFilters'; payload: PostsState['filters'] };

type AuthAction = 
  | { type: 'auth/loginStart' }
  | { type: 'auth/loginSuccess'; payload: { user: User; token: string } }
  | { type: 'auth/loginError'; payload: string }
  | { type: 'auth/logout' }
  | { type: 'auth/updateUser'; payload: User };

type UIAction = 
  | { type: 'ui/setTheme'; payload: 'light' | 'dark' }
  | { type: 'ui/toggleSidebar' }
  | { type: 'ui/addNotification'; payload: Notification }
  | { type: 'ui/removeNotification'; payload: string };

type RootAction = UsersAction | PostsAction | AuthAction | UIAction;

// Redux Reducers
const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case 'users/fetchStart':
      return { ...state, loading: true, error: null };
    case 'users/fetchSuccess':
      return { ...state, items: action.payload, loading: false };
    case 'users/fetchError':
      return { ...state, error: action.payload, loading: false };
    case 'users/selectUser':
      return { ...state, selectedUser: action.payload };
    case 'users/createUser':
      return { ...state, items: [...state.items, action.payload] };
    case 'users/updateUser':
      return {
        ...state,
        items: state.items.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    case 'users/deleteUser':
      return {
        ...state,
        items: state.items.filter(user => user.id !== action.payload)
      };
    default:
      return state;
  }
};

const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
  switch (action.type) {
    case 'posts/fetchStart':
      return { ...state, loading: true, error: null };
    case 'posts/fetchSuccess':
      return { ...state, items: action.payload, loading: false };
    case 'posts/fetchError':
      return { ...state, error: action.payload, loading: false };
    case 'posts/selectPost':
      return { ...state, selectedPost: action.payload };
    case 'posts/createPost':
      return { ...state, items: [...state.items, action.payload] };
    case 'posts/updatePost':
      return {
        ...state,
        items: state.items.map(post => 
          post.id === action.payload.id ? action.payload : post
        )
      };
    case 'posts/deletePost':
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.payload)
      };
    case 'posts/setFilters':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};

// 2. Типизация Redux Toolkit (симуляция)
interface CreateSliceOptions<State, CaseReducers> {
  name: string;
  initialState: State;
  reducers: CaseReducers;
  extraReducers?: Record<string, (state: State, action: any) => void>;
}

function createSlice<State, CaseReducers>(options: CreateSliceOptions<State, CaseReducers>) {
  return {
    name: options.name,
    reducer: (state: State, action: any) => state,
    actions: {} as any,
    caseReducers: options.reducers
  };
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loading: false,
    error: null as string | null,
    selectedUser: null as User | null
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action: { payload: User[] }) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchError: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// 3. Типизация Zustand
interface ZustandStore {
  // Users
  users: User[];
  selectedUser: User | null;
  usersLoading: boolean;
  usersError: string | null;
  
  // Posts
  posts: Post[];
  selectedPost: Post | null;
  postsLoading: boolean;
  postsError: string | null;
  
  // Auth
  currentUser: User | null;
  token: string | null;
  authLoading: boolean;
  authError: string | null;
  
  // UI
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  
  // Actions
  fetchUsers: () => Promise<void>;
  selectUser: (user: User | null) => void;
  createUser: (userData: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: number, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  
  fetchPosts: () => Promise<void>;
  selectPost: (post: Post | null) => void;
  createPost: (postData: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  updatePost: (id: number, postData: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateCurrentUser: (userData: Partial<User>) => void;
  
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

// Симуляция Zustand store
const createStore = (initialState: Partial<ZustandStore>) => {
  let state: ZustandStore = {
    users: [],
    selectedUser: null,
    usersLoading: false,
    usersError: null,
    posts: [],
    selectedPost: null,
    postsLoading: false,
    postsError: null,
    currentUser: null,
    token: null,
    authLoading: false,
    authError: null,
    theme: 'light',
    sidebarOpen: false,
    notifications: [],
    fetchUsers: async () => {},
    selectUser: () => {},
    createUser: async () => {},
    updateUser: async () => {},
    deleteUser: async () => {},
    fetchPosts: async () => {},
    selectPost: () => {},
    createPost: async () => {},
    updatePost: async () => {},
    deletePost: async () => {},
    login: async () => {},
    logout: () => {},
    updateCurrentUser: () => {},
    setTheme: () => {},
    toggleSidebar: () => {},
    addNotification: () => {},
    removeNotification: () => {},
    ...initialState
  };

  return {
    getState: () => state,
    setState: (newState: Partial<ZustandStore>) => {
      state = { ...state, ...newState };
    },
    subscribe: (listener: () => void) => {
      // Симуляция подписки
      return () => {};
    }
  };
};

// 4. Типизация React Context
interface AppContextType {
  // State
  users: User[];
  posts: Post[];
  currentUser: User | null;
  theme: 'light' | 'dark';
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  createUser: (userData: Omit<User, 'id'>) => Promise<void>;
  createPost: (postData: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUsers: User[] = [
        { id: 1, name: 'Иван', email: 'ivan@example.com' },
        { id: 2, name: 'Мария', email: 'maria@example.com' }
      ];
      setUsers(mockUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockPosts: Post[] = [
        { id: 1, title: 'Первый пост', content: 'Содержание...', authorId: 1, published: true, createdAt: new Date().toISOString() },
        { id: 2, title: 'Второй пост', content: 'Содержание...', authorId: 2, published: false, createdAt: new Date().toISOString() }
      ];
      setPosts(mockPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = React.useCallback(async (userData: Omit<User, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 500));
      const newUser: User = { id: Date.now(), ...userData };
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = React.useCallback(async (postData: Omit<Post, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 500));
      const newPost: Post = { 
        id: Date.now(), 
        ...postData, 
        createdAt: new Date().toISOString() 
      };
      setPosts(prev => [...prev, newPost]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = { id: 1, name: 'Иван', email };
      setCurrentUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = React.useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value: AppContextType = {
    users,
    posts,
    currentUser,
    theme,
    loading,
    error,
    fetchUsers,
    fetchPosts,
    createUser,
    createPost,
    login,
    logout,
    setTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// 5. Типизация селекторов
type Selector<TState, TResult> = (state: TState) => TResult;

const selectUsers = (state: RootState): User[] => state.users.items;
const selectUserById = (state: RootState, userId: number): User | undefined => 
  state.users.items.find(user => user.id === userId);
const selectPostsByAuthor = (state: RootState, authorId: number): Post[] => 
  state.posts.items.filter(post => post.authorId === authorId);
const selectCurrentUser = (state: RootState): User | null => state.auth.user;
const selectIsAuthenticated = (state: RootState): boolean => state.auth.user !== null;

// 6. Типизация middleware
type Middleware = (store: any) => (next: any) => (action: any) => any;

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

const thunkMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// 7. Демонстрационные функции
const demonstrateStateManagement = () => {
  console.log('=== ДЕМОНСТРАЦИЯ УПРАВЛЕНИЯ СОСТОЯНИЕМ ===');

  // Redux типы
  const initialState: UsersState = {
    items: [],
    loading: false,
    error: null,
    selectedUser: null
  };

  const userAction: UsersAction = {
    type: 'users/fetchSuccess',
    payload: [
      { id: 1, name: 'Иван', email: 'ivan@example.com' },
      { id: 2, name: 'Мария', email: 'maria@example.com' }
    ]
  };

  const newState = usersReducer(initialState, userAction);
  console.log('Redux reducer result:', newState);

  // Zustand store
  const store = createStore({
    users: [
      { id: 1, name: 'Иван', email: 'ivan@example.com' }
    ],
    theme: 'dark'
  });

  console.log('Zustand store state:', store.getState());

  // Context
  const contextValue: AppContextType = {
    users: [],
    posts: [],
    currentUser: null,
    theme: 'light',
    loading: false,
    error: null,
    fetchUsers: async () => {},
    fetchPosts: async () => {},
    createUser: async () => {},
    createPost: async () => {},
    login: async () => {},
    logout: () => {},
    setTheme: () => {}
  };

  console.log('Context value:', contextValue);

  // Селекторы
  const mockRootState: RootState = {
    users: {
      items: [{ id: 1, name: 'Иван', email: 'ivan@example.com' }],
      loading: false,
      error: null,
      selectedUser: null
    },
    posts: {
      items: [],
      loading: false,
      error: null,
      selectedPost: null,
      filters: {}
    },
    auth: {
      user: null,
      token: null,
      loading: false,
      error: null
    },
    ui: {
      theme: 'light',
      sidebarOpen: false,
      notifications: []
    }
  };

  console.log('Selected users:', selectUsers(mockRootState));
  console.log('Is authenticated:', selectIsAuthenticated(mockRootState));

  console.log('State Management демонстрация завершена');
};

const StateManagementPractice: React.FC = () => {
  console.log('=== УПРАВЛЕНИЕ СОСТОЯНИЕМ TYPESCRIPT ===');
  demonstrateStateManagement();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика управления состоянием TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Redux типизация</h2>
          <p className="mb-2">State, Actions, Reducers</p>
          <p className="text-sm text-gray-600">interface RootState {`{ users: UsersState; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Redux Toolkit</h2>
          <p className="mb-2">createSlice с типизацией</p>
          <p className="text-sm text-gray-600">const usersSlice = createSlice({ name: 'users', ... })</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Zustand</h2>
          <p className="mb-2">Store с типизированными actions</p>
          <p className="text-sm text-gray-600">interface ZustandStore {`{ users: User[]; fetchUsers: () => Promise<void>; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. React Context</h2>
          <p className="mb-2">Context с типизированными значениями</p>
          <p className="text-sm text-gray-600">const AppContext = React.createContext&lt;AppContextType&gt;();</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Селекторы</h2>
          <p className="mb-2">Типизированные селекторы</p>
          <p className="text-sm text-gray-600">type Selector&lt;TState, TResult&gt; = (state: TState) => TResult;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Middleware</h2>
          <p className="mb-2">Типизированные middleware</p>
          <p className="text-sm text-gray-600">type Middleware = (store: any) => (next: any) => (action: any) => any;</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Redux State для типизации глобального состояния</li>
          <li>Actions для типизации действий</li>
          <li>Reducers для типизации обработчиков</li>
          <li>Zustand для простого управления состоянием</li>
          <li>Context для React-специфичного состояния</li>
          <li>Селекторы для типизированного доступа к состоянию</li>
          <li>Middleware для перехвата действий</li>
        </ul>
      </div>
    </div>
  );
};

export default StateManagementPractice; 