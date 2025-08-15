// Создал объект eventParty
const eventParty = new Object(); //

// ДОбавляем свойства и метод объекту eventParty
eventParty.peopleName = []; // Хранит список гостей
eventParty.partyName = []; // Хранит названия вечеринок
eventParty.date = []; // Хранит дату

// Добавляет участников
eventParty.addParticipant = function(peopleName,partyName) {
 this.peopleName.push(peopleName)
 this.partyName.push(partyName)
 const date = new Date();
 this.date.push(date)
 }

// Вывести список
eventParty.showListGuests = function() {
	const list = this.peopleName.map((name, index) => {
	// Синхронизируем индекс с вечером
	const partyName = this.partyName[index]
	// Синхранизируем индекс с 
	const date = this.date[index]
	return `Гость ${index + 1}: ${name}, ${partyName}, ${date.toLocaleDateString()}`;
	})
    console.log(list.join('\n'));
};

// Список участников
eventParty.addParticipant('Сергей','Белая вичиринка');
eventParty.addParticipant('Виктор','Белая вичиринка');
eventParty.addParticipant('Маисей','Черная вичиринка');
eventParty.addParticipant('Андрей','Красная вичиринка');

//Вывод списка
eventParty.showListGuests()