/**
 * СИНТАКСИС JAVASCRIPT ТЕСТОВ (JEST)
 * ===================================
 * 
 * Jest - это популярный фреймворк для тестирования JavaScript кода
 */

// ===========================================
// 1. ОСНОВНЫЕ КОНЦЕПЦИИ ТЕСТИРОВАНИЯ
// ===========================================

/**
 * Что такое тесты:
 * - Автоматизированная проверка корректности работы кода
 * - Позволяют убедиться, что код работает как ожидается
 * - Помогают выявить ошибки при изменениях (регрессии)
 * - Служат документацией к коду
 * 
 * Типы тестов:
 * - Unit тесты - тестируют отдельные функции/компоненты
 * - Integration тесты - тестируют взаимодействие между модулями
 * - E2E тесты - тестируют весь пользовательский сценарий
 */

// ===========================================
// 2. СИНТАКСИС JEST - ОСНОВНЫЕ ФУНКЦИИ
// ===========================================

/**
 * describe() - группирует связанные тесты
 * it() или test() - определяет отдельный тест
 * expect() - создает утверждение
 */

// Пример базовой структуры
describe('Группа тестов для функции calculateSum', () => {
  it('должна корректно складывать два числа', () => {
    // Arrange (подготовка)
    const a = 2;
    const b = 3;
    
    // Act (действие)
    const result = calculateSum(a, b);
    
    // Assert (проверка)
    expect(result).toBe(5);
  });
  
  test('должна обрабатывать отрицательные числа', () => {
    expect(calculateSum(-1, -2)).toBe(-3);
  });
});

// ===========================================
// 3. СТРУКТУРА ТЕСТОВ - HOOKS
// ===========================================

describe('Тесты с хуками', () => {
  let testData;
  
  // Выполняется перед каждым тестом
  beforeEach(() => {
    testData = { name: 'test', value: 42 };
    console.log('Подготовка данных перед тестом');
  });
  
  // Выполняется после каждого теста
  afterEach(() => {
    testData = null;
    console.log('Очистка после теста');
  });
  
  // Выполняется один раз перед всеми тестами в группе
  beforeAll(() => {
    console.log('Инициализация перед всеми тестами');
  });
  
  // Выполняется один раз после всех тестов в группе
  afterAll(() => {
    console.log('Финализация после всех тестов');
  });
  
  it('использует подготовленные данные', () => {
    expect(testData.value).toBe(42);
  });
});

// ===========================================
// 4. МАТЧЕРЫ (MATCHERS) - ОСНОВНЫЕ
// ===========================================

describe('Основные матчеры Jest', () => {
  const user = { name: 'John', age: 30, hobbies: ['reading', 'coding'] };
  const numbers = [1, 2, 3, 4, 5];
  
  it('toBe - строгое сравнение (===)', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
    // expect('5').toBe(5); // ОШИБКА! Строка не равна числу
  });
  
  it('toEqual - глубокое сравнение объектов', () => {
    expect({ name: 'John' }).toEqual({ name: 'John' });
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
  
  it('toBeNull, toBeUndefined, toBeDefined', () => {
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect('defined').toBeDefined();
  });
  
  it('toBeTruthy, toBeFalsy', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(false).toBeFalsy();
  });
  
  it('toContain - проверка наличия элемента', () => {
    expect('Hello World').toContain('World');
    expect(numbers).toContain(3);
    expect(user.hobbies).toContain('reading');
  });
  
  it('toHaveLength - проверка длины', () => {
    expect('hello').toHaveLength(5);
    expect(numbers).toHaveLength(5);
  });
  
  it('toMatch - проверка регулярным выражением', () => {
    expect('user@example.com').toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});

// ===========================================
// 5. МАТЧЕРЫ ДЛЯ ЧИСЕЛ
// ===========================================

describe('Матчеры для чисел', () => {
  it('toBeGreaterThan, toBeLessThan', () => {
    expect(10).toBeGreaterThan(5);
    expect(3).toBeLessThan(7);
  });
  
  it('toBeGreaterThanOrEqual, toBeLessThanOrEqual', () => {
    expect(5).toBeGreaterThanOrEqual(5);
    expect(3).toBeLessThanOrEqual(3);
  });
  
  it('toBeCloseTo - для чисел с плавающей точкой', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
    // expect(0.1 + 0.2).toBe(0.3); // ОШИБКА! Проблема точности
  });
});

// ===========================================
// 6. МАТЧЕРЫ ДЛЯ ИСКЛЮЧЕНИЙ
// ===========================================

describe('Тестирование исключений', () => {
  function throwError() {
    throw new Error('Что-то пошло не так');
  }
  
  function validateAge(age) {
    if (age < 0) {
      throw new Error('Возраст не может быть отрицательным');
    }
    return true;
  }
  
  it('toThrow - проверка выброса исключения', () => {
    expect(() => throwError()).toThrow();
    expect(() => throwError()).toThrow('Что-то пошло не так');
    expect(() => throwError()).toThrow(Error);
  });
  
  it('toThrowError - альтернативный способ', () => {
    expect(() => validateAge(-5)).toThrowError('Возраст не может быть отрицательным');
  });
});

// ===========================================
// 7. АСИНХРОННОЕ ТЕСТИРОВАНИЕ
// ===========================================

describe('Асинхронное тестирование', () => {
  // Функция, возвращающая Promise
  function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('данные получены'), 100);
    });
  }
  
  // Функция, которая может выбросить ошибку
  function fetchDataWithError() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Ошибка сети')), 100);
    });
  }
  
  // Тест с async/await
  it('должен получить данные асинхронно', async () => {
    const data = await fetchData();
    expect(data).toBe('данные получены');
  });
  
  // Тест с Promise
  it('должен обработать Promise', () => {
    return fetchData().then(data => {
      expect(data).toBe('данные получены');
    });
  });
  
  // Тест с rejects
  it('должен обработать ошибку', async () => {
    await expect(fetchDataWithError()).rejects.toThrow('Ошибка сети');
  });
  
  // Тест с resolves
  it('должен разрешить Promise', async () => {
    await expect(fetchData()).resolves.toBe('данные получены');
  });
});

