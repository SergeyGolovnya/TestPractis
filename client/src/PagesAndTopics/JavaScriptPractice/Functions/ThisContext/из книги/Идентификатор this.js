function foo() {
    console.log( this.bar );
}

var bar = "global";

var obj1 = {
    bar: "obj1",
    foo: foo
};

var obj2 = {
    bar: "obj2"
};

// console.log(foo()); // "global" - выдает ошибку в строгом режиме
obj1.foo(); // "obj1"
foo.call( obj2 ); // "obj2"
new foo(); // undefined