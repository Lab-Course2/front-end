import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ContractForm = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]); // State for active employees
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Employee');
      setEmployees(response.data);
      setActiveEmployees(response.data.filter(emp => emp.isActive)); // Filter active employees
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7190/api/Contracts/CreateContract', {
        name,
        startDate,
        employeeId: parseInt(employeeId)
      });
      navigate('/contracts-list');
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  return (
    <div>
      <h2>Create Contract</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contract name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmployee">
          <Form.Label>Employee</Form.Label>
          <Form.Control
            as="select"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Select an Employee</option>
            {activeEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Contract
        </Button>
      </Form>
    </div>
  );
};

export default ContractForm;
