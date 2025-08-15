import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// 1. Базовые типы React
type ReactNode = React.ReactNode;
type ReactElement = React.ReactElement;
type ReactFragment = React.ReactFragment;
type ReactPortal = React.ReactPortal;

// 2. Типизация Props
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  error?: string;
  className?: string;
}

interface CardProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

// 3. Дженерики в Props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  className?: string;
}

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validation?: (values: T) => Partial<Record<keyof T, string>>;
  children: ReactNode;
}

// 4. Типизация событий
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

// 5. Типизация refs
type RefObject<T> = React.RefObject<T>;
type MutableRefObject<T> = React.MutableRefObject<T>;
type RefCallback<T> = React.RefCallback<T>;

// 6. Типизация состояний
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
  createdAt: Date;
}

interface AppState {
  users: User[];
  posts: Post[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

// 7. Типизированные компоненты
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
  className = ''
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const Card: React.FC<CardProps> = ({ title, children, onClose, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

// 8. Дженерики компоненты
function List<T>({ items, renderItem, keyExtractor, className = '' }: ListProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

function Form<T extends Record<string, unknown>>({ 
  initialValues, 
  onSubmit, 
  validation, 
  children 
}: FormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    
    if (validation) {
      const validationErrors = validation(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    onSubmit(values);
  };

  const updateValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { values, updateValue, errors });
        }
        return child;
      })}
    </form>
  );
}

// 9. Кастомные хуки с типизацией
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
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

// 10. Типизация контекста
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 11. Типизация forwardRef
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({ 
  isOpen, 
  onClose, 
  title, 
  children 
}, ref) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={ref} className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

// 12. Практические примеры
const UserList: React.FC = () => {
  const { data: users, loading, error } = useApi<User[]>('/api/users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users) return <div>No users found</div>;

  return (
    <List
      items={users}
      renderItem={(user) => (
        <Card title={user.name} onClose={() => setSelectedUser(null)}>
          <p>Email: {user.email}</p>
          <Button onClick={() => setSelectedUser(user)}>
            View Details
          </Button>
        </Card>
      )}
      keyExtractor={(user) => user.id}
    />
  );
};

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const validation = (values: typeof formData) => {
    const errors: Partial<typeof formData> = {};
    if (!values.name.trim()) errors.name = 'Name is required';
    if (!values.email.trim()) errors.email = 'Email is required';
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  };

  const handleSubmit = (values: typeof formData) => {
    console.log('Form submitted:', values);
  };

  return (
    <Form
      initialValues={formData}
      onSubmit={handleSubmit}
      validation={validation}
    >
      <Input
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        placeholder="Enter name"
        required
      />
      <Input
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        placeholder="Enter email"
        type="email"
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

// 13. Демонстрационные функции
const demonstrateReactTypes = () => {
  console.log('=== ДЕМОНСТРАЦИЯ REACT ТИПОВ ===');

  // Базовые типы
  console.log('React types defined:', {
    ReactNode: typeof React.ReactNode,
    ReactElement: typeof React.ReactElement,
    ReactFragment: typeof React.ReactFragment
  });

  // Props типы
  const buttonProps: ButtonProps = {
    children: 'Click me',
    onClick: () => console.log('Button clicked'),
    variant: 'primary',
    size: 'medium'
  };

  const inputProps: InputProps = {
    value: '',
    onChange: (value) => console.log('Input changed:', value),
    placeholder: 'Enter text'
  };

  console.log('Props examples:', { buttonProps, inputProps });

  // Дженерики
  const listProps: ListProps<string> = {
    items: ['item1', 'item2', 'item3'],
    renderItem: (item) => <div>{item}</div>,
    keyExtractor: (item, index) => index
  };

  console.log('Generic props example:', listProps);

  // События
  const handleButtonClick = (e: ButtonClickEvent) => {
    console.log('Button clicked:', e.currentTarget.textContent);
  };

  const handleInputChange = (e: InputChangeEvent) => {
    console.log('Input changed:', e.target.value);
  };

  console.log('Event handlers defined');

  console.log('React Types демонстрация завершена');
};

const ReactTypesPractice: React.FC = () => {
  console.log('=== REACT ТИПЫ TYPESCRIPT ===');
  demonstrateReactTypes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика React типов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Базовые типы React</h2>
          <p className="mb-2">ReactNode, ReactElement, ReactFragment</p>
          <p className="text-sm text-gray-600">type ReactNode = React.ReactNode;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Типизация Props</h2>
          <p className="mb-2">interface для определения props</p>
          <p className="text-sm text-gray-600">interface ButtonProps {`{ children: ReactNode; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Дженерики в Props</h2>
          <p className="mb-2">ListProps&lt;T&gt;, FormProps&lt;T&gt;</p>
          <p className="text-sm text-gray-600">interface ListProps&lt;T&gt; {`{ items: T[]; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Типизация событий</h2>
          <p className="mb-2">MouseEvent, ChangeEvent, FormEvent</p>
          <p className="text-sm text-gray-600">type ButtonClickEvent = React.MouseEvent&lt;HTMLButtonElement&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Типизация refs</h2>
          <p className="mb-2">RefObject, MutableRefObject, RefCallback</p>
          <p className="text-sm text-gray-600">type RefObject&lt;T&gt; = React.RefObject&lt;T&gt;;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Кастомные хуки</h2>
          <p className="mb-2">useLocalStorage, useApi с типизацией</p>
          <p className="text-sm text-gray-600">function useLocalStorage&lt;T&gt;(key: string, initialValue: T)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Контекст</h2>
          <p className="mb-2">ThemeContext с типизацией</p>
          <p className="text-sm text-gray-600">const ThemeContext = React.createContext&lt;ThemeContextType&gt;();</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. forwardRef</h2>
          <p className="mb-2">Типизация ref в компонентах</p>
          <p className="text-sm text-gray-600">const Modal = React.forwardRef&lt;HTMLDivElement, ModalProps&gt;();</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>ReactNode для типизации содержимого компонентов</li>
          <li>interface для определения props компонентов</li>
          <li>Дженерики для переиспользуемых компонентов</li>
          <li>Типизация событий для обработчиков</li>
          <li>RefObject для типизации refs</li>
          <li>Кастомные хуки с типизацией</li>
          <li>Context с типизацией для глобального состояния</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactTypesPractice; 