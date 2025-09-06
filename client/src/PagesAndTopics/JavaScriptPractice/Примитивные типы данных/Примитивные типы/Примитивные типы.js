// ========================================
// ПРИМИТИВНЫЕ ТИПЫ ДАННЫХ В JAVASCRIPT
// ========================================

console.log('=== ПРИМИТИВНЫЕ ТИПЫ ДАННЫХ ===\n');

// Список примитивных типов
// 1. Number
// 2. String
// 3. Boolean
// 4. Undefined
// 5. Null
// 6. Symbol
// 7. BigInt


// ========================================
// 1. NUMBER - числовой тип
// ========================================
console.log('1. NUMBER:');

// Целые числа
const integer = 42;
console.log('Целое число:', integer, typeof integer);

// Числа с плавающей точкой
const float = 3.14;
console.log('Число с плавающей точкой:', float, typeof float);

// Специальные числовые значения
const infinity = Infinity;
const negativeInfinity = -Infinity;
const notANumber = NaN;

console.log('Бесконечность:', infinity, typeof infinity);
console.log('Отрицательная бесконечность:', negativeInfinity, typeof negativeInfinity);
console.log('Не число (NaN):', notANumber, typeof notANumber);

// Проверка на NaN
console.log('isNaN(5):', isNaN(5)); // false
console.log('isNaN("hello"):', isNaN("hello")); // true
console.log('Number.isNaN(NaN):', Number.isNaN(NaN)); // true
console.log('Number.isNaN("hello"):', Number.isNaN("hello")); // false

// ========================================
// 2. STRING - строковый тип
// ========================================
console.log('\n2. STRING:');

const singleQuotes = 'Привет, мир!';
const doubleQuotes = "Привет, мир!";
const templateLiteral = `Привет, ${singleQuotes}`;

console.log('Одинарные кавычки:', singleQuotes, typeof singleQuotes);
console.log('Двойные кавычки:', doubleQuotes, typeof doubleQuotes);
console.log('Шаблонная строка:', templateLiteral, typeof templateLiteral);

// Пустая строка
const emptyString = '';
console.log('Пустая строка:', emptyString, typeof emptyString);

// ========================================
// 3. BOOLEAN - логический тип
// ========================================
console.log('\n3. BOOLEAN:');

const trueValue = true;
const falseValue = false;

console.log('True:', trueValue, typeof trueValue);
console.log('False:', falseValue, typeof falseValue);

// Ложные значения (falsy)
console.log('Boolean(""):', Boolean("")); // false
console.log('Boolean(0):', Boolean(0)); // false
console.log('Boolean(null):', Boolean(null)); // false
console.log('Boolean(undefined):', Boolean(undefined)); // false
console.log('Boolean(NaN):', Boolean(NaN)); // false

// ========================================
// 4. UNDEFINED - неопределенный тип
// ========================================
console.log('\n4. UNDEFINED:');

let undefinedVariable;
console.log('Неинициализированная переменная:', undefinedVariable, typeof undefinedVariable);

// Функция без return
function noReturn() {
    // ничего не возвращает
}
console.log('Функция без return:', noReturn(), typeof noReturn());

// Доступ к несуществующему свойству объекта
const obj = {};
console.log('Несуществующее свойство:', obj.nonExistent, typeof obj.nonExistent);

// Параметр функции без значения
function testUndefined(param) {
    console.log('Параметр без значения:', param, typeof param);
}
testUndefined();

// ========================================
// 5. NULL - нулевой тип
// ========================================
console.log('\n5. NULL:');

const nullValue = null;
console.log('Null значение:', nullValue, typeof nullValue);

// Важно: typeof null возвращает "object" (это баг в JavaScript)
console.log('typeof null:', typeof null);

// Проверка на null
console.log('null === null:', null === null); // true
console.log('null == undefined:', null == undefined); // true
console.log('null === undefined:', null === undefined); // false

// ========================================
// 6. SYMBOL - символьный тип (ES6)
// ========================================
console.log('\n6. SYMBOL:');

const symbol1 = Symbol('description');
const symbol2 = Symbol('description');
const symbol3 = Symbol();

console.log('Symbol с описанием:', symbol1, typeof symbol1);
console.log('Symbol без описания:', symbol3, typeof symbol3);

// Символы уникальны
console.log('symbol1 === symbol2:', symbol1 === symbol2); // false

