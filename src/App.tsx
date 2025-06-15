import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TalentPoolPage from './pages/TalentPoolPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import DonatePage from './pages/DonatePage'; // Will use this for the Support Us page
import CVTailorPage from './pages/CVTailorPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CopyrightFooter from './components/CopyrightFooter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/talent-pool" element={<TalentPoolPage />} />
          <Route path="/resume-upload" element={<ResumeUploadPage />} />
          <Route path="/support" element={<DonatePage />} /> {/* Using DonatePage for /support route */}
          <Route path="/cv-tailor" element={<CVTailorPage />} />
        </Routes>
        <Footer />
        <CopyrightFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
