import React, { useState, useEffect, useCallback, useRef } from 'react';

// 1. Простой кастомный хук
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
};

const SimpleCustomHook: React.FC = () => {
  const { value, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Простой кастомный хук</h3>
      
      <div className="mb-4">
        <p>Значение: {value ? 'Включено' : 'Выключено'}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={toggle}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Переключить
        </button>
        <button 
          onClick={setTrue}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Включить
        </button>
        <button 
          onClick={setFalse}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Выключить
        </button>
      </div>
    </div>
  );
};

// 2. Кастомный хук с параметрами
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

const LocalStorageHook: React.FC = () => {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [count, setCount] = useLocalStorage('count', 0);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Кастомный хук с параметрами (useLocalStorage)</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Имя пользователя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Введите имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Тема:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
            <option value="auto">Авто</option>
          </select>
        </div>

        <div>
          <p>Счетчик: {count}</p>
          <div className="space-x-2">
            <button 
              onClick={() => setCount(prev => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Увеличить
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Данные сохраняются в localStorage. 
          Обновите страницу - данные останутся.
        </p>
      </div>
    </div>
  );
};

// 3. Кастомный хук с эффектами
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

const EffectsCustomHook: React.FC = () => {
  const windowSize = useWindowSize();
  const isOnline = useOnlineStatus();

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Кастомный хук с эффектами</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold mb-2">Размер окна:</h4>
          <p>Ширина: {windowSize.width}px</p>
          <p>Высота: {windowSize.height}px</p>
          <p className="text-sm text-gray-600">
            Попробуйте изменить размер окна
          </p>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold mb-2">Статус подключения:</h4>
          <p className={isOnline ? 'text-green-600' : 'text-red-600'}>
            {isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
          </p>
          <p className="text-sm text-gray-600">
            Попробуйте отключить интернет
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. Кастомный хук с ref
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback]);

  return ref;
};

const ClickOutsideHook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Кастомный хук с ref (useClickOutside)</h3>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Открыть выпадающий список
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg p-2 min-w-48">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Опция 1</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Опция 2</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Опция 3</div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Кликните вне выпадающего списка - он закроется.
        </p>
      </div>
    </div>
  );
};

// 5. Кастомный хук с состоянием и логикой
const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(async (onSubmit: (values: T) => Promise<void>) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values]);

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    setError,
    reset,
    handleSubmit
  };
};

const FormHook: React.FC = () => {
  const form = useForm({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!form.values.name.trim()) {
      errors.name = 'Имя обязательно';
    }

    if (!form.values.email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(form.values.email)) {
      errors.email = 'Некорректный email';
    }

    if (!form.values.message.trim()) {
      errors.message = 'Сообщение обязательно';
    }

    return errors;
  };

  const handleSubmit = async (values: typeof form.values) => {
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Форма отправлена:', values);
    alert('Форма успешно отправлена!');
    form.reset();
  };

  const onSubmit = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, value]) => {
        form.setError(key as keyof typeof form.values, value);
      });
      return;
    }

    form.handleSubmit(handleSubmit);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Кастомный хук с состоянием и логикой (useForm)</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Имя:</label>
          <input
            type="text"
            value={form.values.name}
            onChange={(e) => form.setValue('name', e.target.value)}
            className={`border p-2 rounded w-full ${
              form.errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Введите имя"
          />
          {form.errors.name && (
            <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={form.values.email}
            onChange={(e) => form.setValue('email', e.target.value)}
            className={`border p-2 rounded w-full ${
              form.errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Введите email"
          />
          {form.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Сообщение:</label>
          <textarea
            value={form.values.message}
            onChange={(e) => form.setValue('message', e.target.value)}
            className={`border p-2 rounded w-full ${
              form.errors.message ? 'border-red-500' : ''
            }`}
            rows={3}
            placeholder="Введите сообщение"
          />
          {form.errors.message && (
            <p className="text-red-500 text-sm mt-1">{form.errors.message}</p>
          )}
        </div>

        <div className="space-x-2">
          <button 
            onClick={onSubmit}
            disabled={form.isSubmitting}
            className={`px-4 py-2 rounded ${
              form.isSubmitting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {form.isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
          <button 
            onClick={form.reset}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Сброс
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. Композиция кастомных хуков
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};

const useTimer = (initialSeconds: number = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  return { seconds, isRunning, start, stop, reset };
};

const CompositionExample: React.FC = () => {
  const counter = useCounter(0);
  const timer = useTimer(0);
  const { value: isVisible, toggle } = useToggle(false);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Композиция кастомных хуков</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold mb-2">Счетчик: {counter.count}</h4>
          <div className="space-x-2">
            <button 
              onClick={counter.increment}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              +
            </button>
            <button 
              onClick={counter.decrement}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              -
            </button>
            <button 
              onClick={counter.reset}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Сброс
            </button>
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold mb-2">Таймер: {timer.seconds}s</h4>
          <div className="space-x-2">
            <button 
              onClick={timer.isRunning ? timer.stop : timer.start}
              className={`px-3 py-1 rounded text-sm ${
                timer.isRunning 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}
            >
              {timer.isRunning ? 'Стоп' : 'Старт'}
            </button>
            <button 
              onClick={timer.reset}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Сброс
            </button>
          </div>
        </div>

        <div className="p-3 bg-purple-50 rounded">
          <h4 className="font-bold mb-2">Переключатель</h4>
          <p>Статус: {isVisible ? 'Включено' : 'Выключено'}</p>
          <button 
            onClick={toggle}
            className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
          >
            Переключить
          </button>
        </div>
      </div>
    </div>
  );
};

// Основной компонент
const CustomHooksPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика кастомных хуков</h1>
      
      <div className="space-y-6">
        <SimpleCustomHook />
        <LocalStorageHook />
        <EffectsCustomHook />
        <ClickOutsideHook />
        <FormHook />
        <CompositionExample />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты кастомных хуков:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Кастомные хуки должны начинаться с "use"</li>
          <li>Могут использовать любые встроенные хуки React</li>
          <li>Позволяют переиспользовать логику между компонентами</li>
          <li>Могут принимать параметры и возвращать значения</li>
          <li>Могут композироваться друг с другом</li>
          <li>Должны следовать правилам хуков</li>
          <li>Помогают разделить логику и представление</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomHooksPractice; 