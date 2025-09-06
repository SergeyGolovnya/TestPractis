/**
 * Fetch API предоставляет интерфейс для работы с HTTP-запросами
 * 
 * Основные возможности:
 * - GET, POST, PUT, DELETE запросы
 * - Работа с заголовками
 * - Обработка ответов
 * - Отмена запросов
 */

// Пример 1: Простой GET запрос
// fetch('https://jsonplaceholder.typicode.com/users/1')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Ошибка сети');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Улица:', data.address.street);
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//     });

export async function getUser () {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/2')
        if(!response.ok) {
            throw new Error(`HTTP ошибка! статус: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        return console.error(error)
    }
}
console.log(await getUser().then(res => res.name))

export async function postUser () {
    try {
        
    } catch (error) {
        return console.error
    }
}


// // Пример 2: POST запрос с данными
// fetch('https://api.example.com/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'Иван',
//         age: 30
//     })
// })
//     .then(response => response.json())
//     .then(data => console.log('Успех:', data))
//     .catch(error => console.error('Ошибка:', error));

// // Пример 3: Работа с заголовками
// fetch('https://api.example.com/data', {
//     headers: {
//         'Authorization': 'Bearer token123',
//         'Custom-Header': 'value'
//     }
// })
//     .then(response => {
//         console.log('Заголовки ответа:', response.headers);
//         return response.json();
//     });

// // Пример 4: Обработка разных типов ответов
// async function fetchData() {
//     try {
//         const response = await fetch('https://api.example.com/data');
        
//         const contentType = response.headers.get('content-type');
//         if (contentType.includes('application/json')) {
//             return await response.json();
//         } else if (contentType.includes('text/html')) {
//             return await response.text();
//         } else if (contentType.includes('image')) {
//             return await response.blob();
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }

// // Пример 5: Отмена запроса
// const controller = new AbortController();
// const signal = controller.signal;

// fetch('https://api.example.com/data', { signal })
//     .then(response => response.json())
//     .then(data => console.log('Данные:', data))
//     .catch(error => {
//         if (error.name === 'AbortError') {
//             console.log('Запрос отменен');
//         } else {
//             console.error('Ошибка:', error);
//         }
//     });

// // Отмена запроса через 5 секунд
// setTimeout(() => {
//     controller.abort();
// }, 5000); 