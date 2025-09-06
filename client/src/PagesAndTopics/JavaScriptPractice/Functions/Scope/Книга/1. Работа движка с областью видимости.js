function foo(a) {
    var b = a;
    return a + b;
    }
var c = foo( 2 );


// Задачки на решение

let x = 2;        // LHS: x   | RHS: 2
let y = x + 3;    // LHS: y   | RHS: x, 3
y = y * 2;        // LHS: y   | RHS: y, 2

Итого: LHS = 3, RHS = 4

// Легкая задача
let a = 5;              // LHS: a   | RHS: 5
const b = a + 10;       // LHS: b   | RHS: a, 10
a = b - 3;              // LHS: a   | RHS: b, 3

Итого: LHS = 3, RHS = 5


// Средняя задача
// Не правильно:
function sum(x, y) {     // LHS: x,y   | RHS: -
    let result = x + y;             // LHS: result,x,y    | RHS: -
    return result;                  // LHS: -    | RHS: result
}

let a = 4;                          // LHS: a    | RHS: -
let b = 6;                          // LHS: b    | RHS: -
let c = sum(a, b);                  // LHS: c,a,b    | RHS: sum()

Итого: LHS = 10, RHS = 2

//Правильно:

function sum(x, y) {     // LHS: sum | RHS: -
    let result = x + y;             // LHS: result | RHS: x, y
    return result;                  // LHS: - | RHS: result
}

let a = 4;                          // LHS: a | RHS: 4
let b = 6;                          // LHS: b | RHS: 6
let c = sum(a, b);                  // LHS: c | RHS: sum, a, b

Итого: LHS = 5, RHS = 8