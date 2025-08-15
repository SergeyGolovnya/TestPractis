import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';

// 1. Базовое использование useLayoutEffect
const BasicUseLayoutEffect: React.FC = () => {
  const [count, setCount] = useState(0);
  const [effectLog, setEffectLog] = useState<string[]>([]);
  const [layoutEffectLog, setLayoutEffectLog] = useState<string[]>([]);

  // useEffect выполняется асинхронно после рендера
  useEffect(() => {
    const log = `useEffect: count = ${count} (${new Date().toLocaleTimeString()})`;
    setEffectLog(prev => [...prev, log]);
  }, [count]);

  // useLayoutEffect выполняется синхронно перед рендером
  useLayoutEffect(() => {
    const log = `useLayoutEffect: count = ${count} (${new Date().toLocaleTimeString()})`;
    setLayoutEffectLog(prev => [...prev, log]);
  }, [count]);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useLayoutEffect</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Увеличить
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2 text-blue-800">useEffect (асинхронный):</h4>
          <div className="h-32 overflow-y-auto bg-blue-50 p-2 rounded">
            {effectLog.map((log, index) => (
              <div key={index} className="text-xs text-blue-700 mb-1">{log}</div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-green-800">useLayoutEffect (синхронный):</h4>
          <div className="h-32 overflow-y-auto bg-green-50 p-2 rounded">
            {layoutEffectLog.map((log, index) => (
              <div key={index} className="text-xs text-green-700 mb-1">{log}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useLayoutEffect выполняется раньше useEffect. 
          Обратите внимание на порядок времени выполнения.
        </p>
      </div>
    </div>
  );
};

// 2. useLayoutEffect для предотвращения мерцания
const FlashingComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [measurements, setMeasurements] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // useEffect - может вызвать мерцание
  useEffect(() => {
    if (isVisible && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setMeasurements({ width: rect.width, height: rect.height });
    }
  }, [isVisible]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useLayoutEffect для предотвращения мерцания</h3>
      
      <div className="mb-4">
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isVisible ? 'Скрыть' : 'Показать'} элемент
        </button>
      </div>

      {isVisible && (
        <div 
          ref={elementRef}
          className="p-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded"
          style={{ minHeight: '100px' }}
        >
          <h4 className="font-bold mb-2">Измеряемый элемент</h4>
          <p>Этот элемент может мерцать при измерении через useEffect</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Измерения:</h4>
        <p>Ширина: {measurements.width}px</p>
        <p>Высота: {measurements.height}px</p>
      </div>
    </div>
  );
};

const NonFlashingComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [measurements, setMeasurements] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect - предотвращает мерцание
  useLayoutEffect(() => {
    if (isVisible && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setMeasurements({ width: rect.width, height: rect.height });
    }
  }, [isVisible]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Без мерцания (useLayoutEffect)</h3>
      
      <div className="mb-4">
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isVisible ? 'Скрыть' : 'Показать'} элемент
        </button>
      </div>

      {isVisible && (
        <div 
          ref={elementRef}
          className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded"
          style={{ minHeight: '100px' }}
        >
          <h4 className="font-bold mb-2">Измеряемый элемент</h4>
          <p>Этот элемент не мерцает благодаря useLayoutEffect</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Измерения:</h4>
        <p>Ширина: {measurements.width}px</p>
        <p>Высота: {measurements.height}px</p>
      </div>
    </div>
  );
};

// 3. useLayoutEffect для синхронных DOM операций
const DomManipulationExample: React.FC = () => {
  const [text, setText] = useState('Короткий текст');
  const [isLong, setIsLong] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect для синхронного изменения DOM
  useLayoutEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const rect = element.getBoundingClientRect();
      
      // Если текст слишком длинный, добавляем класс
      if (rect.width > 300) {
        element.classList.add('text-red-500', 'font-bold');
        setIsLong(true);
      } else {
        element.classList.remove('text-red-500', 'font-bold');
        setIsLong(false);
      }
    }
  }, [text]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useLayoutEffect для синхронных DOM операций</h3>
      
      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <div 
          ref={textRef}
          className="p-3 bg-gray-100 rounded border"
          style={{ maxWidth: '300px' }}
        >
          {text}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Статус: {isLong ? 'Текст слишком длинный' : 'Текст нормальной длины'}
        </p>
      </div>

      <div className="p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useLayoutEffect изменяет DOM синхронно, 
          поэтому пользователь не видит промежуточного состояния.
        </p>
      </div>
    </div>
  );
};

// 4. useLayoutEffect для анимаций
const AnimationExample: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect для синхронной анимации
  useLayoutEffect(() => {
    if (isAnimating && boxRef.current) {
      const element = boxRef.current;
      
      // Синхронно устанавливаем начальную позицию
      element.style.transform = 'translateX(0px)';
      element.style.transition = 'none';
      
      // Принудительно вызываем reflow
      element.offsetHeight;
      
      // Запускаем анимацию
      element.style.transition = 'transform 1s ease-in-out';
      element.style.transform = 'translateX(200px)';
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPosition(200);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const startAnimation = () => {
    setIsAnimating(true);
    setPosition(0);
  };

  const resetAnimation = () => {
    if (boxRef.current) {
      boxRef.current.style.transition = 'none';
      boxRef.current.style.transform = 'translateX(0px)';
    }
    setIsAnimating(false);
    setPosition(0);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useLayoutEffect для анимаций</h3>
      
      <div className="mb-4">
        <button 
          onClick={startAnimation}
          disabled={isAnimating}
          className={`px-4 py-2 rounded mr-2 ${
            isAnimating 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white'
          }`}
        >
          Запустить анимацию
        </button>
        <button 
          onClick={resetAnimation}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Сбросить
        </button>
      </div>

      <div className="relative h-32 bg-gray-100 rounded border-2 border-dashed border-gray-300">
        <div
          ref={boxRef}
          className="absolute top-1/2 w-8 h-8 bg-blue-500 rounded transform -translate-y-1/2"
          style={{ transform: `translateX(${position}px) translateY(-50%)` }}
        />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useLayoutEffect обеспечивает плавную анимацию 
          без мерцания, устанавливая начальное состояние синхронно.
        </p>
      </div>
    </div>
  );
};

// 5. useLayoutEffect vs useEffect для критических операций
const CriticalOperationsExample: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [useEffectResult, setUseEffectResult] = useState<string>('');
  const [useLayoutEffectResult, setUseLayoutEffectResult] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // useEffect - может вызвать мерцание
  useEffect(() => {
    if (showContent && contentRef.current) {
      const startTime = performance.now();
      // Имитация критической операции
      const element = contentRef.current;
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
      
      // Принудительный reflow
      element.offsetHeight;
      
      element.style.transition = 'all 0.3s ease';
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      
      const endTime = performance.now();
      setUseEffectResult(`useEffect: ${(endTime - startTime).toFixed(2)}ms`);
    }
  }, [showContent]);

  // useLayoutEffect - синхронная операция
  useLayoutEffect(() => {
    if (showContent && contentRef.current) {
      const startTime = performance.now();
      // Имитация критической операции
      const element = contentRef.current;
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      
      const endTime = performance.now();
      setUseLayoutEffectResult(`useLayoutEffect: ${(endTime - startTime).toFixed(2)}ms`);
    }
  }, [showContent]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useLayoutEffect vs useEffect для критических операций</h3>
      
      <div className="mb-4">
        <button 
          onClick={() => setShowContent(!showContent)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showContent ? 'Скрыть' : 'Показать'} контент
        </button>
      </div>

      {showContent && (
        <div 
          ref={contentRef}
          className="p-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded"
          style={{ opacity: 0, transform: 'scale(0.8)' }}
        >
          <h4 className="font-bold mb-2">Критический контент</h4>
          <p>Этот контент должен отображаться без мерцания</p>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="p-2 bg-blue-50 rounded">
          <strong>useEffect:</strong> {useEffectResult || 'Не выполнен'}
        </div>
        <div className="p-2 bg-green-50 rounded">
          <strong>useLayoutEffect:</strong> {useLayoutEffectResult || 'Не выполнен'}
        </div>
      </div>

      <div className="mt-4 p-3 bg-red-50 rounded">
        <h4 className="font-bold text-red-800 mb-2">Когда использовать useLayoutEffect:</h4>
        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
          <li>Для синхронных DOM операций</li>
          <li>Для предотвращения мерцания</li>
          <li>Для критических измерений и изменений</li>
          <li>Когда нужно изменить DOM до того, как браузер отрисует</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded">
        <h4 className="font-bold text-green-800 mb-2">Когда использовать useEffect:</h4>
        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
          <li>Для асинхронных операций</li>
          <li>Для API запросов</li>
          <li>Для подписки на события</li>
          <li>Когда мерцание не критично</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const UseLayoutEffectPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useLayoutEffect</h1>
      
      <div className="space-y-6">
        <BasicUseLayoutEffect />
        <FlashingComponent />
        <NonFlashingComponent />
        <DomManipulationExample />
        <AnimationExample />
        <CriticalOperationsExample />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useLayoutEffect:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useLayoutEffect выполняется синхронно после всех DOM мутаций, но до рендера</li>
          <li>Блокирует рендер до завершения выполнения</li>
          <li>Используется для предотвращения мерцания и синхронных DOM операций</li>
          <li>Может замедлить рендер - используйте осторожно</li>
          <li>Подходит для критических измерений и изменений DOM</li>
          <li>В большинстве случаев предпочтительнее useEffect</li>
        </ul>
      </div>
    </div>
  );
};

export default UseLayoutEffectPractice; 