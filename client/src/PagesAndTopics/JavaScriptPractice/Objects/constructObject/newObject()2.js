// Базовый синтаксис создания объектов
const kafeMagadan = new Object();
const ponchik = new Object();
const stol = new Object();

// Добавить свойства
kafeMagadan.ulica = 'Ленина';
kafeMagadan.mesta = 50;
kafeMagadan.menu = ['Борщ', 'Пельмени', 'Компот'];

ponchik.nachinka = 'Яблоко';
ponchik.cena = 50;
ponchik.ves = '100г';

stol.material = 'Дерево';
stol.mesta = 4;
stol.nomer = 1;

// Добавить методы
kafeMagadan.open = function() {
    return `Кафе Магадан на ${this.ulica} открыто!`;
};

ponchik.getInfo = function() {
    return `Пончик с начинкой ${this.nachinka}, цена ${this.cena} руб.`;
};

stol.reserve = function() {
    return `Стол номер ${this.nomer} на ${this.mesta} места зарезервирован`;
};

// Тестирование
console.log(kafeMagadan.open()); // "Кафе Магадан на Ленина открыто!"
console.log(ponchik.getInfo()); // "Пончик с начинкой Яблоко, цена 50 руб."
console.log(stol.reserve()); // "Стол номер 1 на 4 места зарезервирован"