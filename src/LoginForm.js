import React, { useState } from 'react';
import './Css/Register.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement your login logic here
      console.log('Form submitted with data:', formData);
      // You may want to add further logic for authentication
    };
  
    return (
      <div className="container">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-input" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
  
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