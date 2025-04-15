//### Задача 2: Переключатель текста
//- **Описание:** Создай компонент с кнопкой. При клике текст кнопки меняется между "Включено" и "Выключено".
//- **Требования:** Используй useState и условный рендеринг.

import { useState } from "react";
import { StyleContainer } from '../styles/styles';


export const Toggle = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <StyleContainer>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? "Включено" : "Выключено"}
      </button>
    </StyleContainer>
  );
};
