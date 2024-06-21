import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlanetForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7190/api/Planet', {
        name,
        type
      });
      console.log('Planet created:', response.data); // Optional: log the created planet
      navigate('/planet-list'); // Redirect to the planet list page after successful creation
    } catch (error) {
      console.error('Error creating planet:', error);
      setError('Failed to create planet'); // Set error state for display
    }
  };

  return (
    <div>
      <h2>Create Planet</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter planet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formType">
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
          Create Planet
        </Button>
      </Form>
    </div>
  );
};

export default PlanetForm;
