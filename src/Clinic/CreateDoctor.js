import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/CreateDoctor.css';

const CreateDoctor = () => {
    const [doctors, setDoctors] = useState([]);
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
        clinicId: '',
      });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5179/api/Doctor/GetAllDoctors');
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
        console.log('Creating Doctor:', newDoctor);

      const response = await fetch('http://localhost:5179/api/Doctor/CreateDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

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
        clinicId: '',
        });
      } else {
        console.error('Failed to create doctor:', response.statusText);
      }
    } catch (error) {
      console.error('Error during create:', error);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:5179/api/DoctorDelete/${doctorId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDoctors();
      } else {
        console.error('Failed to delete doctor:', response.statusText);
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  return (
    <div className="create-doctor-container">
      <h2>Create Doctor</h2>
      <form>
  <div className="form-group">
    <label htmlFor="userName">User Name:</label>
    <input type="text" id="userName" name="userName" value={newDoctor.userName} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" value={newDoctor.name} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="surname">Surname:</label>
    <input type="text" id="surname" name="surname" value={newDoctor.surname} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="personalNumber">Personal Number:</label>
    <input type="number" id="personalNumber" name="personalNumber" value={newDoctor.personalNumber} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={newDoctor.email} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={newDoctor.password} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="phoneNumber">Phone Number:</label>
    <input type="text" id="phoneNumber" name="phoneNumber" value={newDoctor.phoneNumber} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="dateOfBirth">Date of Birth:</label>
    <input type="date" id="dateOfBirth" name="dateOfBirth" value={newDoctor.dateOfBirth} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="specialisation">Specialisation:</label>
    <input type="text" id="specialisation" name="specialisation" value={newDoctor.specialisation} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="gender">Gender:</label>
    <input type="text" id="gender" name="gender" value={newDoctor.gender} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="address">Address:</label>
    <input type="text" id="address" name="address" value={newDoctor.address} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="clinicId">Clinic ID:</label>
    <input type="text" id="clinicId" name="clinicId" value={newDoctor.clinicId} onChange={handleInputChange} />
  </div>
  <button type="button" className="create-button" onClick={handleCreateDoctor}>
    Create Doctor
  </button>
</form>


      <h2>Doctors</h2>
      <ul className="doctor-list">
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialisation}
            <button type="button" className="delete-button" onClick={() => handleDeleteDoctor(doctor.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateDoctor;