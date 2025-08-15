// Манипуляции с DOM
const container = document.querySelector('.container');

// Добавление элементов
const newElement = document.createElement('div');
newElement.textContent = 'Новый элемент';
container.appendChild(newElement);

// Вставка перед элементом
const referenceElement = document.querySelector('.reference');
container.insertBefore(newElement, referenceElement);

// Удаление элементов
const elementToRemove = document.querySelector('.to-remove');
elementToRemove.remove();

// Замена элементов
const oldElement = document.querySelector('.old');
const newElement2 = document.createElement('div');
newElement2.textContent = 'Замененный элемент';
oldElement.replaceWith(newElement2);

// Клонирование элементов
const original = document.querySelector('.original');
const clone = original.cloneNode(true);
container.appendChild(clone);

// Практические примеры
function moveElement(element, newParent) {
    newParent.appendChild(element);
}

function swapElements(element1, element2) {
    const parent1 = element1.parentNode;
    const parent2 = element2.parentNode;
    
    const temp = document.createElement('div');
    parent1.insertBefore(temp, element1);
    parent2.insertBefore(element1, element2);
    parent1.insertBefore(element2, temp);
    temp.remove();
}

function wrapElement(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
}

// Пример использования
const element1 = document.querySelector('.element1');
const element2 = document.querySelector('.element2');
swapElements(element1, element2);

// Создание и вставка HTML
function insertHTML(element, html) {
    element.innerHTML = html;
}

function appendHTML(element, html) {
    element.insertAdjacentHTML('beforeend', html);
}

function prependHTML(element, html) {
    element.insertAdjacentHTML('afterbegin', html);
}

// Пример использования HTML вставки
const content = document.querySelector('.content');
insertHTML(content, '<div class="new-content">Новый контент</div>');
appendHTML(content, '<div class="appended">Добавленный контент</div>');
prependHTML(content, '<div class="prepended">Предваряющий контент</div>'); 