import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import RegisterPatient from './RegisterPatient';
import RegisterClinic from './RegisterClinic';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginForm/>} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/register-clinic" element={<RegisterClinic />} />
      </Routes>

    </Router>
  );
};

export default App;