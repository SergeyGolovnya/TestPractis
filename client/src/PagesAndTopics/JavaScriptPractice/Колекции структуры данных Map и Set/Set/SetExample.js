// Основные методы для работы с Set:
// - add() - добавление элемента
// - has() - проверка наличия элемента
// - delete() - удаление элемента
// - clear() - очистка всего Set
// - size - получение размера Set

// Создаем новый Set
const uniqueSkills = new Set();

// Добавляем элементы
uniqueSkills.add({skill: 'JavaScript'});
uniqueSkills.add('HTML');
uniqueSkills.add('CSS');
uniqueSkills.add('JavaScript'); // Дубликат не будет добавлен
console.log(uniqueSkills)

// // Проверяем наличие элемента
// console.log(uniqueSkills.has('JavaScript')); // true
// console.log(uniqueSkills.has('Python')); // false

// // Получаем количество элементов
// console.log(uniqueSkills.size); // 3

// // Перебираем все элементы
// uniqueSkills.forEach(skill => {
//     console.log(skill);
// });

// // Удаляем элемент
// uniqueSkills.delete('CSS');

// // Создаем Set из массива
// const numbers = new Set([1, 2, 3, 3, 4, 4, 5]);
// console.log(numbers); // Set(5) { 1, 2, 3, 4, 5 }

// // Пример использования Set для удаления дубликатов из массива
// const arrayWithDuplicates = [1, 2, 2, 3, 3, 4, 5, 5];
// const uniqueArray = [...new Set(arrayWithDuplicates)];
// console.log(uniqueArray); // [1, 2, 3, 4, 5]

// // Очищаем Set
// uniqueSkills.clear(); 