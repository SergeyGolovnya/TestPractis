var foo = {
    a: 42,
    c: 'Ватрушка'
};

// создаем `bar` и связываем его с `foo`

var bar = Object.create(foo);

bar.b = "hello world";
bar.b; // "hello world"
bar.a; // 42 <-- делегируется в `foo`

console.log(bar.a)
console.log(bar.b)
console.log(bar.c)
