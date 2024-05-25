import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate   } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import Navbar from './Navbar';
import RegisterPatient from './Patient/RegisterPatient';
import RegisterClinic from './Clinic/RegisterClinic';
import LoginForm from './LoginForm';
import ClinicDashboard from './Clinic/ClinicDashboard';
import CreateDoctor from './Clinic/CreateDoctor';
import DoctorList from './Clinic/DoctorList';
import EditDoctor from './Clinic/EditDoctor';
import ClinicProfile from './Clinic/ClinicProfile';
import PatientDashboard from './Patient/PatientDashboard';
import PatientProfile from './Patient/PatientProfile';
import Homepage from './Homepage';
import Footer from './Footer';
import ResetPassword from './ResetPasswordComponent';
import { createBrowserHistory } from 'history';
import SearchList from './Search';
import UserProfileCard from './DoctorProfileView';
import UnauthorizedPage from './UnauthorizedPage';

const PrivateRoute = ({ element: Element, isLoggedIn, ...rest }) => (
  isLoggedIn ? <Route {...rest} element={<Element />} /> : <Navigate to="/" />
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

const history = createBrowserHistory();

  const handleLogin = (role, token, userId) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setToken(token);
    setUserId(userId);
    const userData = { isLoggedIn: true, userRole: role, token, userId };
    sessionStorage.setItem('userData', JSON.stringify(userData));

    if(role === 'Patient'){
    history.push('/patient-dashboard');
    window.location.reload();
    }else if(role === 'Clinic'){
      history.push('/clinic-dashboard');
    window.location.reload();

    }

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserId('');
    sessionStorage.removeItem('userData');
    history.push('/login');
    window.location.reload();

  };

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      const { isLoggedIn, userRole, token, userId } = JSON.parse(storedUserData);
      setIsLoggedIn(isLoggedIn);
      setUserRole(userRole);
      setToken(token);
      setUserId(userId);
    }
  }, []);
;

  return (
    <Stack direction="vertical">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Router history={history}>
        <Routes>
          {isLoggedIn ? (
            <>
           {userRole === "Clinic" && (
            <>
              <Route path="/clinic-dashboard" element={<ClinicDashboard />} />
              <Route path="/edit-doctor/:id" element={<EditDoctor />} />
              <Route path="/clinic-profile" element={<ClinicProfile userId={userId} />} />
              <Route path="/create-doctor" element={<CreateDoctor userId={userId} />} />
              <Route path="/doctor-list" element={<DoctorList userId={userId} />} />
            </>
          )}
          {userRole === "Patient" && (
            <>
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/patient-profile" element={<PatientProfile userId={userId} />} />
              <Route path="/search-list" element={<SearchList />} />
              
            </>
          )}
              <Route path="/profile-card/:userId" element={<UserProfileCard />} />
              

            </>
          ) : (
            <>
              <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
              <Route path="/register-patient" element={<RegisterPatient />} />
              <Route path="/register-clinic" element={<RegisterClinic />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route element={<Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

            </>
          )}
            <Route path="/*" element={isLoggedIn ? <Navigate to="/home" /> : <UnauthorizedPage />} />
        </Routes>

      </Router>
      <div className="static-content" style={{ width: '100%', overflowX: 'hidden' }}>
        <Footer />
      </div>
    </Stack>
  );
};

export default App;