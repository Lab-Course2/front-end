import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap

const DeletePlanet = ({ planetId,onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7190/api/Planet/DeletePlanet${planetId}`);
      console.log('Planet deleted successfully');
      onDeleteSuccess(planetId);
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  );
};

export default DeletePlanet;
