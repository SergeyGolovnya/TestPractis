// Синтаксис
// Начинается ()() где первая часть то что будем внутри исполнять а вторая часть запуск функции

// Пример 1
// (/* сюда помещаем логикку */)()

// Пример 2
(function IIFI () {console.log('Привет, я внутри')})()

// Пример 3
const result = (function () {return 'Привет'})()
console.log(result)

// В отличии от простой функции или без () у нас ничего не выйдет 
const result2 = (function () {return 'Привет2'})
console.log(result2)

const result3 = function () {return 'Привет3'}
console.log(result3)

// Можно вызвать только так
function result4 () {return 'Привет4'}
console.log(result4()) // указали ()

const result5 = function () {return 'Привет5'}
console.log(result3()) // указали ()

