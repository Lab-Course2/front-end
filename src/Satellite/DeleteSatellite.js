import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const DeleteSatellite = ({ satelliteId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7190/api/Satellite/DeleteSatellite/${satelliteId}`);
      console.log('Satellite deleted successfully');
      onDeleteSuccess(satelliteId); // Call the callback to update the parent component
    } catch (error) {
      console.error('Error deleting satellite:', error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  );
};

export default DeleteSatellite;
