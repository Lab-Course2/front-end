import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const DeleteContract = ({ contractId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7190/api/Contracts/DeleteContract/${contractId}`);
      console.log('Contract deleted successfully');
      onDeleteSuccess(); // Call the callback to update the parent component
    } catch (error) {
      console.error('Error deleting contract:', error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteContract;
