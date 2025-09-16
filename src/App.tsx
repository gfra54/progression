import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Programmation from './components/Programmation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Programmation />} />
        <Route path='/matiere/:matiereId' element={<Programmation />} />
        <Route path='/matiere/:matiereId/semaine/:semaineId' element={<Programmation />} />
      </Routes>
    </Router>
  );
}
