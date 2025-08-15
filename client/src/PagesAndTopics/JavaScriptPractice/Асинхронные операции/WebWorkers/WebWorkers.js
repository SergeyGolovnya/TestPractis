/**
 * Web Workers позволяют выполнять JavaScript код в отдельном потоке
 * 
 * Основные возможности:
 * - Выполнение тяжелых вычислений
 * - Параллельная обработка данных
 * - Не блокирует основной поток
 */

// Пример 1: Создание и использование Worker
// main.js
const worker = new Worker('worker.js');

worker.onmessage = function(e) {
    console.log('Получено от worker:', e.data);
};

worker.postMessage('Начать вычисления');

// worker.js
self.onmessage = function(e) {
    console.log('Получено от main:', e.data);
    
    // Тяжелые вычисления
    const result = heavyComputation();
    
    self.postMessage(result);
};

// Пример 2: Обработка ошибок
const worker2 = new Worker('worker.js');

worker2.onerror = function(error) {
    console.error('Ошибка в worker:', error);
};

worker2.onmessageerror = function(error) {
    console.error('Ошибка передачи данных:', error);
};

// Пример 3: Передача данных
const worker3 = new Worker('worker.js');

// Передача объекта
worker3.postMessage({
    type: 'CALCULATE',
    data: [1, 2, 3, 4, 5]
});

// Передача ArrayBuffer
const buffer = new ArrayBuffer(8);
worker3.postMessage(buffer, [buffer]);

// Пример 4: Завершение Worker
const worker4 = new Worker('worker.js');

// Завершение после выполнения
worker4.onmessage = function(e) {
    console.log('Результат:', e.data);
    worker4.terminate(); // Завершаем worker
};

// Пример 5: Использование SharedWorker
// main.js
const sharedWorker = new SharedWorker('shared-worker.js');

sharedWorker.port.onmessage = function(e) {
    console.log('Получено от shared worker:', e.data);
};

sharedWorker.port.postMessage('Привет от main');

// shared-worker.js
let connections = 0;

self.onconnect = function(e) {
    const port = e.ports[0];
    connections++;
    
    port.onmessage = function(e) {
        console.log('Получено от клиента:', e.data);
        port.postMessage('Обработано в shared worker');
    };
    
    port.start();
}; 