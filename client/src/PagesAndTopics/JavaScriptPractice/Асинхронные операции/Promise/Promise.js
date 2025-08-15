/**
 * Promise - это объект, представляющий результат асинхронной операции
 * 
 * Состояния Promise:
 * 1. pending - начальное состояние
 * 2. fulfilled - операция завершена успешно
 * 3. rejected - операция завершена с ошибкой
 * 
 * Методы Promise:
 * - then() - обработка успешного выполнения
 * - catch() - обработка ошибок
 * - finally() - выполняется в любом случае
 * - Promise.all() - ожидает выполнения всех промисов
 * - Promise.race() - ожидает выполнения первого промиса
 * - Promise.resolve() - возвращает успешно выполненный промис
 * - Promise.reject() - возвращает отклоненный промис
 */

// Пример 1: Создание простого Promise
const promise = new Promise((resolve, reject) => {
    // Асинхронная операция
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('Операция выполнена успешно');
        } else {
            reject('Произошла ошибка');
        }
    }, 1000);
});

// Пример 2: Обработка Promise
promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log('Promise завершен');
    });

// Пример 3: Цепочка Promise
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Данные получены'), 1000);
    });
};

const processData = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data + ' обработаны'), 1000);
    });
};

fetchData()
    .then(data => processData(data))
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Пример 4: Promise.all()
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log(values); // [1, 2, 3]
    });

// Пример 5: Promise.race()
const promise4 = new Promise(resolve => setTimeout(() => resolve('Первый'), 500));
const promise5 = new Promise(resolve => setTimeout(() => resolve('Второй'), 1000));

Promise.race([promise4, promise5])
    .then(result => {
        console.log(result); // 'Первый'
    }); 