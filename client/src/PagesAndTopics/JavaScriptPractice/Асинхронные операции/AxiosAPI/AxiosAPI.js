import axios from 'axios';
/**
 * Axios - популярная библиотека для работы с HTTP-запросами
 * 
 * Основные возможности:
 * - GET, POST, PUT, DELETE запросы
 * - Автоматическая сериализация/десериализация JSON
 * - Глобальная конфигурация
 * - Интерцепторы запросов и ответов
 * - Отмена запросов
 * - Автоматическая обработка ошибок
 */

// Пример 1: Простой GET запрос
// axios.get('https://jsonplaceholder.typicode.com/users/1')
//     .then(response => {
//         console.log('Улица:', response.data.address.street);
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//     });

// axios.get('https://jsonplaceholder.typicode.com/users/1')
//     .then(res => {console.log(res.data.address.city)})
//     .catch(err => {console.error('Ошибка:', err)})
//     .finally(fyn => {console.log('Конец')})


///////////////////////////////////////

// Способ 1: async/await (рекомендуемый)
// async function getUserData() {
//     try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
//         const userData = response.data;
//         console.log('Улица:', userData.address.street);
//         return userData; // Возвращаем данные для переиспользования
//     } catch (error) {
//         console.error('Ошибка:', error);
//         return null;
//     }
// }

// // // Использование:
// getUserData().then(data => console.log('Полные данные:', data));

// // Способ 2: Сохранение в переменную через Promise
// let userDataPromise = axios.get('https://jsonplaceholder.typicode.com/users/1')
//     .then(response => {
//         console.log('Улица:', response.data.address.street);
//         return response.data; // Возвращаем данные
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//         return null;
//     });

// // Использование:
// userDataPromise.then(data => console.log('Данные пользователя:', data));

// //////////////////////////////////////////

// // Пример 2: POST запрос с данными
// axios.post('https://api.example.com/users', {
//     name: 'Иван',
//     age: 30
// })
//     .then(response => {
//         console.log('Успех:', response.data);
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//     });

// // Пример 3: Работа с заголовками
// axios.get('https://api.example.com/data', {
//     headers: {
//         'Authorization': 'Bearer token123',
//         'Custom-Header': 'value'
//     }
// })
//     .then(response => {
//         console.log('Заголовки ответа:', response.headers);
//         console.log('Данные:', response.data);
//     });

// // Пример 4: Обработка разных типов ответов
// async function fetchData() {
//     try {
//         const response = await axios.get('https://api.example.com/data', {
//             responseType: 'json' // или 'text', 'blob', 'arraybuffer'
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }

// // Пример 5: Отмена запроса
// const controller = new AbortController();

// axios.get('https://api.example.com/data', {
//     signal: controller.signal
// })
//     .then(response => {
//         console.log('Данные:', response.data);
//     })
//     .catch(error => {
//         if (axios.isCancel(error)) {
//             console.log('Запрос отменен');
//         } else {
//             console.error('Ошибка:', error);
//         }
//     });

// // Отмена запроса через 5 секунд
// setTimeout(() => {
//     controller.abort();
// }, 5000);

// // Пример 6: Глобальная конфигурация
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = 'Bearer token123';
// axios.defaults.timeout = 10000; // 10 секунд

// // Теперь можно делать запросы без полного URL
// axios.get('/users')
//     .then(response => console.log(response.data));

// // Пример 7: Интерцепторы
// // Перехват запросов
// axios.interceptors.request.use(
//     config => {
//         console.log('Отправка запроса:', config.url);
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// // Перехват ответов
// axios.interceptors.response.use(
//     response => {
//         console.log('Получен ответ:', response.status);
//         return response;
//     },
//     error => {
//         console.error('Ошибка ответа:', error.response?.status);
//         return Promise.reject(error);
//     }
// );

// // Пример 8: Создание экземпляра с конфигурацией
// const api = axios.create({
//     baseURL: 'https://api.example.com',
//     timeout: 5000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // Использование созданного экземпляра
// api.get('/users')
//     .then(response => console.log(response.data));