// ===========================================
// 8. МОКИ И СТАБЫ (MOCKS & STUBS)
// ===========================================

describe('Моки и стабы', () => {
  // Создание мока функции
  const mockCallback = jest.fn();
  
  beforeEach(() => {
    mockCallback.mockClear(); // Очистка мока перед каждым тестом
  });
  
  it('должен вызвать callback функцию', () => {
    function processData(data, callback) {
      callback(data);
    }
    
    processData('test', mockCallback);
    
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith('test');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  
  it('должен использовать мок с возвращаемым значением', () => {
    const mockFn = jest.fn();
    mockFn.mockReturnValue('мок значение');
    
    expect(mockFn()).toBe('мок значение');
  });
  
  it('должен использовать мок с разными возвращаемыми значениями', () => {
    const mockFn = jest.fn();
    mockFn
      .mockReturnValueOnce('первое значение')
      .mockReturnValueOnce('второе значение')
      .mockReturnValue('значение по умолчанию');
    
    expect(mockFn()).toBe('первое значение');
    expect(mockFn()).toBe('второе значение');
    expect(mockFn()).toBe('значение по умолчанию');
    expect(mockFn()).toBe('значение по умолчанию');
  });
});

// ===========================================
// 9. МОКИРОВАНИЕ МОДУЛЕЙ
// ===========================================

// Мокирование внешних зависимостей
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'John' })),
  saveUser: jest.fn(() => Promise.resolve(true))
}));

describe('Мокирование модулей', () => {
  const { fetchUser, saveUser } = require('./api');
  
  it('должен использовать мокированный API', async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({ id: 1, name: 'John' });
    expect(fetchUser).toHaveBeenCalledWith(1);
  });
});

// ===========================================
// 10. ЧТО МОЖНО ТЕСТИРОВАТЬ
// ===========================================

/**
 * ✅ ЧТО МОЖНО И НУЖНО ТЕСТИРОВАТЬ:
 * 
 * 1. Чистые функции (Pure Functions)
 *    - Функции без побочных эффектов
 *    - Всегда возвращают одинаковый результат для одинаковых входных данных
 *    - Легко тестируются и предсказуемы
 */

// Примеры функций, которые легко тестировать
function add(a, b) {
  return a + b;
}

function formatName(firstName, lastName) {
  return `${firstName} ${lastName}`.trim();
}

function isEven(number) {
  return number % 2 === 0;
}

function calculateTax(amount, rate) {
  if (amount < 0 || rate < 0) {
    throw new Error('Значения не могут быть отрицательными');
  }
  return amount * (rate / 100);
}

describe('Тестирование чистых функций', () => {
  it('add должна корректно складывать числа', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });
  
  it('formatName должна форматировать имя', () => {
    expect(formatName('John', 'Doe')).toBe('John Doe');
    expect(formatName('  Jane  ', '  Smith  ')).toBe('Jane Smith');
  });
  
  it('isEven должна определять четность', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(7)).toBe(false);
    expect(isEven(0)).toBe(true);
  });
  
  it('calculateTax должна вычислять налог', () => {
    expect(calculateTax(100, 20)).toBe(20);
    expect(calculateTax(0, 10)).toBe(0);
  });
  
  it('calculateTax должна выбрасывать ошибку для отрицательных значений', () => {
    expect(() => calculateTax(-100, 20)).toThrow('Значения не могут быть отрицательными');
    expect(() => calculateTax(100, -20)).toThrow('Значения не могут быть отрицательными');
  });
});

