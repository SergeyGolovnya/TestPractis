function foo(str, a) {
eval( str ); // изменение!
console.log( a, b );
}
var b = 2;
foo( "var b = 3;", 1 ); // 1, 3