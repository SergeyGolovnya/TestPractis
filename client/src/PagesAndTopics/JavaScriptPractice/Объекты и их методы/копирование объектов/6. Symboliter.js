/* const arr = [1,2,3]

let iter = arr[Symbol.iterator]();

console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next()) */

// С объектом

let myObject = {
    a: 2,
    b: 3
};

Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys( o );

        return {
            next: function() {
                return {
                        value: o[ks[idx++]],
                        done: (idx > ks.length)
                    };
            }
        };
    }
});

let iter2 = myObject[Symbol.iterator]();

console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())

for (let key of myObject) {
    console.log(key)
}