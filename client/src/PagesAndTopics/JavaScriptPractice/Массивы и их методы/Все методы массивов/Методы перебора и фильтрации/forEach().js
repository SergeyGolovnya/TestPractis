/**
 * Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве.
 * 
 * Синтаксис:
 * array.forEach(callback[, thisArg])
 * 
 * Параметры:
 * callback - функция, выполняемая для каждого элемента массива
 * thisArg - необязательное значение, используемое как this при выполнении callback
 * 
 * callback принимает 3 аргумента:
 * 1. currentValue - текущий обрабатываемый элемент
 * 2. index - индекс текущего элемента
 * 3. array - исходный массив
 */

// // Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве 

// // Пример 1: Базовое использование forEach
// const numbers = [1, 2, 3, 4, 5];
// numbers.forEach((number) => {
//     console.log(number); // Выведет: 1, 2, 3, 4, 5
// });

// // Пример 2: forEach с индексом и массивом
// const fruits = ['яблоко', 'банан', 'апельсин'];
// fruits.forEach((fruit, index, array) => {
//     console.log(`Элемент ${fruit} находится на позиции ${index} в массиве ${array}`);
// });

// // Пример 3: Использование this в forEach
// const person = {
//     name: 'Иван',
//     friends: ['Петр', 'Мария', 'Анна'],
//     showFriends() {
//         this.friends.forEach(function(friend) {
//             console.log(`${this.name} дружит с ${friend}`);
//         }, this); // Передаем this как второй аргумент
//     }
// };
// person.showFriends();

// // Пример 4: Модификация элементов массива
// const prices = [100, 200, 300];
// prices.forEach((price, index, array) => {
//     array[index] = price * 1.1; // Увеличиваем цены на 10%
// });
// console.log(prices); // [110, 220, 330]

// // Пример 5: Использование стрелочной функции
// const words = ['привет', 'мир', 'javascript'];
// words.forEach(word => console.log(word.toUpperCase())); // ПРИВЕТ, МИР, JAVASCRIPT 

/*
Задача:
У вас есть массив объектов с информацией о товарах:
[
    { name: 'Телефон', price: 50000, inStock: true },
    { name: 'Ноутбук', price: 120000, inStock: false },
    { name: 'Планшет', price: 30000, inStock: true },
    { name: 'Наушники', price: 15000, inStock: true },
    { name: 'Монитор', price: 45000, inStock: false }
]

1. Используя forEach, выведите в консоль:
   - Название и цену каждого товара
   - Только товары, которые есть в наличии (inStock: true)
   - Общую стоимость всех товаров
2. Создайте новый массив, содержащий только названия товаров
3. Создайте новый массив, содержащий цены товаров со скидкой 10%
*/

// Ваше решение: 

// const products = [
//     { name: 'Телефон', price: 50000, inStock: true },
//     { name: 'Ноутбук', price: 120000, inStock: false },
//     { name: 'Планшет', price: 30000, inStock: true },
//     { name: 'Наушники', price: 15000, inStock: true },
//     { name: 'Монитор', price: 45000, inStock: false }
// ]

// products.forEach(obj => console.log(`${obj.name} ${obj.price}`));
// products.forEach(obj => obj.inStock && console.log(`В наличии: ${obj.name}`)); // Варивант 1
// products.forEach(obj => obj.inStock ? console.log(`В наличии: ${obj.name}`) : null); // Вариант 2
// products.forEach(obj => {
//     if(obj.inStock) {
//         console.log(`В наличии: ${obj.name}`)
//     }
// }); // Вариант 3
// let countPrice = 0; // Создаем переменную в которую будем вкладывать значение цен
// products.forEach(obj => countPrice += obj.price) // не мутирует
// console.log(countPrice)

// const onlyNameProducts = []; // новый массив, содержащий только названия товаров
// products.forEach(obj => onlyNameProducts.push(obj.name))
// console.log(onlyNameProducts)

// // новый массив, содержащий цены товаров со скидкой 10%
// const descount = [];
// products.forEach(obj => {descount.push(obj.price - (obj.price * 0.1));})
// console.log(descount)

// // новый массив, содержащий цены товаров со скидкой 10%
// const descount2 = [];
// products.forEach(obj => {
//     descount2.push([obj.name, obj.price * 0.9])
// })
// console.log(descount2)

// ПРИМЕРЫ ДЛЯ ПОНИМАНИЯ РАБОТЫ THIS В FOREACH:
/* 
const exampleObject = {
    name: 'Тестовый объект',
    value: 42,
    items: [1, 2, 3, 4, 5],
    
    // Метод 1: Стрелочная функция - this работает
    methodWithArrow() {
        console.log('=== Стрелочная функция ===');
        this.items.forEach(item => {
            console.log(`${this.name}: ${item} (value: ${this.value})`);
        });
    },
    
    // Метод 2: Обычная функция - this НЕ работает
    methodWithFunction() {
        console.log('=== Обычная функция ===');
        this.items.forEach(function(item) {
            console.log(`${this.name}: ${item} (value: ${this.value})`);
            // this.name и this.value будут undefined!
        });
    },
    
    // Метод 3: Обычная функция + передача this
    methodWithFunctionAndContext() {
        console.log('=== Обычная функция + контекст ===');
        this.items.forEach(function(item) {
            console.log(`${this.name}: ${item} (value: ${this.value})`);
        }, this); // ← передаем this как второй параметр
    }
};
 */
// Запустите эти методы, чтобы увидеть разницу:
// exampleObject.methodWithArrow();
// exampleObject.methodWithFunction();
// exampleObject.methodWithFunctionAndContext();


const products = [
        { name: 'Телефон', price: 50000, inStock: true },
        { name: 'Ноутбук', price: 120000, inStock: false },
        { name: 'Планшет', price: 30000, inStock: true },
        { name: 'Наушники', price: 15000, inStock: true },
        { name: 'Монитор', price: 45000, inStock: false }
    ]

//1) Вывести названия и цены каждого товара
// products.forEach(obj => console.log(obj.name, obj.price))

//2) вывести только inStock === true
// products.forEach(obj => obj.inStock && console.log(obj.name));

// 3) посчитать все в totalPrice

// let totalPrice = 0
// products.forEach(obj => totalPrice += obj.price)
// console.log(totalPrice)

// 4) Создать массив productNames с названиями товаров через forEach + push

// const productNames = [];
// products.forEach(obj => {
//     productNames.push(obj.name)
// })
// console.log(productNames)

// 5) Создать массив discountedPrices со скидкой 10% (цены не изменяем в products)
// const discountedPrices = [];
// products.forEach(obj => discountedPrices.push(obj.price * 0.9))
// console.log(discountedPrices)

// 6) Опционально: создать массив пар [name, discountedPrice] или массив объектов { name, discountedPrice }

// const productsAsObjects = [];
// const productsAsTuples = [];
// products.forEach(obj => {
//     productsAsObjects.push({ name: obj.name, discountedPrice: obj.price * 0.9 });
//     productsAsTuples.push([obj.name, obj.price * 0.9]);
// });
// console.log(productsAsObjects)
// console.log(productsAsTuples)

// 7) Добавить новые поля category, rating

// const productsExtended = []
// products.forEach(obj => {
//     const randomRating = Math.floor(Math.random() * 10) + 1;
//     productsExtended.push({...obj, category: 'Електроника', rating: randomRating})
// })
// console.log(productsExtended)







// ЗАДАЧА С ИСПОЛЬЗОВАНИЕМ THIS В FOREACH:

// Создайте объект магазина с методами, которые используют this в forEach():

const shop = {
    name: 'ЭлектроникаМаркет',
    discount: 0.15, // 15% скидка для всех товаров
    vipDiscount: 0.25, // 25% скидка для VIP клиентов
    categories: ['Смартфоны', 'Ноутбуки', 'Периферия'],
    
    products: [
        { name: 'iPhone 15', price: 120000, category: 'Смартфоны', inStock: true },
        { name: 'MacBook Pro', price: 250000, category: 'Ноутбуки', inStock: true },
        { name: 'AirPods Pro', price: 35000, category: 'Периферия', inStock: false },
        { name: 'Samsung Galaxy', price: 80000, category: 'Смартфоны', inStock: true },
        { name: 'Dell XPS', price: 180000, category: 'Ноутбуки', inStock: true },
        { name: 'Logitech Mouse', price: 5000, category: 'Периферия', inStock: true }
    ],

    // Задача 1: Создайте метод calculateTotalPrice(), который использует this.discount
    // и выводит общую стоимость всех товаров со скидкой
   
    // Задача 2: Создайте метод getProductsByCategory(category), который использует this.categories
    // и возвращает массив товаров только из указанной категории
    
    // Задача 3: Создайте метод applyVipDiscount(), который использует this.vipDiscount
    // и возвращает массив товаров с VIP скидкой (только для товаров в наличии)
    
    // Задача 4: Создайте метод generateReport(), который использует this.name
    // и выводит полный отчет о магазине с использованием this в forEach()
    
    // Задача 5: Создайте метод getAvailableProducts(), который использует this.discount
    // и возвращает только товары в наличии с примененной скидкой

    calculateTotalPrice () {
            let totalPrice = 0
            this.products.forEach(obj => {
                totalPrice += obj.price * this.discount
            })
            return totalPrice
    },
    getProductsByCategory(category) {
        const sortCategories = []
        this.products.forEach(obj => this.categories.includes(obj.category) && sortCategories.push(obj))
        return sortCategories
    },
    applyVipDiscount() {},
    generateReport() {},
    getAvailableProducts() {},
    
}

console.log(shop.calculateTotalPrice())
console.log(shop.getProductsByCategory())








