//- Задача 3: Простая форма
//- **Описание:** Напиши форму с одним полем ввода (имя) и кнопкой "Отправить". При нажатии на кнопку выводи имя в alert.
//- **Требования:** Используй useState для хранения значения поля.

import { useState } from "react";
import { StyleContainer } from '../styles/styles';


export const Form = () => {
  const [name, setName] = useState("");

  const handleSendName = (e) => {
    e.preventDefault(); // Чтобы форма не отправлялась на сервер и страница не перезагружалась
    alert(name || "Введите имя");
  };

  return (
    <StyleContainer>
        <form onSubmit={handleSendName}>
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
        />
        <button type="submit">Отправить</button>
        </form>
    </StyleContainer>
  );
};
