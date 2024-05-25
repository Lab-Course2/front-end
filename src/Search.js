import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

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
      // Përcakto logjikën për kërkimin bazuar në llojin e klinikës, lokacionin dhe emrin e klinikës
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
            <option value="diagnostic">Diagnostic Center</option>
            <option value="dental">Dental Clinic</option>
            <option value="eye">Eye Clinic</option>
            <option value="dermatology">Dermatology Clinic</option>
            <option value="oncology">Oncology Clinic</option>
              {/* Shtoni opsione të tjera të klinikës këtu */}
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
    // Implemento logjikën për kërkimin e mjekëve
  };

  const loadMore = () => {
    // Implemento logjikën për të ngarkuar më shumë mjekë
  };
const DoctorWidget = ({ doctor }) => {
  return (
    <div className="card mb-3 mr-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={doctor.image} className="card-img" alt="Picture" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{doctor.name}</h5>
            <p className="card-text">{doctor.speciality}</p>
            <p className="card-text"><small className="text-muted">{doctor.location}</small></p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Reating: {doctor.rating}/5 ({doctor.reviews} reviews)</li>
              <li className="list-group-item">Price: {doctor.price}</li>
            </ul>
            <div className="card-body">
              <a href={`doctor-profile/${doctor.id}`} className="card-link">Shiko Profilin</a>
              <a href="booking.html" className="card-link">Order Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Kryej kërkesën në API për të marrë listën e mjekëve dhe përditëso "doctors"
  }, []);

  // Implemento funksionin për të ngarkuar më shumë mjekë

  return (
    <div className="container-fluid">
      <div className="row">
      <div className="row-md-1" style={{ position: 'sticky', top: 40, height: 'calc(15vh - 60px)' }}>
                <Sidebar userRole='Patient' />
            </div>
            <div className="col-md-12 col-lg-4 col-xl-3" style={{ position: 'sticky', top: 40, height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            {/* Pjesa e filtrave të kërkimit */}
            <SearchFilter onSearch={handleSearch} />
            </div>
        <div className="col-md-12 col-lg-8 col-xl-9 d-flex flex-wrap " style={{ minHeight: '200px' }}>
          {/* Lista e mjekëve */}
          {doctors.map(doctor => (
            <DoctorWidget key={doctor.id} doctor={doctor} />
          ))}
           <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Kalo në rresht të ri për elementin e ardhshëm */}
  <div className="card mb-3 mr-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="placeholder.jpg" className="card-img" alt="Picture" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Dr. John Doe</h5>
          <p className="card-text">Cardiologist</p>
          <p className="card-text"><small className="text-muted">New York, NY</small></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: 4.5/5 (25 reviews)</li>
            <li className="list-group-item">Price: $150</li>
          </ul>
          <div className="card-body">
            <a href="doctor-profile/123" className="card-link">View Profile</a>
            <a href="booking.html" className="card-link">Order Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
          {/* Butoni për të ngarkuar më shumë mjekë */}
          <div className="load-more text-center">
            <button className="btn btn-primary btn-sm" onClick={loadMore}>Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;