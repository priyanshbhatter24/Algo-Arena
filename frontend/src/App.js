import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Views/Landing';
import Login from './Views/Login';
import Signup from './Views/Signup';
import FindBattle from './Views/FindBattle';
import Battle from './Views/Battle';
import Winlosspage from './Views/Winlosspage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findbattle" element={<FindBattle />} />
        <Route path = "/battle" element={<Battle />} />
        <Route path = "/winloss" element={<Winlosspage />} />
      </Routes>
    </Router>
  );
}

export default App;
