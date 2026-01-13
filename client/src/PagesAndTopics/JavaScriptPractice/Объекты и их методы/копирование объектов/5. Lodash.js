import _ from 'lodash'

const obj = {
    size: 'M',
    color: 'white',
    clothes: 'shirt',
    obj: {
        size: 32,
        color: {
            date: new Date(),
            getTime() {
                return this.time.getTime()
            },
            color: 'black',
            clothes: 'shirt',
        },
        clothes: 'shirt',
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
        // proxy: new Proxy({}, {
        //     get(target, prop) {
        //         return `proxy_${prop}`;
        //     }
        // }),
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

const obj2 = _.cloneDeep(obj)

console.log(obj2)