import React, { useState, useTransition, useDeferredValue, useId, useSyncExternalStore } from 'react';

// 1. useTransition - для неблокирующих обновлений
const UseTransitionExample: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    // Срочное обновление - блокирует UI
    setCount(c => c + 1);
    
    // Переходное обновление - не блокирует UI
    startTransition(() => {
      // Имитация тяжелой операции
      const startTime = performance.now();
      while (performance.now() - startTime < 100) {
        // Блокирующая операция
      }
      setCount(c => c + 1000);
    });
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">useTransition - неблокирующие обновления</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Статус: {isPending ? '⏳ Обновление...' : '✅ Готово'}</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Попробуйте печатать во время обновления"
          className="border p-2 rounded w-full"
        />
      </div>

      <button 
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Запустить тяжелую операцию
      </button>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Во время выполнения startTransition вы можете 
          продолжать печатать в input, так как обновление не блокирует UI.
        </p>
      </div>
    </div>
  );
};

// 2. useDeferredValue - отложенные значения
const ExpensiveComponent: React.FC<{ value: string }> = React.memo(({ value }) => {
  // Имитация дорогого рендеринга
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // Блокирующая операция
  }

  return (
    <div className="p-3 bg-green-100 rounded">
      <h4 className="font-bold mb-2">Дорогой компонент</h4>
      <p>Значение: {value}</p>
      <p className="text-sm text-gray-600">
        Рендерится медленно для демонстрации
      </p>
    </div>
  );
});

const UseDeferredValueExample: React.FC = () => {
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useDeferredValue - отложенные значения</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Введите текст:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Печатайте быстро"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2 text-blue-800">Текущее значение:</h4>
          <p className="p-3 bg-blue-100 rounded">{value || 'пусто'}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-green-800">Отложенное значение:</h4>
          <ExpensiveComponent value={deferredValue || 'пусто'} />
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Отложенное значение обновляется с задержкой, 
          что позволяет UI оставаться отзывчивым при быстром вводе.
        </p>
      </div>
    </div>
  );
};

// 3. useId - генерация уникальных ID
const UseIdExample: React.FC = () => {
  const id1 = useId();
  const id2 = useId();
  const id3 = useId();

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useId - генерация уникальных ID</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor={id1} className="block text-sm font-medium mb-1">
            Имя (ID: {id1}):
          </label>
          <input
            id={id1}
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Введите имя"
          />
        </div>

        <div>
          <label htmlFor={id2} className="block text-sm font-medium mb-1">
            Email (ID: {id2}):
          </label>
          <input
            id={id2}
            type="email"
            className="border p-2 rounded w-full"
            placeholder="Введите email"
          />
        </div>

        <div>
          <label htmlFor={id3} className="block text-sm font-medium mb-1">
            Сообщение (ID: {id3}):
          </label>
          <textarea
            id={id3}
            className="border p-2 rounded w-full"
            rows={3}
            placeholder="Введите сообщение"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useId генерирует уникальные ID, которые стабильны 
          между рендерами и не конфликтуют при серверном рендеринге.
        </p>
      </div>
    </div>
  );
};

// 4. useSyncExternalStore - синхронизация с внешними источниками
const createExternalStore = () => {
  let state = { count: 0, theme: 'light' };
  let listeners: (() => void)[] = [];

  return {
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
    dispatch: (action: { type: string; payload?: any }) => {
      switch (action.type) {
        case 'INCREMENT':
          state = { ...state, count: state.count + 1 };
          break;
        case 'DECREMENT':
          state = { ...state, count: state.count - 1 };
          break;
        case 'SET_THEME':
          state = { ...state, theme: action.payload };
          break;
        default:
          return;
      }
      listeners.forEach(listener => listener());
    }
  };
};

const externalStore = createExternalStore();

const UseSyncExternalStoreExample: React.FC = () => {
  const state = useSyncExternalStore(
    externalStore.subscribe,
    externalStore.getState,
    () => ({ count: 0, theme: 'light' }) // Fallback для SSR
  );

  const increment = () => {
    externalStore.dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    externalStore.dispatch({ type: 'DECREMENT' });
  };

  const toggleTheme = () => {
    externalStore.dispatch({ 
      type: 'SET_THEME', 
      payload: state.theme === 'light' ? 'dark' : 'light' 
    });
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useSyncExternalStore - внешние источники данных</h3>
      
      <div className="mb-4">
        <p>Счетчик: {state.count}</p>
        <p>Тема: {state.theme}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={increment}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Увеличить
        </button>
        <button 
          onClick={decrement}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Уменьшить
        </button>
        <button 
          onClick={toggleTheme}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Переключить тему
        </button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useSyncExternalStore синхронизирует компонент 
          с внешним источником данных, обеспечивая консистентность.
        </p>
      </div>
    </div>
  );
};

