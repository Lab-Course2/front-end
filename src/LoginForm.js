import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import EmailConfirmationMessage from './EmailConfirmationMessage'; 

const LoginForm = ({handleLogin}) => {

  const [showEmailConfirmationMessage, setShowEmailConfirmationMessage] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

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
        const token = jsonResponse.token;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const emailConfirmation = decodedToken.EmailConfirmation;
   
        if(emailConfirmation === "False"){
          setShowEmailConfirmationMessage(true); 
           console.log("False");

        }else{
          setShowEmailConfirmationMessage(false); 

          localStorage.setItem('token', decodedToken);
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          localStorage.setItem('username', username);
    
            
            handleLogin(role, decodedToken, userId);
            console.log('Login successful');
            console.log(role);
            console.log(userId);
        }

     

      } else {
        setShowEmailConfirmationMessage(false); 
        setLoginFailed(true);
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4 bg-light p-4 rounded">
        <div className="card-body ">
        {showEmailConfirmationMessage && (
          <div className="alert alert-warning" role="alert">
              <EmailConfirmationMessage/>
          </div>
        )}
       <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-input" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-input" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <div className="d-flex mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            </div>
          </form>
          <br></br>
          {loginFailed && <div className="alert alert-danger mt-3" role="alert">Login failed. Please check your credentials and try again.</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;