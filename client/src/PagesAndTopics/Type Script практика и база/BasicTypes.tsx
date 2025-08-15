import React from 'react';

// 1. Примитивные типы
const primitiveTypes = () => {
  // Строки
  let name: string = 'Иван';
  let greeting: string = `Привет, ${name}!`;
  
  // Числа
  let age: number = 25;
  let price: number = 99.99;
  let binary: number = 0b1010; // 10 в двоичной системе
  let hex: number = 0xFF; // 255 в шестнадцатеричной системе
  
  // Булевы значения
  let isActive: boolean = true;
  let hasPermission: boolean = false;
  
  // null и undefined
  let nullable: null = null;
  let undefinedValue: undefined = undefined;
  
  // Symbol
  const uniqueSymbol: symbol = Symbol('description');
  
  // BigInt
  const bigNumber: bigint = 9007199254740991n;
  
  console.log('Примитивные типы:', {
    name, greeting, age, price, binary, hex,
    isActive, hasPermission, nullable, undefinedValue,
    uniqueSymbol, bigNumber
  });
};

// 2. Union Types (объединенные типы)
const unionTypes = () => {
  // Переменная может быть строкой или числом
  let id: string | number = 'abc123';
  id = 123; // Теперь число
  
  // Функция принимает разные типы
  function processValue(value: string | number | boolean): string {
    if (typeof value === 'string') {
      return `Строка: ${value.toUpperCase()}`;
    } else if (typeof value === 'number') {
      return `Число: ${value * 2}`;
    } else {
      return `Булево: ${value ? 'истина' : 'ложь'}`;
    }
  }
  
  console.log(processValue('hello')); // "Строка: HELLO"
  console.log(processValue(42)); // "Число: 84"
  console.log(processValue(true)); // "Булево: истина"
  
  // Массив с union типами
  let mixedArray: (string | number)[] = ['hello', 42, 'world', 100];
  
  // Union с null/undefined
  let optionalString: string | null = 'hello';
  optionalString = null;
  
  let optionalNumber: number | undefined = 42;
  optionalNumber = undefined;
};

// 3. Literal Types (литеральные типы)
const literalTypes = () => {
  // Строковые литералы
  type Direction = 'north' | 'south' | 'east' | 'west';
  let direction: Direction = 'north';
  // direction = 'up'; // Ошибка! 'up' не входит в тип Direction
  
  // Числовые литералы
  type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
  let diceResult: DiceRoll = 3;
  
  // Булевы литералы
  type ToggleState = true | false;
  let toggle: ToggleState = true;
  
  // Комбинированные литералы
  type Status = 'loading' | 'success' | 'error';
  let status: Status = 'loading';
  
  // Функции с литеральными типами
  function setDirection(dir: Direction): void {
    console.log(`Устанавливаем направление: ${dir}`);
  }
  
  setDirection('south'); // OK
  // setDirection('up'); // Ошибка!
  
  // Объекты с литеральными ключами
  type Config = {
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
    notifications: boolean;
  };
  
  const config: Config = {
    theme: 'dark',
    language: 'ru',
    notifications: true
  };
};

// 4. Type Assertions (утверждения типов)
const typeAssertions = () => {
  // as синтаксис
  let someValue: unknown = 'это строка';
  let strLength: number = (someValue as string).length;
  
  // Угловые скобки (не рекомендуется в JSX)
  let anotherValue: unknown = 'другая строка';
  let anotherLength: number = (anotherValue as string).length;
  
  // Двойное утверждение
  let doubleAssert: unknown = 'hello';
  let result = (doubleAssert as any as number) + 1; // Небезопасно!
  
  console.log('Type assertions:', { strLength, anotherLength, result });
};

