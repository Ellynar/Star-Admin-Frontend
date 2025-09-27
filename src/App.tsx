import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Panel from './pages/Panel';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/panel/*" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
