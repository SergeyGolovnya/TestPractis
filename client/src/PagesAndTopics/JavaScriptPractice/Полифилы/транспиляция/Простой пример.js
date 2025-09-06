// Полифил - позволяет новый синтаксис использовать в старых движках браузеров
// транспиляция - позволяет новый синтаксис адаптировать под старый

/* 
Babel (https://babeljs.io) - Транспилирует из ES6+ в ES5
*/

// Полифил
if (!Number.isNaN) {
    Number.isNaN = function isNaN(x) {
    return x !== x;
    };
}

// Транспиляция

//Новый
function foo(a = 2) {
console.log( a );
}

foo(); // 2
foo( 42 ); // 42

// переделанный
function foo2() {
var a = arguments[0] !== (void 0) ? arguments[0] : 2;
console.log( a );
}

foo2(); // 2
foo2( 42 ); // 42