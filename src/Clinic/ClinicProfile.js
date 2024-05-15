import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';

const ClinicProfile = ({ userId }) => {
    const [clinic, setClinic] = useState(null);
    const [updatedOtherDetails, setUpdatedOtherDetails] = useState('');
  
    useEffect(() => {
      const fetchClinicData = async () => {
        try {
          // Fetch clinic details based on the clinicId
          const response = await fetch(`https://localhost:7190/api/Clinic/GetClinicById?clinicId=${userId}`);
  
          if (response.ok) {
            const clinicData = await response.json();
            setClinic(clinicData);
          } else {
            console.error('Failed to fetch clinic details:', response.statusText);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };
      fetchClinicData();
    }, [userId]);
  
    const handleUpdateProfile = async () => {
      try {
        const response = await fetch(`https://localhost:7190/api/Clinic/UpdateClinic/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otherDetails: updatedOtherDetails }),
        });
  
        if (response.ok) {
          const updatedData = await response.json();
          setClinic((prevClinic) => ({
            ...prevClinic,
            otherDetails: updatedData.otherDetails,
          }));
          console.log('Clinic updated successfully!', updatedData);
        } else {
          console.error('Failed to update clinic:', response.statusText);
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    };
    return (
        <div className="container mt-4" style={{ maxWidth: '1000px', marginLeft:'30%', marginTop:'5%' }}>
          <Sidebar />
          <div className="mt-4">
            {clinic ? (
              <>
                <div className="my-5">
                  <h3>Clinic Profile</h3>
                  <hr />
                </div>
                <form className="file-upload">
                  <div className="row mb-5 gx-5">
                    <div className="col-xxl-8 mb-5 mb-xxl-0">
                      <div className="bg-secondary-soft px-4 py-5 rounded">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Username *</label>
                            <input type="text" className="form-control" value={clinic.userName} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Name *</label>
                            <input type="text" className="form-control" value={clinic.name} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Surname *</label>
                            <input type="text" className="form-control" value={clinic.surname} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email *</label>
                            <input type="email" className="form-control" value={clinic.email} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Address *</label>
                            <input type="text" className="form-control" value={clinic.address} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone Number *</label>
                            <input type="text" className="form-control" value={clinic.phoneNumber} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Location *</label>
                            <input type="text" className="form-control" value={clinic.location} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Created Date *</label>
                            <input type="text" className="form-control" value={clinic.createdDate} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Other Details *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={updatedOtherDetails}
                              onChange={(e) => setUpdatedOtherDetails(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gap-3 d-md-flex justify-content-md-end text-center">
                      <button type="button" className="btn btn-primary btn-lg" style={{ marginRight: '5%' }} onClick={handleUpdateProfile}>
                        Update profile
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <p>clinic details zamira</p>
            )}
          </div>
        </div>
      );
};

export default ClinicProfile;