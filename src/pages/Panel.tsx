import React from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LearnPage from './LearnPage';
import AssessmentsPage from './AssessmentsPage';
import GroundWorkPage from './GroundWorkPage';
import ChatPage from './ChatPage';
import LogoImgtxt from '../assets/Magiteque-logo-text.png';
import LogoSmall from '../assets/Magiteque-logo-text-small.png';
import ChatIcon from '../assets/chat.png';
import HealthIcon from '../assets/health.png';
import BookIcon from '../assets/book.png';
import VideoIcon from '../assets/video.png';
import UserIcon from '../assets/user.png';

const Wip: React.FC<{ label: string }> = ({ label }) => (
  <div className="wip">
    <div className="wip__emoji">🎉✨</div>
    <h2>{label} is still in development</h2>
    <p>We’re crafting something awesome. Check back soon!</p>
    <div className="wip__confetti" aria-hidden="true" />
  </div>
);

const Panel: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="panel">
      <aside className="panel__sidebar">
        <div className="panel__logo">
          <img className="logo-full" src={LogoImgtxt} alt="Logo" />
          <img className="logo-small" src={LogoSmall} alt="Logo small" />
        </div>
        <nav className="panel__nav">
          <NavLink to="chat" className={({isActive}) => isActive ? 'active' : ''}><img className="icon-img" src={ChatIcon} alt="" /><span>Chat</span></NavLink>
          <NavLink to="health" className={({isActive}) => isActive ? 'active' : ''}><img className="icon-img" src={HealthIcon} alt="" /><span>Health</span></NavLink>
          <NavLink to="learn" className={({isActive}) => isActive ? 'active' : ''}><img className="icon-img" src={BookIcon} alt="" /><span>Learn</span></NavLink>
          <NavLink to="consultations" className={({isActive}) => isActive ? 'active' : ''}><img className="icon-img" src={VideoIcon} alt="" /><span>Consultations</span></NavLink>
          <NavLink to="profile" className={({isActive}) => isActive ? 'active' : ''}><img className="icon-img" src={UserIcon} alt="" /><span>Profile</span></NavLink>
        </nav>
        <div className="panel__footer">
          <button className="panel__logout" onClick={() => navigate('/')}>Logout</button>
        </div>
      </aside>
      <main className="panel__content">
        <Routes>
          <Route path="" element={<Navigate to="chat" replace />} />
          <Route path="chat" element={<ChatPage/>} />
          <Route path="health" element={<Wip label="Health"/>} />
          <Route path="learn" element={<LearnPage/>} />
          <Route path="learn/assessments" element={<AssessmentsPage/>} />
          <Route path="learn/ground-work" element={<GroundWorkPage/>} />
          <Route path="consultations" element={<Wip label="Consultations"/>} />
          <Route path="profile" element={<Wip label="Profile"/>} />
        </Routes>
      </main>
    </div>
  );
};

export default Panel;
