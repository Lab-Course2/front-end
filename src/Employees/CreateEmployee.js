import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    fullName: '',
    isActive: true
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7190/api/Employee/CreateEmployee', employee, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Employee created successfully');
      navigate('/employees'); // Redirect to the list of employees
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={employee.fullName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="isActive">
          <Form.Check
            type="checkbox"
            label="Active"
            name="isActive"
            checked={employee.isActive}
            onChange={() => setEmployee({ ...employee, isActive: !employee.isActive })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default CreateEmployee;
