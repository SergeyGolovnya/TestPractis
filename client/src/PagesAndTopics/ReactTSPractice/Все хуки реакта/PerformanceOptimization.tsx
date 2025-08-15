import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';

// 1. Оптимизация с useMemo для дорогих вычислений
const ExpensiveCalculation: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Без оптимизации - вычисляется при каждом рендере
  const expensiveValueWithoutMemo = () => {
    console.log('Выполняется дорогое вычисление без useMemo');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i * count;
    }
    return result;
  };

  // ✅ С оптимизацией - вычисляется только при изменении count
  const expensiveValueWithMemo = useMemo(() => {
    console.log('Выполняется дорогое вычисление с useMemo');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i * count;
    }
    return result;
  }, [count]);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Оптимизация с useMemo</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя (вызывает перерендер)"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-red-50 rounded">
          <h4 className="font-bold text-red-800 mb-2">Без useMemo:</h4>
          <p>Результат: {expensiveValueWithoutMemo()}</p>
          <p className="text-sm text-red-600">
            Вычисляется при каждом рендере
          </p>
        </div>
        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold text-green-800 mb-2">С useMemo:</h4>
          <p>Результат: {expensiveValueWithMemo}</p>
          <p className="text-sm text-green-600">
            Вычисляется только при изменении count
          </p>
        </div>
      </div>

      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Увеличить счетчик
      </button>
    </div>
  );
};

// 2. Оптимизация с useCallback для функций
const ExpensiveChild: React.FC<{ onAction: () => void; label: string }> = React.memo(({ onAction, label }) => {
  console.log(`ExpensiveChild "${label}" рендерится`);
  
  return (
    <div className="p-3 bg-blue-100 rounded">
      <h4 className="font-bold mb-2">{label}</h4>
      <button 
        onClick={onAction}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Выполнить действие
      </button>
    </div>
  );
});

const CallbackOptimization: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ❌ Без оптимизации - функция создается при каждом рендере
  const handleActionWithoutCallback = () => {
    console.log('Действие без useCallback');
    setCount(prev => prev + 1);
  };

  // ✅ С оптимизацией - функция мемоизирована
  const handleActionWithCallback = useCallback(() => {
    console.log('Действие с useCallback');
    setCount(prev => prev + 1);
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Оптимизация с useCallback</h3>
      
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
          <strong>Наблюдение:</strong> Откройте консоль и измените "другое состояние". 
          Компонент без useCallback перерендерится, а с useCallback - нет.
        </p>
      </div>
    </div>
  );
};

// 3. Оптимизация с React.memo
const RegularComponent: React.FC<{ data: number[] }> = ({ data }) => {
  console.log('RegularComponent рендерится');
  
  const sum = data.reduce((acc, val) => acc + val, 0);
  
  return (
    <div className="p-3 bg-red-100 rounded">
      <h4 className="font-bold mb-2">Обычный компонент</h4>
      <p>Сумма: {sum}</p>
      <p>Количество элементов: {data.length}</p>
    </div>
  );
};

const MemoizedComponent: React.FC<{ data: number[] }> = React.memo(({ data }) => {
  console.log('MemoizedComponent рендерится');
  
  const sum = data.reduce((acc, val) => acc + val, 0);
  
  return (
    <div className="p-3 bg-green-100 rounded">
      <h4 className="font-bold mb-2">Мемоизированный компонент</h4>
      <p>Сумма: {sum}</p>
      <p>Количество элементов: {data.length}</p>
    </div>
  );
});

const MemoOptimization: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Данные для компонентов
  const data = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => i + count);
  }, [count]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Оптимизация с React.memo</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Другое состояние: {otherState}</p>
        
        <div className="space-x-2">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить счетчик
          </button>
          <button 
            onClick={() => setOtherState(prev => prev + 1)}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Изменить другое состояние
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegularComponent data={data} />
        <MemoizedComponent data={data} />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Измените "другое состояние" и посмотрите в консоль. 
          Обычный компонент перерендерится, а мемоизированный - нет.
        </p>
      </div>
    </div>
  );
};

