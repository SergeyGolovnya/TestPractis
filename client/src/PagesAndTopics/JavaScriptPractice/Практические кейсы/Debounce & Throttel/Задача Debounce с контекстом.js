// ЗАДАЧА: Реализовать функцию debounce с сохранением контекста (this)
// 
// Проблема: При вызове функции через setTimeout контекст (this) может потеряться
// Решение: Нужно явно сохранить контекст и передать его в исходную функцию
//
// Что должно происходить:
// 1. Принимает функцию func и задержку delay
// 2. Возвращает новую функцию, которая сохраняет контекст
// 3. Исходная функция вызывается с правильным контекстом (this)

// Тест для проверки контекста:
const user = {
    name: 'Анна',
    greet() {
        console.log(`Привет от ${this.name}!`);
    }
};

const student = {
    name: 'Вася',
    greet: user.greet
}

const worker = {
    name: 'Джамшут',
    greet: user.greet
}

// Создаем debounced функцию
function debounce(func, delay) {
    let timeId
    return function (...args) {
        const context = this; // Берем контекст из вызова
        clearTimeout(timeId)
        timeId = setTimeout(() => func.apply(context, args), delay)
    }
}

// Добавляем debounced методы к каждому объекту
user.debouncedGreet = debounce(user.greet, 1000);
student.debouncedGreet = debounce(student.greet, 1000); 
worker.debouncedGreet = debounce(worker.greet, 1000);

// Теперь можно вызывать как методы объектов
user.debouncedGreet(); // Не вызовет
user.debouncedGreet(); // Не вызовет
user.debouncedGreet(); // Анна
student.debouncedGreet(); // Не вызовет  
student.debouncedGreet(); // Не вызовет
student.debouncedGreet(); // Вася  
worker.debouncedGreet(); // Не вызовет
worker.debouncedGreet(); // Не вызовет
worker.debouncedGreet(); // Не вызовет
worker.debouncedGreet(); // Джамшут

// Другой подход через явное определение контекста
const debouncedGreet =  debounce(user.greet, 1000)
debouncedGreet.call(student)
