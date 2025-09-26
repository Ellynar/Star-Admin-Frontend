import React from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LogoImgtxt from '../assets/Magiteque-logo-text.png';
import ChatIcon from '../assets/chat.png';
import HealthIcon from '../assets/health.png';
import BookIcon from '../assets/book.png';
import VideoIcon from '../assets/video.png';
import UserIcon from '../assets/user.png';

const Chat = () => <div className="panel__empty"><div className="bubble bubble--lg"/><div className="bubble bubble--md"/><p>Stay in touch with your health coaching team.</p><small>Your conversations are private & confidential.</small></div>;
const Health = () => <div className="panel__empty"><p>Health</p></div>;
const Learn = () => <div className="panel__empty"><p>Learn</p></div>;
const Consult = () => <div className="panel__empty"><p>Consultations</p></div>;
const Profile = () => <div className="panel__empty"><p>Profile</p></div>;

const Panel: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="panel">
      <aside className="panel__sidebar">
        <div className="panel__logo">
          <img src={LogoImgtxt} alt="Logo" />
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
          <Route path="chat" element={<Chat/>} />
          <Route path="health" element={<Health/>} />
          <Route path="learn" element={<Learn/>} />
          <Route path="consultations" element={<Consult/>} />
          <Route path="profile" element={<Profile/>} />
        </Routes>
      </main>
    </div>
  );
};

export default Panel;
