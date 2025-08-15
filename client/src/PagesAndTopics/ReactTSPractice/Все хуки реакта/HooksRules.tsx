import React, { useState, useEffect, useCallback } from 'react';

// 1. Правило 1: Вызывайте хуки только на верхнем уровне
const CorrectTopLevel: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = `Счетчик: ${count}`;
  }, [count]);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">✅ Правильно: Хуки на верхнем уровне</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          className="border p-2 rounded w-full"
        />
      </div>

      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Увеличить
      </button>
    </div>
  );
};

const IncorrectTopLevel: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ НЕПРАВИЛЬНО: Хук внутри функции
    // const [name, setName] = useState('');
    
    setCount(prev => prev + 1);
  };

  if (count > 5) {
    // ❌ НЕПРАВИЛЬНО: Хук внутри условия
    // const [showMessage, setShowMessage] = useState(true);
  }

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">❌ Неправильно: Хуки не на верхнем уровне</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p className="text-sm text-red-600">
          Этот код содержит закомментированные неправильные примеры
        </p>
      </div>

      <button 
        onClick={handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Увеличить (смотрите комментарии в коде)
      </button>
    </div>
  );
};

// 2. Правило 2: Вызывайте хуки только из React функций
const CustomHook = () => {
  const [value, setValue] = useState(0);
  return { value, setValue };
};

const CorrectReactFunction: React.FC = () => {
  const { value, setValue } = CustomHook(); // ✅ Правильно: в React компоненте

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">✅ Правильно: Хуки в React функциях</h3>
      
      <div className="mb-4">
        <p>Значение: {value}</p>
      </div>

      <button 
        onClick={() => setValue(prev => prev + 1)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Увеличить
      </button>
    </div>
  );
};

// 3. Правило 3: Порядок вызовов хуков должен быть одинаковым
const CorrectOrder: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Эффект для count:', count);
  }, [count]);

  useEffect(() => {
    console.log('Эффект для name:', name);
  }, [name]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">✅ Правильно: Одинаковый порядок хуков</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Имя: {name}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Увеличить счетчик
        </button>
        <button 
          onClick={() => setName(prev => prev + '!')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Добавить символ к имени
        </button>
      </div>
    </div>
  );
};

const IncorrectOrder: React.FC = () => {
  const [count, setCount] = useState(0);

  if (count > 5) {
    // ❌ НЕПРАВИЛЬНО: Хук в условии
    // const [showMessage, setShowMessage] = useState(true);
  }

  const [name, setName] = useState(''); // ✅ Правильно: после условия

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">❌ Неправильно: Хуки в условиях</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Имя: {name}</p>
        <p className="text-sm text-red-600">
          Этот код содержит закомментированные неправильные примеры
        </p>
      </div>

      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Увеличить (смотрите комментарии в коде)
      </button>
    </div>
  );
};

// 4. Правило 4: Зависимости в useEffect
const CorrectDependencies: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ✅ Правильно: все зависимости указаны
  useEffect(() => {
    console.log(`Count изменился: ${count}`);
  }, [count]);

  // ✅ Правильно: пустой массив зависимостей
  useEffect(() => {
    console.log('Компонент смонтирован');
  }, []);

  // ✅ Правильно: все зависимости указаны
  useEffect(() => {
    console.log(`Name изменился: ${name}`);
  }, [name]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">✅ Правильно: Корректные зависимости</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          className="border p-2 rounded w-full"
        />
      </div>

      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Увеличить
      </button>
    </div>
  );
};

const IncorrectDependencies: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ НЕПРАВИЛЬНО: отсутствует зависимость
  useEffect(() => {
    console.log(`Count: ${count}, Name: ${name}`);
  }, [count]); // name не указан в зависимостях

  // ❌ НЕПРАВИЛЬНО: лишние зависимости
  useEffect(() => {
    console.log('Эффект выполняется');
  }, [count, name]); // name не используется в эффекте

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">❌ Неправильно: Некорректные зависимости</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          className="border p-2 rounded w-full"
        />
        <p className="text-sm text-red-600 mt-2">
          Откройте консоль и посмотрите на предупреждения ESLint
        </p>
      </div>

      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Увеличить
      </button>
    </div>
  );
};

// 5. Правило 5: Правильное использование useCallback и useMemo
const ExpensiveComponent: React.FC<{ data: number[]; onAction: () => void }> = React.memo(({ data, onAction }) => {
  console.log('ExpensiveComponent рендерится');
  
  const sum = data.reduce((acc, val) => acc + val, 0);
  
  return (
    <div className="p-3 bg-blue-100 rounded">
      <h4 className="font-bold mb-2">Дорогой компонент</h4>
      <p>Сумма: {sum}</p>
      <button 
        onClick={onAction}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Действие
      </button>
    </div>
  );
});

