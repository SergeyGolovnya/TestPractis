// Метод setAttribute() устанавливает значение атрибута для элемента

/*
Синтаксис:
element.setAttribute(name, value)

Параметры:
- name: строка, имя атрибута
- value: строка, значение атрибута

Возвращаемое значение:
- undefined

Изменяет DOM: Да
*/

// //1. Установка простого атрибута
// const element = document.querySelector('.my-element');
// element.setAttribute('class', 'new-class');
// console.log(element); // <div class="new-class">...</div>

// //2. Установка data-атрибута
// const item = document.querySelector('.item');
// item.setAttribute('data-id', '123');
// console.log(item); // <div data-id="123">...</div>

// //3. Установка нескольких атрибутов
// const button = document.querySelector('button');
// button.setAttribute('type', 'button');
// button.setAttribute('disabled', '');
// console.log(button); // <button type="button" disabled>...</button>

// //4. Установка атрибута с проверкой
// const input = document.querySelector('input');
// if (input) {
//     input.setAttribute('placeholder', 'Введите текст');
// }

// //5. Установка атрибута с динамическим значением
// const div = document.querySelector('.dynamic');
// div.setAttribute('data-index', Math.random());

// //6. Установка атрибута с обработчиком
// const btn = document.querySelector('.btn');
// btn.setAttribute('onclick', 'console.log("Клик!")');

/*
Задача:
1. Найдите элемент с классом "card"
2. Установите ему атрибуты:
   - class="card active"
   - data-id="123"
   - title="Карточка"
3. Выведите в консоль:
   - Элемент после установки атрибутов
   - Значение каждого атрибута
*/

// Ваше решение:
const card = document.querySelector('.card');
card.setAttribute('class', 'card active');
card.setAttribute('data-id', '123');
card.setAttribute('title', 'Карточка');

console.log('Элемент после установки атрибутов:', card);
console.log('Значение class:', card.getAttribute('class'));
console.log('Значение data-id:', card.getAttribute('data-id'));
console.log('Значение title:', card.getAttribute('title'));

// Метод getAttribute() возвращает значение атрибута элемента

/*
Синтаксис:
element.getAttribute(name)

Параметры:
- name: строка, имя атрибута

Возвращаемое значение:
- Значение атрибута
- null, если атрибут не существует

Изменяет DOM: Нет
*/

// //1. Получение простого атрибута
// const element = document.querySelector('.my-element');
// const className = element.getAttribute('class');
// console.log(className); // "my-class"

// //2. Получение data-атрибута
// const item = document.querySelector('.item');
// const itemId = item.getAttribute('data-id');
// console.log(itemId); // "123"

// //3. Получение несуществующего атрибута
// const div = document.querySelector('div');
// const notFound = div.getAttribute('not-exist');
// console.log(notFound); // null

// //4. Получение атрибута с проверкой
// const input = document.querySelector('input');
// if (input) {
//     const type = input.getAttribute('type');
//     console.log(type);
// }

// //5. Получение атрибута с преобразованием
// const number = document.querySelector('.number');
// const value = parseInt(number.getAttribute('data-value'));

// //6. Получение атрибута с условием
// const button = document.querySelector('button');
// const isDisabled = button.getAttribute('disabled') !== null;

/*
Задача:
1. Найдите элемент с классом "user-card"
2. Получите значения атрибутов:
   - class
   - data-user-id
   - data-role
3. Выведите в консоль:
   - Элемент
   - Значения всех атрибутов
   - Проверку наличия атрибута data-role
*/

// Ваше решение:
const userCard = document.querySelector('.user-card');
const cardClass = userCard.getAttribute('class');
const userId = userCard.getAttribute('data-user-id');
const userRole = userCard.getAttribute('data-role');

console.log('Элемент:', userCard);
console.log('Значение class:', cardClass);
console.log('Значение data-user-id:', userId);
console.log('Значение data-role:', userRole);
console.log('Наличие атрибута data-role:', userCard.hasAttribute('data-role'));

// Работа с атрибутами
const element = document.querySelector('.my-element');

// Удаление атрибутов
element.removeAttribute('title');

// Проверка наличия атрибута
const hasClass = element.hasAttribute('class');

// Работа с data-атрибутами
element.dataset.userId = '123';
element.dataset.userRole = 'admin';

// Получение data-атрибутов
const userId = element.dataset.userId;
const userRole = element.dataset.userRole;

// Практические примеры
function addTooltip(element, text) {
    element.setAttribute('title', text);
    element.setAttribute('data-tooltip', 'true');
}

function removeTooltip(element) {
    element.removeAttribute('title');
    element.removeAttribute('data-tooltip');
}

function toggleAttribute(element, attributeName) {
    if (element.hasAttribute(attributeName)) {
        element.removeAttribute(attributeName);
    } else {
        element.setAttribute(attributeName, '');
    }
}

// Пример использования
const button = document.querySelector('button');
addTooltip(button, 'Нажми меня');
toggleAttribute(button, 'disabled'); 