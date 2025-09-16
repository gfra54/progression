import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Progression from './components/Progression';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Progression />} />
        <Route path='/matiere/:matiereId' element={<Progression />} />
        <Route path='/matiere/:matiereId/semaine/:semaineId' element={<Progression />} />
      </Routes>
    </Router>
  );
}
