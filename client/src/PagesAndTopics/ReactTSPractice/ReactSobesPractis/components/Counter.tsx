import { useState } from "react";
import { StyleContainer } from '../styles/styles';


export const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <StyleContainer>
      <p>Счёт: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </StyleContainer>
  );
};
