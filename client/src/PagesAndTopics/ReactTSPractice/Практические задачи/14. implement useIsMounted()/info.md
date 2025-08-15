When we handle async requests in React, we need to pay attention if the component is already unmounted.

Please implement useIsMounted() for us to easily tell if the component is still not unmounted.

// to try your code on the right panel
// export App() component like below

// export function App() {
//   ...
//   return <div>BFE.dev</div>
// }


=======

Test Spec

import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/dom';
import {useIsMounted} from 'App'
const wait = (delay: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
test('should return true if component is mounted', async () => {
  const result = []
  function App() {
    const isMounted = useIsMounted();
    useEffect(() => {
      result.push(isMounted())
    }, [])
    return null
  }
  const $root = document.querySelector('#root');
  ReactDOM.render(<App/>, $root);
  await wait(50)
  expect(result).toEqual([true])
})

======
Test Spec

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/dom';
import {useIsMounted} from 'App'
const wait = (delay: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
const request = () => new Promise((resolve) => {
  setTimeout(resolve, 10)
})
test('should return true if component is mounted', async () => {
  const result = []
  
  function Component({unmount}) {
    const isMounted = useIsMounted();
    useEffect(() => {
      result.push(isMounted())
      request().then(() => {
        result.push(isMounted())
      })
      unmount()
    }, [])
    return null
  }
  function App() {
    const [show, setShow] = useState(true)
    return show ? <Component unmount={() => setShow(false)}/> : null
  }
  const $root = document.querySelector('#root');
  ReactDOM.render(<App/>, $root);
  await wait(100)
  expect(result).toEqual([true, false])
})

=======

В этой задаче тебе нужно реализовать React-хук useIsMounted, который позволяет определить, смонтирован ли компонент в данный момент.

**Что требуется:**
- Реализовать функцию useIsMounted, которая возвращает функцию. Эта возвращаемая функция при вызове должна возвращать true, если компонент всё ещё смонтирован, и false — если уже размонтирован.
- Хук должен корректно работать с асинхронными операциями: если, например, после запроса компонент был размонтирован, функция должна вернуть false.

**Пример использования:**
```ts
const isMounted = useIsMounted();
useEffect(() => {
  someAsyncRequest().then(() => {
    if (isMounted()) {
      // безопасно обновлять состояние
    }
  });
}, []);
```

**Требования по тестам:**
- В первом тесте: сразу после монтирования компонента вызов isMounted() должен вернуть true.
- Во втором тесте: после асинхронной операции и размонтирования компонента вызов isMounted() должен вернуть false.

**Ограничения:**
- Не использовать сторонние библиотеки.
- Хук должен быть универсальным и работать для любого компонента.

**Ожидаемое поведение:**
- Корректно определять состояние монтирования компонента на момент вызова возвращаемой функции.

Если нужно — могу расписать, как именно работает такой хук и почему он нужен. Ждать твоего подтверждения для перехода к плану реализации.