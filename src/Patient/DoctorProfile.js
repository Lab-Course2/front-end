import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7190/api/Doctor/GetDoctorById?doctorId=${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Ensure the response body is read only once
        const data = await response.clone().json();

        // Log the entire data object to the console
        console.log('Data:', data);

        // Set the doctor data
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the async function
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{doctor.userName}</h1>
      <p>Specialisation: {doctor.specialisation}</p>
      <p>Job: {doctor.role}</p>
      {/* Display other doctor details as needed */}
    </div>
  );
};

export default DoctorProfile;