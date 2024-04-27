import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors from the backend API
    // Example: fetch('/api/doctors').then(response => response.json()).then(data => setDoctors(data));
  }, []);

  const handleDelete = (id) => {
    // Implement delete operation and update the state
    // Example: fetch(/api/doctors/${id}, { method: 'DELETE' }).then(() => setDoctors(doctors.filter(doctor => doctor.id !== id)));
  };

  return (
    <div>
      <h2>Doctors List</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialty}
            <button onClick={() => handleDelete(doctor.id)}>Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
