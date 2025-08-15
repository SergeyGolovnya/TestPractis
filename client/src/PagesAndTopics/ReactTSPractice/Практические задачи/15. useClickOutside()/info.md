Click above header menu on this page, you can see that the dropdown menu is dismissed after clicking outside.



Now you are asked to implement a React hook to make it eaiser to implement such behavior.

function Component() {
  const ref = useClickOutside(() => {
    alert('clicked outside')
  });
  return <div ref={ref}>..</div>
}


=====

Test Spec

import { useClickOutside } from 'App'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
import React from 'react'
import ReactDOM from 'react-dom'
const wait = (delay: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
test('callback should be triggered if clicked outside', async () => {
  const $root = document.querySelector('#root')
  const spy = jasmine.createSpy('callback');
  function App() {
    const ref = useClickOutside(spy);
    return <div>
      <div  ref={ref}>
        <button>button 1</button>
        <button>button 2</button>
      </div>
      <div>
        <button>button 3</button>
        <button>button 4</button>
      </div>
    </div>
  }
  ReactDOM.render(<App />, $root)
  await wait(200)
  userEvent.click(await screen.findByText('button 3'))
  expect(spy).toHaveBeenCalledTimes(1)
})

=====
Test Spec

import { useClickOutside } from 'App'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const wait = (delay: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
test('event listeners should be cleaned up properly', async () => {
  const $root = document.querySelector('#root')
  const spy1 = jasmine.createSpy('callback1')
  const spy2 = jasmine.createSpy('callback2')
  function App() {
    const ref1 = useClickOutside(spy1);
    const ref2 = useClickOutside(spy2);
    const [div, setDiv] = useState(1)
    return <div>
      <button onClick={() => setDiv(div => div === 1 ? 2 : 1)}>toggle div</button>
      {div === 1 && <div ref={ref1}>
        <button>div 1 button 1</button>
        <button>div 1 button 2</button>
      </div> }
      {div === 2 && <div ref={ref2}>
        <button>div 2 button 1</button>
        <button>div 2 button 2</button>
      </div>}
      <div>
        <button>outside button 1</button>
        <button>outside button 2</button>
      </div>
    </div>
  }
  ReactDOM.render(<App />, $root)
  await wait(100)
  userEvent.click(await screen.findByText('div 1 button 1'))
  userEvent.click(await screen.findByText('div 1 button 2'))
  userEvent.click(await screen.findByText('outside button 1'))
  userEvent.click(await screen.findByText('outside button 2'))
  expect(spy1).toHaveBeenCalledTimes(2)
  expect(spy2).toHaveBeenCalledTimes(0)
  userEvent.click(await screen.findByText('toggle div'))
  await wait(100)
  spy1.calls.reset()
  spy2.calls.reset()
  userEvent.click(await screen.findByText('div 2 button 1'))
  userEvent.click(await screen.findByText('div 2 button 2'))
  userEvent.click(await screen.findByText('outside button 1'))
  userEvent.click(await screen.findByText('outside button 2'))
  expect(spy1).toHaveBeenCalledTimes(0)
  expect(spy2).toHaveBeenCalledTimes(2)
  userEvent.click(await screen.findByText('toggle div'))
  await wait(100)
  spy1.calls.reset()
  spy2.calls.reset()
  userEvent.click(await screen.findByText('div 1 button 1'))
  userEvent.click(await screen.findByText('div 1 button 2'))
  userEvent.click(await screen.findByText('outside button 1'))
  userEvent.click(await screen.findByText('outside button 2'))
  expect(spy1).toHaveBeenCalledTimes(2)
  expect(spy2).toHaveBeenCalledTimes(0)
})


======

Вот что требуется реализовать на основе предоставленного задания и тестов:

## Задача

Тебе нужно реализовать React-хук useClickOutside, который позволяет выполнять callback, когда пользователь кликает вне определённого DOM-элемента.

### Как это должно работать

- Ты вызываешь useClickOutside и передаёшь в него callback.
- useClickOutside возвращает ref, который ты вешаешь на нужный элемент (например, <div ref={ref}>).
- Если пользователь кликает вне этого элемента — вызывается callback.
- Если клик внутри элемента — callback не вызывается.

### Пример использования

```tsx
function Component() {
  const ref = useClickOutside(() => {
    alert('clicked outside')
  });
  return <div ref={ref}>..</div>
}
```

### Требования по тестам

1. **callback вызывается только при клике вне элемента**
   - Если клик внутри — ничего не происходит.
   - Если клик вне — callback вызывается.

2. **Корректная очистка слушателей**
   - Если компонент размонтируется или ref меняется, слушатели должны удаляться.
   - Если ref меняется (например, при переключении между двумя div), callback должен вызываться только для активного div.

3. **Может быть несколько независимых useClickOutside в одном компоненте**
   - Каждый ref работает независимо.
   - Слушатели не конфликтуют.

### Ограничения

- Нельзя использовать сторонние библиотеки.
- Нужно корректно снимать обработчики событий при размонтировании или смене ref.
- Всё должно работать с любыми DOM-элементами, не только с div.

---

## Кратко: что реализовать

- Хук useClickOutside, который возвращает ref.
- Если клик вне элемента с этим ref — вызывается callback.
- Всё работает корректно при маунте/анмаунте и смене ref.
- Нет утечек слушателей.
- Можно использовать несколько useClickOutside одновременно.

---

Если что-то неясно — уточни, и я поясню подробнее!  
Если всё понятно — могу предложить план реализации.