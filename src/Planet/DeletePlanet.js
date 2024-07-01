import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const DeletePlanet = ({ planet, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7190/api/Planet/DeletePlanet/${planet.id}`);
      onDeleteSuccess(planet.id); // Notify parent component of successful deletion
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  );
};

export default DeletePlanet;
