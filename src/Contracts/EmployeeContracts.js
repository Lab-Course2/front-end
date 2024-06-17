import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EmployeeContracts = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeContracts, setEmployeeContracts] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeeChange = async (e) => {
    setSelectedEmployee(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(`https://localhost:7190/api/Contracts/byEmployee/${e.target.value}`);
        setEmployeeContracts(response.data);
      } catch (error) {
        console.error(`Error fetching contracts for employee ${e.target.value}:`, error);
      }
    } else {
      setEmployeeContracts([]);
    }
  };

  return (
    <div>
      <h2>Employee Contracts</h2>
      <Form.Group controlId="employee">
        <Form.Label>Select Employee:</Form.Label>
        <Form.Control as="select" name="employee" value={selectedEmployee} onChange={handleEmployeeChange} required>
          <option value="">Select an Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.fullName}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {employeeContracts.length > 0 && (
        <div>
          <h3>Contracts for Selected Employee</h3>
          <ul>
            {employeeContracts.map(contract => (
              <li key={contract.id}>
                {contract.startDate} {/* Adjust according to your contract structure */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeContracts;
