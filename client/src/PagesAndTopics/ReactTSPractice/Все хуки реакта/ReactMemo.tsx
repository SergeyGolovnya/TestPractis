import React, { useState, useCallback, useMemo } from 'react';

// 1. Базовое использование React.memo
const RegularComponent: React.FC<{ count: number; name: string }> = ({ count, name }) => {
  console.log('RegularComponent рендерится');
  
  return (
    <div className="p-3 bg-red-100 rounded">
      <h4 className="font-bold mb-2">Обычный компонент</h4>
      <p>Счетчик: {count}</p>
      <p>Имя: {name}</p>
    </div>
  );
};

const MemoizedComponent: React.FC<{ count: number; name: string }> = React.memo(({ count, name }) => {
  console.log('MemoizedComponent рендерится');
  
  return (
    <div className="p-3 bg-green-100 rounded">
      <h4 className="font-bold mb-2">Мемоизированный компонент</h4>
      <p>Счетчик: {count}</p>
      <p>Имя: {name}</p>
    </div>
  );
});

const BasicReactMemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Иван');
  const [otherState, setOtherState] = useState(0);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование React.memo</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Имя: {name}</p>
        <p>Другое состояние: {otherState}</p>
        
        <div className="space-x-2">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить счетчик
          </button>
          <button 
            onClick={() => setName(prev => prev === 'Иван' ? 'Мария' : 'Иван')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Изменить имя
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
        <RegularComponent count={count} name={name} />
        <MemoizedComponent count={count} name={name} />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Откройте консоль и измените "другое состояние". 
          Обычный компонент перерендерится, а мемоизированный - нет, так как его пропсы не изменились.
        </p>
      </div>
    </div>
  );
};

// 2. React.memo с объектами и функциями
const ObjectPropsComponent: React.FC<{ 
  user: { name: string; age: number }; 
  onAction: () => void;
  settings: { theme: string; language: string };
}> = React.memo(({ user, onAction, settings }) => {
  console.log('ObjectPropsComponent рендерится');
  
  return (
    <div className="p-3 bg-blue-100 rounded">
      <h4 className="font-bold mb-2">Компонент с объектами</h4>
      <p>Пользователь: {user.name}, {user.age} лет</p>
      <p>Тема: {settings.theme}, Язык: {settings.language}</p>
      <button 
        onClick={onAction}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Действие
      </button>
    </div>
  );
});

const ObjectPropsExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  // ❌ Плохо: объекты создаются при каждом рендере
  const userWithoutMemo = { name: 'Иван', age: 25 };
  const settingsWithoutMemo = { theme, language: 'ru' };
  const handleActionWithoutMemo = () => {
    console.log('Действие без мемоизации');
    setCount(prev => prev + 1);
  };

  // ✅ Хорошо: объекты мемоизированы
  const userWithMemo = useMemo(() => ({ name: 'Иван', age: 25 }), []);
  const settingsWithMemo = useMemo(() => ({ theme, language: 'ru' }), [theme]);
  const handleActionWithMemo = useCallback(() => {
    console.log('Действие с мемоизацией');
    setCount(prev => prev + 1);
  }, []);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">React.memo с объектами и функциями</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Тема: {theme}</p>
        
        <div className="space-x-2">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить счетчик
          </button>
          <button 
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Переключить тему
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2 text-red-800">Без мемоизации:</h4>
          <ObjectPropsComponent 
            user={userWithoutMemo}
            onAction={handleActionWithoutMemo}
            settings={settingsWithoutMemo}
          />
        </div>
        <div>
          <h4 className="font-bold mb-2 text-green-800">С мемоизацией:</h4>
          <ObjectPropsComponent 
            user={userWithMemo}
            onAction={handleActionWithMemo}
            settings={settingsWithMemo}
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Измените счетчик. Компонент без мемоизации перерендерится, 
          так как объекты и функции создаются заново. Компонент с мемоизацией не перерендерится.
        </p>
      </div>
    </div>
  );
};

