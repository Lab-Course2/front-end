import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import EditSatellite from './EditSatellite';
import DeleteSatellite from './DeleteSatellite';

const SatelliteList = () => {
  const [satellites, setSatellites] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [selectedPlanetId, setSelectedPlanetId] = useState(0);
  const [filteredSatellites, setFilteredSatellites] = useState([]);
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  useEffect(() => {
    fetchSatellites();
    fetchPlanets();
  }, []);

  useEffect(() => {
    filterSatellites();
  }, [selectedPlanetId, satellites]);

  const fetchSatellites = async () => {
    try {
      const satellitesResponse = await axios.get('https://localhost:7190/api/Satellite');
      const planetsResponse = await axios.get('https://localhost:7190/api/Planet');

      const satellitesWithPlanetNames = satellitesResponse.data.map(satellite => ({
        ...satellite,
        planetName: planetsResponse.data.find(planet => planet.id === satellite.planetId)?.name
      }));

      setSatellites(satellitesWithPlanetNames);
    } catch (error) {
      console.error('Error fetching satellites:', error);
    }
  };

  const fetchPlanets = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Planet');
      const filteredPlanets = response.data.filter(planet => !planet.isDeleted);
      setPlanets(filteredPlanets);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const filterSatellites = () => {
    if (selectedPlanetId === 0) {
      setFilteredSatellites(satellites);
    } else {
      setFilteredSatellites(satellites.filter(satellite => satellite.planetId === selectedPlanetId));
    }
  };

  const handleEdit = (satellite) => {
    setSelectedSatellite(satellite);
  };

  const handleCancelEdit = () => {
    setSelectedSatellite(null);
    fetchSatellites();
  };

  const handleDeleteSuccess = (deletedSatelliteId) => {
    const updatedSatellites = satellites.map(satellite =>
      satellite.id === deletedSatelliteId ? { ...satellite, isDeleted: true } : satellite
    );
    setSatellites(updatedSatellites);
    filterSatellites();
  };

  const handlePlanetChange = (e) => {
    setSelectedPlanetId(Number(e.target.value));
  };

  return (
    <div>
      <h2>Satellite List</h2>
      <Form.Group controlId="planetFilter">
        <Form.Label>Filter by Planet:</Form.Label>
        <Form.Control as="select" value={selectedPlanetId} onChange={handlePlanetChange}>
          <option value={0}>All Planets</option>
          {planets.map(planet => (
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Planet</th>
            <th>Is Deleted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSatellites.map(satellite => (
            <tr key={satellite.id}>
              <td>{satellite.id}</td>
              <td>{satellite.name}</td>
              <td>{satellite.planetName}</td>
              <td>{satellite.isDeleted ? 'Yes' : 'No'}</td>
              <td>
                {!satellite.isDeleted && (
                  <>
                    <Button variant="warning" onClick={() => handleEdit(satellite)}>Edit</Button>{' '}
                    <DeleteSatellite satelliteId={satellite.id} onDeleteSuccess={handleDeleteSuccess} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedSatellite && (
        <EditSatellite satelliteId={selectedSatellite.id} onCancel={handleCancelEdit} />
      )}
    </div>
  );
};

export default SatelliteList;