/**
 * 2. Утилитарные функции
 *    - Работа с данными
 *    - Валидация
 *    - Форматирование
 *    - Математические операции
 */

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sortUsers(users, field) {
  return [...users].sort((a, b) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  });
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

describe('Тестирование утилитарных функций', () => {
  it('validateEmail должна валидировать email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
  
  it('sortUsers должна сортировать пользователей', () => {
    const users = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 }
    ];
    
    const sortedByName = sortUsers(users, 'name');
    expect(sortedByName[0].name).toBe('Alice');
    expect(sortedByName[1].name).toBe('Bob');
    expect(sortedByName[2].name).toBe('Charlie');
  });
});

/**
 * 3. Бизнес-логика
 *    - Алгоритмы
 *    - Правила валидации
 *    - Обработка данных
 *    - Состояния приложения
 */

class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    if (!item || !item.id || !item.price) {
      throw new Error('Некорректный товар');
    }
    this.items.push(item);
  }
  
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
  }
  
  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
  
  getItemCount() {
    return this.items.length;
  }
  
  clear() {
    this.items = [];
  }
}

describe('Тестирование бизнес-логики', () => {
  let cart;
  
  beforeEach(() => {
    cart = new ShoppingCart();
  });
  
  it('должна добавлять товары в корзину', () => {
    const item = { id: 1, name: 'Товар', price: 100 };
    cart.addItem(item);
    
    expect(cart.getItemCount()).toBe(1);
    expect(cart.getTotal()).toBe(100);
  });
  
  it('должна удалять товары из корзины', () => {
    const item1 = { id: 1, name: 'Товар 1', price: 100 };
    const item2 = { id: 2, name: 'Товар 2', price: 200 };
    
    cart.addItem(item1);
    cart.addItem(item2);
    cart.removeItem(1);
    
    expect(cart.getItemCount()).toBe(1);
    expect(cart.getTotal()).toBe(200);
  });
  
  it('должна выбрасывать ошибку при добавлении некорректного товара', () => {
    expect(() => cart.addItem(null)).toThrow('Некорректный товар');
    expect(() => cart.addItem({})).toThrow('Некорректный товар');
  });
});

// ===========================================
// 11. ЧТО СЛОЖНО ИЛИ НЕЛЬЗЯ ТЕСТИРОВАТЬ
// ===========================================

/**
 * ❌ ЧТО СЛОЖНО ИЛИ НЕЛЬЗЯ ТЕСТИРОВАТЬ:
 * 
 * 1. Случайные значения
 *    - Math.random()
 *    - Генерация UUID
 *    - Случайные цвета
 */

function generateRandomColor() {
  const colors = ['red', 'green', 'blue', 'yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ❌ Плохой тест - непредсказуемый результат
// it('должен генерировать случайный цвет', () => {
//   const color = generateRandomColor();
//   expect(['red', 'green', 'blue', 'yellow']).toContain(color);
// });

// ✅ Хороший тест - мокируем Math.random
describe('Тестирование случайных значений', () => {
  it('должен генерировать цвет на основе мокированного random', () => {
    const originalRandom = Math.random;
    Math.random = jest.fn(() => 0.5); // Всегда возвращает 0.5
    
    const color = generateRandomColor();
    expect(color).toBe('blue'); // colors[2]
    
    Math.random = originalRandom; // Восстанавливаем оригинальную функцию
  });
});

/**
 * 2. Время и даты
 *    - new Date()
 *    - setTimeout/setInterval
 *    - Текущее время
 */

function getCurrentTime() {
  return new Date().toISOString();
}

// ❌ Плохой тест - время всегда разное
// it('должен возвращать текущее время', () => {
//   const time = getCurrentTime();
//   expect(time).toBe('2024-01-01T12:00:00.000Z'); // Всегда будет ошибка
// });

// ✅ Хороший тест - мокируем Date
describe('Тестирование времени', () => {
  it('должен возвращать мокированное время', () => {
    const mockDate = new Date('2024-01-01T12:00:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    const time = getCurrentTime();
    expect(time).toBe('2024-01-01T12:00:00.000Z');
    
    jest.restoreAllMocks(); // Восстанавливаем оригинальные функции
  });
});

/**
 * 3. Внешние зависимости
 *    - API запросы
 *    - База данных
 *    - Файловая система
 *    - Сторонние сервисы
 */

// ❌ Плохой тест - зависит от внешнего API
// async function fetchUserFromAPI(userId) {
//   const response = await fetch(`https://api.example.com/users/${userId}`);
//   return response.json();
// }

// it('должен получать пользователя из API', async () => {
//   const user = await fetchUserFromAPI(1);
//   expect(user.name).toBe('John'); // Может упасть из-за сети
// });

// ✅ Хороший тест - мокируем fetch
describe('Тестирование внешних зависимостей', () => {
  it('должен получать пользователя из мокированного API', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: 'John' })
      })
    );
    
    // Здесь был бы тест функции fetchUserFromAPI
    // const user = await fetchUserFromAPI(1);
    // expect(user.name).toBe('John');
    
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
  });
});

