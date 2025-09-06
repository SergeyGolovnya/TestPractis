/**
 * ДЕКОРАТОР executeOnce
 * 
 * Этот декоратор гарантирует, что функция выполнится только один раз.
 * При повторных вызовах возвращается результат первого выполнения.
 * 
 * Принцип работы:
 * 1. При первом вызове - выполняет функцию и сохраняет результат
 * 2. При последующих вызовах - возвращает сохраненный результат
 * 
 * Применение:
 * - Инициализация приложения
 * - Загрузка данных только один раз
 * - Создание синглтонов
 * - Кэширование результатов
 */

function executeOnce(fn) {
    // Флаг, показывающий была ли функция уже вызвана
    let hasBeenCalled = false;
    
    // Переменная для хранения результата первого вызова
    let cachedResult;
    
    // Возвращаем новую функцию-обертку
    return function (...args) {
        // Если функция еще не вызывалась
        if (!hasBeenCalled) {
            // Выполняем оригинальную функцию с переданными аргументами
            // Используем apply для правильной передачи контекста (this)
            cachedResult = fn.apply(this, args);
            
            // Отмечаем, что функция была вызвана
            hasBeenCalled = true;
        }
        
        // Возвращаем результат (либо новый, либо кэшированный)
        return cachedResult;
    };
}

// ========================================
// ПРИМЕРЫ ПРИМЕНЕНИЯ
// ========================================

// 1. Инициализация приложения
const initializeApp = executeOnce(() => {
    console.log('🚀 Приложение инициализировано');
    return { status: 'ready', timestamp: Date.now() };
});

// 2. Загрузка пользовательского профиля
const loadUserProfile = executeOnce(async () => {
    console.log('📥 Загружаем профиль пользователя...');
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { name: 'Иван', email: 'ivan@example.com' };
});

// 3. Создание соединения с базой данных
const createDatabaseConnection = executeOnce(() => {
    console.log('🔗 Создаем соединение с БД...');
    return { connectionId: Math.random(), status: 'connected' };
});

// 4. Дорогое вычисление
const expensiveCalculation = executeOnce(() => {
    console.log('🧮 Выполняется сложное вычисление...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
});

// 5. Показ приветственного сообщения
const showWelcomeMessage = executeOnce(() => {
    console.log('👋 Добро пожаловать в наше приложение!');
    return 'message_shown';
});

// ========================================
// ТЕСТИРОВАНИЕ
// ========================================

console.log('=== ТЕСТИРОВАНИЕ ДЕКОРАТОРА executeOnce ===\n');

// Тест 1: Инициализация приложения
console.log('Тест 1: Инициализация приложения');
const app1 = initializeApp(); // 🚀 Приложение инициализировано
const app2 = initializeApp(); // Ничего не выводится
console.log('Результат 1:', app1);
console.log('Результат 2:', app2);
console.log('Результаты одинаковые:', app1 === app2);
console.log('');

// Тест 2: Загрузка профиля (асинхронная функция)
console.log('Тест 2: Загрузка профиля');
(async () => {
    const profile1 = await loadUserProfile(); // 📥 Загружаем профиль пользователя...
    const profile2 = await loadUserProfile(); // Ничего не выводится
    console.log('Профиль 1:', profile1);
    console.log('Профиль 2:', profile2);
    console.log('Профили одинаковые:', profile1 === profile2);
})();
console.log('');

// Тест 3: Соединение с БД
console.log('Тест 3: Соединение с БД');
const db1 = createDatabaseConnection(); // 🔗 Создаем соединение с БД...
const db2 = createDatabaseConnection(); // Ничего не выводится
console.log('Соединение 1:', db1);
console.log('Соединение 2:', db2);
console.log('Соединения одинаковые:', db1 === db2);
console.log('');

// Тест 4: Дорогое вычисление
console.log('Тест 4: Дорогое вычисление');
const calc1 = expensiveCalculation(); // 🧮 Выполняется сложное вычисление...
const calc2 = expensiveCalculation(); // Ничего не выводится
console.log('Вычисление 1:', calc1);
console.log('Вычисление 2:', calc2);
console.log('Результаты одинаковые:', calc1 === calc2);
console.log('');

// Тест 5: Приветственное сообщение
console.log('Тест 5: Приветственное сообщение');
const msg1 = showWelcomeMessage(); // 👋 Добро пожаловать в наше приложение!
const msg2 = showWelcomeMessage(); // Ничего не выводится
console.log('Сообщение 1:', msg1);
console.log('Сообщение 2:', msg2);
console.log('Сообщения одинаковые:', msg1 === msg2);
console.log('');

// ========================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ ВО ФРОНТЕНДЕ
// ========================================

console.log('=== ПРАКТИЧЕСКИЕ ПРИМЕРЫ ВО ФРОНТЕНДЕ ===\n');

// Пример 1: Инициализация аналитики
const initializeAnalytics = executeOnce(() => {
    console.log('📊 Инициализируем Google Analytics...');
    // window.gtag('config', 'GA_MEASUREMENT_ID');
    return { analyticsId: 'GA_12345' };
});

// Пример 2: Загрузка тяжелой библиотеки
const loadHeavyLibrary = executeOnce(async () => {
    console.log('📚 Загружаем тяжелую библиотеку...');
    // const library = await import('./heavy-library.js');
    await new Promise(resolve => setTimeout(resolve, 500));
    return { library: 'loaded', version: '1.0.0' };
});

// Пример 3: Создание WebSocket соединения
const createWebSocketConnection = executeOnce(() => {
    console.log('🔌 Создаем WebSocket соединение...');
    // const ws = new WebSocket('wss://example.com');
    return { socketId: Math.random(), status: 'connected' };
});

// Пример 4: Проверка авторизации
const checkAuthentication = executeOnce(async () => {
    console.log('🔐 Проверяем авторизацию...');
    // const token = localStorage.getItem('token');
    // const response = await fetch('/api/auth/verify', { headers: { Authorization: token } });
    await new Promise(resolve => setTimeout(resolve, 300));
    return { isAuthenticated: true, userId: 123 };
});

console.log('Все примеры готовы к использованию!'); 