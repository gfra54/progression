import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Programmation from './components/Programmation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<main className="m-3"><h1 className="text-2xl font-bold text-gray-800 mb-2">Choix de la matières</h1><div>Sur cette page, on pourrait avoir la possibilité de changer de Matière, via une grille ou une liste des matières disponibles</div></main>} />
        <Route path='/matiere/:matiereId' element={<Programmation />} />
        <Route path='/matiere/:matiereId/semaine/:semaineId' element={<Programmation />} />
      </Routes>
    </Router>
  );
}
