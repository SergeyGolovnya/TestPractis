import { useState } from "react";
import { StyleContainer } from '../styles/styles';

export const ToDo: React.FC = () => {
  const [task, setTask] = useState<string>(""); // Текущая задача из ввода
  const [tasks, setTasks] = useState<string[]>([]); // Массив всех задач

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, task]); // Добавляем новую задачу в массив
      setTask(""); // Очищаем поле ввода
    }
  };

  const handleDeleteTasks = () => {
    // e.preventDefault(); - можно убрать, потому что кнопка в которой используется эта функция не отправляет форму
    setTasks([])
  }

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)) //Фльтруем массив
  }

  return (
    <StyleContainer>
      <h5>ToDo</h5>
      <form onSubmit={handleAddTask}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Введите задачу"
        />
        <button type="submit">Добавить задачу</button>
        <button type="button" onClick={() => alert('Нажата вторая кнопка')}>Показать уведомление</button>
        <button type="button" onClick={handleDeleteTasks}>Очистить задачи</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
        <li key={index}>
            {task} <button onClick={() => handleDeleteTask(index)}>Удалить задачу</button>
        </li>
        ))}
      </ul>
    </StyleContainer>
  );
};