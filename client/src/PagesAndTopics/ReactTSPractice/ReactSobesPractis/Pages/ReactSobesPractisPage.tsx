import React, { useState } from 'react';
import { Counter } from '../components/Counter';
import { Toggle } from '../components/Toggle';
import { Form } from '../components/Form';
import { ToDo } from '../components/ToDo';
import { HardForm } from '../components/hardForm';
import { StyleContainer } from '../styles/styles';
import { Fetch } from '../components/Fetch';
import { EmailForm } from '../components/EmailForm';
import { Taimer } from '../components/Taimer';
import { ConditionalRendering } from '../components/ConditionalRendering';
import { ToDoWithDelete } from '../components/ToDoWithDelete';
import styled from 'styled-components';
import { LoadData } from '../components/LoadData';

// Стиль кнопки выключения
const Button = styled.button`
  background-color: #5c5cee;
`
//1. У меня есть место где хранятся все блоки и когда блок в хранилище то он не виден, а когда не в хранилище то он виден и кнопка удаляет или добавляет страницу в хранилище
export const ReactSobesPractisPage = () => {

  // Массив для хранения имен скрытых блоков
  const [bloks, setBloks] = useState<string[]> ([]);

  // Функция для переключения видимости блока
  const toggleBlock = (blockName: string) => {
    setBloks((prevBloks) => {
      if(prevBloks.includes(blockName)) {
        return prevBloks.filter((name) => name !== blockName);
      }else{
        return [...prevBloks, blockName]
      }
    })
  }
  
  return (
    <StyleContainer>
        {!bloks.includes('Counter') && <Counter/>}
        <Button onClick={() => toggleBlock('Counter')}>
          {bloks.includes('Counter') ? 'Показать Counter' : 'Спрятать Counter'}
        </Button>

        {!bloks.includes('Toggle') && <Toggle/>}
        <Button onClick={() => toggleBlock('Toggle')}>
          {bloks.includes('Toggle') ? 'Показать Toggle' : 'Спрятать Toggle'}
        </Button>

        {!bloks.includes('Form') && <Form/>}
        <Button onClick={() => toggleBlock('Form')}>
          {bloks.includes('Form') ? 'Показать Form' : 'Спрятать Form'}
        </Button>

        {!bloks.includes('ToDo') && <ToDo/>}
        <Button onClick={() => toggleBlock('ToDo')}>
          {bloks.includes('ToDo') ? 'Показать ToDo' : 'Спрятать ToDo'}
        </Button>
        
        {!bloks.includes('HardForm') && <HardForm/>}
        <Button onClick={() => toggleBlock('HardForm')}>
          {bloks.includes('HardForm') ? 'Показать HardForm' : 'Спрятать HardForm'}
        </Button>

        {!bloks.includes('Fetch') && <Fetch/>}
        <Button onClick={() => toggleBlock('Fetch')}>
          {bloks.includes('Fetch') ? 'Показать Fetch' : 'Спрятать Fetch'}
        </Button>

        {!bloks.includes('EmailForm') && <EmailForm/>}
        <Button onClick={() => toggleBlock('EmailForm')}>
          {bloks.includes('EmailForm') ? 'Показать EmailForm' : 'Спрятать EmailForm'}
        </Button>

        {!bloks.includes('Taimer') && <Taimer/>}
        <Button onClick={() => toggleBlock('Taimer')}>
          {bloks.includes('Taimer') ? 'Показать Taimer' : 'Спрятать Taimer'}
        </Button>

        {!bloks.includes('ConditionalRendering') && <ConditionalRendering/>}
        <Button onClick={() => toggleBlock('ConditionalRendering')}>
          {bloks.includes('ConditionalRendering') ? 'Показать ConditionalRendering' : 'Спрятать ConditionalRendering'}
        </Button>
        
        {!bloks.includes('ToDoWithDelete') && <ToDoWithDelete/>}
        <Button onClick={() => toggleBlock('ToDoWithDelete')}>
          {bloks.includes('ToDoWithDelete') ? 'Показать ToDoWithDelete' : 'Спрятать ToDoWithDelete'}
        </Button>

        {!bloks.includes('LoadData') && <LoadData/>}
        <Button onClick={() => toggleBlock('LoadData')}>
          {bloks.includes('LoadData') ? 'Показать LoadData' : 'Спрятать LoadData'}
        </Button>

    </StyleContainer>
  )
}
