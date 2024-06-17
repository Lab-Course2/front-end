import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap

const DeleteEmployee = ({ employeeId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7190/api/Employee/DeleteEmployee${employeeId}`);
      console.log('Employee deleted:', response.data);
      // Optionally, redirect or update state after successful deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  );
};

export default DeleteEmployee;
