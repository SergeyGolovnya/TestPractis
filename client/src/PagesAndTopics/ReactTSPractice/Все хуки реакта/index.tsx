import React, { useState } from 'react';

// Импорт всех компонентов с хуками
import UseStatePractice from './useState';
import UseEffectPractice from './useEffect';
import UseMemoPractice from './useMemo';
import UseRefPractice from './useRef';
import UseCallbackPractice from './useCallback';
import ReactMemoPractice from './ReactMemo';
import UseReducerPractice from './useReducer';
import UseContextPractice from './useContext';
import UseLayoutEffectPractice from './useLayoutEffect';
import UseImperativeHandlePractice from './useImperativeHandle';
import UseDebugValuePractice from './useDebugValue';
import CustomHooksPractice from './CustomHooksExample';
import NewHooksPractice from './NewHooks';
import HooksRulesPractice from './HooksRules';
import PerformanceOptimizationPractice from './PerformanceOptimization';

// Типы для навигации
type HookComponent = {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  category: 'basic' | 'advanced' | 'optimization' | 'rules' | 'custom';
};

// Список всех хуков
const hooksList: HookComponent[] = [
  {
    id: 'useState',
    name: 'useState',
    description: 'Управление состоянием компонента',
    component: UseStatePractice,
    category: 'basic'
  },
  {
    id: 'useEffect',
    name: 'useEffect',
    description: 'Побочные эффекты и жизненный цикл',
    component: UseEffectPractice,
    category: 'basic'
  },
  {
    id: 'useMemo',
    name: 'useMemo',
    description: 'Мемоизация вычислений',
    component: UseMemoPractice,
    category: 'optimization'
  },
  {
    id: 'useRef',
    name: 'useRef',
    description: 'Ссылки на DOM элементы и мутабельные значения',
    component: UseRefPractice,
    category: 'basic'
  },
  {
    id: 'useCallback',
    name: 'useCallback',
    description: 'Мемоизация функций',
    component: UseCallbackPractice,
    category: 'optimization'
  },
  {
    id: 'ReactMemo',
    name: 'React.memo',
    description: 'Мемоизация компонентов',
    component: ReactMemoPractice,
    category: 'optimization'
  },
  {
    id: 'useReducer',
    name: 'useReducer',
    description: 'Сложное управление состоянием',
    component: UseReducerPractice,
    category: 'advanced'
  },
  {
    id: 'useContext',
    name: 'useContext',
    description: 'Контекст и глобальное состояние',
    component: UseContextPractice,
    category: 'advanced'
  },
  {
    id: 'useLayoutEffect',
    name: 'useLayoutEffect',
    description: 'Синхронные эффекты',
    component: UseLayoutEffectPractice,
    category: 'advanced'
  },
  {
    id: 'useImperativeHandle',
    name: 'useImperativeHandle',
    description: 'Кастомные императивные методы',
    component: UseImperativeHandlePractice,
    category: 'advanced'
  },
  {
    id: 'useDebugValue',
    name: 'useDebugValue',
    description: 'Отладка кастомных хуков',
    component: UseDebugValuePractice,
    category: 'advanced'
  },
  {
    id: 'CustomHooks',
    name: 'Кастомные хуки',
    description: 'Создание собственных хуков',
    component: CustomHooksPractice,
    category: 'custom'
  },
  {
    id: 'NewHooks',
    name: 'Новые хуки React 18',
    description: 'useTransition, useDeferredValue, useId и другие',
    component: NewHooksPractice,
    category: 'advanced'
  },
  {
    id: 'HooksRules',
    name: 'Правила хуков',
    description: 'Основные правила и лучшие практики',
    component: HooksRulesPractice,
    category: 'rules'
  },
  {
    id: 'PerformanceOptimization',
    name: 'Оптимизация производительности',
    description: 'Техники оптимизации с хуками',
    component: PerformanceOptimizationPractice,
    category: 'optimization'
  }
];

// Категории с их описаниями
const categories = {
  basic: { name: 'Базовые хуки', color: 'bg-blue-100 text-blue-800' },
  advanced: { name: 'Продвинутые хуки', color: 'bg-purple-100 text-purple-800' },
  optimization: { name: 'Оптимизация', color: 'bg-green-100 text-green-800' },
  rules: { name: 'Правила и практики', color: 'bg-yellow-100 text-yellow-800' },
  custom: { name: 'Кастомные хуки', color: 'bg-orange-100 text-orange-800' }
};

const HooksIndex: React.FC = () => {
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredHooks = selectedCategory 
    ? hooksList.filter(hook => hook.category === selectedCategory)
    : hooksList;

  const selectedHookData = hooksList.find(hook => hook.id === selectedHook);
  const SelectedComponent = selectedHookData?.component;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Практика хуков React</h1>
        <p className="text-lg text-gray-600 mb-6">
          Полное руководство по всем хукам React с практическими примерами
        </p>
      </div>

      {/* Фильтр по категориям */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Категории:</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === null 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Все
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === key 
                  ? 'bg-gray-800 text-white' 
                  : `${category.color} hover:opacity-80`
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Список хуков */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4 sticky top-6">
            <h3 className="text-lg font-bold mb-4">Список хуков</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredHooks.map(hook => (
                <button
                  key={hook.id}
                  onClick={() => setSelectedHook(hook.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedHook === hook.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{hook.name}</div>
                  <div className={`text-sm ${
                    selectedHook === hook.id ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {hook.description}
                  </div>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                    selectedHook === hook.id 
                      ? 'bg-blue-600 text-white' 
                      : categories[hook.category].color
                  }`}>
                    {categories[hook.category].name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Контент выбранного хука */}
        <div className="lg:col-span-3">
          {SelectedComponent ? (
            <div className="bg-white border rounded-lg">
              <SelectedComponent />
            </div>
          ) : (
            <div className="bg-white border rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🎣</div>
              <h2 className="text-2xl font-bold mb-4">Выберите хук для изучения</h2>
              <p className="text-gray-600 mb-6">
                Выберите хук из списка слева, чтобы начать практику
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categories).map(([key, category]) => (
                  <div key={key} className={`p-4 rounded-lg ${category.color}`}>
                    <h3 className="font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-80">
                      {hooksList.filter(hook => hook.category === key).length} хуков
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Статистика */}
      <div className="mt-8 bg-white border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Статистика</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className={`p-4 rounded-lg ${category.color}`}>
              <div className="text-2xl font-bold">
                {hooksList.filter(hook => hook.category === key).length}
              </div>
              <div className="text-sm">{category.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-center text-gray-600">
            Всего хуков: <strong>{hooksList.length}</strong>
          </p>
        </div>
      </div>

      {/* Советы по изучению */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Советы по изучению</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2 text-blue-700">Рекомендуемый порядок изучения:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
              <li>Начните с базовых хуков (useState, useEffect)</li>
              <li>Изучите правила хуков</li>
              <li>Перейдите к оптимизации (useMemo, useCallback, React.memo)</li>
              <li>Изучите продвинутые хуки (useReducer, useContext)</li>
              <li>Создавайте кастомные хуки</li>
              <li>Изучите новые хуки React 18</li>
            </ol>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-blue-700">Практические советы:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
              <li>Откройте консоль браузера для наблюдения за рендерами</li>
              <li>Используйте React DevTools для отладки</li>
              <li>Экспериментируйте с параметрами и зависимостями</li>
              <li>Сравнивайте производительность с и без оптимизации</li>
              <li>Создавайте собственные примеры на основе изученного</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksIndex; 