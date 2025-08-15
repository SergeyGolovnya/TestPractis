// /**
//  * Async/Await - синтаксический сахар для работы с Promise
//  * 
//  * async - объявляет асинхронную функцию
//  * await - ожидает выполнения Promise
//  * 
//  * Преимущества:
//  * - Более читаемый код
//  * - Упрощенная обработка ошибок
//  * - Последовательное выполнение
//  */

// Пример 1: Базовая асинхронная функция
/* async function getData() {
    return 'Данные получены';
} */

// Пример 2: Использование await
/* async function fetchUser() {
    try {
        console.log('Какой то другой код')
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        console.log(response)
        const respons2 = await fetch ('https://jsonplaceholder.typicode.com/users/2');
       
        console.log('Какой то другой код 2')
        setTimeout(() => console.log('Погоны'),400)
        console.log(response.email);
        return response.email
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const email = await fetchUser()
const id = `${email} +  Жора больного прострела`
console.log(id) */

/*
Вывод:
- Какой то другой код
- Какой то другой код 2
- Sincere@april.biz
- Sincere@april.biz +  Жора больного прострела
- Погоны
*/


// // Пример 3: Параллельное выполнение
// async function parallelExecution() {
//    // Получение ответа
//     const [result1, result2] = await Promise.all([
//         fetch('https://jsonplaceholder.typicode.com/users/1'),
//         fetch('https://jsonplaceholder.typicode.com/users/2')
//     ]);

//     // Перевод ответа в json
//     const [user1, user2] = await Promise.all([
//       result1.json(),
//       result2.json()
//     ])
    
//     const pole = 'name'

//     return [user1[pole], user2[pole]];
// }

// parallelExecution()
//     .then(results => {
//         console.log('Результаты:', results);
//         results.map((res, index) => {
//          console.log(`Пользовател ${index + 1}:`, res)
//         })
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//     });

/* 
Результаты: [ 'Leanne Graham', 'Ervin Howell' ]
Пользователь 1: Leanne Graham
Пользователь 2: Ervin Howell
*/


// Пример 4: Асинхронная функция с задержкой
/* async function delayedOperation() {
    console.log('Начало');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('После задержки');
    return 'Готово';
}

delayedOperation().then(res=> console.log(res)).catch(err => 'error:', err) */

// Пример 5: Обработка ошибок
/* async function errorHandling() {
    try {
        console.error('Запуск кода');
        const result = await someAsyncOperation(); //Ошибочная функция
        return result;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error; // Пробрасываем ошибку дальше
    } finally {
        console.log('Операция завершена'); // Операция 
    }
}

errorHandling() */

// // Пример использования
// async function main() {
//     try {
//         const data = await getData();
//         console.log(data);
        
//         const user = await fetchUser();
//         console.log(user);
        
//         const [res1, res2] = await parallelExecution();
//         console.log(res1, res2);
        
//         const result = await delayedOperation();
//         console.log(result);
        
//         await errorHandling();
//     } catch (error) {
//         console.error('Ошибка в main:', error);
//     }
// } 

/*
Задача на работу с Async/Await и внешним API:

1. Создайте асинхронную функцию getUserWithPosts, которая:
   - Получает данные пользователя по ID (https://jsonplaceholder.typicode.com/users/{id})
   - Получает все посты этого пользователя (https://jsonplaceholder.typicode.com/posts?userId={id})
   - Возвращает объект, содержащий информацию о пользователе и его постах
*/

/* async function getUserWithPosts (id) {
   const getId = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
   const getPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
   const user = await getId.json()
   const posts = await getPosts.json()
   return {user, posts}
}

getUserWithPosts(1).then(result => {
   console.log(result)
}) */


/* 
2. Создайте асинхронную функцию getUsersWithAlbums, которая:
   - Получает список всех пользователей
   - Для каждого пользователя получает его альбомы
   - Возвращает массив объектов, где каждый объект содержит информацию о пользователе и его альбомах
   - Используйте Promise.all для параллельного выполнения запросов
*/

async function getUsersWithAlbums() {
   try {
      // Получаем всех пользователей
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await usersResponse.json();

      // Получаем альбомы для каждого пользователя параллельно
      const albumsPromises = users.map(user => 
         fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
      );
      
      const albumsResponses = await Promise.all(albumsPromises);
      const albumsArrays = await Promise.all(
         albumsResponses.map(response => response.json())
      );

      // Объединяем пользователей с их альбомами
      const usersWithAlbums = users.map((user, index) => ({
         user,
         albums: albumsArrays[index]
      }));

      return usersWithAlbums;
   } catch (error) {
      console.error('Ошибка при получении пользователей с альбомами:', error);
      throw error;
   }
}

// Пример использования
getUsersWithAlbums()
   .then(result => {
      console.log('Пользователи с альбомами:', result);
      result.forEach(({ user, albums }) => {
         console.log(`Пользователь ${user.name} имеет ${albums.length} альбомов`);
      });
   })
   .catch(error => {
      console.error('Ошибка:', error);
   });


/*
3. Создайте асинхронную функцию createUserWithPost, которая:
   - Создает нового пользователя (POST запрос)
   - Создает новый пост от имени этого пользователя
   - Возвращает объект с информацией о созданном пользователе и его посте
   - Обработайте возможные ошибки с помощью try/catch

4. Создайте асинхронную функцию updateUserAndPosts, которая:
   - Обновляет информацию о пользователе
   - Обновляет все его посты
   - Возвращает обновленные данные
   - Используйте Promise.all для параллельного обновления

5. Создайте асинхронную функцию deleteUserAndRelatedData, которая:
   - Удаляет пользователя
   - Удаляет все его посты
   - Удаляет все его альбомы
   - Возвращает подтверждение об успешном удалении
   - Обработайте возможные ошибки

Для всех функций:
- Используйте async/await
- Добавьте обработку ошибок
- Добавьте задержку между запросами (чтобы не перегружать API)
- Выведите результаты в консоль
*/

