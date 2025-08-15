import React, { useState } from 'react';
import BasicTypesPractice from './BasicTypes';
import InterfacesPractice from './Interfaces';
import GenericsPractice from './Generics';
import UtilityTypesPractice from './UtilityTypes';
import TypesPractice from './Types';
import FunctionsPractice from './Functions';
import ClassesPractice from './Classes';
import AdvancedTypesPractice from './AdvancedTypes';
import TypeGuardsPractice from './TypeGuards';
import DecoratorsPractice from './Decorators';
import ModulesPractice from './Modules';
import AsyncTypesPractice from './AsyncTypes';
import ReactTypesPractice from './ReactTypes';
import APITypesPractice from './APITypes';
import StateManagementPractice from './StateManagement';
import ErrorHandlingPractice from './ErrorHandling';
import TypeAssertionsPractice from './TypeAssertions';
import DeclarationFilesPractice from './DeclarationFiles';
import ConfigAndToolsPractice from './ConfigAndTools';

// Импорты для остальных файлов (будут добавлены по мере создания)
// import TypesPractice from './Types';
// import FunctionsPractice from './Functions';
// import ClassesPractice from './Classes';
// import AdvancedTypesPractice from './AdvancedTypes';
// import TypeGuardsPractice from './TypeGuards';
// import DecoratorsPractice from './Decorators';
// import ModulesPractice from './Modules';
// import AsyncTypesPractice from './AsyncTypes';
// import ReactTypesPractice from './ReactTypes';
// import APITypesPractice from './APITypes';
// import StateManagementPractice from './StateManagement';
// import ErrorHandlingPractice from './ErrorHandling';
// import TypeAssertionsPractice from './TypeAssertions';
// import DeclarationFilesPractice from './DeclarationFiles';
// import ConfigAndToolsPractice from './ConfigAndTools';

// Типы для категорий
type Category = 'basic' | 'advanced' | 'practical' | 'special';

interface PracticeItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  component: React.ComponentType;
  available: boolean;
}

// Список всех практик
const practiceItems: PracticeItem[] = [
  // Базовые концепции
  {
    id: 'basic-types',
    name: 'Базовые типы',
    description: 'Примитивные типы, union types, literal types, type assertions',
    category: 'basic',
    component: BasicTypesPractice,
    available: true
  },
  {
    id: 'interfaces',
    name: 'Интерфейсы',
    description: 'Интерфейсы, наследование, опциональные свойства',
    category: 'basic',
    component: InterfacesPractice,
    available: true
  },
  {
    id: 'generics',
    name: 'Дженерики',
    description: 'Дженерики, constraints, utility types',
    category: 'basic',
    component: GenericsPractice,
    available: true
  },
  {
    id: 'utility-types',
    name: 'Utility Types',
    description: 'Partial, Required, Pick, Omit, Record и другие',
    category: 'basic',
    component: UtilityTypesPractice,
    available: true
  },
  {
    id: 'types',
    name: 'Type Aliases',
    description: 'type aliases, mapped types, conditional types',
    category: 'basic',
    component: TypesPractice,
    available: true
  },
  {
    id: 'functions',
    name: 'Функции',
    description: 'Типизация функций, перегрузки, callbacks',
    category: 'basic',
    component: FunctionsPractice,
    available: true
  },
  {
    id: 'classes',
    name: 'Классы',
    description: 'Классы, наследование, модификаторы доступа',
    category: 'basic',
    component: ClassesPractice,
    available: true
  },

  // Продвинутые темы
  {
    id: 'advanced-types',
    name: 'Продвинутые типы',
    description: 'Intersection types, discriminated unions',
    category: 'advanced',
    component: AdvancedTypesPractice,
    available: true
  },
  {
    id: 'type-guards',
    name: 'Type Guards',
    description: 'type guards, instanceof, in operator',
    category: 'advanced',
    component: TypeGuardsPractice,
    available: true
  },
  {
    id: 'decorators',
    name: 'Декораторы',
    description: 'Декораторы классов, методов, свойств',
    category: 'advanced',
    component: DecoratorsPractice,
    available: true
  },
  {
    id: 'modules',
    name: 'Модули',
    description: 'Модули, импорты/экспорты, namespace',
    category: 'advanced',
    component: ModulesPractice,
    available: true
  },
  {
    id: 'async-types',
    name: 'Асинхронные типы',
    description: 'Promise, async/await, типизация асинхронности',
    category: 'advanced',
    component: AsyncTypesPractice,
    available: true
  },

  // Практические сценарии
  {
    id: 'react-types',
    name: 'React типы',
    description: 'Типизация React компонентов, props, events',
    category: 'practical',
    component: ReactTypesPractice,
    available: true
  },
  {
    id: 'api-types',
    name: 'API типы',
    description: 'Типизация API, fetch, axios',
    category: 'practical',
    component: APITypesPractice,
    available: true
  },
  {
    id: 'state-management',
    name: 'Управление состоянием',
    description: 'Типизация Redux, Zustand, Context',
    category: 'practical',
    component: StateManagementPractice,
    available: true
  },
  {
    id: 'error-handling',
    name: 'Обработка ошибок',
    description: 'Типизация ошибок, Result types',
    category: 'practical',
    component: ErrorHandlingPractice,
    available: true
  },

  // Специальные случаи
  {
    id: 'type-assertions',
    name: 'Type Assertions',
    description: 'type assertions, as, <>',
    category: 'special',
    component: TypeAssertionsPractice,
    available: true
  },
  {
    id: 'declaration-files',
    name: 'Declaration Files',
    description: '.d.ts файлы, ambient declarations',
    category: 'special',
    component: DeclarationFilesPractice,
    available: true
  },
  {
    id: 'config-and-tools',
    name: 'Конфигурация и инструменты',
    description: 'tsconfig.json, ESLint, Prettier',
    category: 'special',
    component: ConfigAndToolsPractice,
    available: true
  }
];

