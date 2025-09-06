console.log ('Старт')

setTimeout(()=>{console.log('таймаут 1')},100)

const promise1 = new Promise((resolve, reject) => console.log('Промис 1'))

promise1.then((res) => console.log(res))

console.log ('Конец')