import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Register.css';
import RegistrationLinks from '../RegistrationLinks';

const RegisterClinic = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserName: '', // Added userName
    Name: '', // Added name
    Surname: '', // Added surname
    Role: 'Clinic', // Added role
    Email: '',
    Password: '',
    Address: '', // Added address
    PhoneNumber: '', // Added phoneNumber
    Location: '', // Added location
    CreatedDate: '',
    OtherDetails: '', // Added otherDetails
    Doctors: [], // Added doctors
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
      const convertKeysToPascalCase = (data) => {
        const convertedData = {};
        for (const key in data) {
          const pascalCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
          convertedData[pascalCaseKey] = data[key];
        }
        return convertedData;
      };

      const response = await fetch(
        'https://localhost:7207/api/Clinic/CreateClinic',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(convertKeysToPascalCase(formData)),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        navigate('/login');
        setFormData({
          UserName: '', // Added userName
          Name: '', // Added name
          Surname: '', // Added surname
          Role: 'Clinic', // Added role
          Email: '',
          Password: '',
          Address: '', // Added address
          PhoneNumber: '', // Added phoneNumber
          Location: '', // Added location
          CreatedDate: '',
          OtherDetails: '', // Added otherDetails
          Doctors: [], // Added doctors
        });
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='container'>
      <div className='card mt-4'>
        <RegistrationLinks />
        <div className='card-body' style={{ marginTop: '10%' }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor='userName' className='form-label'>
              User Name
            </label>
            <input
              type='text'
              className='form-input'
              id='userName'
              name='userName'
              value={formData.userName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-input'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='surname' className='form-label'>
              Surname
            </label>
            <input
              type='text'
              className='form-input'
              id='surname'
              name='surname'
              value={formData.surname}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-input'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-input'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='address' className='form-label'>
              Address
            </label>
            <input
              type='text'
              className='form-input'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='phoneNumber' className='form-label'>
              Phone Number
            </label>
            <input
              type='text'
              className='form-input'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='location' className='form-label'>
              Location
            </label>
            <input
              type='text'
              className='form-input'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='createdDate' className='form-label'>
              Created Date
            </label>
            <input
              type='date'
              className='form-input'
              id='createdDate'
              name='createdDate'
              value={formData.createdDate}
              onChange={handleInputChange}
              required
            />

            <label htmlFor='otherDetails' className='form-label'>
              Other Details
            </label>
            <input
              type='text'
              className='form-input'
              id='otherDetails'
              name='otherDetails'
              value={formData.otherDetails}
              onChange={handleInputChange}
              required
            />

            <div className='d-flex mt-3 justify-content-end'>
              <button type='submit' className='btn btn-primary w-100'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClinic;
