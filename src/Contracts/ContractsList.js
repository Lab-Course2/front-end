import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditContract from './EditContract';
import DeleteContract from './DeleteContract';
import { Form, Button } from 'react-bootstrap';

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingContractId, setEditingContractId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');

  useEffect(() => {
    fetchContracts();
    fetchEmployees();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Contracts');
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Contracts/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditingContractId(id);
  };

  const handleEditCancel = () => {
    setEditingContractId(null);
    fetchContracts(); // Refresh the list after editing
  };

  const handleDeleteSuccess = () => {
    fetchContracts(); // Refresh the list after deleting
  };

  const filterContractsByEmployee = async () => {
    try {
      const query = selectedEmployeeId ? `https://localhost:7190/api/Contracts/byEmployee?employeeId=${selectedEmployeeId}` : 'https://localhost:7190/api/Contracts';
      const response = await axios.get(query);
      setContracts(response.data);
    } catch (error) {
      console.error('Error filtering contracts by employee:', error);
    }
  };

  const filterContractsByStartDate = async () => {
    try {
      const query = selectedStartDate ? `https://localhost:7190/api/Contracts/byStartDate?startDate=${selectedStartDate}` : 'https://localhost:7190/api/Contracts';
      const response = await axios.get(query);
      setContracts(response.data);
    } catch (error) {
      console.error('Error filtering contracts by start date:', error);
    }
  };

  const handleEmployeeFilterChange = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const handleStartDateFilterChange = (e) => {
    setSelectedStartDate(e.target.value);
  };

  return (
    <div>
      <h2>Contracts List</h2>
      <Form>
        <Form.Group controlId="filterEmployee">
          <Form.Label>Filter by Employee:</Form.Label>
          <Form.Control as="select" value={selectedEmployeeId} onChange={handleEmployeeFilterChange}>
            <option value="">All Employees</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.fullName}</option>
            ))}
          </Form.Control>
          <Button variant="primary" onClick={filterContractsByEmployee} className="mt-2">Filter by Employee</Button>
        </Form.Group>
        <Form.Group controlId="filterStartDate">
          <Form.Label>Filter by Start Date:</Form.Label>
          <Form.Control type="date" value={selectedStartDate} onChange={handleStartDateFilterChange} />
          <Button variant="primary" onClick={filterContractsByStartDate} className="mt-2">Filter by Start Date</Button>
        </Form.Group>
      </Form>

      {editingContractId ? (
        <EditContract contractId={editingContractId} onCancel={handleEditCancel} />
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>Employee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <tr key={contract.id}>
                <td>{contract.name}</td>
                <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                <td>{contract.employee ? contract.employee.fullName : 'N/A'}</td>
                <td>
                  <button onClick={() => handleEditClick(contract.id)} className="btn btn-primary me-2">Edit</button>
                  <DeleteContract contractId={contract.id} onDeleteSuccess={handleDeleteSuccess} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContractList;
