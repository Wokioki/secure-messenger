import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';
import ChatBox from '../Chat/Chat.js';

const AuthBox = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className={`auth-container ${user ? 'logged-in' : ''}`}>
      {user ? (
        <ChatBox user={user} onLogout={handleLogout} />
      ) : (
        <div className="auth-box">
          <div className="tabs">
            <button
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={activeTab === 'register' ? 'active' : ''}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          <div className="form-area">
            {activeTab === 'login' ? (
              <LoginForm onLogin={setUser} />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthBox;