// Создание объекта
const obj = new Object();

// Создание свойства
obj.svoistvo1 = 'текст';
obj.svoistvo2 = 'текст';

// Созданеи метода
// Не правильный
obj.method1 = () => {
  // при таком создании мы не можем внутри этого тела функции обращаться к свойствам объекта потому что будет потерян obj.this потому что this теряется
  return this.svoistvo1; // this = undefined или window
};

// Правильно
obj.method2 = function() {
  return this.svoistvo1;
};

// Но можно стрелочную использовать в самом методе.
const obj2 = new Object();
obj2.svoistvo1 = 'текст';
obj2.svoistvo2 = 'текст';
obj2.method2 = function() {
  const sumText = () => {
    // хоть у стрелочной нет собственного this но тут он работает
    return this.svoistvo1 + this.svoistvo2; // Добавили return
  };
  return sumText(); // Вызываем sumText и возвращаем результат
};

// Тестирование
console.log(obj.method2()); // 'текст'
console.log(obj2.method2()); // 'тексттекст'
try {
  console.log(obj.method1()); // Ошибка или undefined
} catch (e) {
  console.log('Ошибка: this потерян в стрелочной функции');
}