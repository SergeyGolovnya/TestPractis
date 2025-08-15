import React, { useState, useMemo } from 'react';

// 1. Базовое использование useMemo
const BasicUseMemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Дорогое вычисление, которое кэшируется
  const expensiveCalculation = useMemo(() => {
    console.log('Выполняется дорогое вычисление...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  }, [count]); // Пересчитывается только при изменении count

  // Простое вычисление без useMemo
  const simpleCalculation = () => {
    console.log('Выполняется простое вычисление...');
    return count * 2;
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useMemo</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Увеличить счетчик
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          className="border p-2 rounded w-full"
        />
        <p>Привет, {name || 'неизвестный'}!</p>
      </div>

      <div className="space-y-2">
        <p><strong>Дорогое вычисление (useMemo):</strong> {expensiveCalculation}</p>
        <p><strong>Простое вычисление (без useMemo):</strong> {simpleCalculation()}</p>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Измените счетчик - дорогое вычисление пересчитается. 
          Измените имя - простое вычисление пересчитается, а дорогое - нет.
        </p>
      </div>
    </div>
  );
};

// 2. useMemo для фильтрации и сортировки
const FilteringUseMemo: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Анна', age: 25, city: 'Москва' },
    { id: 2, name: 'Борис', age: 30, city: 'Санкт-Петербург' },
    { id: 3, name: 'Вера', age: 22, city: 'Москва' },
    { id: 4, name: 'Григорий', age: 35, city: 'Казань' },
    { id: 5, name: 'Дарья', age: 28, city: 'Москва' },
  ]);

  const addRandomUser = () => {
    const names = ['Елена', 'Михаил', 'Ольга', 'Сергей', 'Татьяна'];
    const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];
    const newUser = {
      id: users.length + 1,
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 30) + 20,
      city: cities[Math.floor(Math.random() * cities.length)]
    };
    setUsers(prev => [...prev, newUser]);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'city'>('name');
  const [filterCity, setFilterCity] = useState('');

  // Фильтрация и сортировка с useMemo
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Фильтрация и сортировка пользователей...');
    
    let result = [...users];

    // Фильтрация по поиску
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтрация по городу
    if (filterCity) {
      result = result.filter(user => user.city === filterCity);
    }

    // Сортировка
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        return a.age - b.age;
      } else {
        return a.city.localeCompare(b.city);
      }
    });

    return result;
  }, [users, searchTerm, sortBy, filterCity]);

  // Статистика без useMemo (пересчитывается при каждом рендере)
  const getStats = () => {
    console.log('Вычисление статистики...');
    return {
      total: users.length,
      averageAge: users.reduce((sum, user) => sum + user.age, 0) / users.length,
      cities: [...new Set(users.map(user => user.city))]
    };
  };

  const stats = getStats();

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useMemo для фильтрации и сортировки</h3>
      
      <div className="mb-4">
        <button 
          onClick={addRandomUser}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Добавить случайного пользователя
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Поиск по имени:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Введите имя"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Сортировка по:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'age' | 'city')}
            className="border p-2 rounded w-full"
          >
            <option value="name">Имени</option>
            <option value="age">Возрасту</option>
            <option value="city">Городу</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Фильтр по городу:</label>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Все города</option>
            {stats.cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <h4 className="font-bold mb-2">Статистика:</h4>
        <p>Всего пользователей: {stats.total}</p>
        <p>Средний возраст: {stats.averageAge.toFixed(1)}</p>
        <p>Города: {stats.cities.join(', ')}</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold">Результаты ({filteredAndSortedUsers.length}):</h4>
        {filteredAndSortedUsers.map(user => (
          <div key={user.id} className="p-2 bg-gray-50 rounded">
            <strong>{user.name}</strong> - {user.age} лет, {user.city}
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. useMemo для объектов и массивов
const ObjectUseMemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Создание объекта стилей с useMemo
  const styles = useMemo(() => {
    console.log('Создание объекта стилей...');
    return {
      container: {
        padding: '1rem',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
        color: theme === 'light' ? '#000000' : '#ffffff',
        border: '1px solid',
        borderColor: theme === 'light' ? '#d1d5db' : '#374151',
        borderRadius: '0.5rem',
        transition: 'all 0.3s ease'
      },
      button: {
        padding: '0.5rem 1rem',
        backgroundColor: theme === 'light' ? '#3b82f6' : '#60a5fa',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        marginRight: '0.5rem'
      }
    };
  }, [theme]);

  // Создание массива опций с useMemo
  const options = useMemo(() => {
    console.log('Создание массива опций...');
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      label: `Опция ${i + 1}`,
      value: i + 1
    }));
  }, []); // Пустой массив зависимостей - создается только один раз

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useMemo для объектов и массивов</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Увеличить счетчик
        </button>
        
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Переключить тему
        </button>
      </div>

      <div style={styles.container}>
        <h4 className="font-bold mb-2">Динамические стили:</h4>
        <p>Текущая тема: {theme}</p>
        <p>Счетчик: {count}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-bold mb-2">Статический массив опций:</h4>
        <select className="border p-2 rounded">
          {options.map(option => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Измените счетчик - стили пересоздадутся. 
          Измените тему - стили пересоздадутся. Массив опций создается только один раз.
        </p>
      </div>
    </div>
  );
};

// 4. useMemo для предотвращения лишних рендеров
const ExpensiveComponent: React.FC<{ data: number[] }> = React.memo(({ data }) => {
  console.log('ExpensiveComponent рендерится');
  
  const sum = data.reduce((acc, val) => acc + val, 0);
  
  return (
    <div className="p-3 bg-green-100 rounded">
      <h4 className="font-bold">Дорогой компонент</h4>
      <p>Сумма: {sum}</p>
      <p>Количество элементов: {data.length}</p>
    </div>
  );
});

const PreventRendersUseMemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Данные для дорогого компонента
  const expensiveData = useMemo(() => {
    console.log('Создание данных для дорогого компонента...');
    return Array.from({ length: 1000 }, (_, i) => i + count);
  }, [count]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useMemo для предотвращения лишних рендеров</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <p>Другое состояние: {otherState}</p>
        
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Увеличить счетчик
        </button>
        
        <button 
          onClick={() => setOtherState(otherState + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Изменить другое состояние
        </button>
      </div>

      <ExpensiveComponent data={expensiveData} />

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Наблюдение:</strong> Измените "другое состояние" - дорогой компонент не перерендерится, 
          так как его данные не изменились. Измените счетчик - компонент перерендерится.
        </p>
      </div>
    </div>
  );
};

// 5. Когда НЕ использовать useMemo
const WhenNotToUseMemo: React.FC = () => {
  const [count, setCount] = useState(0);

  // ❌ Плохо: простое вычисление
  const simpleValue = useMemo(() => {
    return count * 2;
  }, [count]);

  // ✅ Хорошо: простое вычисление без useMemo
  const simpleValueGood = count * 2;

  // ✅ Хорошо: дорогое вычисление
  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sqrt(i);
    }
    return result + count;
  }, [count]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Когда НЕ использовать useMemo</h3>
      
      <div className="mb-4">
        <p>Счетчик: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Увеличить
        </button>
      </div>

      <div className="space-y-2">
        <p><strong>Простое вычисление (useMemo):</strong> {simpleValue}</p>
        <p><strong>Простое вычисление (без useMemo):</strong> {simpleValueGood}</p>
        <p><strong>Дорогое вычисление (useMemo):</strong> {expensiveValue.toFixed(2)}</p>
      </div>

      <div className="mt-4 p-3 bg-red-50 rounded">
        <h4 className="font-bold text-red-800 mb-2">Когда НЕ использовать useMemo:</h4>
        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
          <li>Для простых вычислений (сложение, умножение, конкатенация строк)</li>
          <li>Для примитивных значений</li>
          <li>Когда зависимостей много и они часто меняются</li>
          <li>Для функций, которые нужно передавать как пропсы (используйте useCallback)</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded">
        <h4 className="font-bold text-green-800 mb-2">Когда использовать useMemo:</h4>
        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
          <li>Для дорогих вычислений</li>
          <li>Для создания объектов и массивов, которые передаются как пропсы</li>
          <li>Для предотвращения лишних рендеров дочерних компонентов</li>
          <li>Когда результат вычисления используется в useEffect</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const UseMemoPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useMemo</h1>
      
      <div className="space-y-6">
        <BasicUseMemo />
        <FilteringUseMemo />
        <ObjectUseMemo />
        <PreventRendersUseMemo />
        <WhenNotToUseMemo />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useMemo:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useMemo кэширует результат вычисления между рендерами</li>
          <li>Пересчитывается только при изменении зависимостей</li>
          <li>Используйте для дорогих вычислений и создания объектов/массивов</li>
          <li>Помогает предотвратить лишние рендеры дочерних компонентов</li>
          <li>Не используйте для простых вычислений - это может замедлить приложение</li>
          <li>Всегда включайте в зависимости все переменные, используемые в вычислении</li>
        </ul>
      </div>
    </div>
  );
};

export default UseMemoPractice; 