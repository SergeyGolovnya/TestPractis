/**
 * Методы округления в JavaScript
 * 
 * Math.random() - возвращает случайное число от 0 (включительно) до 1 (не включительно)
 * Math.floor() - округляет вниз до ближайшего целого числа
 * Math.ceil() - округляет вверх до ближайшего целого числа  
 * Math.round() - округляет до ближайшего целого числа
 * Math.trunc() - отбрасывает дробную часть (ES6)
 * toFixed() - округляет до указанного количества знаков после запятой (возвращает строку)
 */

console.log('=== Math.random() ===');
// Math.random() возвращает число от 0 до 1 (не включая 1)
console.log('Math.random():', Math.random()); // например: 0.123456789
console.log('Math.random():', Math.random()); // например: 0.987654321

console.log('\n=== Math.floor() - округление вниз ===');
// Math.floor() всегда округляет вниз
console.log('Math.floor(3.7):', Math.floor(3.7)); // 3
console.log('Math.floor(3.2):', Math.floor(3.2)); // 3
console.log('Math.floor(3.0):', Math.floor(3.0)); // 3
console.log('Math.floor(-3.7):', Math.floor(-3.7)); // -4
console.log('Math.floor(-3.2):', Math.floor(-3.2)); // -4

console.log('\n=== Math.ceil() - округление вверх ===');
// Math.ceil() всегда округляет вверх
console.log('Math.ceil(3.7):', Math.ceil(3.7)); // 4
console.log('Math.ceil(3.2):', Math.ceil(3.2)); // 4
console.log('Math.ceil(3.0):', Math.ceil(3.0)); // 3
console.log('Math.ceil(-3.7):', Math.ceil(-3.7)); // -3
console.log('Math.ceil(-3.2):', Math.ceil(-3.2)); // -3

console.log('\n=== Math.round() - округление до ближайшего ===');
// Math.round() округляет до ближайшего целого
console.log('Math.round(3.7):', Math.round(3.7)); // 4
console.log('Math.round(3.2):', Math.round(3.2)); // 3
console.log('Math.round(3.5):', Math.round(3.5)); // 4
console.log('Math.round(-3.7):', Math.round(-3.7)); // -4
console.log('Math.round(-3.2):', Math.round(-3.2)); // -3

console.log('\n=== Math.trunc() - отбрасывание дробной части ===');
// Math.trunc() отбрасывает дробную часть (ES6)
console.log('Math.trunc(3.7):', Math.trunc(3.7)); // 3
console.log('Math.trunc(3.2):', Math.trunc(3.2)); // 3
console.log('Math.trunc(-3.7):', Math.trunc(-3.7)); // -3
console.log('Math.trunc(-3.2):', Math.trunc(-3.2)); // -3

console.log('\n=== toFixed() - округление до знаков после запятой ===');
// toFixed() возвращает строку, округленную до указанного количества знаков
console.log('(3.14159).toFixed(2):', (3.14159).toFixed(2)); // "3.14"
console.log('(3.14159).toFixed(0):', (3.14159).toFixed(0)); // "3"
console.log('(3.7).toFixed(0):', (3.7).toFixed(0)); // "4"
console.log('(3.2).toFixed(0):', (3.2).toFixed(0)); // "3"

console.log('\n=== Генерация случайных чисел в диапазоне ===');

// Генерация целых чисел от min до max (включительно)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log('Случайное число от 1 до 10:', getRandomInt(1, 10));
console.log('Случайное число от 1 до 10:', getRandomInt(1, 10));
console.log('Случайное число от 1 до 10:', getRandomInt(1, 10));

// Генерация чисел с плавающей точкой от min до max
function getRandomFloat(min, max, decimals = 2) {
    const randomNum = Math.random() * (max - min) + min;
    return Number(randomNum.toFixed(decimals));
}

console.log('Случайное число от 0 до 1 с 2 знаками:', getRandomFloat(0, 1, 2));
console.log('Случайное число от 10 до 20 с 1 знаком:', getRandomFloat(10, 20, 1));

console.log('\n=== Исправление ошибки в вашем коде ===');
console.log('Ваш код: (Math.random(1) * 10).toFixed(0)');
console.log('Проблема: Math.random() не принимает параметров!');

// Правильные варианты:
console.log('Правильно 1 (целые числа):', Math.floor(Math.random() * 10) + 1);
console.log('Правильно 2 (строки):', (Math.random() * 10).toFixed(0));
console.log('Правильно 3 (округление):', Math.round(Math.random() * 10));

console.log('\n=== Сравнение методов для рейтинга ===');

// Для рейтинга от 1 до 10:
console.log('Вариант 1 (Math.floor):', Math.floor(Math.random() * 10) + 1);
console.log('Вариант 2 (Math.round):', Math.round(Math.random() * 9) + 1);
console.log('Вариант 3 (Math.ceil):', Math.ceil(Math.random() * 10));

console.log('\n=== Практические примеры ===');

// Пример 1: Генерация рейтинга от 1 до 5 звезд
function generateRating() {
    return Math.floor(Math.random() * 5) + 1;
}

console.log('Рейтинг товара:', generateRating(), 'звезд');

// Пример 2: Генерация цены со скидкой
function generateDiscountedPrice(originalPrice) {
    const discount = Math.random() * 0.3; // скидка от 0% до 30%
    return Math.round(originalPrice * (1 - discount));
}

console.log('Цена со скидкой:', generateDiscountedPrice(1000), 'рублей');

// Пример 3: Генерация случайного индекса массива
const fruits = ['яблоко', 'банан', 'апельсин', 'груша'];
const randomIndex = Math.floor(Math.random() * fruits.length);
console.log('Случайный фрукт:', fruits[randomIndex]);

console.log('\n=== Рекомендации по использованию ===');
console.log('1. Для целых чисел в диапазоне: Math.floor(Math.random() * (max - min + 1)) + min');
console.log('2. Для округления вниз: Math.floor()');
console.log('3. Для округления вверх: Math.ceil()');
console.log('4. Для обычного округления: Math.round()');
console.log('5. Для отбрасывания дробной части: Math.trunc()');
console.log('6. Для форматирования с знаками после запятой: toFixed()'); 