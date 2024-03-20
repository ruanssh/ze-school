
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateStudent from './components/pages/CreateStudent';
import CreateTeacher from './components/pages/teacher/CreateTeacher';
import CreateSubject from './components/pages/subject/CreateSubject';

import Students from './components/pages/Students';
import Teachers from './components/pages/teacher/Teachers';
import Subjects from './components/pages/subject/Subjects';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/CreateStudent' exact element={<CreateStudent />}/>
        <Route path='/CreateTeacher' exact element={<CreateTeacher />}/>
        <Route path='/CreateSubject' exact element={<CreateSubject />}/>

        <Route path='/Students' exact element={<Students />}/>]
        <Route path='/Teachers' exact element={<Teachers />}/>
        <Route path='/Subjects' exact element={<Subjects />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
