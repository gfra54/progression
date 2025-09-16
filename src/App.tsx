import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Progression from './views/ProgressionView';
import ChoixMatiere from './views/ChoixMatiereView';

/**
 * Configure le routage principal de l'application et associe chaque URL à sa vue.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ChoixMatiere />} />
        <Route path='/matiere/:matiereId' element={<Progression />} />
        <Route path='/matiere/:matiereId/semaine/:semaineId' element={<Progression />} />
      </Routes>
    </Router>
  );
}
