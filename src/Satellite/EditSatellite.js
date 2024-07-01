import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditSatellite = ({ satelliteId, onCancel }) => {
  const [satellite, setSatellite] = useState({
    name: '',
    planetId: '',
    isDeleted: false
  });

  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    if (satelliteId) {
      fetchSatellite();
      fetchPlanets(); // Fetch planets when component mounts
    }
  }, [satelliteId]);

  const fetchSatellite = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Satellite/${satelliteId}`);
      setSatellite(response.data);
    } catch (error) {
      console.error('Error fetching satellite:', error);
    }
  };

  const fetchPlanets = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Planet`);
      const filteredPlanets = response.data.filter(planet => !planet.isDeleted); // Filter out deleted planets
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
      const response = await axios.put(`https://localhost:7190/api/Satellite/UpdateSatelliteById/${satelliteId}`, satellite, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Satellite updated:', response.data);
      onCancel();
    } catch (error) {
      console.error('Error updating satellite:', error);
    }
  };

  return (
    <div>
      <h2>Edit Satellite</h2>
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
        <Button variant="primary" type="submit">Update</Button>{' '}
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default EditSatellite;
