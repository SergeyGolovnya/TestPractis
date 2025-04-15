import React, { useState } from 'react';
import { StyleContainer } from '../styles/styles';

interface Post {
  title: string; // Убрали опциональность, так как title всегда есть
}

export const LoadData = () => {
  const [data, setData] = useState<Post | null>(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null); // Ошибка как строка

  const handleGetData = async () => {
    setError(null); // Сбрасываем ошибку
    setLoad(true); // Показываем загрузку
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); // Исправленный URL
      if (!response.ok) {
        throw new Error('Ошибка сети или неверный адрес запроса');
      }
      const result = await response.json();
      setData(result); // Устанавливаем данные
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(message); // Сохраняем сообщение об ошибке
    } finally {
      setLoad(false); // Сбрасываем загрузку
    }
  };

  return (
    <StyleContainer>
      <button onClick={handleGetData}>Сделать запрос</button>
      {load && <p>Загрузка данных...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!load && !error && data ? (
        <div>{data.title}</div>
      ) : (
        !load && !error && <p>Нажмите кнопку для загрузки</p>
      )}
    </StyleContainer>
  );
};