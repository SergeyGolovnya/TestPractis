// Создал объект eventParty
const eventParty = new Object();

// Добавляем свойство для хранения участников
eventParty.participants = []; // Хранит массив объектов { name, partyName, date }

// Добавляет участников
eventParty.addParticipant = function(name, partyName) {
  this.participants.push({
    name, // Имя гостя
    partyName, // Название вечеринки
    date: new Date() // Текущая дата
  });
};

// Вывести список и статистику
eventParty.showListGuests = function() {
  // Формируем список гостей
  const list = this.participants.map(({ name, partyName, date }, index) => {
    return `Гость ${index + 1}: ${name}, ${partyName}, ${date.toLocaleDateString()}`;
  });
  console.log('Список гостей:');
  console.log(list.join('\n'));
  // Статистика
  console.log(`Всего гостей: ${this.participants.length}`);
  console.log(`Уникальные вечеринки: ${[...new Set(this.participants.map(p => p.partyName))].join(', ')}`);
};

// Список участников
eventParty.addParticipant('Сергей', 'Белая вичиринка');
eventParty.addParticipant('Виктор', 'Белая вичиринка');
eventParty.addParticipant('Маисей', 'Черная вичиринка');
eventParty.addParticipant('Андрей', 'Красная вичиринка');

// Вывод списка и статистики
eventParty.showListGuests();