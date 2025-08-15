// Метод createElement() создает новый HTML элемент

/*
Синтаксис:
document.createElement(tagName)

Параметры:
- tagName: строка, представляющая имя HTML тега

Возвращаемое значение:
- Новый HTML элемент

Изменяет DOM: Нет (только создает элемент)
*/

// //1. Создание простого элемента
// const div = document.createElement('div');
// div.textContent = 'Новый элемент';
// console.log(div); // <div>Новый элемент</div>

// //2. Создание элемента с атрибутами
// const button = document.createElement('button');
// button.setAttribute('type', 'button');
// button.setAttribute('class', 'btn');
// console.log(button); // <button type="button" class="btn"></button>

// //3. Создание элемента с вложенными элементами
// const card = document.createElement('div');
// const title = document.createElement('h3');
// title.textContent = 'Заголовок';
// card.appendChild(title);
// console.log(card); // <div><h3>Заголовок</h3></div>

// //4. Создание элемента с обработчиком
// const btn = document.createElement('button');
// btn.addEventListener('click', () => console.log('Клик!'));
// console.log(btn); // <button></button>

// //5. Создание элемента с стилями
// const box = document.createElement('div');
// box.style.width = '100px';
// box.style.height = '100px';
// box.style.backgroundColor = 'red';
// console.log(box); // <div style="width: 100px; height: 100px; background-color: red;"></div>

// //6. Создание элемента с data-атрибутами
// const item = document.createElement('div');
// item.dataset.id = '123';
// item.dataset.type = 'user';
// console.log(item); // <div data-id="123" data-type="user"></div>

/*
Задача:
1. Создайте элемент <div> с классом "card"
2. Добавьте в него заголовок <h2> с текстом "Карточка"
3. Добавьте параграф <p> с текстом "Описание карточки"
4. Добавьте кнопку <button> с текстом "Нажми меня"
5. Выведите в консоль:
   - Созданный элемент
   - HTML структуру элемента
*/

// Ваше решение:
const card = document.createElement('div');
card.className = 'card';

const title = document.createElement('h2');
title.textContent = 'Карточка';

const description = document.createElement('p');
description.textContent = 'Описание карточки';

const button = document.createElement('button');
button.textContent = 'Нажми меня';

card.appendChild(title);
card.appendChild(description);
card.appendChild(button);

console.log('Созданный элемент:', card);
console.log('HTML структура:', card.outerHTML);

// Метод appendChild() добавляет элемент в конец родительского элемента

/*
Синтаксис:
parentNode.appendChild(childNode)

Параметры:
- childNode: элемент, который нужно добавить

Возвращаемое значение:
- Добавленный элемент

Изменяет DOM: Да
*/

// //1. Добавление элемента в конец
// const container = document.querySelector('.container');
// const newElement = document.createElement('div');
// container.appendChild(newElement);

// //2. Добавление нескольких элементов
// const list = document.createElement('ul');
// ['Item 1', 'Item 2', 'Item 3'].forEach(text => {
//     const li = document.createElement('li');
//     li.textContent = text;
//     list.appendChild(li);
// });

// //3. Добавление элемента с проверкой
// const parent = document.querySelector('.parent');
// if (parent) {
//     const child = document.createElement('div');
//     parent.appendChild(child);
// }

// //4. Добавление элемента с атрибутами
// const button = document.createElement('button');
// button.setAttribute('type', 'button');
// document.body.appendChild(button);

// //5. Добавление элемента с обработчиком
// const btn = document.createElement('button');
// btn.addEventListener('click', () => console.log('Клик!'));
// document.body.appendChild(btn);

// //6. Добавление элемента с стилями
// const box = document.createElement('div');
// box.style.backgroundColor = 'red';
// document.body.appendChild(box);

/*
Задача:
1. Создайте список <ul> с классом "menu"
2. Добавьте в него 3 элемента <li> с текстом "Пункт 1", "Пункт 2", "Пункт 3"
3. Добавьте класс "active" к первому пункту
4. Выведите в консоль:
   - Созданный список
   - Количество пунктов в списке
   - HTML структуру списка
*/

// Ваше решение:
const menu = document.createElement('ul');
menu.className = 'menu';

const items = ['Пункт 1', 'Пункт 2', 'Пункт 3'].map((text, index) => {
    const li = document.createElement('li');
    li.textContent = text;
    if (index === 0) {
        li.classList.add('active');
    }
    return li;
});

items.forEach(item => menu.appendChild(item));

console.log('Созданный список:', menu);
console.log('Количество пунктов:', menu.children.length);
console.log('HTML структура:', menu.outerHTML); 