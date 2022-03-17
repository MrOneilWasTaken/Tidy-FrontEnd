import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <h1>Tidy</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="leaderboard">Leaderboard</Link></li>
              <li><Link to="profile">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
