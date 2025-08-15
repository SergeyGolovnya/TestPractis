/**
 * Service Workers - это скрипты, которые браузер запускает в фоновом режиме, поэтому они не могут взаимодействовать с DOM.
 * 
 * Может быть только один Service Worker на домен
 * 
 * Основные возможности:
 * - Кэширование ресурсов
 * - Офлайн-работа
 * - Push-уведомления
 * - Фоновая синхронизация
 */

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker успешно зарегистрирован:', registration.scope);
            })
            .catch(error => {
                console.log('Ошибка регистрации ServiceWorker:', error);
            });
    });
}

// Пример 2: Базовый Service Worker
// sw.js
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/app.js'
            ]);
        })
    );
});

// Пример 3: Обработка запросов
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Пример 4: Обновление кэша
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== 'v1') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Пример 5: Push-уведомления
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: 'icon.png',
        badge: 'badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

// Пример использования кэшированных данных
async function loadCachedData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log('Данные загружены:', data);
    } catch (error) {
        console.log('Ошибка загрузки данных:', error);
    }
}