import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import MyPage from './pages/MyPage';
import Apply from './pages/Apply';
import Aurora from './pages/Aurora';
import { FirebaseProvider } from './lib/FirebaseContext';

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans scroll-smooth">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/aurora" element={<Aurora />} />
              <Route path="/mypage/aurora" element={<Aurora />} />
            </Routes>
          </main>
          <ChatWidget />
          <Footer />
        </div>
      </Router>
    </FirebaseProvider>
  );
}
