import React, { useState } from 'react';

// 1. Базовое использование useState
const BasicUseState: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useState</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Увеличить
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Уменьшить
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          className="border p-2 rounded"
        />
        <p>Привет, {name || 'неизвестный'}!</p>
      </div>

      <div>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isVisible ? 'Скрыть' : 'Показать'} элемент
        </button>
        {isVisible && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            Скрытый элемент
          </div>
        )}
      </div>
    </div>
  );
};

// 2. useState с объектами
const ObjectUseState: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field: string, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useState с объектами</h3>
      
      <div className="space-y-2">
        <input
          type="text"
          value={user.name}
          onChange={(e) => updateUser('name', e.target.value)}
          placeholder="Имя"
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => updateUser('email', e.target.value)}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={user.age}
          onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
          placeholder="Возраст"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h4 className="font-bold">Данные пользователя:</h4>
        <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

// 3. useState с массивами
const ArrayUseState: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prevItems => [...prevItems, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useState с массивами</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Новый элемент"
          className="border p-2 rounded flex-1"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button 
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Добавить
        </button>
        <button 
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Очистить
        </button>
      </div>

      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>{item}</span>
            <button 
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      
      {items.length === 0 && (
        <p className="text-gray-500 text-center py-4">Список пуст</p>
      )}
    </div>
  );
};

// 4. Ленивая инициализация useState
const LazyUseState: React.FC = () => {
  const [count, setCount] = useState(() => {
    // Выполняется только при первом рендере
    console.log('Инициализация счетчика');
    return Math.floor(Math.random() * 100);
  });

  const [expensiveValue, setExpensiveValue] = useState(() => {
    // Дорогое вычисление выполняется только один раз
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  });

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Ленивая инициализация useState</h3>
      
      <div className="mb-4">
        <p>Случайное число: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Увеличить
        </button>
      </div>

      <div>
        <p>Дорогое вычисление: {expensiveValue}</p>
        <button 
          onClick={() => setExpensiveValue(expensiveValue + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Обновить
        </button>
      </div>
    </div>
  );
};

// 5. Функциональные обновления
const FunctionalUpdates: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const incrementBy = (amount: number) => {
    setCount(prevCount => prevCount + amount);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Функциональные обновления</h3>
      
      <p className="text-2xl font-bold mb-4">Счетчик: {count}</p>
      
      <div className="space-x-2">
        <button 
          onClick={increment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +1
        </button>
        <button 
          onClick={() => incrementBy(5)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +5
        </button>
        <button 
          onClick={() => incrementBy(10)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          +10
        </button>
        <button 
          onClick={reset}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Сброс
        </button>
      </div>
    </div>
  );
};

// Основной компонент
const UseStatePractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useState</h1>
      
      <div className="space-y-6">
        <BasicUseState />
        <ObjectUseState />
        <ArrayUseState />
        <LazyUseState />
        <FunctionalUpdates />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useState:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useState возвращает массив с текущим состоянием и функцией для его обновления</li>
          <li>Состояние асинхронно обновляется - изменения не видны сразу после вызова setState</li>
          <li>Для обновления на основе предыдущего состояния используйте функциональную форму</li>
          <li>Ленивая инициализация полезна для дорогих вычислений</li>
          <li>При обновлении объектов и массивов всегда создавайте новые экземпляры</li>
        </ul>
      </div>
    </div>
  );
};

export default UseStatePractice;
