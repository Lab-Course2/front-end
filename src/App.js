import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import RegisterPatient from './Patient/RegisterPatient';
import RegisterClinic from './Clinic/RegisterClinic';
import LoginForm from './LoginForm';
import ClinicDashboard from './Clinic/ClinicDashboard';
import CreateDoctor from './Clinic/CreateDoctor';
import DoctorList from './Clinic/DoctorList';
import EditDoctor from './Clinic/EditDoctor';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ClinicProfile from './Clinic/ClinicProfile';

const PrivateRoute = ({ element: Element, isLoggedIn, userId, token, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn ? <Element userId={userId} token={token} {...props} /> : <Navigate to="/" />}
  />
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
    history.push('/clinic-dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserId('');
    sessionStorage.removeItem('userData');
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

  return (
    <Router history={history}>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {history.location.pathname === '/clinic-dashboard' && (
                <Sidebar />
              )}
            </div>
            
              <Routes> 
              <Route path="/home" element={<Home />} /> 
                {isLoggedIn ? (
                  <>
                   
                    <Route
                      path="/clinic-dashboard"
                      element={<ClinicDashboard />}
                      isLoggedIn={isLoggedIn}
                      userId={userId}
                      token={token}
                    />
                    <Route
                      path="/doctor-list"
                      element={<DoctorList userId={userId} />}
                      isLoggedIn={isLoggedIn}
                      userId={userId}
                      token={token}
                    />
                    <Route
                      path="/create-doctor"
                      element={<CreateDoctor userId={userId} />}
                      isLoggedIn={isLoggedIn}
                      userId={userId}
                      token={token}
                    />
                    <Route
                      path="/edit-doctor/:id"
                      element={<EditDoctor />}
                      isLoggedIn={isLoggedIn}
                      userId={userId}
                      token={token}
                    />
                     <Route
                      path="/clinic-profile"
                      element={<ClinicProfile userId={userId}/>}
                      isLoggedIn={isLoggedIn}
                      userId={userId}
                      token={token}
                    />
                    {/* Add other logged-in user routes here */}
                  </>
                ) : (
                  <>
                    <Route
                      path="/login"
                      element={<LoginForm handleLogin={handleLogin} />}
                    />
                    <Route
                      path="/register-patient"
                      element={<RegisterPatient />}
                    />
                    <Route
                      path="/register-clinic"
                      element={<RegisterClinic />}
                    />
                    {/* Add other routes for non-logged-in users here */}
                  </>
                )}
                {/* Redirect to home if trying to access login while logged in */}
                {isLoggedIn && <Route path="/login" element={<Navigate to="/home" />} />}
                {isLoggedIn && <Route path="/register-patient" element={<Navigate to="/home" />} />}
              </Routes>
            </div>
          </div>
        </div> 
    </Router>
  );
};

export default App;