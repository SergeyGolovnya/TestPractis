// OLOO концепция програмирования - это когда вместо классов используются объекты

// Как выглядит класс
class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

// Нужно создать экземпляр класса и передавать параметры в конструктор
const personClass = new PersonClass('John', 30);
const personClass2 = new PersonClass('Jane', 25);
const personClass3 = new PersonClass('Jim', 35);
const personClass4 = new PersonClass('Jill', 28);
personClass.sayHello();


// Не нужно создавать экземпляр класса и передавать параметры в конструктор, просто создаем объект
const personOLOO = {
    name: 'John',
    age: 30,
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
personOLOO.sayHello();

// ===== СПОСОБЫ СОЗДАНИЯ МНОЖЕСТВА ЭКЗЕМПЛЯРОВ ЧЕРЕЗ OLOO =====

// 1. ФАБРИЧНАЯ ФУНКЦИЯ - самый простой и элегантный способ
function createPerson(name, age) {
    return {
        name,
        age,
        sayHello() {
            console.log(`Hello, my name is ${this.name}`);
        }
    };
}

// Создаем множество экземпляров так же просто, как с классами
const person1 = createPerson('John', 30);
const person2 = createPerson('Jane', 25);
const person3 = createPerson('Jim', 35);
const person4 = createPerson('Jill', 28);

person1.sayHello(); // Hello, my name is John
person2.sayHello(); // Hello, my name is Jane

// 2. OBJECT.CREATE() С ФАБРИЧНОЙ ФУНКЦИЕЙ - более "чистый" OLOO подход
const PersonPrototype = {
    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

function createPersonOLOO(name, age) {
    const person = Object.create(PersonPrototype);
    person.name = name;
    person.age = age;
    return person;
}

const personOLOO1 = createPersonOLOO('Alice', 32);
const personOLOO2 = createPersonOLOO('Bob', 27);
personOLOO1.sayHello(); // Hello, my name is Alice

// 3. OBJECT.ASSIGN() С ПРОТОТИПОМ - альтернативный подход
function createPersonAssign(name, age) {
    return Object.assign(Object.create(PersonPrototype), {
        name,
        age
    });
}

const personAssign1 = createPersonAssign('Charlie', 40);
const personAssign2 = createPersonAssign('Diana', 33);
personAssign1.sayHello(); // Hello, my name is Charlie

// 4. МАССОВОЕ СОЗДАНИЕ ЧЕРЕЗ МАППИНГ
const peopleData = [
    { name: 'Eve', age: 29 },
    { name: 'Frank', age: 45 },
    { name: 'Grace', age: 31 },
    { name: 'Henry', age: 38 }
];

const people = peopleData.map(data => createPerson(data.name, data.age));
people.forEach(person => person.sayHello());

// ===== ПРЕИМУЩЕСТВА OLOO ПОДХОДА =====
console.log('\n=== ПРЕИМУЩЕСТВА OLOO ===');
console.log('1. Нет проблем с this (не привязан к контексту)');
console.log('2. Более гибкое наследование через делегирование');
console.log('3. Нет "фабрики классов" - просто функции');
console.log('4. Более предсказуемое поведение прототипов');
console.log('5. Легче отлаживать и понимать');

// ===== СРАВНЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ =====
console.log('\n=== СРАВНЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ ===');

// Класс
console.time('Class creation');
for (let i = 0; i < 10000; i++) {
    new PersonClass(`Person${i}`, i);
}
console.timeEnd('Class creation');

// OLOO фабричная функция
console.time('OLOO factory creation');
for (let i = 0; i < 10000; i++) {
    createPerson(`Person${i}`, i);
}
console.timeEnd('OLOO factory creation');

// OLOO Object.create
console.time('OLOO Object.create creation');
for (let i = 0; i < 10000; i++) {
    createPersonOLOO(`Person${i}`, i);
}
console.timeEnd('OLOO Object.create creation');
