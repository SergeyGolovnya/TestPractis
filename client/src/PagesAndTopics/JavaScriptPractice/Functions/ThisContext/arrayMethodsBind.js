// Примеры работы this и bind в JavaScript

// 1. Правило работы this - один уровень вложенности
const shop = {
    name: 'Магазин',
    discount: 0.1,
    
    // this.name и this.discount работают
    calculatePrice() {
        return this.name + ' ' + this.discount;
    }
};

console.log(shop.calculatePrice()); // "Магазин 0.1"

// 2. Проблема с вложенными объектами
const shopWithNested = {
    name: 'Магазин',
    discount: 0.1,
    
    method: {
        // this.name и this.discount НЕ работают!
        // this ссылается на объект method, а не shopWithNested
        calculatePrice() {
            return this.name + ' ' + this.discount; // undefined undefined
        }
    }
};

console.log(shopWithNested.method.calculatePrice()); // "undefined undefined"

// 3. Варианты решения для вложенных объектов

// Вариант 1: Прямые ссылки
const shopWithDirectRefs = {
    name: 'ЭлектроникаМаркет',
    discount: 0.15,
    products: [
        { name: 'Телефон', price: 1000 },
        { name: 'Ноутбук', price: 2000 }
    ],
    
    method: {
        calculateTotalPrice: function() {
            let totalPrice = 0;
            shopWithDirectRefs.products.forEach(obj => {
                totalPrice += obj.price * shopWithDirectRefs.discount;
            });
            return totalPrice;
        }
    }
};

console.log(shopWithDirectRefs.method.calculateTotalPrice()); // 450

// Вариант 2: Стрелочные функции
const shopWithArrow = {
    name: 'ЭлектроникаМаркет',
    discount: 0.15,
    products: [
        { name: 'Телефон', price: 1000 },
        { name: 'Ноутбук', price: 2000 }
    ],
    
    method: {
        calculateTotalPrice: () => {
            let totalPrice = 0;
            shopWithArrow.products.forEach(obj => {
                totalPrice += obj.price * shopWithArrow.discount;
            });
            return totalPrice;
        }
    }
};

console.log(shopWithArrow.method.calculateTotalPrice()); // 450

// Вариант 3: Перемещение на верхний уровень
const shopClean = {
    name: 'ЭлектроникаМаркет',
    discount: 0.15,
    products: [
        { name: 'Телефон', price: 1000 },
        { name: 'Ноутбук', price: 2000 }
    ],
    
    // Здесь this работает
    calculateTotalPrice() {
        let totalPrice = 0;
        this.products.forEach(obj => {
            totalPrice += obj.price * this.discount;
        });
        return totalPrice;
    }
};

console.log(shopClean.calculateTotalPrice()); // 450

// 4. Проблема с bind при создании объекта
// ❌ НЕ работает - проблема с hoisting
/*
const shopWithBind = {
    name: 'Магазин',
    method: {
        calculatePrice: function() {
            return this.name;
        }.bind(shopWithBind) // ОШИБКА! shopWithBind еще не создан
    }
};
*/

// 5. Когда bind работает

// ✅ Работает - после создания объекта
const shopAfterBind = {
    name: 'Магазин',
    method: {
        calculatePrice: function() {
            return this.name;
        }
    }
};

// Привязываем контекст ПОСЛЕ создания объекта
shopAfterBind.method.calculatePrice = shopAfterBind.method.calculatePrice.bind(shopAfterBind);
console.log(shopAfterBind.method.calculatePrice()); // "Магазин"

// ✅ Работает - в конструкторе
class Shop {
    constructor() {
        this.name = 'Магазин';
        this.method = {
            calculatePrice: function() {
                return this.name;
            }.bind(this) // this ссылается на экземпляр класса
        };
    }
}

const shopClass = new Shop();
console.log(shopClass.method.calculatePrice()); // "Магазин"

// ✅ Работает - с отдельной функцией
function createShop() {
    const shop = {
        name: 'Магазин',
        discount: 0.1
    };
    
    shop.method = {
        calculatePrice: function() {
            return this.name;
        }.bind(shop) // shop уже создан
    };
    
    return shop;
}

const shopFromFunction = createShop();
console.log(shopFromFunction.method.calculatePrice()); // "Магазин"

// 6. Практический пример с методами массивов
const dataProcessor = {
    data: [1, 2, 3, 4, 5],
    multiplier: 2,
    
    // Проблема с this в callback функциях
    processWithMap() {
        return this.data.map(function(item) {
            return item * this.multiplier; // this.multiplier = undefined
        });
    },
    
    // Решение 1: Стрелочная функция
    processWithArrow() {
        return this.data.map(item => {
            return item * this.multiplier; // this.multiplier работает
        });
    },
    
    // Решение 2: bind
    processWithBind() {
        return this.data.map(function(item) {
            return item * this.multiplier;
        }.bind(this));
    },
    
    // Решение 3: Сохранение this в переменную
    processWithSelf() {
        const self = this;
        return this.data.map(function(item) {
            return item * self.multiplier;
        });
    }
};

console.log(dataProcessor.processWithMap()); // [NaN, NaN, NaN, NaN, NaN]
console.log(dataProcessor.processWithArrow()); // [2, 4, 6, 8, 10]
console.log(dataProcessor.processWithBind()); // [2, 4, 6, 8, 10]
console.log(dataProcessor.processWithSelf()); // [2, 4, 6, 8, 10]

// 7. Пример с setTimeout
const timer = {
    message: 'Привет!',
    
    // Проблема
    showMessageWrong() {
        setTimeout(function() {
            console.log(this.message); // undefined
        }, 1000);
    },
    
    // Решение 1: Стрелочная функция
    showMessageArrow() {
        setTimeout(() => {
            console.log(this.message); // "Привет!"
        }, 1000);
    },
    
    // Решение 2: bind
    showMessageBind() {
        setTimeout(function() {
            console.log(this.message);
        }.bind(this), 1000);
    },
    
    // Решение 3: Сохранение this
    showMessageSelf() {
        const self = this;
        setTimeout(function() {
            console.log(self.message);
        }, 1000);
    }
};

// timer.showMessageWrong(); // undefined
// timer.showMessageArrow(); // "Привет!"
// timer.showMessageBind(); // "Привет!"
// timer.showMessageSelf(); // "Привет!"

export { shop, shopWithNested, shopWithDirectRefs, shopWithArrow, shopClean, dataProcessor, timer };