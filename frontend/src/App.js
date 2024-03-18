
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateStudent from './components/pages/CreateStudent';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/CreateStudent' exact element={<CreateStudent />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
