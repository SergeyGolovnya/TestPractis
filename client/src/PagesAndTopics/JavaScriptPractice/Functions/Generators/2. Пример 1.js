// пока не вызовем через метод то функция не отрабатывает
function imaginaryHeavyComputation() {
    let result = 0
    for (let i = 0; i < 100; i++) {
    result += i
    }

    return result
}

function* getLangs() {
    const result1 = imaginaryHeavyComputation()
    console.log('result of heavy compuation #1:', result1)
    yield 'java';

    const result2 = imaginaryHeavyComputation()
    console.log('result of heavy compuation #2:', result1 + result2)
    yield 'js';

    console.log("easy compuation:", 2 + 2)
    yield 'rust';
}

const generator = getLangs() // Никаких логов и вызовов функций не произошло
// Но если вызвать next() то выполнится 1-й консоль а потом следующие
generator.next() // result of heavy compuation #1: 4950
generator.next() // result of heavy compuation #2: 9900
generator.next() // easy compuation: 4