// 5. useInsertionEffect - для CSS-in-JS
const UseInsertionEffectExample: React.FC = () => {
  const [isStyled, setIsStyled] = useState(false);

  React.useInsertionEffect(() => {
    if (isStyled) {
      // Добавляем стили в head
      const style = document.createElement('style');
      style.textContent = `
        .custom-styled {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 20px;
          border-radius: 10px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isStyled]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useInsertionEffect - для CSS-in-JS</h3>
      
      <div className="mb-4">
        <button 
          onClick={() => setIsStyled(!isStyled)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {isStyled ? 'Убрать стили' : 'Добавить стили'}
        </button>
      </div>

      {isStyled && (
        <div className="custom-styled">
          <h4 className="font-bold mb-2">Стилизованный элемент</h4>
          <p>Этот элемент стилизован с помощью useInsertionEffect</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useInsertionEffect выполняется синхронно 
          перед всеми другими эффектами, что идеально для вставки стилей.
        </p>
      </div>
    </div>
  );
};

// 6. use - новый хук для работы с промисами
const fetchUserData = (id: number): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `Пользователь ${id}`,
        email: `user${id}@example.com`
      });
    }, 1000);
  });
};

const UserComponent: React.FC<{ userId: number }> = ({ userId }) => {
  // use автоматически обрабатывает промис
  const userData = use(fetchUserData(userId));

  return (
    <div className="p-3 bg-blue-100 rounded">
      <h4 className="font-bold mb-2">Данные пользователя</h4>
      <p>ID: {userData.id}</p>
      <p>Имя: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

const UseExample: React.FC = () => {
  const [userId, setUserId] = useState(1);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">use - работа с промисами</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ID пользователя:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
          className="border p-2 rounded w-32"
        />
      </div>

      <UserComponent userId={userId} />

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> use автоматически обрабатывает промисы и 
          отображает данные, когда они загружены.
        </p>
      </div>
    </div>
  );
};

// 7. Сравнение старых и новых подходов
const ComparisonExample: React.FC = () => {
  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Сравнение старых и новых подходов</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-red-50 rounded">
          <h4 className="font-bold text-red-800 mb-2">Старые подходы:</h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            <li>useState + useEffect для тяжелых операций</li>
            <li>Блокирующие обновления UI</li>
            <li>Ручная генерация ID</li>
            <li>Сложная синхронизация с внешними источниками</li>
            <li>Проблемы с CSS-in-JS</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold text-green-800 mb-2">Новые хуки React 18:</h4>
          <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
            <li>useTransition для неблокирующих обновлений</li>
            <li>useDeferredValue для отложенных значений</li>
            <li>useId для уникальных идентификаторов</li>
            <li>useSyncExternalStore для внешних источников</li>
            <li>useInsertionEffect для CSS-in-JS</li>
            <li>use для работы с промисами</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded">
        <h4 className="font-bold text-blue-800 mb-2">Преимущества новых хуков:</h4>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Лучшая производительность и отзывчивость</li>
          <li>Упрощенная работа с асинхронными данными</li>
          <li>Более предсказуемое поведение</li>
          <li>Лучшая поддержка серверного рендеринга</li>
          <li>Современные паттерны для React приложений</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const NewHooksPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика новых хуков React 18</h1>
      
      <div className="space-y-6">
        <UseTransitionExample />
        <UseDeferredValueExample />
        <UseIdExample />
        <UseSyncExternalStoreExample />
        <UseInsertionEffectExample />
        <UseExample />
        <ComparisonExample />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты новых хуков React 18:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useTransition и useDeferredValue улучшают отзывчивость UI</li>
          <li>useId решает проблемы с уникальными идентификаторами</li>
          <li>useSyncExternalStore обеспечивает консистентность с внешними данными</li>
          <li>useInsertionEffect оптимизирован для CSS-in-JS</li>
          <li>use упрощает работу с промисами и контекстом</li>
          <li>Все новые хуки совместимы с Concurrent Features</li>
          <li>Предоставляют современные решения для сложных задач</li>
        </ul>
      </div>
    </div>
  );
};

export default NewHooksPractice; 