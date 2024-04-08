import React, { useState } from 'react';
import './Css/Register.css';
import RegistrationLinks from './RegistrationLinks';

const RegisterClinic = () => {
  const [formData, setFormData] = useState({
    clinicName: '',
    email: '',
    password: '',
    specialty: '',
    licenseNumber: '',
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
    console.log('Form submitted with data:', formData);
    setFormData({
      clinicName: '',
      email: '',
      password: '',
      specialty: '',
      licenseNumber: '',
    });
  };

  return (
    <div className="container">
      <div className="card mt-4">
      <RegistrationLinks />
        <div className="card-body" style={{marginTop:'10%'}}>        
          <form onSubmit={handleSubmit}>
            <label htmlFor="clinicName" className="form-label">Clinic Name</label>
            <input type="text" className="form-input" id="clinicName" name="clinicName" value={formData.clinicName} onChange={handleInputChange} required />

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-input" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-input" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <label htmlFor="specialty" className="form-label">Specialty</label>
            <input type="text" className="form-input" id="specialty" name="specialty" value={formData.specialty} onChange={handleInputChange} required />

            <label htmlFor="licenseNumber" className="form-label">License Number</label>
            <input type="text" className="form-input" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required />

            <div className="d-flex mt-3 justify-content-end">
              <button type="submit" className="btn btn-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClinic;