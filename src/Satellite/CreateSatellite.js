import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateSatellite = () => {
  const [satellite, setSatellite] = useState({
    name: '',
    planetId: ''
  });

  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const navigate = useNavigate();

  const fetchPlanets = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Planet');
      const filteredPlanets = response.data.filter(planet => !planet.isDeleted);
      setPlanets(filteredPlanets);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSatellite({
      ...satellite,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7190/api/Satellite/CreateSatellite', satellite);
      console.log('Satellite created successfully');
      navigate('/satellite-list');
    } catch (error) {
      console.error('Error creating satellite:', error);
    }
  };

  return (
    <div>
      <h2>Create Satellite</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={satellite.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="planetId">
          <Form.Label>Planet:</Form.Label>
          <Form.Control
            as="select"
            name="planetId"
            value={satellite.planetId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Planet</option>
            {planets.map(planet => (
              <option key={planet.id} value={planet.id}>{planet.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default CreateSatellite;
