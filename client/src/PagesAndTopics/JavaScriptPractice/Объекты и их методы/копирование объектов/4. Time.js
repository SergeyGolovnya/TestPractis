var obj = {
    size: 'M',
    color: 'white',
    clothes: 'shirt',
};
var obj2 = {
    obj: obj,
    time: new Date(),
    getTime() {
        return this.time.getTime()
    },
    name: 'Сергей',
    age: 36,
    skills: ['Бэкенд','Фронтенд', 'Деплой']
};

var proto = Object.getPrototypeOf(obj2);
var clone = Object.create(proto);

for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
        clone[key] = obj2[key];
    }
}

clone.obj = obj


console.log(clone)