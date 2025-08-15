import React, { useState, useCallback, useMemo } from 'react';

// 1. Базовое использование useCallback
const BasicUseCallback: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Функция без useCallback (создается при каждом рендере)
  const handleClickWithoutCallback = () => {
    console.log('Функция без useCallback вызвана');
    setCount(prev => prev + 1);
  };

  // Функция с useCallback (создается только при изменении зависимостей)
  const handleClickWithCallback = useCallback(() => {
    console.log('Функция с useCallback вызвана');
    setCount(prev => prev + 1);
  }, []); // Пустой массив - функция создается только один раз

  // Функция с зависимостями
  const handleClickWithDependencies = useCallback(() => {
    console.log('Функция с зависимостями вызвана, имя:', name);
    setCount(prev => prev + 1);
  }, [name]); // Пересоздается при изменении name

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useCallback</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          className="border p-2 rounded w-full mb-2"
        />
      </div>

      <div className="space-y-2">
        <button 
          onClick={handleClickWithoutCallback}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Без useCallback
        </button>
        <button 
          onClick={handleClickWithCallback}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          С useCallback (без зависимостей)
        </button>
        <button 
          onClick={handleClickWithDependencies}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          С useCallback (с зависимостями)
        </button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Откройте консоль и измените имя. 
          Функция с зависимостями пересоздается, а остальные - нет.
        </p>
      </div>
    </div>
  );
};

// 2. useCallback для предотвращения лишних рендеров
const ExpensiveChild: React.FC<{ onAction: () => void; label: string }> = React.memo(({ onAction, label }) => {
  console.log(`ExpensiveChild "${label}" рендерится`);
  
  return (
    <div className="p-3 bg-green-100 rounded">
      <h4 className="font-bold mb-2">{label}</h4>
      <button 
        onClick={onAction}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Выполнить действие
      </button>
    </div>
  );
});

