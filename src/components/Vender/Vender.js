import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User2, ArrowRight } from 'lucide-react';
import '../Admin/Admin.css';

function Vender() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/vendors/login`, formData);
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', formData.username);
        navigate('/vender-dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-container">
            <img src={require('../../assets/images/log.png')} alt="img" />
          </div>
          <p className="logo-description">
            Your gateway to seamless digital experiences. Join us today and unlock a world of possibilities.
          </p>
          <div className="stats-container">
            <div className="stats-content">
              <div className="stats-dot"></div>
              <p>Over 10,000 users trust our platform</p>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="auth-section">
          {/* Form Container */}
          <div className="form-container">
            <div className="form-section">
              <User2 style={{ width: '80px', height: '80px', marginLeft: '40%', marginBottom: '20px' }} />
              <h1 className="form-title">Theater Owner Login</h1>
              <p className="form-subtitle">Please enter your details to sign in</p>

              <form onSubmit={handleSubmit} className="form-fields">
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-input"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-container">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="Password@1234"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-footer">
                  <div>
                    <a href="#" className="form-link">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button type="submit" className="submit-button">
                  <span>Sign in</span>
                  <ArrowRight size={18} className="button-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vender;
