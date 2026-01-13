// базовый объект
const objWithFun = {
    // метод 1
    insideFun() {
        console.log('insideFun')
    },
    // метод 2
    anotherMethod() {
        console.log('anotherMethod из базового объекта')
    }
}

///////// вариант 1: Создание нового объекта с наследованием через Object.create()
const objWithFun2 = Object.create(objWithFun);
// Добавляем компактный метод после создания
objWithFun2.sdasd = function sdasd() {
    console.log('sdasd - именованное функциональное выражение')
};


///////// вариант 2: Создание объекта с компактными методами через литерал
const objWithFun3 = {
    __proto__: objWithFun,  // наследование
    
    // Компактный метод (анонимное функциональное выражение)
    sdasd() {
        console.log('sdasd - компактный метод')
    },
    
    // Еще один компактный метод
    newMethod() {
        console.log('newMethod - компактный метод')
    },
    
    // Переопределение метода из родительского объекта
    insideFun() {
        console.log('insideFun переопределен в дочернем объекте')
        // Вызов родительского метода
        super.insideFun();
    }
};

///////// вариант 3: Создание через Object.assign() с Object.create()
const objWithFun4 = Object.assign(
    Object.create(objWithFun), 
    {
        sdasd() {
            console.log('sdasd через Object.assign')
        },
        
        anotherNewMethod() {
            console.log('anotherNewMethod через Object.assign')
        }
    }
);

///////// Тестирование
console.log('=== Тестирование objWithFun2 ===');
objWithFun2.insideFun();  // наследуется
objWithFun2.anotherMethod(); // наследуется
objWithFun2.sdasd(); // собственный метод

console.log('\n=== Тестирование objWithFun3 ===');
objWithFun3.insideFun();  // переопределен
objWithFun3.anotherMethod(); // наследуется
objWithFun3.sdasd(); // компактный метод
objWithFun3.newMethod(); // компактный метод

console.log('\n=== Тестирование objWithFun4 ===');
objWithFun4.insideFun();  // наследуется
objWithFun4.anotherMethod(); // наследуется
objWithFun4.sdasd(); // компактный метод
objWithFun4.anotherNewMethod(); // компактный метод

// Проверка цепочки прототипов
console.log('\n=== Проверка цепочки прототипов ===');
console.log('objWithFun2.__proto__ === objWithFun:', objWithFun2.__proto__ === objWithFun);
console.log('objWithFun3.__proto__ === objWithFun:', objWithFun3.__proto__ === objWithFun);
console.log('objWithFun4.__proto__ === objWithFun:', objWithFun4.__proto__ === objWithFun);
