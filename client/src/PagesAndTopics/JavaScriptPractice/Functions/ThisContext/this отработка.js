/* 
Array.prototype.consfun - добавляет метод ко ВСЕМ массивам
Object.prototype.consfun - добавляет метод ко ВСЕМ объектам (включая массивы, функции, даты и т.д.)
*/

// Универсальная функция
Object.prototype.consfun = function () {
    return console.log(this)
}

// Объект
const obj = {
    name: 'Сергей',
    age: 36,
    skills: ['Бэкенд','Фронтенд', 'Деплой']
}

// Использвоание функции на объекте
obj.age.consfun()
obj.skills.consfun()
obj.name.consfun()