import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';

const ClinicProfile = ({ userId }) => {
  const [clinic, setClinic] = useState(null);
  const [updatedClinic, setUpdatedClinic] = useState({
    userName: '',
    name: '',
    surname: '',
    role: 'Clinic',
    email: '',
    password: null,
    address: '',
    phoneNumber: '',
    location: '',
    createdDate: '',
    otherDetails: '',
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7207/api/Clinic/GetClinicById?clinicId=${userId}`
        );

        if (response.ok) {
          const clinicData = await response.json();
          setClinic(clinicData);
          setUpdatedClinic(clinicData);
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
      const response = await fetch(
        `https://localhost:7207/api/Clinic/UpdateClinic/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: updatedClinic.userName,
            name: updatedClinic.name,
            surname: updatedClinic.surname,
            role: 'Clinic',
            email: updatedClinic.email,
            password: updatedClinic.password,
            address: updatedClinic.address,
            phoneNumber: updatedClinic.phoneNumber,
            location: updatedClinic.location,
            createdDate: updatedClinic.createdDate,
            otherDetails: updatedClinic.otherDetails,
          }),
        }
      );

      if (response.ok) {
        setShowSuccessAlert(true);
        const updatedData = await response.json();
        setClinic((prevClinic) => ({
          ...prevClinic,
          otherDetails: updatedData.otherDetails,
        }));
        console.log('Clinic updated successfully!', updatedData);
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update clinic:', errorResponse);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClinic((prevClinic) => ({
      ...prevClinic,
      [name]: value,
    }));
  };

  return (
    <div
      className='container mt-4'
      style={{ maxWidth: '1000px', marginLeft: '5%', marginTop: '5%' }}
    >
      <Sidebar userRole='Clinic' />
      <div className='mt-4'>
        {clinic ? (
          <>
            <div className='my-5'>
              <h3>Clinic Profile</h3>
              <hr />
            </div>
            <form className='file-upload'>
              <div className='row mb-5 gx-5'>
                <div className='col-xxl-8 mb-5 mb-xxl-0'>
                  {showSuccessAlert && (
                    <div className='alert alert-success' role='alert'>
                      Clinic updated successfully!
                    </div>
                  )}
                  <div className='bg-secondary-soft px-4 py-5 rounded'>
                    <div className='row g-3'>
                      <div className='col-md-6'>
                        <label className='form-label'>Username *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='userName'
                          value={updatedClinic.userName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Name *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='name'
                          value={updatedClinic.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Surname *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='surname'
                          value={updatedClinic.surname}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Email *</label>
                        <input
                          type='email'
                          className='form-control'
                          name='email'
                          value={updatedClinic.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Address *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='address'
                          value={updatedClinic.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Phone Number *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='phoneNumber'
                          value={updatedClinic.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Location *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='location'
                          value={updatedClinic.location}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Created Date *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='createdDate'
                          value={updatedClinic.createdDate}
                          readOnly
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label'>Other Details *</label>
                        <input
                          type='text'
                          className='form-control'
                          name='otherDetails'
                          value={updatedClinic.otherDetails}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='gap-3 d-md-flex justify-content-md-end text-center'>
                  <button
                    type='button'
                    className='btn btn-primary btn-lg'
                    style={{ marginRight: '5%' }}
                    onClick={handleUpdateProfile}
                  >
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
