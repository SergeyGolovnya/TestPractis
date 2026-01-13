const array = [1, 2, 3, 4, 'dfg'];

// Удаление элемента с конца
console.log('Начальный массив:',array);
console.log('Удаленный элемент с конца:',array.pop());
console.log('Длина массива:',array.length);
console.log('Массив после удаления:',array);
console.log(' ');

// Добавление элемента в конец
console.log('Начальный массив:',array);
console.log('Добавленный элемент в конец:',array.push('Капуста'));
console.log('Длина массива:',array.length);
console.log('Массив после добавления:',array);
console.log(' ');

// Удаление элемента с начала
console.log('Начальный массив:',array);
console.log('Удаленный элемент: с начала',array.shift());
console.log('Длина массива:',array.length);
console.log('Массив после удаления:',array);
console.log(' ');


// Добавление элемента с начала
console.log('Начальный массив:',array);
console.log('Добавленный элемент в начало:',array.unshift('Арбуз'));
console.log('Длина массива:',array.length);
console.log('Массив после добавления:',array);
console.log(' ');

// Удаление выбранного элемента
console.log('Начальный массив:',array);
console.log('Удаленный выбранный элемент:',array.splice(2,1));
console.log('Длина массива:',array.length);
console.log('Массив после удаления выбранного элемента:',array);
console.log(' ');