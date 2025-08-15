import React, { useState, useDebugValue, useCallback } from 'react';

// 1. Базовое использование useDebugValue
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  // Отображается в React DevTools
  useDebugValue(count, (value) => `Счетчик: ${value}`);

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

const BasicUseDebugValue: React.FC = () => {
  const counter1 = useCounter(0);
  const counter2 = useCounter(10);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useDebugValue</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold mb-2">Счетчик 1: {counter1.count}</h4>
          <div className="space-x-2">
            <button 
              onClick={counter1.increment}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              +
            </button>
            <button 
              onClick={counter1.decrement}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              -
            </button>
            <button 
              onClick={counter1.reset}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Сброс
            </button>
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold mb-2">Счетчик 2: {counter2.count}</h4>
          <div className="space-x-2">
            <button 
              onClick={counter2.increment}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              +
            </button>
            <button 
              onClick={counter2.decrement}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              -
            </button>
            <button 
              onClick={counter2.reset}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Откройте React DevTools и посмотрите на хуки. 
          Вы увидите отладочные значения для каждого экземпляра useCounter.
        </p>
      </div>
    </div>
  );
};

// 2. useDebugValue с условной логикой
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useDebugValue(isOnline, (online) => 
    online ? '🟢 Онлайн' : '🔴 Офлайн'
  );

  React.useEffect(() => {
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

const OnlineStatusExample: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useDebugValue с условной логикой</h3>
      
      <div className="p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Статус подключения:</h4>
        <p className={`text-lg ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
          {isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Попробуйте отключить интернет и посмотрите в DevTools
        </p>
      </div>
    </div>
  );
};

// 3. useDebugValue с дорогими вычислениями
const useExpensiveCalculation = (value: number) => {
  const [result, setResult] = useState(0);

  // Дорогое вычисление
  const expensiveValue = React.useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i * value;
    }
    return sum;
  }, [value]);

  // useDebugValue с ленивым вычислением
  useDebugValue(expensiveValue, (val) => {
    // Эта функция выполняется только в DevTools
    return `Результат: ${val.toLocaleString()}`;
  });

  React.useEffect(() => {
    setResult(expensiveValue);
  }, [expensiveValue]);

  return result;
};

const ExpensiveCalculationExample: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);
  const result = useExpensiveCalculation(inputValue);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useDebugValue с дорогими вычислениями</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Введите число:</label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(parseInt(e.target.value) || 1)}
          className="border p-2 rounded w-32"
          min="1"
          max="10"
        />
      </div>

      <div className="p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Результат:</h4>
        <p className="text-lg">{result.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-2">
          Откройте DevTools - отладочное значение вычисляется только там
        </p>
      </div>
    </div>
  );
};

// 4. useDebugValue для кастомных хуков с состоянием
const useFormValidation = (initialData: Record<string, string>) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string) => {
    const fieldErrors: Record<string, string> = {};
    
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      fieldErrors.email = 'Некорректный email';
    }
    
    if (name === 'password' && value && value.length < 6) {
      fieldErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (name === 'name' && value && value.length < 2) {
      fieldErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    return fieldErrors;
  }, []);

  const updateField = useCallback((name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
    
    const fieldErrors = validateField(name, value);
    setErrors(prev => ({ ...prev, ...fieldErrors }));
  }, [validateField]);

  // Отладочная информация
  const hasErrors = Object.keys(errors).length > 0;
  const isValid = Object.values(data).every(value => value.trim() !== '') && !hasErrors;

  useDebugValue(
    { data, errors, isValid, hasErrors },
    (debugInfo) => {
      const status = debugInfo.isValid ? '✅ Валидна' : '❌ Невалидна';
      const errorCount = Object.keys(debugInfo.errors).length;
      return `${status} (${errorCount} ошибок)`;
    }
  );

  return {
    data,
    errors,
    updateField,
    isValid,
    hasErrors
  };
};

const FormValidationExample: React.FC = () => {
  const form = useFormValidation({
    name: '',
    email: '',
    password: ''
  });

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useDebugValue для кастомных хуков с состоянием</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Имя:</label>
          <input
            type="text"
            value={form.data.name}
            onChange={(e) => form.updateField('name', e.target.value)}
            className="border p-2 rounded w-full"
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
            value={form.data.email}
            onChange={(e) => form.updateField('email', e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Введите email"
          />
          {form.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Пароль:</label>
          <input
            type="password"
            value={form.data.password}
            onChange={(e) => form.updateField('password', e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Введите пароль"
          />
          {form.errors.password && (
            <p className="text-red-500 text-sm mt-1">{form.errors.password}</p>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Статус формы:</h4>
        <p className={form.isValid ? 'text-green-600' : 'text-red-600'}>
          {form.isValid ? '✅ Форма валидна' : '❌ Форма невалидна'}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Откройте DevTools для просмотра отладочной информации
        </p>
      </div>
    </div>
  );
};

// 5. useDebugValue для отладки производительности
const usePerformanceMonitor = (componentName: string) => {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState<number>(0);

  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
    setLastRenderTime(Date.now());
  });

  useDebugValue(
    { renderCount, lastRenderTime },
    (debugInfo) => {
      const timeSinceLastRender = Date.now() - debugInfo.lastRenderTime;
      return `${componentName}: ${debugInfo.renderCount} рендеров (${timeSinceLastRender}ms назад)`;
    }
  );

  return { renderCount, lastRenderTime };
};

const PerformanceComponent: React.FC<{ name: string }> = ({ name }) => {
  const performance = usePerformanceMonitor(name);
  const [count, setCount] = useState(0);

  return (
    <div className="p-3 bg-gray-50 rounded">
      <h4 className="font-bold mb-2">{name}</h4>
      <p>Счетчик: {count}</p>
      <p className="text-sm text-gray-600">
        Рендеров: {performance.renderCount}
      </p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm mt-2"
      >
        Увеличить
      </button>
    </div>
  );
};

const PerformanceExample: React.FC = () => {
  const [parentState, setParentState] = useState(0);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useDebugValue для отладки производительности</h3>
      
      <div className="mb-4">
        <p>Состояние родителя: {parentState}</p>
        <button 
          onClick={() => setParentState(prev => prev + 1)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Изменить состояние родителя
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PerformanceComponent name="Компонент A" />
        <PerformanceComponent name="Компонент B" />
        <PerformanceComponent name="Компонент C" />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Откройте DevTools и посмотрите на отладочную информацию. 
          Вы увидите количество рендеров и время последнего рендера для каждого компонента.
        </p>
      </div>
    </div>
  );
};

// 6. Когда НЕ использовать useDebugValue
const WhenNotToUseDebugValue: React.FC = () => {
  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Когда НЕ использовать useDebugValue</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-red-50 rounded">
          <h4 className="font-bold text-red-800 mb-2">❌ Не используйте для:</h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            <li>Обычных компонентов (только для кастомных хуков)</li>
            <li>Критически важной логики приложения</li>
            <li>Данных, которые должны быть скрыты от пользователей</li>
            <li>Логики, которая должна работать в продакшене</li>
            <li>Замены правильного логирования</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold text-green-800 mb-2">✅ Используйте для:</h4>
          <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
            <li>Отладки кастомных хуков в DevTools</li>
            <li>Отображения состояния хука в понятном виде</li>
            <li>Мониторинга производительности во время разработки</li>
            <li>Упрощения отладки сложной логики</li>
            <li>Документирования поведения хука</li>
          </ul>
        </div>

        <div className="p-3 bg-yellow-50 rounded">
          <h4 className="font-bold text-yellow-800 mb-2">⚠️ Помните:</h4>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>useDebugValue работает только в режиме разработки</li>
            <li>Не влияет на производительность продакшена</li>
            <li>Используйте ленивые функции для дорогих вычислений</li>
            <li>Не злоупотребляйте - только для действительно полезной отладочной информации</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Основной компонент
const UseDebugValuePractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useDebugValue</h1>
      
      <div className="space-y-6">
        <BasicUseDebugValue />
        <OnlineStatusExample />
        <ExpensiveCalculationExample />
        <FormValidationExample />
        <PerformanceExample />
        <WhenNotToUseDebugValue />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useDebugValue:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useDebugValue отображает отладочную информацию в React DevTools</li>
          <li>Используется только в кастомных хуках</li>
          <li>Принимает значение и опциональную функцию форматирования</li>
          <li>Функция форматирования выполняется только в DevTools</li>
          <li>Не влияет на производительность продакшена</li>
          <li>Помогает в отладке и понимании поведения хуков</li>
          <li>Используйте ленивые функции для дорогих вычислений</li>
        </ul>
      </div>
    </div>
  );
};

export default UseDebugValuePractice; 