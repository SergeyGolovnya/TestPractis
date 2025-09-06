function makeAdder (x) {
    function add (y) {
        return y + x
    }
    return add
}

const ten = makeAdder(10)

console.log(ten(2)) // 12
console.log(ten(4)) // 14
console.log(ten(6)) // 16
console.log(ten(8)) // 18
console.log(ten(9)) // 19 

const ten2 = makeAdder(2) // внешняя
console.log(ten2(2)) // 4 // внутренняя
console.log(ten2(4)) // 6

console.log(ten(21.32)) // продолдлажет работать с ten