import React, { useState} from 'react';
import './Css/Register.css';
import RegistrationLinks from './RegistrationLinks';

const RegisterPatient = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '', // Added for gender selection
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your registration logic here
    console.log('Form submitted with data:', formData);
    // Reset form fields if needed
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
    });
  };

  return (
    <div className="container">

      <div className="card mt-4">
      <RegistrationLinks/>
        <div className="card-body " style={{marginTop:'10%'}}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-input" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />

            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-input" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-input" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-input" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <label className="form-label">Gender</label>
            <div className="btn-group" role="group">
              <input type="radio" id="male" name="gender" value="male" onChange={handleInputChange} checked={formData.gender === 'male'} className="btn-check" required />
              <label htmlFor="male" className="btn btn-outline-primary">Male</label>

              <input type="radio" id="female" name="gender" value="female" onChange={handleInputChange} checked={formData.gender === 'female'} className="btn-check" required />
              <label htmlFor="female" className="btn btn-outline-primary">Female</label>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;