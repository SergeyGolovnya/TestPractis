/* 
Задача 1: Сумма чисел до лимита
Дан массив чисел. Напиши функцию sumUntilLimit, которая суммирует элементы, пока сумма не превысит 100. Используй while.
*/

function sumUntilLimit (numbers) {
    let sum = 0;
    let i = 0;
    while (i < numbers.length && sum <= 100){
        sum += numbers[i];
        i++;
    }
    return sum;
}

console.log(sumUntilLimit([30, 40, 10, 50, 10,33,43,54])); // 130

/* 
Задача 2: Найти первую пилу
Дан массив строк (инструменты). Напиши функцию findFirstPile, которая возвращает первую строку, содержащую "пила". Используй while и только циклы для поиска подстроки.
*/

function findFirstPile (arr) {
    let i = 0
    while (i < arr.length){
        let tool = arr[i]
        let j = 0
        while(j < tool.length -3) {
            if(
                tool[j] === 'п' &&
                tool[j+1] === 'и' &&
                tool[j+2] === 'л' &&
                tool[j+3] === 'а'
            ) {
                return tool
            }
            j++
        }
        i++
    }
   return ''
}
console.log(findFirstPile(["молоток", "пила2", "гвозди", "пила2"])); // "пила1"

/* 
Пример:
console.log(findFirstPile(["молоток", "пила1", "гвозди"])); // "пила1"
console.log(findFirstPile(["гвозди", "шурупы"])); // ""
console.log(findFirstPile([])); // ""
*/

/* 
Задача 3: Подсчёт дорогих инструментов
Дан массив строк вида "<название>:<цена>".
Напиши функцию countExpensive, которая подсчитывает количество инструментов с ценой > 50.
Используй while и только циклы для парсинга строки.

console.log(countExpensive(["молоток:100", "гвозди:10", "шурупы:60"])); // 2
console.log(countExpensive(["гвозди:10", "пила:30"])); // 0
console.log(countExpensive([])); // 0

*/

function countExpensive (arr) {
    let count = 0
    let i = 0
    while(i < arr.length){
        let tool = arr[i]
        let j = 0
        while(j < tool.length){
            if(tool[j] === ':') {
                break;
            }
            j++
        }
        if (j < tool.length) {
            let price = 0;
            j = j + 1;
            while (j < tool.length) {
                price = price * 10 + Number(tool[j]);
                j++;
            }
            if (price > 50) count++;
        }
    i++
    }
    return count
}

console.log(countExpensive(["молоток:100", "гвозди:10", "шурупы:60"])); // 2


/*
Сложная задача (уровень for)
Задача 4: Найти все инструменты в массиве с разной вложенностью
Дан массив с произвольной вложенностью (как в findAllTools).
Напиши функцию findAllToolsWhile, которая возвращает все строки (инструменты) с помощью while и очереди.

console.log(findAllToolsWhile(["молоток", ["гвозди", "шурупы"], [["пила"], "отвёртка"]])); // ["молоток", "гвозди", "шурупы", "пила", "отвёртка"]
console.log(findAllToolsWhile([["пила"], "молоток"])); // ["пила", "молоток"]
console.log(findAllToolsWhile([])); // []
*/

//Вариант 1 - легкий через flat()
function findAllToolsFlat (arr) {
    return arr.flat(3)
}
console.log(findAllToolsFlat(["молоток", ["гвозди", "шурупы"], [["пила"], "отвёртка"]])); // ["молоток", "гвозди", "шурупы", "пила", "отвёртка"]

//Вариант 2 - через while()

function findAllToolsWhile(toolbox) {
    const result = [];
    const queue = [...toolbox];
    while (queue.length > 0) {
        const current = queue.shift();
        if (typeof current === 'string') {
            result.push(current);
        } else if (Array.isArray(current)) {
            let i = current.length - 1;
            while (i >= 0) {
                queue.unshift(current[i]);
                i--;
            }
        }
    }
    return result;
}

console.log(findAllToolsWhile(["молоток", ["гвозди", "шурупы"], [["пила"], "отвёртка"]])); // ["молоток", "гвозди", "шурупы", "пила", "отвёртка"]

