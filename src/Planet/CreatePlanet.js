import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreatePlanet = () => {
  const [planet, setPlanet] = useState({
    name: '',
    type: '',
    isDeleted: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanet({
      ...planet,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7190/api/Planet/CreatePlanet', planet, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Planet created successfully');
      navigate('/planet-list');
    } catch (error) {
      console.error('Error creating planet:', error);
    }
  };

  return (
    <div>
      <h2>Create Planet</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={planet.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type:</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={planet.type}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default CreatePlanet;
