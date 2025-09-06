/**
 * ПРИМЕРЫ ПРИМЕНЕНИЯ executeOnce В REACT
 * 
 * Этот файл показывает, как использовать декоратор executeOnce
 * в реальных React приложениях для оптимизации производительности
 * и предотвращения повторных операций.
 */

// Декоратор executeOnce (копируем из основного файла)
function executeOnce(fn) {
    let hasBeenCalled = false;
    let cachedResult;
    
    return function (...args) {
        if (!hasBeenCalled) {
            cachedResult = fn.apply(this, args);
            hasBeenCalled = true;
        }
        return cachedResult;
    };
}

// ========================================
// ПРИМЕРЫ ДЛЯ REACT КОМПОНЕНТОВ
// ========================================

// 1. Инициализация конфигурации приложения
const initializeAppConfig = executeOnce(() => {
    console.log('⚙️ Инициализируем конфигурацию приложения...');
    return {
        apiUrl: process.env.REACT_APP_API_URL || 'https://api.example.com',
        theme: localStorage.getItem('theme') || 'light',
        language: navigator.language || 'ru',
        version: '1.0.0'
    };
});

// 2. Загрузка пользовательских настроек
const loadUserSettings = executeOnce(async () => {
    console.log('👤 Загружаем настройки пользователя...');
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        notifications: true,
        soundEnabled: false,
        autoSave: true,
        fontSize: 'medium'
    };
});

// 3. Инициализация внешних сервисов
const initializeExternalServices = executeOnce(() => {
    console.log('🔗 Инициализируем внешние сервисы...');
    
    // Инициализация Google Analytics
    if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID');
    }
    
    // Инициализация Sentry для мониторинга ошибок
    if (window.Sentry) {
        window.Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
    }
    
    return {
        analytics: !!window.gtag,
        monitoring: !!window.Sentry,
        timestamp: Date.now()
    };
});

// 4. Создание WebSocket соединения
const createWebSocketConnection = executeOnce(() => {
    console.log('🔌 Создаем WebSocket соединение...');
    
    const ws = new WebSocket('wss://example.com/ws');
    
    ws.onopen = () => {
        console.log('WebSocket соединение установлено');
    };
    
    ws.onmessage = (event) => {
        console.log('Получено сообщение:', event.data);
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket ошибка:', error);
    };
    
    return ws;
});

// 5. Загрузка тяжелых библиотек
const loadChartLibrary = executeOnce(async () => {
    console.log('📊 Загружаем библиотеку для графиков...');
    
    // Динамический импорт тяжелой библиотеки
    const Chart = await import('chart.js');
    
    return Chart;
});

// 6. Проверка авторизации пользователя
const checkUserAuthentication = executeOnce(async () => {
    console.log('🔐 Проверяем авторизацию пользователя...');
    
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        return { isAuthenticated: false, user: null };
    }
    
    try {
        // Имитация API запроса для проверки токена
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            isAuthenticated: true,
            user: {
                id: 123,
                name: 'Иван Петров',
                email: 'ivan@example.com',
                role: 'user'
            }
        };
    } catch (error) {
        localStorage.removeItem('authToken');
        return { isAuthenticated: false, user: null };
    }
});

// ========================================
// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ В КОМПОНЕНТАХ
// ========================================

// Пример React компонента с использованием executeOnce
const AppComponent = () => {
    const [config, setConfig] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        const initializeApp = async () => {
            try {
                // Инициализируем конфигурацию (выполнится только один раз)
                const appConfig = initializeAppConfig();
                setConfig(appConfig);
                
                // Проверяем авторизацию (выполнится только один раз)
                const authResult = await checkUserAuthentication();
                setUser(authResult.user);
                
                // Инициализируем внешние сервисы (выполнится только один раз)
                initializeExternalServices();
                
            } catch (error) {
                console.error('Ошибка инициализации:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        initializeApp();
    }, []);
    
    if (isLoading) {
        return <div>Загрузка приложения...</div>;
    }
    
    return (
        <div>
            <h1>Приложение загружено</h1>
            <p>Конфигурация: {JSON.stringify(config)}</p>
            <p>Пользователь: {user ? user.name : 'Не авторизован'}</p>
        </div>
    );
};

// Пример хука для однократной инициализации
const useExecuteOnce = (fn, dependencies = []) => {
    const [result, setResult] = React.useState(null);
    const [isExecuted, setIsExecuted] = React.useState(false);
    
    React.useEffect(() => {
        if (!isExecuted) {
            const execute = async () => {
                try {
                    const res = await fn();
                    setResult(res);
                } catch (error) {
                    console.error('Ошибка выполнения:', error);
                } finally {
                    setIsExecuted(true);
                }
            };
            
            execute();
        }
    }, dependencies);
    
    return result;
};

// Пример использования хука
const UserProfileComponent = () => {
    const userSettings = useExecuteOnce(loadUserSettings, []);
    
    if (!userSettings) {
        return <div>Загрузка настроек...</div>;
    }
    
    return (
        <div>
            <h2>Настройки пользователя</h2>
            <p>Уведомления: {userSettings.notifications ? 'Включены' : 'Выключены'}</p>
            <p>Звук: {userSettings.soundEnabled ? 'Включен' : 'Выключен'}</p>
            <p>Автосохранение: {userSettings.autoSave ? 'Включено' : 'Выключено'}</p>
        </div>
    );
};

// ========================================
// ПРЕИМУЩЕСТВА ИСПОЛЬЗОВАНИЯ executeOnce
// ========================================

console.log('=== ПРЕИМУЩЕСТВА executeOnce В REACT ===\n');

console.log('1. 🚀 Производительность:');
console.log('   - Избегаем повторных дорогих операций');
console.log('   - Уменьшаем количество API запросов');
console.log('   - Оптимизируем инициализацию приложения\n');

console.log('2. 🛡️ Надежность:');
console.log('   - Предотвращаем множественные инициализации');
console.log('   - Гарантируем единственность синглтонов');
console.log('   - Избегаем race conditions\n');

console.log('3. 💡 Простота использования:');
console.log('   - Не нужно отслеживать флаги выполнения');
console.log('   - Автоматическое кэширование результатов');
console.log('   - Прозрачная работа с асинхронными функциями\n');

console.log('4. 🔄 Совместимость:');
console.log('   - Работает с синхронными и асинхронными функциями');
console.log('   - Сохраняет контекст выполнения (this)');
console.log('   - Поддерживает передачу аргументов\n');

console.log('Все примеры готовы к использованию в React приложениях!'); 