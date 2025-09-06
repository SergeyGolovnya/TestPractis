// Примеры привязки контекста
/* 
bind - устанавливает но не вызывает
apply - 
call - 
*/

// Использование bind
function showInfo() {
    console.log(`${this.name} - ${this.role}`);
}
const user = { name: 'Анна', role: 'Админ' };
showInfo.bind(user); // не вызовет

// Использование call
function introduce(greeting) {
    console.log(`${greeting}, я ${this.name}`);
}
introduce.call(user, 'Привет');

// Использование apply
function printStats(salary, bonus) {
    console.log(`${this.name}: ${salary + bonus}₽`);
}
printStats.apply(user, [50000, 10000]);

