// Создание генератора
// https://doka-guide.vercel.app/js/generators/

function* getLangs() {
    yield 'java';
    debugger;
    yield 'js';
    yield 'rust';
    // return - блокирует дальнейшее выполнение
}

// Структура генератора
const generator = getLangs()

// Вызов метода генератора
console.log(generator.next()) // { value: 'java', done: false }
console.log(generator.next()) // { value: 'js', done: false }
console.log(generator.next()) // { value: 'rust', done: false }
console.log(generator.next()) // { value: undefined, done: true }

console.log(generator[Symbol.iterator]() === generator) //true
