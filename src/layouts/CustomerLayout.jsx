import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const CustomerLayout = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="customer-layout">
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link to="/customer">
              <h1>Tutoring Center</h1>
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/customer">Home</Link></li>
              <li><Link to="/customer/tutors">Find Tutors</Link></li>
              <li><Link to="/customer/request-tutoring">Request Tutoring</Link></li>
            </ul>
          </nav>
          <div className="user-nav">
            <span className="welcome-message">Hello, {currentUser?.name || 'User'}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 Tutoring Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
