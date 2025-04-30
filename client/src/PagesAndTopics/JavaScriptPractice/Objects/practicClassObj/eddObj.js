// === Получение данных из API ===

const getData = async (url) => {
    try {
      // Отправляем запрос к API
      const response = await fetch(url);
      // Проверяем, успешен ли запрос (статус 200-299)
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.status);
      }
      // Преобразуем ответ в объект
      const data = await response.json();
      // Возвращаем данные
      return data;
    } catch (error) {
      // Логируем ошибку (например, нет сети или неверный JSON)
      console.error('Ошибка при получении данных:', error.message);
      return null;
    }
};


// === Обогащение данных ===
const enrichData = (data) => {
    // Проверяем, что данные существуют
    if (!data) return null;
    // Создаем копию объекта, чтобы не изменять исходный
    const enrichedObj = { ...data };
    // Добавляем новое поле fullName
    enrichedObj.fullName = `${enrichedObj.name} (ID: ${enrichedObj.id})`;
    // Возвращаем обогащенный объект
    return enrichedObj;
};


// === Отправка данных на другой ресурс ===
const sendData = async (data) => {
try {
    // Отправляем POST-запрос с данными
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // Преобразуем объект в JSON
    });
    // Проверяем, успешен ли запрос
    if (!response.ok) {
    throw new Error('Ошибка отправки: ' + response.status);
    }
    // Получаем ответ от сервера
    const result = await response.json();
    // Логируем успешную отправку
    console.log('Данные успешно отправлены:', result);
    return result;
} catch (error) {
    // Логируем ошибку (например, сервер не ответил)
    console.error('Ошибка при отправке данных:', error.message);
    return null;
}
};

// === Основная логика ===
const main = async () => {
    // Шаг 1: Получаем данные
    const data = await getData('https://jsonplaceholder.typicode.com/users/1');
    if (!data) {
      console.log('Не удалось получить данные');
      return;
    }
    console.log('Исходные данные:', data);
  
    // Шаг 2: Обогащаем данные
    const enrichedData = enrichData(data);
    if (!enrichedData) {
      console.log('Ошибка при обогащении');
      return;
    }
    console.log('Обогащенные данные:', enrichedData);
  
    // Шаг 3: Сохраняем данные в переменную
    const savedData = enrichedData;
    console.log('Сохраненные данные:', savedData.fullName);
  
    // Шаг 4: Отправляем обогащенные данные
    const sendResult = await sendData(savedData);
    if (!sendResult) {
      console.log('Не удалось отправить данные');
      return;
    }
  };
  
  // === Запуск программы ===
  main();