// Глобальные символы
const globalSymbol = Symbol.for('global');
const sameGlobalSymbol = Symbol.for('global');
console.log('Глобальные символы равны:', globalSymbol === sameGlobalSymbol); // true

// ========================================
// 7. BIGINT - большой целый тип (ES2020)
// ========================================
console.log('\n7. BIGINT:');

const bigInt1 = 1234567890123456789012345678901234567890n;
const bigInt2 = BigInt("1234567890123456789012345678901234567890");

console.log('BigInt литерал:', bigInt1, typeof bigInt1);
console.log('BigInt конструктор:', bigInt2, typeof bigInt2);

// Операции с BigInt
console.log('BigInt + BigInt:', bigInt1 + 1n);
// console.log('BigInt + Number:', bigInt1 + 1); // Ошибка!

// ========================================
// КОГДА ВОЗВРАЩАЕТСЯ UNDEFINED
// ========================================
console.log('\n=== КОГДА ВОЗВРАЩАЕТСЯ UNDEFINED ===');

// 1. Неинициализированные переменные
let uninitialized;
console.log('1. Неинициализированная переменная:', uninitialized);

// 2. Функции без return
function noReturnFunction() {
    console.log('Функция выполняется');
    // нет return
}
console.log('2. Функция без return:', noReturnFunction());

// 3. Return без значения
function returnNothing() {
    return;
}
console.log('3. Return без значения:', returnNothing());

// 4. Доступ к несуществующим свойствам объекта
const testObj = { name: 'John' };
console.log('4. Несуществующее свойство:', testObj.age);

// 5. Доступ к несуществующим элементам массива
const testArray = [1, 2, 3];
console.log('5. Несуществующий элемент массива:', testArray[10]);

// 6. Параметры функции без значений
function testParams(a, b, c) {
    console.log('6. Параметр без значения:', c);
}
testParams(1, 2);

// 7. Результат void оператора
console.log('7. Void оператор:', void 0);

// ========================================
// ПРОВЕРКА ТИПОВ
// ========================================
console.log('\n=== ПРОВЕРКА ТИПОВ ===');

function checkType(value, description) {
    console.log(`${description}:`, value, `(${typeof value})`);
}

checkType(42, 'Number');
checkType('hello', 'String');
checkType(true, 'Boolean');
checkType(undefined, 'Undefined');
checkType(null, 'Null');
checkType(Symbol(), 'Symbol');
checkType(123n, 'BigInt');

// ========================================
// ПРЕОБРАЗОВАНИЕ ТИПОВ
// ========================================
console.log('\n=== ПРЕОБРАЗОВАНИЕ ТИПОВ ===');

// Явное преобразование
console.log('String(123):', String(123), typeof String(123));
console.log('Number("123"):', Number("123"), typeof Number("123"));
console.log('Boolean(1):', Boolean(1), typeof Boolean(1));

// Неявное преобразование
console.log('"5" + 3:', "5" + 3, typeof ("5" + 3)); // "53" (string)
console.log('"5" - 3:', "5" - 3, typeof ("5" - 3)); // 2 (number)
console.log('"5" * 3:', "5" * 3, typeof ("5" * 3)); // 15 (number)

// ========================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// ========================================
console.log('\n=== ПРАКТИЧЕСКИЕ ПРИМЕРЫ ===');

// Пример 1: Проверка существования значения
function safeAccess(obj, property) {
    const value = obj[property];
    if (value === undefined) {
        console.log(`Свойство "${property}" не существует`);
        return null;
    }
    return value;
}

const user = { name: 'Alice', age: 30 };
console.log('Существующее свойство:', safeAccess(user, 'name'));
console.log('Несуществующее свойство:', safeAccess(user, 'email'));

// Пример 2: Значения по умолчанию
function greet(name) {
    const displayName = name || 'Гость';
    console.log(`Привет, ${displayName}!`);
}

greet('Иван');
greet(); // name будет undefined

// Пример 3: Проверка на null/undefined
function processValue(value) {
    if (value === null) {
        console.log('Значение равно null');
    } else if (value === undefined) {
        console.log('Значение равно undefined');
    } else {
        console.log('Значение:', value);
    }
}

processValue(null);
processValue(undefined);
processValue('hello');

console.log('\n=== КОНЕЦ РУКОВОДСТВА ===');
