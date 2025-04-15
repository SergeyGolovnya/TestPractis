// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './PagesAndTopics/HomePage';
import { AccordionOptimization } from './PagesAndTopics/ReactTSPractice/AccordionOptimizationApp/Page/AccordionOptimization';
import { StyleReactExample } from './PagesAndTopics/ReactTSPractice/StyleReactExample/Page/StyleReactExample';
import { ReactSobesPractisPage } from './PagesAndTopics/ReactTSPractice/ReactSobesPractis/Pages/ReactSobesPractisPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/accordion" element={<AccordionOptimization />} />
      <Route path="/stylereactexample" element={<StyleReactExample />} />
      <Route path="/reactsobespractis" element={<ReactSobesPractisPage />} />
    </Routes>
  )
}

export default App