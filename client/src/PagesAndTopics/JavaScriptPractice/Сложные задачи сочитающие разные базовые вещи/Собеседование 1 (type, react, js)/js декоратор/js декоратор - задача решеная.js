
// Убираем конфликт имен - переименовываем переменную
const onceValue = 11

// Реализуем правильную функцию once
function once (fn) {
    let called = false
    let result
    
    return function (...args) {
        if (!called) {
            called = true
            result = fn.apply(this, args)
            return result
        }
        return result
    }
}

// Создаем функции с применением once
const onceLol = once(() => console.log("Lol"))
const onceKek = once(() => console.log("Kek"))

// Тестируем правильную последовательность вызовов
onceLol(); // Lol (первый вызов)
onceLol(); // пусто (второй вызов)

onceKek(); // Kek (первый вызов)
onceKek(); // Kek (первый вызов)