// 5. const assertions
const constAssertions = () => {
  // Обычное объявление
  const colors = ['red', 'green', 'blue']; // string[]
  
  // const assertion
  const colorsConst = ['red', 'green', 'blue'] as const; // readonly ["red", "green", "blue"]
  
  // Объект с const assertion
  const user = {
    name: 'Иван',
    age: 25,
    hobbies: ['чтение', 'спорт']
  } as const;
  
  // Без const assertion
  const userMutable = {
    name: 'Иван',
    age: 25,
    hobbies: ['чтение', 'спорт']
  };
  
  console.log('const assertions:', {
    colors: typeof colors,
    colorsConst: typeof colorsConst,
    user: typeof user,
    userMutable: typeof userMutable
  });
};

// 6. Template Literal Types
const templateLiteralTypes = () => {
  type EmailLocale = 'ru' | 'en';
  type EmailType = 'welcome' | 'reset' | 'notification';
  
  type EmailTemplate = `${EmailType}_${EmailLocale}`;
  
  let template: EmailTemplate = 'welcome_ru'; // OK
  // let invalidTemplate: EmailTemplate = 'welcome_fr'; // Ошибка!
  
  // Более сложные примеры
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
  type ApiEndpoint = `/api/${string}`;
  type FullEndpoint = `${HttpMethod} ${ApiEndpoint}`;
  
  let endpoint: FullEndpoint = 'GET /api/users'; // OK
  // let invalidEndpoint: FullEndpoint = 'PATCH /api/users'; // Ошибка!
  
  console.log('Template literal types:', { template, endpoint });
};

// 7. Практические примеры
const practicalExamples = () => {
  // Типизация API ответов
  type ApiResponse<T> = {
    data: T;
    status: 'success' | 'error';
    message?: string;
  };
  
  type User = {
    id: number;
    name: string;
    email: string;
  };
  
  // Типизация событий
  type ButtonEvent = 'click' | 'hover' | 'focus' | 'blur';
  type KeyboardEvent = 'keydown' | 'keyup' | 'keypress';
  
  // Типизация конфигурации
  type AppConfig = {
    apiUrl: string;
    timeout: number;
    retries: 1 | 3 | 5;
    features: {
      darkMode: boolean;
      notifications: boolean;
      analytics: boolean;
    };
  };
  
  const config: AppConfig = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    features: {
      darkMode: true,
      notifications: false,
      analytics: true
    }
  };
  
  console.log('Практические примеры:', { config });
};

// Основная функция для демонстрации
const BasicTypesPractice: React.FC = () => {
  console.log('=== БАЗОВЫЕ ТИПЫ TYPESCRIPT ===');
  
  primitiveTypes();
  unionTypes();
  literalTypes();
  typeAssertions();
  constAssertions();
  templateLiteralTypes();
  practicalExamples();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика базовых типов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Примитивные типы</h2>
          <p className="mb-2">string, number, boolean, null, undefined, symbol, bigint</p>
          <p className="text-sm text-gray-600">Откройте консоль браузера для просмотра результатов</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Union Types</h2>
          <p className="mb-2">Объединение нескольких типов с помощью |</p>
          <p className="text-sm text-gray-600">Пример: string | number | boolean</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Literal Types</h2>
          <p className="mb-2">Точные значения как типы</p>
          <p className="text-sm text-gray-600">Пример: 'north' | 'south' | 'east' | 'west'</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Type Assertions</h2>
          <p className="mb-2">Указание TypeScript'у конкретного типа</p>
          <p className="text-sm text-gray-600">Синтаксис: as Type или &lt;Type&gt;</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. const Assertions</h2>
          <p className="mb-2">Создание readonly типов из значений</p>
          <p className="text-sm text-gray-600">Синтаксис: as const</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. Template Literal Types</h2>
          <p className="mb-2">Создание типов на основе строковых шаблонов</p>
          <p className="text-sm text-gray-600">Пример: `${Type}_${Type}`</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>TypeScript добавляет статическую типизацию к JavaScript</li>
          <li>Union types позволяют переменной иметь несколько возможных типов</li>
          <li>Literal types ограничивают значения конкретными литералами</li>
          <li>Type assertions следует использовать осторожно</li>
          <li>const assertions создают readonly типы</li>
          <li>Template literal types позволяют создавать сложные строковые типы</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicTypesPractice; 