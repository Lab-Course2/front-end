import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditEmployee = ({ employeeId, onCancel }) => {
  const [employee, setEmployee] = useState({
    fullName: '',
    isActive: true
  });

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Employee/${employeeId}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleCheckboxChange = () => {
    setEmployee({
      ...employee,
      isActive: !employee.isActive
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://localhost:7190/api/Employee/UpdateEmployeeById/${employeeId}`, {
        id: employeeId,
        fullName: employee.fullName,
        isActive: employee.isActive
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Employee updated:', response.data);
      onCancel(); // Close the edit form after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control type="text" name="fullName" value={employee.fullName} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="isActive">
          <Form.Check
            type="checkbox"
            label="Active"
            name="isActive"
            checked={employee.isActive}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>{' '}
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default EditEmployee;
