// Метод getElementById() возвращает элемент с указанным ID

/*
Синтаксис:
document.getElementById(id)

Параметры:
- id: строка, представляющая ID элемента

Возвращаемое значение:
- Элемент с указанным ID
- null, если элемент не найден

Изменяет DOM: Нет
*/

// //1. Поиск элемента по ID
// const element = document.getElementById('myId');
// console.log(element); // <div id="myId">...</div>

// //2. Поиск несуществующего элемента
// const notFound = document.getElementById('notExist');
// console.log(notFound); // null

// //3. Поиск и изменение элемента
// const header = document.getElementById('header');
// header.style.color = 'red';

// //4. Поиск и добавление класса
// const button = document.getElementById('submit');
// button.classList.add('active');

// //5. Поиск и изменение содержимого
// const title = document.getElementById('title');
// title.textContent = 'Новый заголовок';

// //6. Поиск и добавление обработчика
// const btn = document.getElementById('btn');
// btn.addEventListener('click', () => console.log('Клик!'));

/*
Задача:
У вас есть HTML с элементом <div id="content">Привет, мир!</div>
1. Найдите этот элемент по ID
2. Измените его текст на "Новый текст"
3. Добавьте класс "highlight"
4. Выведите в консоль:
   - Найденный элемент
   - Текст элемента после изменения
   - Список классов элемента
*/

// Ваше решение:
const content = document.getElementById('content');
console.log('Найденный элемент:', content);
content.textContent = 'Новый текст';
content.classList.add('highlight');
console.log('Текст после изменения:', content.textContent);
console.log('Классы элемента:', content.classList);

// Метод getElementsByClassName() возвращает коллекцию элементов с указанным классом

/*
Синтаксис:
document.getElementsByClassName(className)

Параметры:
- className: строка, представляющая имя класса

Возвращаемое значение:
- HTMLCollection элементов с указанным классом
- Пустая HTMLCollection, если элементы не найдены

Изменяет DOM: Нет
*/

// //1. Поиск элементов по классу
// const elements = document.getElementsByClassName('item');
// console.log(elements); // HTMLCollection(3) [div.item, div.item, div.item]

// //2. Поиск несуществующих элементов
// const notFound = document.getElementsByClassName('notExist');
// console.log(notFound); // HTMLCollection []

// //3. Поиск и изменение всех элементов
// const items = document.getElementsByClassName('item');
// Array.from(items).forEach(item => item.style.color = 'red');

// //4. Поиск и добавление класса
// const buttons = document.getElementsByClassName('btn');
// Array.from(buttons).forEach(btn => btn.classList.add('active'));

// //5. Поиск и изменение содержимого
// const titles = document.getElementsByClassName('title');
// Array.from(titles).forEach(title => title.textContent = 'Новый заголовок');

// //6. Поиск и добавление обработчиков
// const btns = document.getElementsByClassName('btn');
// Array.from(btns).forEach(btn => {
//     btn.addEventListener('click', () => console.log('Клик!'));
// });

/*
Задача:
У вас есть HTML с элементами <div class="item">Элемент 1</div>, <div class="item">Элемент 2</div>
1. Найдите все элементы с классом "item"
2. Измените текст каждого элемента, добавив номер
3. Добавьте класс "highlight" к каждому элементу
4. Выведите в консоль:
   - Количество найденных элементов
   - Текст каждого элемента после изменения
   - Список классов каждого элемента
*/

// Ваше решение:
const items = document.getElementsByClassName('item');
console.log('Количество элементов:', items.length);

Array.from(items).forEach((item, index) => {
    item.textContent = `Элемент ${index + 1}`;
    item.classList.add('highlight');
    console.log(`Элемент ${index + 1}:`, item.textContent);
    console.log(`Классы элемента ${index + 1}:`, item.classList);
});

// Поиск по тегу
const elementsByTag = document.getElementsByTagName('div');

// Поиск по CSS селектору (первый элемент)
const elementBySelector = document.querySelector('.myClass');

// Поиск по CSS селектору (все элементы)
const elementsBySelector = document.querySelectorAll('.myClass');

// Поиск внутри конкретного элемента
const container = document.querySelector('.container');
const innerElement = container.querySelector('.inner');

// Поиск по нескольким условиям
const elements = document.querySelectorAll('div.myClass[data-id]');

// Поиск элементов с определенным атрибутом
const elementsWithAttribute = document.querySelectorAll('[data-custom]');

// Поиск элементов с конкретным значением атрибута
const elementsWithValue = document.querySelectorAll('[data-custom="value"]');

// Практические примеры
const paragraphs = document.querySelectorAll('.content p');
const firstListItem = document.querySelector('ul li:first-child');
const customElements = document.querySelectorAll('[data-type="custom"]');