// 3. Кастомная функция сравнения
const CustomComparisonComponent: React.FC<{ 
  data: { id: number; value: string; timestamp: number };
  onUpdate: (id: number) => void;
}> = React.memo(({ data, onUpdate }) => {
  console.log('CustomComparisonComponent рендерится');
  
  return (
    <div className="p-3 bg-purple-100 rounded">
      <h4 className="font-bold mb-2">Кастомное сравнение</h4>
      <p>ID: {data.id}</p>
      <p>Значение: {data.value}</p>
      <p>Время: {new Date(data.timestamp).toLocaleTimeString()}</p>
      <button 
        onClick={() => onUpdate(data.id)}
        className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
      >
        Обновить
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения
  // Возвращает true, если пропсы равны (компонент НЕ должен перерендериться)
  // Возвращает false, если пропсы разные (компонент должен перерендериться)
  
  // Сравниваем только id и value, игнорируем timestamp
  return prevProps.data.id === nextProps.data.id && 
         prevProps.data.value === nextProps.data.value;
});

const CustomComparisonExample: React.FC = () => {
  const [data, setData] = useState({ id: 1, value: 'Начальное значение', timestamp: Date.now() });
  const [count, setCount] = useState(0);

  const updateData = useCallback((id: number) => {
    setData(prev => ({ ...prev, value: `Обновлено ${Date.now()}`, timestamp: Date.now() }));
  }, []);

  const updateOnlyTimestamp = () => {
    setData(prev => ({ ...prev, timestamp: Date.now() }));
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Кастомная функция сравнения</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Данные: {JSON.stringify(data, null, 2)}</p>
        
        <div className="space-x-2">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить счетчик
          </button>
          <button 
            onClick={updateOnlyTimestamp}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Обновить только время
          </button>
        </div>
      </div>

      <CustomComparisonComponent data={data} onUpdate={updateData} />

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Кастомная функция сравнения игнорирует изменения timestamp. 
          Компонент перерендерится только при изменении id или value.
        </p>
      </div>
    </div>
  );
};

// 4. React.memo с массивами
const ListComponent: React.FC<{ 
  items: string[];
  onItemClick: (index: number) => void;
}> = React.memo(({ items, onItemClick }) => {
  console.log('ListComponent рендерится');
  
  return (
    <div className="p-3 bg-orange-100 rounded">
      <h4 className="font-bold mb-2">Список элементов</h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{item}</span>
            <button 
              onClick={() => onItemClick(index)}
              className="bg-orange-500 text-white px-2 py-1 rounded text-sm"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

const ArrayPropsExample: React.FC = () => {
  const [items, setItems] = useState(['Элемент 1', 'Элемент 2', 'Элемент 3']);
  const [count, setCount] = useState(0);

  // ❌ Плохо: массив создается при каждом рендере
  const itemsWithoutMemo = [...items];

  // ✅ Хорошо: массив мемоизирован
  const itemsWithMemo = useMemo(() => [...items], [items]);

  const handleItemClick = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const addItem = () => {
    setItems(prev => [...prev, `Элемент ${prev.length + 1}`]);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">React.memo с массивами</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Количество элементов: {items.length}</p>
        
        <div className="space-x-2">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить счетчик
          </button>
          <button 
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Добавить элемент
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2 text-red-800">Без мемоизации:</h4>
          <ListComponent 
            items={itemsWithoutMemo}
            onItemClick={handleItemClick}
          />
        </div>
        <div>
          <h4 className="font-bold mb-2 text-green-800">С мемоизацией:</h4>
          <ListComponent 
            items={itemsWithMemo}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  );
};

// 5. Когда НЕ использовать React.memo
const SimpleComponent: React.FC<{ text: string }> = ({ text }) => {
  console.log('SimpleComponent рендерится');
  
  return (
    <div className="p-3 bg-gray-100 rounded">
      <p>{text}</p>
    </div>
  );
};

const SimpleMemoizedComponent: React.FC<{ text: string }> = React.memo(({ text }) => {
  console.log('SimpleMemoizedComponent рендерится');
  
  return (
    <div className="p-3 bg-gray-100 rounded">
      <p>{text}</p>
    </div>
  );
});

const WhenNotToUseMemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Простой текст');

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Когда НЕ использовать React.memo</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Текст: {text}</p>
        
        <div className="space-x-2">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Увеличить счетчик
          </button>
          <button 
            onClick={() => setText(prev => prev + '!')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Добавить восклицательный знак
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2">Обычный компонент:</h4>
          <SimpleComponent text={text} />
        </div>
        <div>
          <h4 className="font-bold mb-2">Мемоизированный компонент:</h4>
          <SimpleMemoizedComponent text={text} />
        </div>
      </div>

      <div className="mt-4 p-3 bg-red-50 rounded">
        <h4 className="font-bold text-red-800 mb-2">Когда НЕ использовать React.memo:</h4>
        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
          <li>Для простых компонентов с примитивными пропсами</li>
          <li>Когда компонент рендерится редко</li>
          <li>Когда пропсы часто меняются</li>
          <li>Когда накладные расходы на сравнение больше выгоды</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded">
        <h4 className="font-bold text-green-800 mb-2">Когда использовать React.memo:</h4>
        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
          <li>Для дорогих компонентов с сложной логикой рендеринга</li>
          <li>Когда компонент часто перерендеривается из-за изменений родителя</li>
          <li>Когда пропсы редко меняются</li>
          <li>Для компонентов, которые передаются как пропсы</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const ReactMemoPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика React.memo</h1>
      
      <div className="space-y-6">
        <BasicReactMemo />
        <ObjectPropsExample />
        <CustomComparisonExample />
        <ArrayPropsExample />
        <WhenNotToUseMemo />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты React.memo:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>React.memo мемоизирует компонент и предотвращает лишние рендеры</li>
          <li>Компонент перерендеривается только при изменении пропсов</li>
          <li>Можно передать кастомную функцию сравнения как второй параметр</li>
          <li>Работает только с пропсами, не с состоянием или контекстом</li>
          <li>Не используйте для простых компонентов - накладные расходы могут превысить выгоду</li>
          <li>Особенно эффективен в сочетании с useCallback и useMemo</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactMemoPractice; 