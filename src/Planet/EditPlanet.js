import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditPlanet = ({ planetId, onCancel }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlanet();
  }, [planetId]);

  const fetchPlanet = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Planet/${planetId}`);
      const { name, type } = response.data;
      setName(name);
      setType(type);
    } catch (error) {
      console.error('Error fetching planet:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://localhost:7190/api/Planet/${planetId}`, {
        name,
        type
      });
      console.log('Update response:', response.data); // Log response for debugging
      onCancel(); // Close the edit form and refresh the list
    } catch (error) {
      console.error('Error updating planet:', error);
      setError('Failed to update planet');
    }
  };

  return (
    <div>
      <h2>Edit Planet</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="editFormName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter planet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="editFormType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter planet type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">
          Update Planet
        </Button>
        <Button variant="secondary" onClick={onCancel} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditPlanet;
