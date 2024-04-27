import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../Css/Register.css';
import RegistrationLinks from '../RegistrationLinks';
import LoginForm from '../LoginForm';

const RegisterPatient = () => {
  // State for form fields
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserName: '',
    Name: '',
    Surname: '',
    Role: 'Patient',
    PersonalNumber: '',
    Email: '',
    Password: '',
    Address:'',
    PhoneNumber: '',
    Gender: '',
    DateOfBirth: '',
  });


  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const convertKeysToPascalCase = (data) => {
        const convertedData = {};
        for (const key in data) {
          const pascalCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
          convertedData[pascalCaseKey] = data[key];
        }
        return convertedData;
      };

      // Usage
      const response = await fetch('https://localhost:7190/CreatePatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertKeysToPascalCase(formData)),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        navigate('/login');
        // Reset form fields if needed
        setFormData({
          UserName: '',
          Name: '',
          Surname: '',
          Role: 'Patient',
          PersonalNumber: '',
          Email: '',
          Password: '',
          Address:'',
          PhoneNumber: '',
          Gender: '',
          DateOfBirth: '',
        });
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <RegistrationLinks />
        <div className="card-body " style={{ marginTop: '10%' }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-input"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="surname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              className="form-input"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="personalNumber" className="form-label">
              Personal Number
            </label>
            <input
              type="text"
              className="form-input"
              id="personalNumber"
              name="personalNumber"
              value={formData.personalNumber}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-input"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <label className="form-label">Gender</label>
            <div className="btn-group" role="group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleInputChange}
                checked={formData.gender === 'male'}
                className="btn-check"
                required
              />
              <label htmlFor="male" className="btn btn-outline-primary">
                Male
              </label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleInputChange}
                checked={formData.gender === 'female'}
                className="btn-check"
                required
              />
              <label htmlFor="female" className="btn btn-outline-primary">
                Female
              </label>
            </div>

            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input type="date" className="form-input" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />

            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;