/**
 * 4. DOM манипуляции (без специальных инструментов)
 *    - Изменение элементов страницы
 *    - События браузера
 *    - CSS стили
 */

// ❌ Сложно тестировать без jsdom или других инструментов
function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

// ✅ Можно тестировать с jsdom
describe('Тестирование DOM (с jsdom)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test-element"></div>';
  });
  
  it('должен обновлять текст элемента', () => {
    updateElementText('test-element', 'Новый текст');
    const element = document.getElementById('test-element');
    expect(element.textContent).toBe('Новый текст');
  });
});

/**
 * 5. Побочные эффекты
 *    - console.log
 *    - Изменение глобальных переменных
 *    - Запись в файлы
 *    - Отправка email
 */

function logUserAction(action) {
  console.log(`Пользователь выполнил: ${action}`);
  // Побочный эффект - вывод в консоль
}

// ✅ Можно тестировать, мокируя console
describe('Тестирование побочных эффектов', () => {
  it('должен логировать действие пользователя', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    logUserAction('login');
    
    expect(consoleSpy).toHaveBeenCalledWith('Пользователь выполнил: login');
    
    consoleSpy.mockRestore();
  });
});

// ===========================================
// 12. ЛУЧШИЕ ПРАКТИКИ ТЕСТИРОВАНИЯ
// ===========================================

/**
 * 🎯 ЛУЧШИЕ ПРАКТИКИ:
 * 
 * 1. AAA Pattern (Arrange, Act, Assert)
 *    - Arrange: подготовка данных
 *    - Act: выполнение действия
 *    - Assert: проверка результата
 */

describe('AAA Pattern', () => {
  it('должен корректно вычислять скидку', () => {
    // Arrange (подготовка)
    const price = 100;
    const discountPercent = 20;
    
    // Act (действие)
    const finalPrice = price - (price * discountPercent / 100);
    
    // Assert (проверка)
    expect(finalPrice).toBe(80);
  });
});

/**
 * 2. Один тест - одна проверка
 *    - Каждый тест должен проверять одну конкретную вещь
 *    - Легче понять, что именно сломалось
 */

// ❌ Плохо - много проверок в одном тесте
// it('должен обрабатывать пользователя', () => {
//   const user = processUser(userData);
//   expect(user.name).toBe('John');
//   expect(user.email).toBe('john@example.com');
//   expect(user.isActive).toBe(true);
//   expect(user.createdAt).toBeDefined();
// });

// ✅ Хорошо - отдельные тесты
describe('Обработка пользователя', () => {
  it('должен устанавливать имя пользователя', () => {
    const user = processUser(userData);
    expect(user.name).toBe('John');
  });
  
  it('должен устанавливать email пользователя', () => {
    const user = processUser(userData);
    expect(user.email).toBe('john@example.com');
  });
  
  it('должен активировать пользователя по умолчанию', () => {
    const user = processUser(userData);
    expect(user.isActive).toBe(true);
  });
});

/**
 * 3. Описательные названия тестов
 *    - Название должно объяснять, что тестируется
 *    - Должно включать ожидаемый результат
 */

// ❌ Плохие названия
// it('test 1', () => {});
// it('should work', () => {});
// it('function test', () => {});

// ✅ Хорошие названия
describe('Функция validatePassword', () => {
  it('должна возвращать true для пароля длиной 8+ символов', () => {
    expect(validatePassword('password123')).toBe(true);
  });
  
  it('должна возвращать false для пароля короче 8 символов', () => {
    expect(validatePassword('short')).toBe(false);
  });
  
  it('должна выбрасывать ошибку для пустого пароля', () => {
    expect(() => validatePassword('')).toThrow('Пароль не может быть пустым');
  });
});

