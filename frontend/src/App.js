
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateStudent from './components/pages/CreateStudent';
import Students from './components/pages/Students';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/CreateStudent' exact element={<CreateStudent />}/>
        <Route path='/Students' exact element={<Students />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
