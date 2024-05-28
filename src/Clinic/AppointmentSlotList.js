import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppointmentSlotList = () => {
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointmentSlotId, setSelectedAppointmentSlotId] = useState(null); // State to store selected appointment slot ID

  useEffect(() => {
    fetchAppointmentSlots();
  }, []);

  useEffect(() => {
    const fetchDoctorsDetails = async () => {
      const slotsWithDoctorInfo = await Promise.all(appointmentSlots.map(async (slot) => {
        if (slot.doctorId) {
          const doctorDetails = await fetchDoctorById(slot.doctorId);
          return { ...slot, doctorDetails };
        }
        return slot;
      }));
      setAppointmentSlots(slotsWithDoctorInfo);
    };

    if (appointmentSlots.length > 0) {
      fetchDoctorsDetails();
    }
  }, [appointmentSlots]);

  const fetchAppointmentSlots = async () => {
    try {
      const response = await fetch('https://localhost:5179/api/AppointmentSlot');
      if (response.ok) {
        const data = await response.json();
        setAppointmentSlots(data);
      } else {
        console.error('Failed to fetch appointment slots:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching appointment slots:', error);
    }
  };

  const fetchDoctorById = async (doctorId) => {
    try {
      const response = await fetch(`https://localhost:5179/api/Doctor/GetDoctorById?doctorId=${doctorId}`);
      if (response.ok) {
        const data = await response.json();
        return data; // Assuming this returns {name, surname} for the doctor
      } else {
        console.error('Failed to fetch doctor details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
    return null; // In case of error, return null
  };

  const filteredAppointments = appointmentSlots.filter((slot) => {
    const slotDate = moment.utc(`${slot.date} ${slot.startTime}`, 'YYYY-MM-DDTHH:mm:ss').toDate();
    return moment(slotDate).isSame(selectedDate, 'day');
  });

  // Function to handle appointment slot selection
  const handleAppointmentSlotSelect = (appointmentSlotId) => {
    setSelectedAppointmentSlotId(appointmentSlotId);
    console.log('Selected Appointment Slot ID:', appointmentSlotId);
  };

  return (
    <Container>
      <h2>Appointment Slots</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to="/appointment-slot-create">
          <Button variant="primary">Create Appointment Slot</Button>
        </Link>
        <Link to="/appointment-slot-create-by-weeks">
          <Button variant="primary">Create Appointment Slot By Weeks</Button>
        </Link>
      </div>
      <Row>
        <Col md={4}>
          <div style={{ marginBottom: 20 }}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              style={{ height: '300px', width: '100%', margin: 'auto' }}
            />
          </div>
        </Col>
        <Col md={8}>
          <div>
            {filteredAppointments.length === 0 ? (
              <p>No appointments available for the selected date.</p>
            ) : (
              <ul>
                {filteredAppointments.map((appointment) => (
                  <li
                    key={appointment.start}
                    style={{
                      backgroundColor: appointment.isBooked ? 'lightcoral' : selectedAppointmentSlotId === appointment.appointmentSlotId ? 'lightblue' : 'inherit',
                      padding: '8px',
                      margin: '4px 0',
                      cursor: 'pointer', // Change cursor to pointer to indicate clickable
                    }}
                    onClick={() => handleAppointmentSlotSelect(appointment.appointmentSlotId)} // Handle click event
                  >
                    {appointment.doctorDetails ? `Doctor: ${appointment.doctorDetails.name} ${appointment.doctorDetails.surname} ${appointment.doctorDetails.personalNumber} , Time: ${appointment.startTime}-${appointment.endTime}` : 'Loading doctor info...'}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentSlotList;