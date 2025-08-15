// Работа со стилями
const element = document.querySelector('.my-element');

// Установка стилей
element.style.color = 'red';
element.style.backgroundColor = '#f0f0f0';
element.style.padding = '10px';
element.style.margin = '20px';

// Получение стилей
const color = element.style.color;
const backgroundColor = element.style.backgroundColor;

// Работа с классами
element.className = 'new-class';
element.classList.add('additional-class');
element.classList.remove('old-class');
element.classList.toggle('active');
const hasClass = element.classList.contains('active');

// Практические примеры
function highlightElement(element) {
    element.style.backgroundColor = 'yellow';
    element.style.transition = 'background-color 0.3s';
}

function unhighlightElement(element) {
    element.style.backgroundColor = '';
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function addMultipleClasses(element, ...classNames) {
    classNames.forEach(className => {
        element.classList.add(className);
    });
}

// Пример использования
const button = document.querySelector('button');
highlightElement(button);
addMultipleClasses(button, 'btn', 'btn-primary', 'btn-large');

// Анимация
function animateElement(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Пример использования анимации
const card = document.querySelector('.card');
animateElement(card);

// Свойство style позволяет управлять стилями элемента

/*
Синтаксис:
element.style.propertyName = value

Параметры:
- propertyName: строка, имя CSS свойства в camelCase
- value: строка, значение CSS свойства

Возвращаемое значение:
- undefined

Изменяет DOM: Да
*/

// //1. Установка простого стиля
// const element = document.querySelector('.my-element');
// element.style.color = 'red';
// console.log(element); // <div style="color: red;">...</div>

// //2. Установка нескольких стилей
// const box = document.querySelector('.box');
// box.style.width = '100px';
// box.style.height = '100px';
// box.style.backgroundColor = '#f0f0f0';

// //3. Установка стиля с проверкой
// const div = document.querySelector('div');
// if (div) {
//     div.style.display = 'none';
// }

// //4. Установка стиля с динамическим значением
// const progress = document.querySelector('.progress');
// progress.style.width = `${Math.random() * 100}%`;

// //5. Установка стиля с анимацией
// const button = document.querySelector('button');
// button.style.transition = 'all 0.3s ease';

// //6. Установка стиля с !important
// const important = document.querySelector('.important');
// important.style.setProperty('color', 'red', 'important');

/*
Задача:
1. Найдите элемент с классом "card"
2. Установите ему стили:
   - width: 200px
   - height: 300px
   - background-color: #f0f0f0
   - border-radius: 8px
   - padding: 16px
3. Выведите в консоль:
   - Элемент после установки стилей
   - Значение каждого стиля
*/

// Ваше решение:
const card = document.querySelector('.card');
card.style.width = '200px';
card.style.height = '300px';
card.style.backgroundColor = '#f0f0f0';
card.style.borderRadius = '8px';
card.style.padding = '16px';

console.log('Элемент после установки стилей:', card);
console.log('Width:', card.style.width);
console.log('Height:', card.style.height);
console.log('Background color:', card.style.backgroundColor);
console.log('Border radius:', card.style.borderRadius);
console.log('Padding:', card.style.padding);

// Метод classList.add() добавляет класс к элементу

/*
Синтаксис:
element.classList.add(className1, className2, ...)

Параметры:
- className: строка, имя класса

Возвращаемое значение:
- undefined

Изменяет DOM: Да
*/

// //1. Добавление одного класса
// const element = document.querySelector('.my-element');
// element.classList.add('active');
// console.log(element); // <div class="my-element active">...</div>

// //2. Добавление нескольких классов
// const button = document.querySelector('button');
// button.classList.add('btn', 'btn-primary', 'btn-large');

// //3. Добавление класса с проверкой
// const div = document.querySelector('div');
// if (div) {
//     div.classList.add('highlight');
// }

// //4. Добавление класса с условием
// const item = document.querySelector('.item');
// if (item.dataset.active === 'true') {
//     item.classList.add('active');
// }

// //5. Добавление класса с анимацией
// const box = document.querySelector('.box');
// box.classList.add('animate');

// //6. Добавление класса с делегированием
// document.querySelector('.parent').addEventListener('click', (e) => {
//     if (e.target.matches('.child')) {
//         e.target.classList.add('clicked');
//     }
// });

/*
Задача:
1. Найдите элемент с классом "user-card"
2. Добавьте ему классы:
   - "active"
   - "highlight"
   - "selected"
3. Выведите в консоль:
   - Элемент после добавления классов
   - Список всех классов
   - Проверку наличия каждого класса
*/

// Ваше решение:
const userCard = document.querySelector('.user-card');
userCard.classList.add('active', 'highlight', 'selected');

console.log('Элемент после добавления классов:', userCard);
console.log('Список классов:', userCard.classList);
console.log('Имеет класс active:', userCard.classList.contains('active'));
console.log('Имеет класс highlight:', userCard.classList.contains('highlight'));
console.log('Имеет класс selected:', userCard.classList.contains('selected')); 