const PreventRendersUseCallback: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Функция без useCallback
  const handleActionWithoutCallback = () => {
    console.log('Действие без useCallback');
    setCount(prev => prev + 1);
  };

  // Функция с useCallback
  const handleActionWithCallback = useCallback(() => {
    console.log('Действие с useCallback');
    setCount(prev => prev + 1);
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useCallback для предотвращения лишних рендеров</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Другое состояние: {otherState}</p>
        
        <button 
          onClick={() => setOtherState(prev => prev + 1)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Изменить другое состояние
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpensiveChild 
          onAction={handleActionWithoutCallback}
          label="Без useCallback"
        />
        <ExpensiveChild 
          onAction={handleActionWithCallback}
          label="С useCallback"
        />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Измените "другое состояние" и посмотрите в консоль. 
          Компонент с useCallback не перерендерится, а без него - перерендерится.
        </p>
      </div>
    </div>
  );
};

// 3. useCallback с параметрами
const ParameterizedUseCallback: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Функция с параметрами без useCallback
  const handleItemClickWithoutCallback = (item: string) => {
    console.log('Клик по элементу без useCallback:', item);
    setSelectedItem(item);
  };

  // Функция с параметрами с useCallback
  const handleItemClickWithCallback = useCallback((item: string) => {
    console.log('Клик по элементу с useCallback:', item);
    setSelectedItem(item);
  }, []);

  // Функция с зависимостями
  const handleItemAction = useCallback((item: string, action: 'edit' | 'delete') => {
    console.log(`Действие ${action} для элемента:`, item);
    if (action === 'delete') {
      setItems(prev => prev.filter(i => i !== item));
      if (selectedItem === item) {
        setSelectedItem(null);
      }
    }
  }, [selectedItem]);

  const addItem = () => {
    const newItem = `Элемент ${items.length + 1}`;
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useCallback с параметрами</h3>
      
      <div className="mb-4">
        <button 
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Добавить элемент
        </button>
        <p className="mt-2">Выбранный элемент: {selectedItem || 'нет'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2">Без useCallback:</h4>
          <div className="space-y-1">
            {items.map(item => (
              <div key={item} className="flex items-center space-x-2">
                <button 
                  onClick={() => handleItemClickWithoutCallback(item)}
                  className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm"
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-2">С useCallback:</h4>
          <div className="space-y-1">
            {items.map(item => (
              <div key={item} className="flex items-center space-x-2">
                <button 
                  onClick={() => handleItemClickWithCallback(item)}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                >
                  {item}
                </button>
                <button 
                  onClick={() => handleItemAction(item, 'delete')}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. useCallback в кастомных хуках
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

  const setValue = useCallback((value: number) => {
    setCount(value);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue
  };
};

const CustomHookUseCallback: React.FC = () => {
  const counter1 = useCounter(0);
  const counter2 = useCounter(10);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useCallback в кастомных хуках</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold mb-2">Счетчик 1: {counter1.count}</h4>
          <div className="space-x-2">
            <button 
              onClick={counter1.increment}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              +
            </button>
            <button 
              onClick={counter1.decrement}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              -
            </button>
            <button 
              onClick={counter1.reset}
              className="bg-gray-500 text-white px-3 py-1 rounded"
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
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              +
            </button>
            <button 
              onClick={counter2.decrement}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              -
            </button>
            <button 
              onClick={() => counter2.setValue(0)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Установить 0
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Преимущества:</strong> Функции из кастомного хука стабильны и не вызывают 
          лишних рендеров дочерних компонентов, которые их используют.
        </p>
      </div>
    </div>
  );
};

// 5. Когда НЕ использовать useCallback
const WhenNotToUseCallback: React.FC = () => {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // ❌ Плохо: простая функция
  const simpleFunction = useCallback(() => {
    console.log('Простая функция');
  }, []);

  // ✅ Хорошо: простая функция без useCallback
  const simpleFunctionGood = () => {
    console.log('Простая функция без useCallback');
  };

  // ✅ Хорошо: функция с зависимостями
  const functionWithDependencies = useCallback(() => {
    console.log('Функция с зависимостями, count:', count);
  }, [count]);

  // ✅ Хорошо: функция, передаваемая как проп
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Когда НЕ использовать useCallback</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Количество рендеров: {renderCount}</p>
        
        <button 
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Увеличить счетчик
        </button>
        <button 
          onClick={() => setRenderCount(prev => prev + 1)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Принудительный рендер
        </button>
      </div>

      <div className="space-y-2">
        <button onClick={simpleFunction} className="bg-red-100 text-red-800 px-4 py-2 rounded w-full">
          Простая функция (useCallback) - не нужно
        </button>
        <button onClick={simpleFunctionGood} className="bg-green-100 text-green-800 px-4 py-2 rounded w-full">
          Простая функция (без useCallback) - правильно
        </button>
        <button onClick={functionWithDependencies} className="bg-blue-100 text-blue-800 px-4 py-2 rounded w-full">
          Функция с зависимостями (useCallback) - правильно
        </button>
      </div>

      <div className="mt-4 p-3 bg-red-50 rounded">
        <h4 className="font-bold text-red-800 mb-2">Когда НЕ использовать useCallback:</h4>
        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
          <li>Для простых функций без параметров</li>
          <li>Когда функция не передается как проп дочерним компонентам</li>
          <li>Когда дочерние компоненты не мемоизированы (React.memo)</li>
          <li>Когда зависимостей много и они часто меняются</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded">
        <h4 className="font-bold text-green-800 mb-2">Когда использовать useCallback:</h4>
        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
          <li>Когда функция передается как проп мемоизированным компонентам</li>
          <li>Когда функция используется в useEffect</li>
          <li>Когда функция является зависимостью других хуков</li>
          <li>Для стабилизации функций в кастомных хуках</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const UseCallbackPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useCallback</h1>
      
      <div className="space-y-6">
        <BasicUseCallback />
        <PreventRendersUseCallback />
        <ParameterizedUseCallback />
        <CustomHookUseCallback />
        <WhenNotToUseCallback />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useCallback:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useCallback мемоизирует функции между рендерами</li>
          <li>Пересоздается только при изменении зависимостей</li>
          <li>Используется для предотвращения лишних рендеров дочерних компонентов</li>
          <li>Особенно полезен с React.memo и мемоизированными компонентами</li>
          <li>Не используйте для простых функций - это может замедлить приложение</li>
          <li>Всегда включайте в зависимости все переменные, используемые в функции</li>
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackPractice; 