import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditContract = ({ contractId, onCancel }) => {
  const [contract, setContract] = useState(null);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchContract();
    fetchEmployees();
  }, [contractId]);

  const fetchContract = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Contracts/${contractId}`);
      setContract(response.data);
      setName(response.data.name);
      setStartDate(formatDate(response.data.startDate)); // Format date as needed
      setEmployeeId(response.data.employeeId.toString());
    } catch (error) {
      console.error('Error fetching contract:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7190/api/Contracts/UpdateContractById/${contractId}`, {
        id: parseInt(contractId), // Ensure you're sending the ID in the request body as well as part of the URL
        name,
        startDate,
        employeeId: parseInt(employeeId) // Ensure employeeId is parsed as an integer
      });
      onCancel(); // Cancel editing mode
    } catch (error) {
      console.error('Error updating contract:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
  };

  if (!contract) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Contract</h2>
      <Form onSubmit={handleUpdate}>
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
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Contract
        </Button>
        <Button variant="secondary" onClick={onCancel} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditContract;
