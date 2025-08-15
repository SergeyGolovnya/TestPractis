/**
 * THIS В МЕТОДАХ МАССИВОВ
 * 
 * Особенности работы this в forEach, map, filter и других методах массивов
 */

// ===== ПРИМЕР 1: forEach с this =====

const shop = {
    name: 'ЭлектроникаМаркет',
    discount: 0.15,
    products: [
        { name: 'iPhone', price: 120000 },
        { name: 'MacBook', price: 250000 },
        { name: 'AirPods', price: 35000 }
    ],

    // ❌ НЕПРАВИЛЬНО: обычная функция - this будет undefined
    calculateTotalWrong() {
        let total = 0;
        this.products.forEach(function(product) {
            total += product.price * this.discount; // this.discount = undefined!
        });
        return total;
    },

    // ✅ ПРАВИЛЬНО: стрелочная функция - this сохраняется
    calculateTotalArrow() {
        let total = 0;
        this.products.forEach(product => {
            total += product.price * this.discount; // this работает!
        });
        return total;
    },

    // ✅ ПРАВИЛЬНО: обычная функция + передача this
    calculateTotalWithContext() {
        let total = 0;
        this.products.forEach(function(product) {
            total += product.price * this.discount; // this работает!
        }, this); // ← передаем this как второй параметр
        return total;
    },

    // ✅ ПРАВИЛЬНО: привязка контекста через bind
    calculateTotalWithBind() {
        let total = 0;
        this.products.forEach(function(product) {
            total += product.price * this.discount;
        }.bind(this)); // ← привязываем this
        return total;
    }
};

// ===== ПРИМЕР 2: map с this =====

const calculator = {
    multiplier: 2,
    numbers: [1, 2, 3, 4, 5],

    // ❌ НЕПРАВИЛЬНО
    multiplyWrong() {
        return this.numbers.map(function(num) {
            return num * this.multiplier; // this.multiplier = undefined!
        });
    },

    // ✅ ПРАВИЛЬНО: стрелочная функция
    multiplyArrow() {
        return this.numbers.map(num => num * this.multiplier);
    },

    // ✅ ПРАВИЛЬНО: передача контекста
    multiplyWithContext() {
        return this.numbers.map(function(num) {
            return num * this.multiplier;
        }, this);
    }
};

// ===== ПРИМЕР 3: filter с this =====

const inventory = {
    minPrice: 50000,
    products: [
        { name: 'Phone', price: 120000 },
        { name: 'Laptop', price: 250000 },
        { name: 'Mouse', price: 5000 },
        { name: 'Monitor', price: 45000 }
    ],

    // ✅ Фильтрация по цене с использованием this
    getExpensiveProducts() {
        return this.products.filter(product => product.price >= this.minPrice);
    },

    // Альтернатива с передачей контекста
    getExpensiveProductsWithContext() {
        return this.products.filter(function(product) {
            return product.price >= this.minPrice;
        }, this);
    }
};

// ===== ПРИМЕР 4: reduce с this =====

const orderManager = {
    taxRate: 0.20,
    items: [
        { name: 'Product 1', price: 1000 },
        { name: 'Product 2', price: 2000 },
        { name: 'Product 3', price: 1500 }
    ],

    // ✅ Подсчет общей стоимости с налогом
    calculateTotalWithTax() {
        return this.items.reduce((total, item) => {
            return total + (item.price * (1 + this.taxRate));
        }, 0);
    }
};

// ===== ПРИМЕР 5: Комбинированные методы =====

const dataProcessor = {
    currency: 'USD',
    exchangeRate: 1.1,
    products: [
        { name: 'Item 1', price: 100, category: 'A' },
        { name: 'Item 2', price: 200, category: 'B' },
        { name: 'Item 3', price: 150, category: 'A' },
        { name: 'Item 4', price: 300, category: 'C' }
    ],

    // ✅ Сложная обработка с использованием this
    processData() {
        return this.products
            .filter(product => product.category === 'A') // фильтруем
            .map(product => ({
                ...product,
                priceUSD: product.price * this.exchangeRate,
                currency: this.currency
            })) // преобразуем
            .reduce((total, product) => total + product.priceUSD, 0); // суммируем
    }
};

// ===== ТЕСТИРОВАНИЕ =====

console.log('=== ТЕСТИРОВАНИЕ THIS В МЕТОДАХ МАССИВОВ ===');

// Тест 1: forEach
console.log('\n1. forEach тесты:');
console.log('Неправильный способ:', shop.calculateTotalWrong()); // NaN
console.log('Стрелочная функция:', shop.calculateTotalArrow()); // 60975
console.log('С передачей контекста:', shop.calculateTotalWithContext()); // 60975

// Тест 2: map
console.log('\n2. map тесты:');
console.log('Неправильный способ:', calculator.multiplyWrong()); // [NaN, NaN, NaN, NaN, NaN]
console.log('Стрелочная функция:', calculator.multiplyArrow()); // [2, 4, 6, 8, 10]

// Тест 3: filter
console.log('\n3. filter тесты:');
console.log('Дорогие товары:', inventory.getExpensiveProducts());

// Тест 4: reduce
console.log('\n4. reduce тесты:');
console.log('Общая стоимость с налогом:', orderManager.calculateTotalWithTax());

// Тест 5: комбинированные методы
console.log('\n5. Комбинированные методы:');
console.log('Обработанные данные:', dataProcessor.processData());

// ===== ВЫВОДЫ =====

/*
ВЫВОДЫ ПО РАБОТЕ THIS В МЕТОДАХ МАССИВОВ:

1. СТРЕЛОЧНЫЕ ФУНКЦИИ (рекомендуется):
   - Сохраняют this из внешней области
   - Более читаемый код
   - Меньше ошибок

2. ПЕРЕДАЧА КОНТЕКСТА (второй параметр):
   - Работает с обычными функциями
   - Явно показывает зависимость от this
   - Подходит для legacy кода

3. BIND (альтернатива):
   - Привязывает контекст к функции
   - Может быть менее читаемым
   - Полезно для переиспользования функций

4. ИЗБЕГАТЬ:
   - Обычные функции без передачи контекста
   - Использование this внутри обычных функций в методах массивов
*/ 