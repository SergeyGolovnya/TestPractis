// Ссылка на исходную статью https://habr.com/ru/companies/otus/articles/686670/

// Задача №1: Конструктор Promise
// Каким будет вывод этого фрагмента кода?

/* console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
})

console.log('end'); */

// Задача №2: .then()

/* console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
})

promise1.then(res => {
  console.log(res)
})

console.log('end'); */


// Задача №3: resolve()

/* console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
  console.log(3)
})

promise1.then(res => {
  console.log(res)
})

console.log('end'); */


// Задача №4: resolve() не вызывается

/* console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
})

promise1.then(res => {
  console.log(2)
})

console.log('end'); */

// Задача №5: Нечто, сбивающее с толку

/* console.log('start')

const fn = () => (new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
}))

console.log('middle')

fn().then(res => {
  console.log(res)
})

console.log('end')
 */


// Задача №6: с Fulfilling Promise

/* console.log('start')

Promise.resolve(1).then((res) => {
  console.log(res)
})

Promise.resolve(2).then((res) => {
  console.log(res)
})

console.log('end') */


// Задача №7: setTimeout vs Promise

/* console.log('start')

setTimeout(() => {
  console.log('setTimeout')
})

Promise.resolve().then(() => {
  console.log('resolve')
})

console.log('end') */



// Задача №8: Микрозадачи смешиваются с макрозадачами

// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//       console.log("timerStart");
//       resolve("success");
//       console.log("timerEnd");
//     }, 0);
//     console.log(2);
//   });
  
//   promise.then((res) => {
//     console.log(res);
//   });
  
//   console.log(4);

// Задача №9: приоритезировать микрозадачи и макрозадачи

console.log('start');

const timer1 = setTimeout(() => {
    console.log('timer1');
    
    const promise1 = Promise.resolve().then(() => {
        console.log('promise1')
    })
    
    console.log('timer2');
}, 0)

const timer2 = setTimeout(() => {
    console.log('timer4')
  }, 0)

console.log('timer3');

const timer3 = setTimeout(() => {
    console.log('timer5')
  }, 0)

  const promise1 = Promise.resolve().then(() => {
    console.log('promise2')
})

console.log('End')

//   Задача №10: типичный вопрос с собеседования


/* console.log('start');

const promise1 = Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});

const timer1 = setTimeout(() => {
  console.log('timer1')
  const promise2 = Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)

console.log('end'); */
