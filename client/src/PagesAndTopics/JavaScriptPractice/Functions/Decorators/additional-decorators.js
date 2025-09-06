/**
 * ДОПОЛНИТЕЛЬНЫЕ ДЕКОРАТОРЫ
 * 
 * Этот файл содержит дополнительные полезные декораторы,
 * которые часто используются во фронтенд разработке.
 */

// ========================================
// 1. ДЕКОРАТОР executeOnce (основной)
// ========================================

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
// 2. ДЕКОРАТОР debounce (отложенное выполнение)
// ========================================

function debounce(fn, delay = 300) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Применение: поиск, валидация форм, обработка скролла
const searchUsers = debounce(async (query) => {
    console.log('🔍 Поиск пользователей:', query);
    // API запрос для поиска
}, 500);

// ========================================
// 3. ДЕКОРАТОР throttle (ограничение частоты)
// ========================================

function throttle(fn, limit = 300) {
    let inThrottle;
    
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Применение: обработка скролла, resize, mousemove
const handleScroll = throttle(() => {
    console.log('📜 Обработка скролла');
    // Логика обработки скролла
}, 100);

// ========================================
// 4. ДЕКОРАТОР memoize (кэширование результатов)
// ========================================

function memoize(fn) {
    const cache = new Map();
    
    return function (...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('💾 Возвращаем кэшированный результат');
            return cache.get(key);
        }
        
        console.log('🧮 Вычисляем новый результат');
        const result = fn.apply(this, args);
        cache.set(key, result);
        
        return result;
    };
}

// Применение: дорогие вычисления, факториал, фибоначчи
const factorial = memoize((n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
});

// ========================================
// 5. ДЕКОРАТОР retry (повторные попытки)
// ========================================

function retry(fn, maxAttempts = 3, delay = 1000) {
    return async function (...args) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                console.log(`🔄 Попытка ${attempt}/${maxAttempts}`);
                return await fn.apply(this, args);
            } catch (error) {
                lastError = error;
                console.log(`❌ Ошибка на попытке ${attempt}:`, error.message);
                
                if (attempt < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw lastError;
    };
}

// Применение: API запросы, сетевые операции
const fetchUserData = retry(async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}, 3, 1000);

// ========================================
// 6. ДЕКОРАТОР timeout (ограничение времени)
// ========================================

function timeout(fn, ms = 5000) {
    return function (...args) {
        return Promise.race([
            fn.apply(this, args),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(`Timeout after ${ms}ms`));
                }, ms);
            })
        ]);
    };
}

// Применение: API запросы с таймаутом
const fetchWithTimeout = timeout(async (url) => {
    const response = await fetch(url);
    return response.json();
}, 3000);

// ========================================
// 7. ДЕКОРАТОР log (логирование)
// ========================================

function log(fn, name = 'Function') {
    return function (...args) {
        console.log(`📝 ${name} вызвана с аргументами:`, args);
        
        const startTime = performance.now();
        const result = fn.apply(this, args);
        const endTime = performance.now();
        
        console.log(`⏱️ ${name} выполнилась за ${(endTime - startTime).toFixed(2)}ms`);
        console.log(`✅ ${name} вернула результат:`, result);
        
        return result;
    };
}

// Применение: отладка, профилирование
const expensiveOperation = log((a, b) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += a * b;
    }
    return result;
}, 'ExpensiveOperation');

// ========================================
// 8. ДЕКОРАТОР cache (кэширование с TTL)
// ========================================

function cache(fn, ttl = 60000) { // TTL в миллисекундах
    const cache = new Map();
    
    return function (...args) {
        const key = JSON.stringify(args);
        const now = Date.now();
        
        if (cache.has(key)) {
            const { result, timestamp } = cache.get(key);
            
            if (now - timestamp < ttl) {
                console.log('💾 Возвращаем кэшированный результат');
                return result;
            } else {
                cache.delete(key);
            }
        }
        
        console.log('🧮 Вычисляем новый результат');
        const result = fn.apply(this, args);
        cache.set(key, { result, timestamp: now });
        
        return result;
    };
}

// Применение: API запросы с кэшированием
const getWeatherData = cache(async (city) => {
    console.log(`🌤️ Загружаем погоду для ${city}`);
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { city, temperature: Math.random() * 30, humidity: Math.random() * 100 };
}, 300000); // Кэш на 5 минут

// ========================================
// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
// ========================================

console.log('=== ТЕСТИРОВАНИЕ ДОПОЛНИТЕЛЬНЫХ ДЕКОРАТОРОВ ===\n');

// Тест 1: Debounce
console.log('Тест 1: Debounce');
searchUsers('иван');
searchUsers('иванов');
searchUsers('иванович');
// Только последний вызов выполнится через 500ms
console.log('');

// Тест 2: Throttle
console.log('Тест 2: Throttle');
for (let i = 0; i < 10; i++) {
    handleScroll();
}
// Выполнится только первый вызов
console.log('');

// Тест 3: Memoize
console.log('Тест 3: Memoize');
console.log('Факториал 5:', factorial(5));
console.log('Факториал 5:', factorial(5)); // Кэшированный результат
console.log('Факториал 6:', factorial(6));
console.log('');

// Тест 4: Log
console.log('Тест 4: Log');
expensiveOperation(2, 3);
console.log('');

// Тест 5: Cache
console.log('Тест 5: Cache');
(async () => {
    const weather1 = await getWeatherData('Москва');
    const weather2 = await getWeatherData('Москва'); // Кэшированный
    console.log('Погода 1:', weather1);
    console.log('Погода 2:', weather2);
})();
console.log('');

// ========================================
// КОМБИНИРОВАНИЕ ДЕКОРАТОРОВ
// ========================================

console.log('=== КОМБИНИРОВАНИЕ ДЕКОРАТОРОВ ===\n');

// Комбинируем несколько декораторов
const optimizedSearch = log(
    debounce(
        cache(
            async (query) => {
                console.log(`🔍 Выполняем поиск: ${query}`);
                await new Promise(resolve => setTimeout(resolve, 200));
                return [`Результат 1 для ${query}`, `Результат 2 для ${query}`];
            },
            60000 // Кэш на 1 минуту
        ),
        300 // Debounce 300ms
    ),
    'OptimizedSearch'
);

// Тестируем комбинированный декоратор
(async () => {
    console.log('Поиск с комбинированными декораторами:');
    const results1 = await optimizedSearch('react');
    const results2 = await optimizedSearch('react'); // Кэшированный результат
    console.log('Результаты:', results1, results2);
})();

console.log('\nВсе декораторы готовы к использованию!'); 