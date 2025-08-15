valtio claims to make proxy-state simple.

Let's take a look at the basic example.

import { proxy, useSnapshot } from 'valtio'
const state = proxy({ count: 0, text: 'hello' })
// This will re-render on `state.count` change 
// but not on `state.text` change
function Counter() {
  const snap = useSnapshot(state)
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}>
        +1
      </button>
    </div>
  )
}
// you can mutate the state from anywhere
setInterval(() => {
  ++state.count
}, 1000)
Now you are asked to implement proxy() and useSnapshot() to make above code example work.

This question is NOT to re-implement valtio, rather it is to test your understanding of proxy-state. The test cases on BFE.dev only covers the basic usage of above two functions, not the full abilities of valtio.


=============================


Вот подробное описание задачи на русском языке:

**Задача:**  
Тебе нужно реализовать две функции — proxy и useSnapshot — чтобы работал следующий паттерн управления состоянием, похожий на библиотеку valtio.

**Что требуется реализовать:**

1. **Функция proxy**
   - Принимает объект (например, { count: 0, text: 'hello' }).
   - Возвращает проксированный объект, который можно изменять напрямую (например, state.count++).
   - Все изменения этого объекта должны быть отслеживаемы.

2. **Функция useSnapshot**
   - React-хук, который принимает проксированный объект (созданный через proxy).
   - Возвращает "снимок" (snapshot) текущего состояния этого объекта.
   - Компонент, использующий useSnapshot, должен автоматически перерисовываться при изменении отслеживаемых свойств объекта (например, если изменился state.count, компонент должен обновиться).

**Пример использования (из info.md):**
```js
const state = proxy({ count: 0, text: 'hello' });

function Counter() {
  const snap = useSnapshot(state);
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}>+1</button>
    </div>
  );
}
```
- При нажатии на кнопку или при изменении state.count извне, компонент Counter должен автоматически обновляться и показывать новое значение count.

**Ограничения:**
- Не требуется реализовывать все возможности valtio, только базовую работу proxy и useSnapshot.
- Достаточно, чтобы работал только описанный выше кейс.

**Требования к реализации:**
- Использовать Proxy для отслеживания изменений объекта.
- Реализовать механизм подписки, чтобы useSnapshot мог реагировать на изменения.
- Соблюдать правила линтера.
- Не использовать сторонние библиотеки, кроме React.

---


