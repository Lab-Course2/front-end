import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditPlanet = ({ planetId, onCancel }) => {
  const [planet, setPlanet] = useState({
    name: '',
    type: '',
    isDeleted: false
  });

  useEffect(() => {
    fetchPlanet();
  }, [planetId]);

  const fetchPlanet = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Planet/${planetId}`);
      setPlanet(response.data);
    } catch (error) {
      console.error('Error fetching planet:', error);
    }
  };

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
      const response = await axios.put(`https://localhost:7190/api/Planet/UpdatePlanetById/${planetId}`, planet, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Planet updated:', response.data);
      onCancel();
    } catch (error) {
      console.error('Error updating planet:', error);
    }
  };

  return (
    <div>
      <h2>Edit Planet</h2>
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
        <Button variant="primary" type="submit">Update</Button>{' '}
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default EditPlanet;
