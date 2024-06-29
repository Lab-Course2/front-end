import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import EditSatellite from './EditSatellite';
import DeleteSatellite from './DeleteSatellite';

const SatelliteList = ({ planetId }) => {
  const [satellites, setSatellites] = useState([]);
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  useEffect(() => {
    fetchSatellites();
  }, [planetId]);

  const fetchSatellites = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Satellite`);
      const satellitesWithPlanetNames = await Promise.all(
        response.data.map(async satellite => {
          const planetResponse = await axios.get(`https://localhost:7190/api/Planet/${satellite.planetId}`);
          return {
            ...satellite,
            planetName: planetResponse.data.name
          };
        })
      );
      setSatellites(satellitesWithPlanetNames);
    } catch (error) {
      console.error('Error fetching satellites:', error);
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
    const updatedSatellites = satellites.filter(satellite => satellite.id !== deletedSatelliteId);
    setSatellites(updatedSatellites);
  };

  return (
    <div>
      <h2>Satellite List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Planet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {satellites.map(satellite => (
            <tr key={satellite.id}>
              <td>{satellite.id}</td>
              <td>{satellite.name}</td>
              <td>{satellite.planetName}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(satellite)}>Edit</Button>{' '}
                <DeleteSatellite satelliteId={satellite.id} onDeleteSuccess={handleDeleteSuccess} />
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
