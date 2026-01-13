const objWithFun = {
    insideFun() {
        console.log('insideFun')
    }
}

const objWithFun2 = Object.create(objWithFun, {
    sdasd: {
        value: function sdasd() {
            console.log('sdasd')
        },
        writable: true,
        enumerable: true,
        configurable: true
    }
});

objWithFun2.sdasd();