const CorrectOptimization: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ✅ Правильно: мемоизированные данные
  const expensiveData = React.useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => i + count);
  }, [count]);

  // ✅ Правильно: мемоизированная функция
  const handleAction = useCallback(() => {
    console.log('Действие выполнено');
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">✅ Правильно: Оптимизация с хуками</h3>
      
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
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Изменить другое состояние
          </button>
        </div>
      </div>

      <ExpensiveComponent data={expensiveData} onAction={handleAction} />
    </div>
  );
};

const IncorrectOptimization: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ❌ НЕПРАВИЛЬНО: данные создаются при каждом рендере
  const expensiveData = Array.from({ length: 1000 }, (_, i) => i + count);

  // ❌ НЕПРАВИЛЬНО: функция создается при каждом рендере
  const handleAction = () => {
    console.log('Действие выполнено');
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">❌ Неправильно: Отсутствие оптимизации</h3>
      
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
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Изменить другое состояние
          </button>
        </div>
      </div>

      <ExpensiveComponent data={expensiveData} onAction={handleAction} />
    </div>
  );
};

// 6. Правило 6: Избегайте бесконечных циклов
const CorrectInfiniteLoop: React.FC = () => {
  const [count, setCount] = useState(0);

  // ✅ Правильно: зависимость указана корректно
  useEffect(() => {
    if (count < 10) {
      const timer = setTimeout(() => {
        setCount(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">✅ Правильно: Контролируемый цикл</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p className="text-sm text-gray-600">
          Счетчик увеличивается до 10, затем останавливается
        </p>
      </div>

      <button 
        onClick={() => setCount(0)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Сбросить
      </button>
    </div>
  );
};

const IncorrectInfiniteLoop: React.FC = () => {
  const [count, setCount] = useState(0);

  // ❌ НЕПРАВИЛЬНО: бесконечный цикл (закомментировано)
  // useEffect(() => {
  //   setCount(prev => prev + 1);
  // }); // Отсутствует массив зависимостей

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">❌ Неправильно: Бесконечный цикл</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p className="text-sm text-red-600">
          Этот код содержит закомментированный пример бесконечного цикла
        </p>
      </div>

      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Увеличить вручную
      </button>
    </div>
  );
};

// 7. Инструменты для проверки правил хуков
const HooksLintingExample: React.FC = () => {
  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Инструменты для проверки правил хуков</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="font-bold text-blue-800 mb-2">ESLint Plugin:</h4>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>eslint-plugin-react-hooks</li>
            <li>Проверяет правила хуков автоматически</li>
            <li>Предупреждает о неправильных зависимостях</li>
            <li>Находит хуки в неправильных местах</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold text-green-800 mb-2">React DevTools:</h4>
          <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
            <li>Показывает состояние хуков</li>
            <li>Отслеживает изменения зависимостей</li>
            <li>Помогает отлаживать проблемы с хуками</li>
          </ul>
        </div>

        <div className="p-3 bg-yellow-50 rounded">
          <h4 className="font-bold text-yellow-800 mb-2">TypeScript:</h4>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>Проверяет типы хуков</li>
            <li>Предупреждает о неправильном использовании</li>
            <li>Обеспечивает типобезопасность</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Основной компонент
const HooksRulesPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Правила хуков React</h1>
      
      <div className="space-y-6">
        <CorrectTopLevel />
        <IncorrectTopLevel />
        <CorrectReactFunction />
        <CorrectOrder />
        <IncorrectOrder />
        <CorrectDependencies />
        <IncorrectDependencies />
        <CorrectOptimization />
        <IncorrectOptimization />
        <CorrectInfiniteLoop />
        <IncorrectInfiniteLoop />
        <HooksLintingExample />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Основные правила хуков:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Вызывайте хуки только на верхнем уровне</strong> - не в циклах, условиях или вложенных функциях</li>
          <li><strong>Вызывайте хуки только из React функций</strong> - компонентов или кастомных хуков</li>
          <li><strong>Порядок вызовов хуков должен быть одинаковым</strong> между рендерами</li>
          <li><strong>Указывайте все зависимости</strong> в useEffect, useCallback, useMemo</li>
          <li><strong>Избегайте бесконечных циклов</strong> - правильно настраивайте зависимости</li>
          <li><strong>Используйте ESLint plugin</strong> для автоматической проверки правил</li>
        </ul>
      </div>
    </div>
  );
};

export default HooksRulesPractice; 