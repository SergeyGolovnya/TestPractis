// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './PagesAndTopics/HomePage';
import { AccordionOptimization } from './PagesAndTopics/ReactTSPractice/AccordionOptimizationApp/Page/AccordionOptimization';
import { StyleReactExample } from './PagesAndTopics/ReactTSPractice/StyleReactExample/Page/StyleReactExample';
import { ReactSobesPractisPage } from './PagesAndTopics/ReactTSPractice/ReactSobesPractis/Pages/ReactSobesPractisPage';
import TictactoeApp from './PagesAndTopics/ReactTSPractice/TictactoeApp/TictactoeApp';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/accordion" element={<AccordionOptimization />} />
      <Route path="/stylereactexample" element={<StyleReactExample />} />
      <Route path="/reactsobespractis" element={<ReactSobesPractisPage />} />
      <Route path="/tictactoe" element={<TictactoeApp />} />

    </Routes>
  )
}

export default App