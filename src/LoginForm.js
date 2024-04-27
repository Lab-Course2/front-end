import React, { useState } from 'react';

const LoginForm = ({handleLogin}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7190/api/Authentication/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const { token, role, userId } = jsonResponse;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        
        handleLogin(role, token, userId);
        console.log('Login successful');
      } else {
        // Handle unsuccessful login, display error message, etc.
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-input" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-input" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <div className="d-flex mt-3">
              <button type="submit" className="btn btn-submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;