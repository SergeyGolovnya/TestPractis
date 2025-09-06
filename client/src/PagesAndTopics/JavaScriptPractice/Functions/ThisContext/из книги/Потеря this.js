function first () {
    return console.log(this.a) //(тут особенность this.a - это объект в котором ссылаюсь на ключ "а")
}

const obj = {
    a: 'вывелось внутренняя объектная obj.a',
    b: 'вывелось внутренняя объектная obj.b',
    c: 'вывелось внутренняя объектная obj.c',
    function1: fun1,
}

function fun1 (fn) {
    fn()
}

let a = 'вывелось внешняя a'

obj.function1(() => first.call(obj))

first.call(a) // undefined

//чтобы не было undefined нужно ссылаться на весь передаваемый объект(элемент)

function second () {
    return console.log(this) //теперь любой объект будет преедаваться из вне
}

let b = 'Внешний b'
let c = ['Внешний c',1,2]

second.call(b)
second.call(c)

// чтобы работал способ b.second надо изменить 

Object.prototype.third = function () {
    return console.log(this)
}

let d = 'Внешний d'
let f = ['Внешний f',1,2]

d.third()
f.third()