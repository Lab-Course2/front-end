import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import doc from '../src/Images/doc.jpg';

const SearchFilter = ({ onSearch }) => {
  const [clinicType, setClinicType] = useState('');
  const [location, setLocation] = useState('');
  const [clinicName, setClinicName] = useState('');

  const handleClinicTypeChange = (e) => {
    setClinicType(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleClinicNameChange = (e) => {
    setClinicName(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(clinicType, location, clinicName);
  };

  return (
    <div className="card search-filter">
      <div className="card-header">
        <h5 className="card-title mb-0">Search Clinics</h5>
      </div>
      <div className="card-body">
        <div className="filter-widget">
          <input type="text" className="form-control mb-3" placeholder="Search..." value={clinicName} onChange={handleClinicNameChange} />
        </div>
        <div className="filter-widget">
          <input type="text" className="form-control mb-3" placeholder="Location" value={location} onChange={handleLocationChange} />
        </div>
        <div className="filter-widget">
          <select className="form-control mb-3" value={clinicType} onChange={handleClinicTypeChange}>
            <option value="">Select Clinic Type</option>
            <option value="hospital">Hospital</option>
            <option value="clinic">Clinic</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="therapy">Therapy Center</option>
            <option value="diagnostic">Diagnostic Center</option>
            <option value="dental">Dental Clinic</option>
            <option value="eye">Eye Clinic</option>
            <option value="dermatology">Dermatology Clinic</option>
            <option value="oncology">Oncology Clinic</option>
            {/* Add more clinic types as needed */}
          </select>
        </div>
        <div className="btn-search">
          <button type="button" className="btn btn-block btn-primary" onClick={handleSearchClick}>Search</button>
        </div>
      </div>
    </div>
  );
};

const handleSearch = () => {
  // Implement search logic
};

const loadMore = () => {
  // Implement logic for loading more doctors
};


const DoctorWidget = ({ doctor }) => {
  return (
    <div className="card mb-3 mr-3" style={{ width: '100%' }}>
      <div className="row no-gutters">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{doctor.name}</h5>
            <p className="card-text">Specialization: {doctor.specialisation}</p>
            <p className="card-text">Job: {doctor.job}</p>
            <p className="card-text">
              <span role="img" aria-label="Location">📍</span> {doctor.location}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <p className="card-text">💲{doctor.price}</p>
            <Link to={`/doctor-profile/${doctor.id}`} className="btn btn-primary btn-block">Visit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors from your API and update the state
    const fetchedDoctors = [
      {
        id: '60df7136-6eeb-4297-9135-556b96bded37',
        name: 'Dr. John Doe',
        specialisation: 'Cardiology',
        job: 'Cardiologist',
        location: 'New York, NY',
        price: '$300-$1000',
        image: doc, // Replace with the actual path
      },
      {
        id: 2,
        name: 'Dr. Olivia Martinez',
        specialization: 'Cardiology',
        job: 'Cardiologist',
        location: 'New York, NY',
        price: '$50-$300',
        image: 'path/to/doctor2-image.jpg', // Replace with the actual path
      },
      {
        id: 3,
        name: 'Dr. Benjamin Harper',
        specialization: 'Cardiology',
        job: 'Cardiologist',
        location: 'New York, NY',
        price: '$100-$400',
        image: 'path/to/doctor3-image.jpg', // Replace with the actual path
      },
      {
        id: 4,
        name: 'Dr. Sophia Nguyen',
        specialization: 'Psychiatry',
        job: 'Psychiatrist',
        location: 'New York, NY',
        price: '$150-$250',
        image: 'path/to/doctor4-image.jpg', // Replace with the actual path
      },
      {
        id: 5,
        name: 'Dr. Alexander Reynolds',
        specialization: 'Psychiatry',
        job: 'Psychiatrist',
        location: 'New York, NY',
        price: '$100-$500',
        image: 'path/to/doctor5-image.jpg', // Replace with the actual path
      },
    ];
   

    setDoctors(fetchedDoctors);
  }, []);

  // Implement logic for loading more doctors
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="row-md-1" style={{ position: 'sticky', top: 40, height: 'calc(15vh - 60px)' }}>
          <Sidebar userRole='Patient' />
        </div>
        <div className="col-md-12 col-lg-4 col-xl-3" style={{ position: 'sticky', top: 40, height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <SearchFilter onSearch={handleSearch} />
        </div>
        <div className="col-md-12 col-lg-8 col-xl-9 d-flex flex-wrap">
          {doctors.map(doctor => (
            <div key={doctor.id} className="card mr-3 mb-3" style={{ maxWidth: '500px' }}>
              <div className="row no-gutters">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{doctor.name}</h5>
                    <p className="card-text">Specialization: {doctor.specialisation}</p>
                    <p className="card-text">Job: {doctor.job}</p>
                    <p className="card-text">
                      <span role="img" aria-label="Location"></span> 📍 {doctor.location}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <p className="card-text">💲{doctor.price}</p>
                    <Link to={`/doctor-profile/${doctor.id}`} className="btn btn-primary btn-block">View Profile</Link>
                    <a href="booking.html" className="btn btn-secondary btn-block">Book Appointment</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchList;