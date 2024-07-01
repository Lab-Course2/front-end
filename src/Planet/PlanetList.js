import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import EditPlanet from './EditPlanet';
import DeletePlanet from './DeletePlanet';

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

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

  const handleEdit = (planet) => {
    setSelectedPlanet(planet);
  };

  const handleCancelEdit = () => {
    setSelectedPlanet(null);
    fetchPlanets(); // Refresh the planet list
  };

  const handleDeleteSuccess = async (deletedPlanetId) => {
    try {
      await axios.delete(`https://localhost:7190/api/Planet/DeletePlanet/${deletedPlanetId}`);
      fetchPlanets(); // Refresh the planet list after deletion
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  return (
    <div>
      <h2>Planet List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Is Deleted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {planets.map(planet => (
            <tr key={planet.id}>
              <td>{planet.id}</td>
              <td>{planet.name}</td>
              <td>{planet.type}</td>
              <td>{planet.isDeleted ? 'Yes' : 'No'}</td>
              <td>
                {!planet.isDeleted && (
                  <>
                    <Button variant="warning" onClick={() => handleEdit(planet)}>Edit</Button>{' '}
                    <DeletePlanet planet={planet} onDeleteSuccess={handleDeleteSuccess} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedPlanet && (
        <EditPlanet planetId={selectedPlanet.id} onCancel={handleCancelEdit} />
      )}
    </div>
  );
};

export default PlanetList;
