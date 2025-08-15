// =====================
// Универсальный каррировщик (curryUniversal)
// =====================
/**
 * Универсальная функция для каррирования.
 * Позволяет вызывать функцию с любым количеством аргументов за раз,
 * пока не будут переданы все необходимые аргументы.
 *
 * Пример использования:
 *   const curriedSum = curryUniversal(sum);
 *   curriedSum(1)(2)(3) // 6
 *   curriedSum(1,2)(3)  // 6
 *   curriedSum(1)(2,3)  // 6
 *   curriedSum(1,2,3)   // 6
 */

// Функция обертка для каррирования
function curryUniversal(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            }
        }
    }
}

// Обычная функция с тремя аргументами (сумма)
function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curryUniversal(sum);

// Примеры вызова с разным количеством аргументов:
console.log(curriedSum(3)(4)(5));     // 12 (по одному аргументу)
console.log(curriedSum(3, 4)(5));     // 12 (два, потом один)
console.log(curriedSum(3)(4, 5));     // 12 (один, потом два)
console.log(curriedSum(3, 4, 5));     // 12 (все сразу)