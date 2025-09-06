// Обработка ошибкок

// Примеры для демонстрации разных типов ошибок
async function demonstrateErrors() {
    console.log('=== Демонстрация разных типов ошибок ===');
    
    // 1. Ошибка от сервера (404 - ресурс не найден)
    try {
        const response1 = await fetch('https://jsonplaceholder.typicode.com/users/999999');
        console.log('Статус ответа:', response1.status);
        console.log('response.ok:', response1.ok);
        
        if(!response1.ok) {
            throw new Error(`HTTP ошибка от сервера! статус: ${response1.status}`);
        }
    } catch (error) {
        console.error('Поймана ошибка:', error.message);
    }
    
    // 2. Ошибка клиента (неправильный URL)
    try {
        const response2 = await fetch('https://несуществующий-сайт.com/api');
        // Этот код не выполнится из-за ошибки сети
    } catch (error) {
        console.error('Ошибка клиента (сеть):', error.message);
        console.log('Тип ошибки:', error.name); // TypeError
    }
    
    // 3. Ошибка парсинга JSON
    try {
        const response3 = await fetch('https://httpbin.org/html'); // Возвращает HTML, не JSON
        if(!response3.ok) {
            throw new Error(`HTTP ошибка! статус: ${response3.status}`);
        }
        const data = await response3.json(); // Ошибка парсинга JSON
    } catch (error) {
        console.error('Ошибка парсинга:', error.message);
    }
}

// Запускаем демонстрацию
demonstrateErrors();