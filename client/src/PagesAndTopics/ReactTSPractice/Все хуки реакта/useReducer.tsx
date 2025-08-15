import React, { useReducer, useState } from 'react';

// 1. Базовое использование useReducer
interface CounterState {
  count: number;
  previousCount: number;
}

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        previousCount: state.count
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        previousCount: state.count
      };
    case 'RESET':
      return {
        count: 0,
        previousCount: state.count
      };
    case 'SET_COUNT':
      return {
        count: action.payload,
        previousCount: state.count
      };
    default:
      return state;
  }
};

const BasicUseReducer: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    previousCount: 0
  });

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useReducer</h3>
      
      <div className="mb-4">
        <p>Текущий счетчик: {state.count}</p>
        <p>Предыдущий счетчик: {state.previousCount}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Увеличить
        </button>
        <button 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Уменьшить
        </button>
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Сброс
        </button>
        <button 
          onClick={() => dispatch({ type: 'SET_COUNT', payload: 10 })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Установить 10
        </button>
      </div>
    </div>
  );
};

// 2. useReducer для сложного состояния
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  nextId: number;
}

type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.payload,
            completed: false
          }
        ],
        nextId: state.nextId + 1
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    
    default:
      return state;
  }
};

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    nextId: 1
  });

  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = () => {
    if (newTodoText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodoText.trim() });
      setNewTodoText('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = state.todos.filter(todo => todo.completed).length;
  const activeCount = state.todos.length - completedCount;

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useReducer для сложного состояния (Todo App)</h3>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Новая задача"
            className="border p-2 rounded flex-1"
          />
          <button 
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Добавить
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <button 
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
            className={`px-3 py-1 rounded ${
              state.filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Все ({state.todos.length})
          </button>
          <button 
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
            className={`px-3 py-1 rounded ${
              state.filter === 'active' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Активные ({activeCount})
          </button>
          <button 
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
            className={`px-3 py-1 rounded ${
              state.filter === 'completed' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Завершенные ({completedCount})
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
            <button 
              onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {completedCount > 0 && (
        <button 
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Очистить завершенные
        </button>
      )}
    </div>
  );
};

// 3. useReducer с ленивой инициализацией
interface FormState {
  username: string;
  email: string;
  password: string;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '' // Очищаем ошибку при изменении поля
        }
      };
    
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload
      };
    
    case 'RESET':
      return {
        username: '',
        email: '',
        password: '',
        errors: {},
        isSubmitting: false
      };
    
    default:
      return state;
  }
};

const FormWithReducer: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password: '',
    errors: {},
    isSubmitting: false
  });

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!state.username.trim()) {
      errors.username = 'Имя пользователя обязательно';
    }
    
    if (!state.email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'Некорректный email';
    }
    
    if (!state.password) {
      errors.password = 'Пароль обязателен';
    } else if (state.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    
    dispatch({ type: 'SET_SUBMITTING', payload: true });
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Форма отправлена:', {
      username: state.username,
      email: state.email,
      password: state.password
    });
    
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useReducer с ленивой инициализацией (Форма)</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Имя пользователя:</label>
          <input
            type="text"
            value={state.username}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'username', value: e.target.value })}
            className={`border p-2 rounded w-full ${
              state.errors.username ? 'border-red-500' : ''
            }`}
          />
          {state.errors.username && (
            <p className="text-red-500 text-sm mt-1">{state.errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
            className={`border p-2 rounded w-full ${
              state.errors.email ? 'border-red-500' : ''
            }`}
          />
          {state.errors.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Пароль:</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
            className={`border p-2 rounded w-full ${
              state.errors.password ? 'border-red-500' : ''
            }`}
          />
          {state.errors.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        <div className="space-x-2">
          <button 
            type="submit"
            disabled={state.isSubmitting}
            className={`px-4 py-2 rounded ${
              state.isSubmitting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {state.isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
          <button 
            type="button"
            onClick={() => dispatch({ type: 'RESET' })}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Сброс
          </button>
        </div>
      </form>
    </div>
  );
};

// 4. useReducer vs useState
const CounterWithState: React.FC = () => {
  const [count, setCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);

  const increment = () => {
    setPreviousCount(count);
    setCount(count + 1);
  };

  const decrement = () => {
    setPreviousCount(count);
    setCount(count - 1);
  };

  const reset = () => {
    setPreviousCount(count);
    setCount(0);
  };

  return (
    <div className="p-3 bg-blue-50 rounded">
      <h4 className="font-bold mb-2">useState</h4>
      <p>Счетчик: {count}</p>
      <p>Предыдущий: {previousCount}</p>
      <div className="space-x-2">
        <button onClick={increment} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">+</button>
        <button onClick={decrement} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">-</button>
        <button onClick={reset} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">Сброс</button>
      </div>
    </div>
  );
};

const CounterWithReducer: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    previousCount: 0
  });

  return (
    <div className="p-3 bg-green-50 rounded">
      <h4 className="font-bold mb-2">useReducer</h4>
      <p>Счетчик: {state.count}</p>
      <p>Предыдущий: {state.previousCount}</p>
      <div className="space-x-2">
        <button onClick={() => dispatch({ type: 'INCREMENT' })} className="bg-green-500 text-white px-3 py-1 rounded text-sm">+</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })} className="bg-green-500 text-white px-3 py-1 rounded text-sm">-</button>
        <button onClick={() => dispatch({ type: 'RESET' })} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">Сброс</button>
      </div>
    </div>
  );
};

const ReducerVsState: React.FC = () => {
  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useReducer vs useState</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CounterWithState />
        <CounterWithReducer />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <h4 className="font-bold mb-2">Сравнение:</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>useState:</strong> Проще для простого состояния, больше кода для сложной логики</li>
          <li><strong>useReducer:</strong> Сложнее для простого состояния, но лучше для сложной логики</li>
          <li><strong>useState:</strong> Логика разбросана по компоненту</li>
          <li><strong>useReducer:</strong> Вся логика централизована в reducer</li>
        </ul>
      </div>
    </div>
  );
};

// Основной компонент
const UseReducerPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useReducer</h1>
      
      <div className="space-y-6">
        <BasicUseReducer />
        <TodoApp />
        <FormWithReducer />
        <ReducerVsState />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useReducer:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useReducer управляет сложным состоянием через actions и reducer</li>
          <li>Reducer - чистая функция, которая принимает state и action, возвращает новый state</li>
          <li>Actions - объекты с type и опциональным payload</li>
          <li>Подходит для сложной логики состояния и когда следующее состояние зависит от предыдущего</li>
          <li>Можно использовать ленивую инициализацию через третий параметр</li>
          <li>Особенно полезен для форм, списков и сложных компонентов</li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerPractice; 