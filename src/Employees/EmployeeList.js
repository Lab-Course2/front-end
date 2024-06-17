import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
    fetchEmployees(); // Refresh the employee list
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.fullName}</td>
              <td>{employee.isActive ? 'Active' : 'Unactive'}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(employee)}>Edit</Button>{' '}
                <DeleteEmployee employeeId={employee.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedEmployee && (
        <EditEmployee employeeId={selectedEmployee.id} onCancel={handleCancelEdit} />
      )}
    </div>
  );
};

export default EmployeeList;
