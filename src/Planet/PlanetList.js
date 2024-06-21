import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import EditPlanet from './EditPlanet';

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [editingPlanetId, setEditingPlanetId] = useState(null);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Planet');
      setPlanets(response.data);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditingPlanetId(id);
  };

  const handleEditCancel = () => {
    setEditingPlanetId(null);
    fetchPlanets(); // Refresh the list after editing
  };

  const handleDelete = async (planetId) => {
    try {
      await axios.delete(`https://localhost:7190/api/Planet/${planetId}`);
      setPlanets(planets.filter(planet => planet.planetID !== planetId));
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  return (
    <div>
      <h2>Planet List</h2>
      {editingPlanetId ? (
        <EditPlanet planetId={editingPlanetId} onCancel={handleEditCancel} />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {planets.map(planet => (
              <tr key={planet.planetID}>
                <td>{planet.name}</td>
                <td>{planet.type}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditClick(planet.planetID)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(planet.planetID)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PlanetList;