/**
 * 4. Тестирование граничных случаев
 *    - Минимальные и максимальные значения
 *    - Пустые значения
 *    - Некорректные данные
 */

function divide(a, b) {
  if (b === 0) {
    throw new Error('Деление на ноль невозможно');
  }
  return a / b;
}

describe('Граничные случаи для функции divide', () => {
  it('должна корректно делить положительные числа', () => {
    expect(divide(10, 2)).toBe(5);
  });
  
  it('должна корректно делить отрицательные числа', () => {
    expect(divide(-10, -2)).toBe(5);
  });
  
  it('должна выбрасывать ошибку при делении на ноль', () => {
    expect(() => divide(10, 0)).toThrow('Деление на ноль невозможно');
  });
  
  it('должна обрабатывать деление нуля', () => {
    expect(divide(0, 5)).toBe(0);
  });
});

// ===========================================
// 13. ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// ===========================================

/**
 * Пример 1: Тестирование функции валидации
 */

function validateUser(user) {
  const errors = [];
  
  if (!user.name || user.name.trim().length < 2) {
    errors.push('Имя должно содержать минимум 2 символа');
  }
  
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Некорректный email');
  }
  
  if (!user.age || user.age < 18 || user.age > 120) {
    errors.push('Возраст должен быть от 18 до 120 лет');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

describe('validateUser - практический пример', () => {
  it('должна принимать корректного пользователя', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    };
    
    const result = validateUser(user);
    
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
  
  it('должна отклонять пользователя с некорректным именем', () => {
    const user = {
      name: 'J',
      email: 'john@example.com',
      age: 25
    };
    
    const result = validateUser(user);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Имя должно содержать минимум 2 символа');
  });
  
  it('должна отклонять пользователя с некорректным email', () => {
    const user = {
      name: 'John Doe',
      email: 'invalid-email',
      age: 25
    };
    
    const result = validateUser(user);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Некорректный email');
  });
  
  it('должна отклонять пользователя с некорректным возрастом', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 15
    };
    
    const result = validateUser(user);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Возраст должен быть от 18 до 120 лет');
  });
  
  it('должна собирать все ошибки валидации', () => {
    const user = {
      name: 'J',
      email: 'invalid',
      age: 15
    };
    
    const result = validateUser(user);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(3);
  });
});

/**
 * Пример 2: Тестирование асинхронной функции
 */

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error('ID пользователя обязателен'));
      return;
    }
    
    // Имитация API запроса
    setTimeout(() => {
      if (userId === 999) {
        reject(new Error('Пользователь не найден'));
      } else {
        resolve({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        });
      }
    }, 100);
  });
}

describe('fetchUserData - асинхронный пример', () => {
  it('должна получать данные пользователя', async () => {
    const user = await fetchUserData(1);
    
    expect(user).toEqual({
      id: 1,
      name: 'User 1',
      email: 'user1@example.com'
    });
  });
  
  it('должна выбрасывать ошибку для пустого ID', async () => {
    await expect(fetchUserData()).rejects.toThrow('ID пользователя обязателен');
  });
  
  it('должна выбрасывать ошибку для несуществующего пользователя', async () => {
    await expect(fetchUserData(999)).rejects.toThrow('Пользователь не найден');
  });
});

// ===========================================
// ЗАКЛЮЧЕНИЕ
// ===========================================

/**
 * РЕЗЮМЕ:
 * 
 * ✅ ЧТО ТЕСТИРУЕМ:
 * - Чистые функции
 * - Бизнес-логику
 * - Утилитарные функции
 * - Валидацию данных
 * - Алгоритмы
 * - Классы и их методы
 * 
 * ❌ ЧТО НЕ ТЕСТИРУЕМ (или тестируем с моками):
 * - Случайные значения
 * - Время и даты
 * - Внешние API
 * - DOM манипуляции
 * - Побочные эффекты
 * 
 * 🎯 ПРИНЦИПЫ:
 * - Один тест - одна проверка
 * - AAA Pattern (Arrange, Act, Assert)
 * - Описательные названия
 * - Тестирование граничных случаев
 * - Использование моков для внешних зависимостей
 * 
 * 📚 ПОЛЕЗНЫЕ РЕСУРСЫ:
 * - Jest Documentation: https://jestjs.io/docs/getting-started
 * - Testing Library: https://testing-library.com/
 * - Test-Driven Development (TDD)
 * - Behavior-Driven Development (BDD)
 */

// Экспорт для использования в других файлах (если нужно)
module.exports = {
  add,
  formatName,
  isEven,
  calculateTax,
  validateEmail,
  sortUsers,
  ShoppingCart,
  validateUser,
  fetchUserData
};
