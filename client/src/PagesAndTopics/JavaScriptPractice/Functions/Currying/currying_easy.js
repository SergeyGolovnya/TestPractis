// =====================
// Карирование (Currying)
// =====================
/**
 * Карирование — это техника функционального программирования, при которой функция с несколькими аргументами преобразуется в последовательность функций с одним аргументом.
 * Это позволяет частично применять функцию, передавая аргументы по одному.
 *
 * Синтаксис (пример):
 * function sum(a) {
 *   return function(b) {
 *     return a + b;
 *   }
 * }
 *
 * const add5 = sum(5);
 * console.log(add5(3)); // 8
 *
 * Карирование полезно для создания более универсальных и переиспользуемых функций.
 *
 * Пример с использованием массива:
 * const multiply = a => b => a * b;
 * const double = multiply(2);
 * console.log(double(4)); // 8
 *
 * В методах массивов карирование часто используется для создания предикатов:
 * const isFromDepartment = department => employee => employee.department === department;
 * const itEmployee = employees.find(isFromDepartment('IT'));
 *
 * Важно: если функция-предикат принимает больше одного аргумента (например, element, index, array), карирование может работать не так, как ожидается, если не учесть все параметры.
 */


// Простой пример карирования с тремя аргументами (сумма)
function curry(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

const functionCurry1 = curry(3)
console.log(functionCurry1(4)(5))

// Карирование строчное
const multiply = a => b => c => a * b * c;
console.log(multiply(2)(3)(4)); // 24


// 2. Карирование для строк

function greet(greeting) {
    return function(name) {
        return function(punctuation) {
            return `${greeting}, ${name}${punctuation}`;
        };
    };
}

console.log(greet('Привет')('Сергей')('!')); // Привет, Сергей!


// Личная практика

function some (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a+b+c+d
            }
        }
    }
}

const start = some(100)
console.log(start(10)(10)(10))