// Категории с описаниями
const categories = {
  basic: {
    name: 'Базовые концепции',
    description: 'Основные возможности TypeScript'
  },
  advanced: {
    name: 'Продвинутые темы',
    description: 'Сложные и продвинутые возможности'
  },
  practical: {
    name: 'Практические сценарии',
    description: 'Применение в реальных проектах'
  },
  special: {
    name: 'Специальные случаи',
    description: 'Особые возможности и инструменты'
  }
};

const TypeScriptPracticeIndex: React.FC = () => {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('basic');

  const handlePracticeSelect = (practiceId: string) => {
    setSelectedPractice(practiceId);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedPractice(null);
  };

  const getCurrentPractice = () => {
    if (!selectedPractice) return null;
    return practiceItems.find(item => item.id === selectedPractice);
  };

  const getFilteredPractices = () => {
    return practiceItems.filter(item => item.category === selectedCategory);
  };

  const currentPractice = getCurrentPractice();
  const filteredPractices = getFilteredPractices();

  if (currentPractice) {
    const PracticeComponent = currentPractice.component;
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setSelectedPractice(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Назад к списку
          </button>
        </div>
        <PracticeComponent />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Практика TypeScript</h1>
      
      {/* Навигация по категориям */}
      <div className="flex space-x-2 mb-8 justify-center">
        {(Object.keys(categories) as Category[]).map(category => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {categories[category].name}
          </button>
        ))}
      </div>

      {/* Описание категории */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">{categories[selectedCategory].name}</h2>
        <p className="text-gray-600">{categories[selectedCategory].description}</p>
      </div>

      {/* Список практик */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPractices.map(practice => (
          <div
            key={practice.id}
            className={`p-6 border rounded-lg shadow-sm transition-all hover:shadow-md ${
              practice.available
                ? 'border-green-200 bg-green-50 hover:border-green-300 cursor-pointer'
                : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
            }`}
            onClick={() => practice.available && handlePracticeSelect(practice.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800">{practice.name}</h3>
              {practice.available ? (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Доступно
                </span>
              ) : (
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                  В разработке
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{practice.description}</p>
            {practice.available && (
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Начать практику
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Статистика</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {practiceItems.filter(p => p.available).length}
            </div>
            <div className="text-sm text-gray-600">Доступно</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {practiceItems.filter(p => !p.available).length}
            </div>
            <div className="text-sm text-gray-600">В разработке</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {practiceItems.length}
            </div>
            <div className="text-sm text-gray-600">Всего</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(categories).length}
            </div>
            <div className="text-sm text-gray-600">Категорий</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeScriptPracticeIndex;

