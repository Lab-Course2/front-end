import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/CreateDoctor.css';
import Sidebar from '../Sidebar';
const CreateDoctor = (userId) => {
  const [doctors, setDoctors] = useState([]);
  const actualUserId = userId.userId;
  const [newDoctor, setNewDoctor] = useState({
    userName: '',
    name: '',
    surname: '',
    role: 'Doctor',
    personalNumber: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    specialisation: '',
    gender: '',
    address: '',
    clinicId: actualUserId,
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        'https://localhost:7207/api/Doctor/GetAllDoctors'
      );
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error('Failed to fetch doctors:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({
      ...newDoctor,
      [name]: value,
    });
  };

  const handleCreateDoctor = async () => {
    try {
      const response = await fetch(
        'https://localhost:7207/api/Doctor/CreateDoctor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDoctor),
        }
      );

      if (response.ok) {
        fetchDoctors();
        setNewDoctor({
          userName: '',
          name: '',
          surname: '',
          role: 'Doctor',
          personalNumber: '',
          email: '',
          password: '',
          phoneNumber: '',
          dateOfBirth: '',
          specialisation: '',
          gender: '',
          address: '',
          clinicId: actualUserId,
        });

        window.location.href = '/doctor-list';
      } else {
        console.error('Failed to create doctor:', response.statusText);
      }
    } catch (error) {
      console.error('Error during create:', error);
    }
  };

  return (
    <div
      className='create-doctor-container'
      style={{ marginTop: '5%', marginLeft: '5%' }}
    >
      <div className='row'>
        <div className='col-md-3'>
          <Sidebar userRole='Clinic' />
        </div>
        <div className='col-md-9'>
          <h2>Create Doctor</h2>
          <form>
            <div className='form-group'>
              <label htmlFor='userName'>User Name:</label>
              <input
                type='text'
                id='userName'
                name='userName'
                value={newDoctor.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                name='name'
                value={newDoctor.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='surname'>Surname:</label>
              <input
                type='text'
                id='surname'
                name='surname'
                value={newDoctor.surname}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='personalNumber'>Personal Number:</label>
              <input
                type='number'
                id='personalNumber'
                name='personalNumber'
                value={newDoctor.personalNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                value={newDoctor.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                name='password'
                value={newDoctor.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phoneNumber'>Phone Number:</label>
              <input
                type='text'
                id='phoneNumber'
                name='phoneNumber'
                value={newDoctor.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='dateOfBirth'>Date of Birth:</label>
              <input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                value={newDoctor.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='specialisation'>Specialisation:</label>
              <input
                type='text'
                id='specialisation'
                name='specialisation'
                value={newDoctor.specialisation}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Gender</label>
              <br></br>
              <div className='btn-group' role='group'>
                <input
                  type='radio'
                  id='male'
                  name='gender'
                  value='male'
                  onChange={handleInputChange}
                  checked={newDoctor.gender === 'male'}
                  className='btn-check'
                  required
                />
                <label htmlFor='male' className='btn btn-outline-primary'>
                  Male
                </label>
                <input
                  type='radio'
                  id='female'
                  name='gender'
                  value='female'
                  onChange={handleInputChange}
                  checked={newDoctor.gender === 'female'}
                  className='btn-check'
                  required
                />
                <label htmlFor='female' className='btn btn-outline-primary'>
                  Female
                </label>
              </div>
              <br />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <input
                type='text'
                id='address'
                name='address'
                value={newDoctor.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='clinicId'>Clinic ID:</label>
              <input
                type='text'
                id='clinicId'
                name='clinicId'
                value={newDoctor.clinicId}
                readOnly
              />
            </div>
            <button
              type='button'
              className='create-button'
              onClick={handleCreateDoctor}
            >
              Create Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;
