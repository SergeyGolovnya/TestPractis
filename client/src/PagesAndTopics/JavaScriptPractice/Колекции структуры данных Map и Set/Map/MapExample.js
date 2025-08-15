// Основные методы для работы с Map:
// - set() - добавление элементов
// - get() - получение значения по ключу
// - has() - проверка наличия ключа
// - delete() - удаление элемента
// - clear() - очистка всего Map
// - size - получение размера Map
// - keys() - получение всех ключей
// - values() - получение всех значений
// - entries() - получение всех пар ключ-значение

// Создаем новый Map
const skillMap = new Map();

// Добавляем элементы
skillMap.set('JavaScript', 'Advanced');
skillMap.set('HTML', 'Intermediate');
skillMap.set('CSS', 'Intermediate');
skillMap.set('React', 'Advanced');

// Получаем значения
console.log(skillMap.get('JavaScript')); // 'Advanced'

// Проверяем наличие ключа
console.log(skillMap.has('Python')); // false

// Получаем все ключи
console.log([...skillMap.keys()]); // ['JavaScript', 'HTML', 'CSS', 'React']

// Получаем все значения
console.log([...skillMap.values()]); // ['Advanced', 'Intermediate', 'Intermediate', 'Advanced']

// Получаем все пары ключ-значение
console.log([...skillMap.entries()]); // [['JavaScript', 'Advanced'], ['HTML', 'Intermediate'], ...]

// Удаляем элемент
skillMap.delete('CSS');

// Получаем количество элементов
console.log(skillMap.size); // 3

// Перебираем все элементы
skillMap.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// Создаем Map из объекта
const user = {
    name: 'John',
    age: 30,
    city: 'New York'
};
const userMap = new Map(Object.entries(user));
console.log(userMap.get('name')); // 'John'

// Создаем Map из массива пар
const newMap = new Map([
    ['name', 'John'],
    ['age', 30],
    ['city', 'New York']
]);

// Пример использования Map для подсчета частоты элементов
const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const wordFrequency = new Map();

words.forEach(word => {
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
});

console.log(wordFrequency); // Map(3) { 'apple' => 3, 'banana' => 2, 'orange' => 1 }

// Очищаем Map
skillMap.clear();
