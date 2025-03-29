import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import Profile from './components/Profile';
import './global.css';

function App() {
  const user = {
    name: 'Pratham',
    email: 'pratham@google.com',
    avatar: null,
    bio: 'Software Developer',
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;