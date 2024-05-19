import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Css/EditDoctor.css";
import Sidebar from '../Sidebar';
const EditDoctor = ({ match }) => {
  const { id } = useParams();
  const [existingDoctor, setExistingDoctor] = useState({
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
    console.log('Doctor ID:', id);

    const fetchExistingDoctor = async () => {
      try {
        const response = await fetch(`https://localhost:7190/api/Doctor/GetDoctorById?doctorId=${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched existing doctor data:', data);
          setExistingDoctor(data);
        } else {
          console.error('Failed to fetch existing doctor:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    if (id) {
      fetchExistingDoctor();
    } else {
      console.warn('Doctor ID is missing.');
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExistingDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleUpdateDoctor = async () => {
    try {
      console.log('Updating Doctor:', existingDoctor);

      const response = await fetch(`https://localhost:7190/api/Doctor/UpdateDoctor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingDoctor),
      });

      if (response.ok) {
        const updatedData = await response.json();
        window.location.href = '/doctor-list';
        console.log('Doctor updated successfully!', updatedData);
        // Handle successful update, e.g., redirect or display a success message
      } else {
        console.error('Failed to update doctor:', response.statusText);
        // Handle the error, e.g., display an error message
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <div className="create-doctor-container" style={{marginTop:'5%', marginLeft:'25%'}}>
       <div className="col-md-3" style={{ width: '25%' }}>
          <Sidebar />
        </div>
     <h2>Update Doctor</h2>
      <form>
      <div className="mb-3">
        <label htmlFor="userName" className="form-label">User Name:</label>
        <input type="text" id="userName" name="userName" value={existingDoctor.userName} onChange={handleInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" id="name" name="name" value={existingDoctor.name} onChange={handleInputChange} className="form-control" />
      </div>
  <div className="form-group">
    <label htmlFor="surname">Surname:</label>
    <input type="text" id="surname" name="surname" value={existingDoctor.surname} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="personalNumber">Personal Number:</label>
    <input type="number" id="personalNumber" name="personalNumber" value={existingDoctor.personalNumber} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={existingDoctor.email} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={existingDoctor.password} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="phoneNumber">Phone Number:</label>
    <input type="text" id="phoneNumber" name="phoneNumber" value={existingDoctor.phoneNumber} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="dateOfBirth">Date of Birth:</label>
    <input type="date" id="dateOfBirth" name="dateOfBirth" value={existingDoctor.dateOfBirth} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="specialisation">Specialisation:</label>
    <input type="text" id="specialisation" name="specialisation" value={existingDoctor.specialisation} onChange={handleInputChange} />
  </div>
  <div className="form-group">
  <label className="form-label">Gender</label><br></br>
            <div className="btn-group" role="group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleInputChange}
                checked={existingDoctor.gender === 'male'}
                className="btn-check"
                required
              />
              <label htmlFor="male" className="btn btn-outline-primary">
                Male
              </label>

              <input type="radio" id="female" name="gender" value="female" onChange={handleInputChange} checked={existingDoctor.gender === 'female'} className="btn-check" required/>
              <label htmlFor="female" className="btn btn-outline-primary">
                Female
              </label>
            </div>
            <br/>
  </div>
  <div className="form-group">
    <label htmlFor="address">Address:</label>
    <input type="text" id="address" name="address" value={existingDoctor.address} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <label htmlFor="clinicId">Clinic ID:</label>
    <input type="text" id="clinicId" name="clinicId" value={existingDoctor.clinicId} readOnly />
  </div>
  <button type="button" className="update-button" onClick={handleUpdateDoctor}>
          Update Doctor
  </button>
</form>
      <Link to="/doctor-list">Back to Doctors List</Link>
    </div>
  );
};

export default EditDoctor;