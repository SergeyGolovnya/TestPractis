// Метод addEventListener() добавляет обработчик события к элементу

/*
Синтаксис:
element.addEventListener(type, listener, options)

Параметры:
- type: строка, тип события
- listener: функция-обработчик события
- options: объект с настройками (необязательный)

Возвращаемое значение:
- undefined

Изменяет DOM: Нет
*/

// //1. Простой обработчик клика
// const button = document.querySelector('button');
// button.addEventListener('click', function(event) {
//     console.log('Кнопка нажата');
// });

// //2. Обработчик с параметрами
// const input = document.querySelector('input');
// input.addEventListener('input', function(event) {
//     console.log('Введено:', event.target.value);
// });

// //3. Обработчик с проверкой
// const element = document.querySelector('.my-element');
// if (element) {
//     element.addEventListener('mouseover', function(event) {
//         console.log('Мышь над элементом');
//     });
// }

// //4. Обработчик с удалением
// function handleClick(event) {
//     console.log('Клик!');
// }
// const btn = document.querySelector('.btn');
// btn.addEventListener('click', handleClick);
// btn.removeEventListener('click', handleClick);

// //5. Обработчик с опциями
// const div = document.querySelector('div');
// div.addEventListener('click', function(event) {
//     console.log('Клик!');
// }, { once: true });

// //6. Обработчик с делегированием
// document.querySelector('.parent').addEventListener('click', function(event) {
//     if (event.target.matches('.child')) {
//         console.log('Клик по дочернему элементу');
//     }
// });

/*
Задача:
1. Найдите элемент с классом "card"
2. Добавьте ему обработчики событий:
   - mouseover: добавляет класс "hover"
   - mouseout: удаляет класс "hover"
   - click: выводит в консоль "Клик по карточке"
3. Выведите в консоль:
   - Элемент
   - Список обработчиков событий
*/

// Ваше решение:
const card = document.querySelector('.card');

function handleMouseOver(event) {
    event.target.classList.add('hover');
}

function handleMouseOut(event) {
    event.target.classList.remove('hover');
}

function handleClick(event) {
    console.log('Клик по карточке');
}

card.addEventListener('mouseover', handleMouseOver);
card.addEventListener('mouseout', handleMouseOut);
card.addEventListener('click', handleClick);

console.log('Элемент:', card);
console.log('Обработчики событий:', card.onmouseover, card.onmouseout, card.onclick);

// Метод removeEventListener() удаляет обработчик события

/*
Синтаксис:
element.removeEventListener(type, listener, options)

Параметры:
- type: строка, тип события
- listener: функция-обработчик события
- options: объект с настройками (необязательный)

Возвращаемое значение:
- undefined

Изменяет DOM: Нет
*/

// //1. Удаление простого обработчика
// const button = document.querySelector('button');
// function handleClick(event) {
//     console.log('Клик!');
// }
// button.addEventListener('click', handleClick);
// button.removeEventListener('click', handleClick);

// //2. Удаление обработчика с проверкой
// const element = document.querySelector('.my-element');
// if (element) {
//     element.removeEventListener('click', handleClick);
// }

// //3. Удаление обработчика с опциями
// const div = document.querySelector('div');
// div.removeEventListener('click', handleClick, { once: true });

// //4. Удаление обработчика с делегированием
// document.querySelector('.parent').removeEventListener('click', handleClick);

// //5. Удаление обработчика с анонимной функцией
// const btn = document.querySelector('.btn');
// btn.addEventListener('click', function(event) {
//     console.log('Клик!');
// });
// // Нельзя удалить анонимную функцию!

// //6. Удаление обработчика с привязкой контекста
// const obj = {
//     handleClick: function(event) {
//         console.log('Клик!');
//     }
// };
// const element = document.querySelector('.my-element');
// element.addEventListener('click', obj.handleClick.bind(obj));
// element.removeEventListener('click', obj.handleClick.bind(obj));

/*
Задача:
1. Найдите элемент с классом "button"
2. Создайте функцию-обработчик handleButtonClick
3. Добавьте обработчик клика
4. Удалите обработчик клика
5. Выведите в консоль:
   - Элемент
   - Результат проверки наличия обработчика
*/

// Ваше решение:
const button = document.querySelector('.button');

function handleButtonClick(event) {
    console.log('Кнопка нажата');
}

button.addEventListener('click', handleButtonClick);
button.removeEventListener('click', handleButtonClick);

console.log('Элемент:', button);
console.log('Обработчик удален:', !button.onclick);

// События мыши
const element = document.querySelector('.my-element');

element.addEventListener('mouseover', function(event) {
    console.log('Мышь над элементом');
});

element.addEventListener('mouseout', function(event) {
    console.log('Мышь покинула элемент');
});

element.addEventListener('mousemove', function(event) {
    console.log('Мышь двигается над элементом');
});

// События клавиатуры
document.addEventListener('keydown', function(event) {
    console.log('Нажата клавиша:', event.key);
});

document.addEventListener('keyup', function(event) {
    console.log('Отпущена клавиша:', event.key);
});

// Практические примеры
function initDragAndDrop(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - element.offsetLeft;
        initialY = e.clientY - element.offsetTop;
        isDragging = true;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            element.style.left = currentX + 'px';
            element.style.top = currentY + 'px';
        }
    }

    function dragEnd() {
        isDragging = false;
    }
}

// Пример использования drag and drop
const draggableElement = document.querySelector('.draggable');
initDragAndDrop(draggableElement);

// Делегирование событий
document.querySelector('.parent').addEventListener('click', function(event) {
    if (event.target.matches('.child')) {
        console.log('Клик по дочернему элементу');
    }
}); 