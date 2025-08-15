import React, { useState, useEffect } from 'react';

// 1. Базовое использование useEffect
const BasicUseEffect: React.FC = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('React App');

  // Выполняется после каждого рендера
  useEffect(() => {
    console.log('Компонент отрендерился, count:', count);
  });

  // Выполняется только при изменении count
  useEffect(() => {
    console.log('Count изменился:', count);
  }, [count]);

  // Выполняется только при монтировании компонента
  useEffect(() => {
    console.log('Компонент смонтирован');
    document.title = title;
  }, []);

  // Выполняется при изменении title
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useEffect</h3>
      
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

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название страницы"
          className="border p-2 rounded w-full"
        />
        <p className="text-sm text-gray-600 mt-1">Измените заголовок страницы</p>
      </div>
    </div>
  );
};

// 2. useEffect с cleanup
const CleanupUseEffect: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Очистка при размонтировании
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup функция
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Очистка при изменении зависимостей
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        console.log('Таймер сработал!');
      }, 3000);

      return () => {
        clearTimeout(timer);
        console.log('Таймер очищен');
      };
    }
  }, [isVisible]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useEffect с cleanup</h3>
      
      <div className="mb-4">
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isVisible ? 'Скрыть' : 'Показать'} таймер
        </button>
        {isVisible && (
          <p className="mt-2 text-green-600">Таймер активен (3 секунды)</p>
        )}
      </div>

      <div className="p-3 bg-gray-100 rounded">
        <h4 className="font-bold">Размер окна:</h4>
        <p>Ширина: {windowSize.width}px</p>
        <p>Высота: {windowSize.height}px</p>
        <p className="text-sm text-gray-600">Попробуйте изменить размер окна</p>
      </div>
    </div>
  );
};

// 3. useEffect для API запросов
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const ApiUseEffect: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState(1);

  // Загрузка постов при изменении userId
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useEffect для API запросов</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ID пользователя:
        </label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
          className="border p-2 rounded w-32"
        />
      </div>

      {loading && (
        <div className="text-blue-600">Загрузка...</div>
      )}

      {error && (
        <div className="text-red-600 mb-4">Ошибка: {error}</div>
      )}

      {!loading && !error && (
        <div className="space-y-2">
          <h4 className="font-bold">Посты пользователя {userId}:</h4>
          {posts.map(post => (
            <div key={post.id} className="p-3 bg-gray-50 rounded">
              <h5 className="font-semibold">{post.title}</h5>
              <p className="text-sm text-gray-600">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. useEffect с условной логикой
const ConditionalUseEffect: React.FC = () => {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);

  // Эффект только для авторизованных пользователей
  useEffect(() => {
    if (isLoggedIn && user) {
      console.log(`Пользователь ${user.name} авторизован`);
      
      const activityTimer = setInterval(() => {
        setLastActivity(new Date());
      }, 5000);

      return () => {
        clearInterval(activityTimer);
        console.log(`Пользователь ${user.name} вышел`);
      };
    }
  }, [isLoggedIn, user]);

  // Эффект для отслеживания активности
  useEffect(() => {
    if (lastActivity) {
      console.log('Последняя активность:', lastActivity.toLocaleTimeString());
    }
  }, [lastActivity]);

  const login = () => {
    setUser({ id: 1, name: 'Иван' });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setLastActivity(null);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useEffect с условной логикой</h3>
      
      <div className="mb-4">
        {!isLoggedIn ? (
          <button 
            onClick={login}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Войти
          </button>
        ) : (
          <button 
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Выйти
          </button>
        )}
      </div>

      {user && (
        <div className="p-3 bg-gray-100 rounded">
          <h4 className="font-bold">Пользователь: {user.name}</h4>
          <p>Статус: {isLoggedIn ? 'Авторизован' : 'Не авторизован'}</p>
          {lastActivity && (
            <p>Последняя активность: {lastActivity.toLocaleTimeString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

// 5. useEffect с множественными зависимостями
const MultipleDependenciesUseEffect: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  // Валидация формы при изменении любого поля
  useEffect(() => {
    const validateForm = () => {
      const isNameValid = firstName.trim().length >= 2;
      const isLastNameValid = lastName.trim().length >= 2;
      const isEmailValid = email.includes('@') && email.includes('.');

      const isValid = isNameValid && isLastNameValid && isEmailValid;
      
      setIsFormValid(isValid);

      if (!isValid) {
        const messages = [];
        if (!isNameValid) messages.push('Имя должно содержать минимум 2 символа');
        if (!isLastNameValid) messages.push('Фамилия должна содержать минимум 2 символа');
        if (!isEmailValid) messages.push('Введите корректный email');
        
        setValidationMessage(messages.join(', '));
      } else {
        setValidationMessage('Форма валидна!');
      }
    };

    validateForm();
  }, [firstName, lastName, email]);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useEffect с множественными зависимостями</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Имя:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Введите имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Фамилия:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Введите фамилию"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Введите email"
          />
        </div>
      </div>

      <div className="mt-4 p-3 rounded" style={{
        backgroundColor: isFormValid ? '#d1fae5' : '#fee2e2',
        color: isFormValid ? '#065f46' : '#991b1b'
      }}>
        <p className="font-medium">
          {validationMessage}
        </p>
      </div>

      <button 
        disabled={!isFormValid}
        className={`mt-4 px-4 py-2 rounded ${
          isFormValid 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Отправить
      </button>
    </div>
  );
};

// Основной компонент
const UseEffectPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useEffect</h1>
      
      <div className="space-y-6">
        <BasicUseEffect />
        <CleanupUseEffect />
        <ApiUseEffect />
        <ConditionalUseEffect />
        <MultipleDependenciesUseEffect />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useEffect:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useEffect выполняется после рендера компонента</li>
          <li>Первый параметр - функция эффекта, второй - массив зависимостей</li>
          <li>Пустой массив зависимостей [] означает выполнение только при монтировании</li>
          <li>Отсутствие массива зависимостей означает выполнение после каждого рендера</li>
          <li>Функция возврата (cleanup) выполняется перед следующим эффектом или размонтированием</li>
          <li>Всегда включайте в зависимости все переменные, используемые в эффекте</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectPractice; 