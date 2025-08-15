import React, { useState, useRef, useEffect } from 'react';

// 1. Базовое использование useRef для DOM элементов
const DomRefExample: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const blurInput = () => {
    inputRef.current?.blur();
  };

  const selectInputText = () => {
    inputRef.current?.select();
  };

  const clickButton = () => {
    buttonRef.current?.click();
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">useRef для DOM элементов</h3>
      
      <div className="space-y-4">
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Этот input можно контролировать"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="space-x-2">
          <button 
            onClick={focusInput}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Фокус на input
          </button>
          <button 
            onClick={blurInput}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Убрать фокус
          </button>
          <button 
            onClick={selectInputText}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Выделить текст
          </button>
        </div>

        <div>
          <button
            ref={buttonRef}
            onClick={() => setCount(count + 1)}
            className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
          >
            Счетчик: {count}
          </button>
          <button 
            onClick={clickButton}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Программно нажать кнопку
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. useRef для мутабельных значений
const MutableRefExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Отслеживание количества рендеров
  renderCountRef.current += 1;

  // Сохранение предыдущего значения
  useEffect(() => {
    previousCountRef.current = count;
  });

  const startTimer = () => {
    if (intervalRef.current) return; // Уже запущен
    
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useRef для мутабельных значений</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-100 rounded">
          <p><strong>Текущий счетчик:</strong> {count}</p>
          <p><strong>Предыдущий счетчик:</strong> {previousCountRef.current}</p>
          <p><strong>Количество рендеров:</strong> {renderCountRef.current}</p>
        </div>

        <div className="space-x-2">
          <button 
            onClick={startTimer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Запустить таймер
          </button>
          <button 
            onClick={stopTimer}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Остановить таймер
          </button>
          <button 
            onClick={resetTimer}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Сбросить
          </button>
        </div>

        <div className="p-3 bg-yellow-50 rounded">
          <p className="text-sm text-gray-700">
            <strong>Наблюдение:</strong> useRef не вызывает перерендер при изменении значения. 
            Значение сохраняется между рендерами и не влияет на производительность.
          </p>
        </div>
      </div>
    </div>
  );
};

// 3. useRef для измерения элементов
const MeasureRefExample: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const measureElement = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
    }
  };

  useEffect(() => {
    measureElement();
    
    const handleResize = () => {
      measureElement();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useRef для измерения элементов</h3>
      
      <div className="mb-4">
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {isVisible ? 'Скрыть' : 'Показать'} элемент
        </button>
        <button 
          onClick={measureElement}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Измерить заново
        </button>
      </div>

      {isVisible && (
        <div
          ref={containerRef}
          className="p-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded"
          style={{ minHeight: '100px' }}
        >
          <h4 className="font-bold mb-2">Измеряемый элемент</h4>
          <p>Этот элемент можно измерять с помощью useRef</p>
          <p>Попробуйте изменить размер окна браузера</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Размеры элемента:</h4>
        <p>Ширина: {dimensions.width}px</p>
        <p>Высота: {dimensions.height}px</p>
      </div>
    </div>
  );
};

// 4. useRef для анимаций
const AnimationRefExample: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (!boxRef.current || isAnimating) return;
    
    setIsAnimating(true);
    let startTime: number | null = null;
    const duration = 2000; // 2 секунды

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (boxRef.current) {
        // Анимация движения по кругу
        const radius = 100;
        const angle = progress * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        boxRef.current.style.transform = `translate(${x}px, ${y}px)`;
        boxRef.current.style.backgroundColor = `hsl(${progress * 360}, 70%, 60%)`;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      setIsAnimating(false);
    }
  };

  const resetAnimation = () => {
    stopAnimation();
    if (boxRef.current) {
      boxRef.current.style.transform = 'translate(0px, 0px)';
      boxRef.current.style.backgroundColor = '#3b82f6';
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useRef для анимаций</h3>
      
      <div className="mb-4 space-x-2">
        <button 
          onClick={startAnimation}
          disabled={isAnimating}
          className={`px-4 py-2 rounded ${
            isAnimating 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-500 text-white'
          }`}
        >
          Запустить анимацию
        </button>
        <button 
          onClick={stopAnimation}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Остановить
        </button>
        <button 
          onClick={resetAnimation}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Сбросить
        </button>
      </div>

      <div className="relative h-64 bg-gray-100 rounded border-2 border-dashed border-gray-300">
        <div
          ref={boxRef}
          className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-500 rounded transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
        />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> useRef используется для хранения ID анимации. 
          Это позволяет остановить анимацию в любой момент.
        </p>
      </div>
    </div>
  );
};

// 5. useRef vs useState
const RefVsStateExample: React.FC = () => {
  const [stateValue, setStateValue] = useState(0);
  const refValue = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const incrementState = () => {
    setStateValue(prev => prev + 1);
  };

  const incrementRef = () => {
    refValue.current += 1;
    console.log('refValue.current:', refValue.current);
  };

  const forceRender = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useRef vs useState</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold mb-2">useState</h4>
          <p>Значение: {stateValue}</p>
          <p>Вызывает перерендер: Да</p>
          <button 
            onClick={incrementState}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить
          </button>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold mb-2">useRef</h4>
          <p>Значение: {refValue.current}</p>
          <p>Вызывает перерендер: Нет</p>
          <button 
            onClick={incrementRef}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Увеличить
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p>Количество рендеров: {renderCount}</p>
        <button 
          onClick={forceRender}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Принудительный рендер
        </button>
      </div>

      <div className="p-3 bg-red-50 rounded">
        <h4 className="font-bold text-red-800 mb-2">Ключевые различия:</h4>
        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
          <li><strong>useState:</strong> Вызывает перерендер при изменении, синхронный доступ</li>
          <li><strong>useRef:</strong> Не вызывает перерендер, мутабельное значение</li>
          <li><strong>useState:</strong> Подходит для данных, которые должны отображаться в UI</li>
          <li><strong>useRef:</strong> Подходит для значений, которые не должны влиять на рендер</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const UseRefPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useRef</h1>
      
      <div className="space-y-6">
        <DomRefExample />
        <MutableRefExample />
        <MeasureRefExample />
        <AnimationRefExample />
        <RefVsStateExample />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useRef:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useRef возвращает мутабельный объект с свойством .current</li>
          <li>Изменение .current не вызывает перерендер компонента</li>
          <li>Используется для прямого доступа к DOM элементам</li>
          <li>Подходит для хранения мутабельных значений между рендерами</li>
          <li>Значение сохраняется на протяжении всего жизненного цикла компонента</li>
          <li>Не используйте для данных, которые должны отображаться в UI</li>
        </ul>
      </div>
    </div>
  );
};

export default UseRefPractice; 