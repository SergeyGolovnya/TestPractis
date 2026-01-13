const model = {
    hair: 'black',
    clothes: {
        shirt: {
            color: 'white',
            size: 'M'
        },
    }
}

const copyObj = JSON.parse(JSON.stringify(model)); // костыль
const copyObj2 = structuredClone(model); // встроенная функция

(function () {
    const comparisonMC1 = model === copyObj
    const comparisonMC2 = model === copyObj2
    console.log('Сравнение model & copyObj: ', comparisonMC1)
    console.log('Сравнение model & copyObj2: ', comparisonMC2)
})();

copyObj.clothes.shirt.color = 'black'; // не должен изменить model
copyObj.hair = 'orange'; // не должен изменить model
copyObj2.clothes.shirt.color = 'pink'; // не должен изменить model
copyObj2.hair = 'pink'; // не должен изменить model

console.log ('model: ', model)
console.log ('copyObj: ', copyObj)
console.log ('copyObj2: ', copyObj2)


// Объект для демонстрации ограничений копирования
const model2 = {
    primitive: 'black',
    nullValue: null,
    nanValue: NaN,
    infinityValue: Infinity,
    obj: {
        obj_inside: { color: 'white', size: 'M'},
        array: [1, 2, 3],
        boolean: true,
        undefined: undefined,
        symbol: Symbol('test'),
        date: new Date(),
        map: new Map([['color', 'white'], ['size', 'M']]),
        set: new Set(['white', 'M']),
        regexp: /test/gi,
        bigint: 123n,
        error: new Error('test error'),
        arrayBuffer: new ArrayBuffer(8),
        typedArray: new Uint8Array([1, 2, 3, 4]),
        int16Array: new Int16Array([100, 200, 300]),
        float32Array: new Float32Array([1.1, 2.2, 3.3]),
        dataView: new DataView(new ArrayBuffer(16)),
        promise: Promise.resolve('test'),
        weakMap: new WeakMap(),
        weakSet: new WeakSet(),
        proxy: new Proxy({}, {
            get(target, prop) {
                return `proxy_${prop}`;
            }
        }),
        fun() {
            console.log('fun')
        },
        arrowFun: () => console.log('arrow'),
        *generatorFun() {
            yield 1;
            yield 2;
            yield 3;
        },
        domElement: typeof document !== 'undefined' ? document.createElement('div') : null,
    }
}

const copyModel2_1 = JSON.parse(JSON.stringify(model2));
const copyModel2_2 = structuredClone(model2);

console.log('copyModel2_1: ', copyModel2_1)
console.log('copyModel2_2: ', copyModel2_2)


