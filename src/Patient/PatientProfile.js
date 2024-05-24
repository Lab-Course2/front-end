import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'; // Importimi i Sidebar

function PatientProfile({ userId }) {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    surname: '',
    personalNumber: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: null,
    gender: '',
    dateOfBirth: '',
    role: 'Patient',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7207/api/Patient/GetPatientById/?patientId=${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const patientData = await response.json();
          setFormData(patientData);
          console.log(patientData);
        } else {
          console.error('Failed to fetch patient data:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetching patient data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validimi i të dhënave përpara dërgimit të formës
    const errors = {};
    if (!formData.userName) {
      errors.userName = 'Username is required';
    }
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.surname) {
      errors.surname = 'Surname is required';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    }
    if (!formData.personalNumber || formData.personalNumber.length !== 10) {
      errors.personalNumber = 'Personal number must be 10 characters long';
    }
    if (formData.gender === 'Select Gender') {
      errors.gender = 'Please select gender';
    }
    setErrors(errors);

    // Nëse nuk ka gabime, atëherë dërgoni formën
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          `https://localhost:7207/api/Patient/UpdatePatient/${userId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setUpdateSuccess(true);
        } else {
          console.error('Failed to update Patient:', response.statusText);
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    }
  };

  return (
    <div className='col-py-9'>
      <div className='row-md-1'>
        <Sidebar userRole='Patient' />
      </div>
      <div className='row-md-5 d-flex justify-content-center'>
        <div className='w-75'>
          <div className='my-5'>
            <h3>Patient Profile</h3>
            <hr />
          </div>
          {updateSuccess && (
            <div className='alert alert-success' role='alert'>
              Patient updated successfully!
            </div>
          )}
          <form className='file-upload' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Username</label>
              <input
                type='text'
                className='form-control'
                name='userName'
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <div className='text-danger'>{errors.userName}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className='text-danger'>{errors.name}</div>}
            </div>
            <div className='form-group'>
              <label>Surname</label>
              <input
                type='text'
                className='form-control'
                name='surname'
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && (
                <div className='text-danger'>{errors.surname}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Personal Number</label>
              <input
                type='text'
                className='form-control'
                name='personalNumber'
                value={formData.personalNumber}
                onChange={handleChange}
              />
              {errors.personalNumber && (
                <div className='text-danger'>{errors.personalNumber}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                className='form-control'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className='text-danger'>{errors.email}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Address</label>
              <input
                type='text'
                className='form-control'
                name='address'
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <div className='text-danger'>{errors.address}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Phone Number</label>
              <input
                type='text'
                className='form-control'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <div className='text-danger'>{errors.phoneNumber}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Gender</label>
              <select
                className='form-control'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
              {errors.gender && (
                <div className='text-danger'>{errors.gender}</div>
              )}
            </div>
            <div className='form-group'>
              <label>Date of Birth</label>
              <input
                type='date'
                className='form-control'
                name='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              Update
            </button>
          </form>
          <div className='my-5'></div>
          <div className='my-5'></div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