// 4. Оптимизация с useRef для избежания лишних рендеров
const RefOptimization: React.FC = () => {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);
  const previousCountRef = useRef(0);

  // Отслеживаем количество рендеров
  renderCountRef.current += 1;

  // Сохраняем предыдущее значение
  useEffect(() => {
    previousCountRef.current = count;
  });

  const expensiveOperation = useCallback(() => {
    // Дорогая операция, которая не должна вызывать перерендер
    console.log('Выполняется дорогая операция');
    return Math.random() * 1000;
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Оптимизация с useRef</h3>
      
      <div className="mb-4">
        <p>Текущий счетчик: {count}</p>
        <p>Предыдущий счетчик: {previousCountRef.current}</p>
        <p>Количество рендеров: {renderCountRef.current}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Увеличить счетчик
        </button>
        <button 
          onClick={expensiveOperation}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Дорогая операция (не вызывает перерендер)
        </button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useRef позволяет хранить значения без вызова перерендера.
        </p>
      </div>
    </div>
  );
};

// 5. Оптимизация с виртуализацией для больших списков
const VirtualizedList: React.FC = () => {
  const [items] = useState(() => 
    Array.from({ length: 10000 }, (_, i) => `Элемент ${i + 1}`)
  );
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef<HTMLDivElement>(null);

  const itemHeight = 50;
  const containerHeight = 400;
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const start = Math.floor(scrollTop / itemHeight);
        const end = Math.min(start + visibleCount + 1, items.length);
        setVisibleRange({ start, end });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [items.length, visibleCount, itemHeight]);

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Виртуализация для больших списков</h3>
      
      <div className="mb-4">
        <p>Всего элементов: {items.length}</p>
        <p>Отображается: {visibleRange.start + 1} - {visibleRange.end}</p>
      </div>

      <div 
        ref={containerRef}
        className="border rounded overflow-auto"
        style={{ height: containerHeight }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems.map((item, index) => (
              <div
                key={visibleRange.start + index}
                className="p-3 border-b hover:bg-gray-50"
                style={{ height: itemHeight }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Виртуализация рендерит только видимые элементы, 
          что значительно улучшает производительность для больших списков.
        </p>
      </div>
    </div>
  );
};

// 6. Оптимизация с ленивой загрузкой
const LazyComponent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    setIsLoaded(true);
    // Имитация загрузки данных
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData(Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Элемент ${i}` })));
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Ленивая загрузка</h3>
      
      {!isLoaded ? (
        <div className="text-center">
          <button 
            onClick={loadData}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Загрузить данные
          </button>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center">
          <p>Загрузка...</p>
        </div>
      ) : (
        <div>
          <h4 className="font-bold mb-2">Загруженные данные:</h4>
          <div className="max-h-40 overflow-y-auto">
            {data.map(item => (
              <div key={item.id} className="p-2 border-b">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 7. Измерение производительности
const PerformanceMonitor: React.FC = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState(0);
  const renderStartTime = useRef(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
    setLastRenderTime(performance.now() - renderStartTime.current);
  });

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Мониторинг производительности</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold mb-2">Статистика рендеров:</h4>
          <p>Количество рендеров: {renderCount}</p>
          <p>Время последнего рендера: {lastRenderTime.toFixed(2)}ms</p>
        </div>
        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold mb-2">Рекомендации:</h4>
          <ul className="text-sm space-y-1">
            <li>• Используйте React.memo для компонентов</li>
            <li>• Мемоизируйте дорогие вычисления</li>
            <li>• Оптимизируйте зависимости хуков</li>
            <li>• Применяйте виртуализацию для списков</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Основной компонент
const PerformanceOptimizationPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Оптимизация производительности с хуками</h1>
      
      <div className="space-y-6">
        <ExpensiveCalculation />
        <CallbackOptimization />
        <MemoOptimization />
        <RefOptimization />
        <VirtualizedList />
        <LazyComponent />
        <PerformanceMonitor />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые принципы оптимизации:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>useMemo</strong> - для мемоизации дорогих вычислений</li>
          <li><strong>useCallback</strong> - для мемоизации функций</li>
          <li><strong>React.memo</strong> - для предотвращения лишних рендеров компонентов</li>
          <li><strong>useRef</strong> - для хранения значений без перерендера</li>
          <li><strong>Виртуализация</strong> - для больших списков данных</li>
          <li><strong>Ленивая загрузка</strong> - для отложенной загрузки ресурсов</li>
          <li><strong>Мониторинг</strong> - для отслеживания производительности</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceOptimizationPractice; 