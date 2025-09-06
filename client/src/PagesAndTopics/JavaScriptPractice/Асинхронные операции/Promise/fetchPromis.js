// Использование промисов в fetch и axios
// Практика с Promise.all(), Promise.allSettled(), Promise.race()

import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';

// 1. Базовый пример с одним запросом (исправленный)
const getUser = async () => {
    try {
        return await axios.get(`${baseUrl}/users/1`).then(res=> res.data)
    } catch (error) {
        console.log('Ошибка', error)
        return error
    }
}

const user = await getUser()
console.log(user.name)
// console.log(await getUser().email)
// console.log(await getUser().then(result => result.email))

// Через деструктуризацию
// const {email, name, phone, website} = await getUser()
// console.log('Деструктуризация:', name)
// console.log('Деструктуризация:', email)
// console.log('Деструктуризация:', phone)
// console.log('Деструктуризация:', website)


// // 2. Promise.all() - параллельное выполнение нескольких запросов
// const getMultiplePosts = async () => {
//     try {
//         const promises = [
//             axios.get(`${baseUrl}/posts/1`),
//             axios.get(`${baseUrl}/posts/2`),
//             axios.get(`${baseUrl}/posts/3`)
//         ];
        
//         const results = await Promise.all(promises);
//         const posts = results.map(response => response.data);
        
//         console.log('Несколько постов (Promise.all):', posts);
//         return posts;
//     } catch (error) {
//         console.error('Ошибка в Promise.all:', error.message);
//         throw error;
//     }
// };

// // 3. Promise.allSettled() - выполнение всех промисов, даже если некоторые завершились с ошибкой
// const getPostsWithErrors = async () => {
//     const promises = [
//         axios.get(`${baseUrl}/posts/1`), // Успешный запрос
//         axios.get(`${baseUrl}/posts/999`), // Несуществующий пост
//         axios.get(`${baseUrl}/posts/2`), // Успешный запрос
//         axios.get('https://invalid-url.com') // Неверный URL
//     ];
    
//     const results = await Promise.allSettled(promises);
    
//     console.log('Результаты Promise.allSettled:');
//     results.forEach((result, index) => {
//         if (result.status === 'fulfilled') {
//             console.log(`Запрос ${index + 1}: Успех`, result.value.data);
//         } else {
//             console.log(`Запрос ${index + 1}: Ошибка`, result.reason.message);
//         }
//     });
    
//     return results;
// };

// // 4. Promise.race() - возвращает результат первого завершившегося промиса
// const getFastestResponse = async () => {
//     const promises = [
//         axios.get(`${baseUrl}/posts/1`),
//         axios.get(`${baseUrl}/users/1`),
//         axios.get(`${baseUrl}/comments/1`)
//     ];
    
//     try {
//         const fastestResult = await Promise.race(promises);
//         console.log('Самый быстрый ответ (Promise.race):', fastestResult.data);
//         return fastestResult.data;
//     } catch (error) {
//         console.error('Ошибка в Promise.race:', error.message);
//         throw error;
//     }
// };

// // 5. Практический пример: получение пользователя и его постов одновременно
// const getUserWithPosts = async (userId = 1) => {
//     try {
//         const [userResponse, postsResponse] = await Promise.all([
//             axios.get(`${baseUrl}/users/${userId}`),
//             axios.get(`${baseUrl}/posts?userId=${userId}`)
//         ]);
        
//         const user = userResponse.data;
//         const posts = postsResponse.data;
        
//         console.log('Пользователь с постами:', {
//             user,
//             postsCount: posts.length,
//             posts: posts.slice(0, 3) // Показываем только первые 3 поста
//         });
        
//         return { user, posts };
//     } catch (error) {
//         console.error('Ошибка при получении пользователя с постами:', error.message);
//         throw error;
//     }
// };

// // 6. Пример с таймаутом для Promise.race()
// const getPostWithTimeout = async (timeoutMs = 5000) => {
//     const fetchPromise = axios.get(`${baseUrl}/posts/1`);
//     const timeoutPromise = new Promise((_, reject) => {
//         setTimeout(() => reject(new Error('Таймаут запроса')), timeoutMs);
//     });
    
//     try {
//         const result = await Promise.race([fetchPromise, timeoutPromise]);
//         console.log('Результат с таймаутом:', result.data);
//         return result.data;
//     } catch (error) {
//         console.error('Ошибка с таймаутом:', error.message);
//         throw error;
//     }
// };

// // 7. Пример с условным выполнением промисов
// const getConditionalData = async (shouldGetPosts = true, shouldGetUsers = false) => {
//     const promises = [];
    
//     if (shouldGetPosts) {
//         promises.push(axios.get(`${baseUrl}/posts/1`));
//     }
    
//     if (shouldGetUsers) {
//         promises.push(axios.get(`${baseUrl}/users/1`));
//     }
    
//     if (promises.length === 0) {
//         console.log('Нет запросов для выполнения');
//         return [];
//     }
    
//     try {
//         const results = await Promise.all(promises);
//         const data = results.map(response => response.data);
//         console.log('Условные данные:', data);
//         return data;
//     } catch (error) {
//         console.error('Ошибка при условном получении данных:', error.message);
//         throw error;
//     }
// };

// // Запуск всех примеров
// const runAllExamples = async () => {
//     console.log('=== Начало практики с Promise.all() ===\n');
    
//     try {
//         // 1. Базовый пример
//         console.log('1. Базовый пример:');
//         await getPost();
//         console.log('');
        
//         // 2. Promise.all()
//         console.log('2. Promise.all():');
//         await getMultiplePosts();
//         console.log('');
        
//         // 3. Promise.allSettled()
//         console.log('3. Promise.allSettled():');
//         await getPostsWithErrors();
//         console.log('');
        
//         // 4. Promise.race()
//         console.log('4. Promise.race():');
//         await getFastestResponse();
//         console.log('');
        
//         // 5. Практический пример
//         console.log('5. Пользователь с постами:');
//         await getUserWithPosts();
//         console.log('');
        
//         // 6. Таймаут
//         console.log('6. Таймаут:');
//         await getPostWithTimeout(3000);
//         console.log('');
        
//         // 7. Условное выполнение
//         console.log('7. Условное выполнение:');
//         await getConditionalData(true, true);
//         console.log('');
        
//     } catch (error) {
//         console.error('Общая ошибка:', error.message);
//     }
    
//     console.log('=== Конец практики ===');
// };

// // Запуск
// runAllExamples();