import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractsToday = () => {
  const [contracts, setContracts] = useState([]);
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    fetchContractsToday();
  }, []);

  const fetchContractsToday = async () => {
    try {
      const response = await axios.get(`https://localhost:7190/api/Contracts/byStartDate/${today}`);
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts for today:', error);
    }
  };

  return (
    <div>
      <h2>Contracts with Start Date of Today ({today})</h2>
      <ul>
        {contracts.map(contract => (
          <li key={contract.id}>
            {contract.startDate} - Employee: {contract.employee.fullName} {/* Adjust according to your contract structure */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractsToday;
