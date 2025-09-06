// Значения Falsy и Truthy

function checkFalsy(value) {
    if(!value) {
        return `Falsy`
    }
    return `Truthy`
}

// Типы данных и значения которые возвращают false
console.log(checkFalsy(false)) // false - false
console.log(checkFalsy(0)) // 0 - false
console.log(checkFalsy('')) // '' - false
console.log(checkFalsy(null)) // null - false
console.log(checkFalsy(undefined)) // undefined - false
console.log(checkFalsy(NaN)) // NaN - false
console.log(checkFalsy(0n)) // 0n - false

// Типы данных и значения которые возвращают Truthy
console.log(checkFalsy(true)) // болеан - true
console.log(checkFalsy(-1)) // число - true
console.log(checkFalsy('hello')) // строка - true
console.log(checkFalsy({a: 1})) // объект - true
console.log(checkFalsy([1, 2, 3])) // массив - true
console.log(checkFalsy(function() {})) // функция - true
console.log(checkFalsy(Symbol('test'))) // символ - true
console.log(checkFalsy(BigInt(1))) // bigint - true
console.log(checkFalsy(new Date())) // дата - true
console.log(checkFalsy(new Error())) // ошибка - true
console.log(checkFalsy(new Promise(() => {}))) // promise - true
console.log(checkFalsy(new Set([1, 2, 3]))) // set - true
console.log(checkFalsy(new Map([['a', 1]]))) // map - true
console.log(checkFalsy(new WeakMap([[{}, 1]]))) // weakmap - true
console.log(checkFalsy(new WeakSet([{a: 1}]))) // weakset - true
console.log(checkFalsy(Infinity)) // Infinity - false
console.log(checkFalsy(-Infinity)) // -Infinity - false